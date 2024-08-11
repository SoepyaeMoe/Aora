import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "66ae11a7000553c0fd65",
    databaseId: "66ae13e40038c036f7f4",
    userCollectionId: "66ae13fb0024cfb6cc10",
    videoCollectionId: "66ae1446002beebb6a31",
    storageId: "66ae172b003b328fc99e",
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;
        const avatarUrl = avatar.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log('error in getCurrent User ,appwrite.js', error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );
        return posts;
    } catch (error) {
        console.log('error in appwrite.js/getallpost', error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [
                Query.equal("creator", userId),
                Query.orderDesc("$createdAt")
            ]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

const fileUpload = async (file, type) => {
    if (!file) return;
    let fileUrl;

    try {
        const { mimeType, ...reset } = file;
        const asset = { type: mimeType, ...reset };
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );
        if (type == 'image') {
            fileUrl = storage.getFilePreview(config.storageId, uploadedFile.$id);
        }
        if (type == 'video') {
            fileUrl = storage.getFileView(config.storageId, uploadedFile.$id);
        }
        return fileUrl;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createVideoPost = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            fileUpload(form.thumbnail, type = "image"),
            fileUpload(form.video, type = "video")
        ]);

        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );
        return newPost;
    } catch (error) {
        throw new Error(error.message)
    }
}