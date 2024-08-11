import { Image, StyleSheet, Text, View } from 'react-native';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const EmptyStage = ({ title, subtitle }) => {
    return (
        <View className="flex justify-center items-center px-4">
            <Image
                className="w-[270px] h-[216px]"
                source={images.empty} />
            <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
            <Text className="text-xl text-center font-psemibold text-white mt-2">
                {subtitle}
            </Text>
            <CustomButton handlePress={() => { router.replace('/home') }} title="Back to explore" containerStyles="w-full my-5 py-4" />
        </View>
    );
}

export default EmptyStage

const styles = StyleSheet.create({})