import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants';
import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({ title, avatar, creator, thumbnail, video }) => {
    const [play, setPlay] = useState(false);
    return (
        <View className='px-4 flex-col mb-14'>
            <View className='flex flex-row gap-3 justify-between items-start'>
                <View className="flex flex-row gap-2">
                    <View className="w-[46px] h-[46px] border border-secondary-200 rounded-lg">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode='cover'
                        />
                    </View>
                    <View>
                        <Text
                            numberOfLines={1}
                            className="text-gray-100 text-sm font-psemibold">
                            {title}
                        </Text>
                        <Text className="text-gray-200 text-xs font-pregular"
                            numberOfLines={1}>
                            {creator}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image
                        className="w-5 h-5"
                        resizeMode='contain'
                        source={icons.menu} />
                </View>
            </View>
            {play ? (
                <Video
                    className="w-full h-60 mt-3 rounded-xl"
                    useNativeControls
                    shouldPlay
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={status => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                    source={{ uri: video }} />
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        setPlay(true)
                    }}
                    activeOpacity={0.7}
                    className="w-full h-60 relative rounded-xl flex justify-center items-center mt-3"
                >
                    <Image
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                        source={{ uri: thumbnail }} />

                    <Image
                        className="w-12 h-12 absolute"
                        resizeMode='contain'
                        source={icons.play} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard
