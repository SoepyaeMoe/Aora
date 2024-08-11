import { Alert, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import * as documentPicker from 'expo-document-picker';
import { Video } from 'expo-av';
import { createVideoPost } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Create = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useGlobalContext();
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    });

    const onRefresh = async () => {
        setRefreshing(true);
        setForm({
            title: '',
            video: null,
            thumbnail: null,
            prompt: ''
        });
        setRefreshing(false);
    }

    const [uploading, setUploading] = useState(false);

    const openPicker = async (selectedType) => {
        const result = await documentPicker.getDocumentAsync({
            type: selectedType == 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
        });

        if (!result.canceled) {
            if (selectedType == "image") {
                setForm({ ...form, thumbnail: result.assets[0] });
            }
            if (selectedType == "video") {
                setForm({ ...form, video: result.assets[0] });
            }
        }
    }

    const submit = async () => {
        if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
            return Alert.alert("Error!", "Please fill all field");
        }
        if (form.video.size > 50000 || form.thumbnail.size > 50000) {
            return Alert.alert("Error!", "Allow max file size: 50MB")
        }
        setUploading(true);
        try {
            await createVideoPost({ ...form, userId: user.$id });
            router.push("/home");
        } catch (error) {
            Alert.alert("Error!", error.message);
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            });
            setUploading(false);
        }
    }

    return (
        <SafeAreaView className="w-full h-full bg-primary">
            <ScrollView className="px-4 mt-6 mb-2"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
                <FormField
                    otherStyles="mt-10"
                    handleOnChangeText={(value) => setForm({ ...form, title: value })}
                    title="Video title"
                    value={form.title}
                    placeholder="Give your video catchy title..."
                />

                <View className="mt-7">
                    <Text className="text-gray-100 text-base font-pmedium">Upload Video</Text>
                    {form.video ?
                        (<Video
                            className="w-full h-64 rounded-2xl mt-3"
                            source={{ uri: form.video.uri }}
                            useNativeControls
                            isLooping
                        />) : (<TouchableOpacity onPress={() => openPicker('video')}>
                            <View className="bg-black-100 border border-black-200 h-40 rounded-2xl px-4 mt-3 justify-center items-center">
                                <View className="border border-dashed border-secondary-200 h-14 w-14 justify-center items-center">
                                    <Image
                                        className="w-1/2 h-1/2"
                                        resizeMethod="contain"
                                        source={icons.upload} />
                                </View>
                            </View>
                        </TouchableOpacity>)
                    }
                </View >

                <View className="mt-7">
                    <Text className="text-gray-100 text-base font-pmedium">Thumbnail Image</Text>
                    {form.thumbnail ?
                        (<Image
                            className="w-full h-64 rounded-2xl mt-3"
                            resizeMethod="contain"
                            source={{ uri: form.thumbnail.uri }}
                        />) : (<TouchableOpacity onPress={() => openPicker('image')}>
                            <View className="bg-black-100 border flex flex-row space-x-2 border-black-200 h-16 rounded-2xl px-4 mt-3 justify-center items-center">
                                <Image
                                    className="w-5 h-5"
                                    resizeMethod="contain"
                                    source={icons.upload} />
                                <Text className="text-gray-100 text-sm font-pmedium">Chose a file</Text>
                            </View>
                        </TouchableOpacity>)}
                </View>

                <FormField
                    otherStyles="mt-7"
                    title="AI Prompt"
                    placeholder="The AI prompt of your video..."
                    handleOnChangeText={(value) => setForm({ ...form, prompt: value })}
                    value={form.prompt}
                />

                <CustomButton
                    handlePress={submit}
                    containerStyles="mt-5"
                    title="Submit & Publish"
                    isLoading={uploading}
                />
            </ScrollView >
        </SafeAreaView >
    )
}

export default Create