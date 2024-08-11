import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyStage from '../../components/EmptyStage';
import VideoCard from '../../components/VideoCard';
import { useState } from 'react';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
    const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useGlobalContext();
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts.documents}
                keyExtractor={item => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator.username}
                        avatar={item.creator.avatar}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="px-4 my-6 flex space-y-6">
                        <View className="flex justify-between flex-row items-start mb-6">
                            <View>
                                <Text className="text-gray-100 font-pmedium text-sm">
                                    Welcome Back
                                </Text>
                                <Text className="text-white text-2xl font-psemibold">
                                    {user.username}
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchInput />
                        {/* <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">Trending videos</Text>
                            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
                        </View> */}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyStage title="No Videos Found" subtitle="No videos created yet" />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})