import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const App = () => {
    const { isLogged, isLoading } = useGlobalContext();

    if (!isLoading && isLogged) return <Redirect href='/home' />


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full min-h-[85vh] flex justify-center items-center px-4'>
                    <Image
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                        source={images.logo} />
                    <Image
                        className='w-full max-w-[380px] h-[298px]'
                        resizeMode='contain'
                        source={images.cards} />
                    <View className="relative mt-5 pb-2">
                        <Text className="text-white text-3xl font-bold text-center">
                            Discover Endless {"\n"}
                            Possible With {" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>
                        <Image
                            className="w-[136px] h-[15px] absolute bottom-0 -right-8"
                            resizeMode='contain'
                            source={images.path} />
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey of Limitless
                        Exploration with Aora
                    </Text>
                    <CustomButton
                        title="Continute With Email"
                        containerStyles="w-full mt-7"
                        handlePress={() => router.push('/sign-in')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default App