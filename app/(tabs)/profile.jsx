import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import VideoCard from '../../components/VideoCard';
import EmptyStage from '../../components/EmptyStage';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const profile = () => {
    const { user, setIsLogged, setUser } = useGlobalContext();
    const logout = async () => {
        Alert.alert("Logout", "Are you sure you want to logout", [
            { text: "cancel", onPress: () => { console.log('cancel') } },
            {
                text: "ok", onPress: async () => {
                    await signOut()
                    router.replace("/sign-in")
                    setIsLogged(false)
                    setUser(null)
                }
            }
        ])
    }
    const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        avatar={item.creator.avatar}
                        creator={item.creator.username}
                        thumbnail={item.thumbnail}
                        video={item.video}
                    />
                )}

                ListEmptyComponent={() => (
                    <EmptyStage title="No Videos Found" subtitle="No videos found for this profile" />
                )}

                ListHeaderComponent={() => (
                    <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                        <View className="w-full flex items-end mb-10">
                            <TouchableOpacity
                                onPress={logout}>
                                <Image
                                    className="w-6 h-6"
                                    source={icons.logout}
                                    resizeMethod='contain'
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="h-16 w-16 border border-secondary-200 rounded-lg justify-center items-center">
                            <Image
                                className="w-full h-full rounded-lg"
                                resizeMode="cover"
                                source={{ uri: user?.avatar }} />
                        </View>

                        <InfoBox
                            title={user.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="flex flex-row">
                            <InfoBox
                                title={posts.length || 0}
                                subtitle="Posts"
                                titleStyles="text-xl"
                                containerStyles="mr-10"
                            />
                            <InfoBox
                                title="1M"
                                subtitle="Followers"
                                titleStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default profile

const styles = StyleSheet.create({})