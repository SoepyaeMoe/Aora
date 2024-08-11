import { ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser } from '../../lib/appwrite';

const SignIn = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isSubmitting, setSubmitting] = useState(false);
    const { setUser, setIsLogged } = useGlobalContext();
    const submit = async () => {
        if (form.email === '' || form.password === '') {
            Alert.alert('Error: All fields is fill to required');
            return;
        }
        setSubmitting(true);
        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            if (result) {
                setUser(result);
                setIsLogged(true);
                router.replace('/home');
            }
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full min-h-[85vh] px-4 flex justify-center">
                    <Image
                        className="w-[115px] h-[34px]"
                        resizeMode='contain'
                        source={images.logo} />
                    <Text className="text-white font-psemibold font-semibold text-[22px] mt-10">
                        Login to Aora
                    </Text>
                    <FormField
                        value={form.email}
                        handleOnChangeText={v => setForm({ ...form, email: v })}
                        keyBoardType='email-address'
                        otherStyles='mt-5'
                        title='Email'
                        placeholder='Enter your email' />

                    <FormField
                        value={form.password}
                        handleOnChangeText={v => setForm({ ...form, password: v })}
                        otherStyles='mt-7'
                        title='Password'
                        placeholder='Enter your password' />

                    <CustomButton
                        containerStyles="mt-7"
                        handlePress={submit}
                        isLoading={isSubmitting}
                        title="Sign Up" />

                    <View className="flex justify-center flex-row gap-2 mt-2">
                        <Text className="text-gray-100 text-lg font-pregular">Don't have an account?</Text>
                        <Link href='/sign-up' className='text-secondary-200 text-lg font-psemibold'>Sing Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({})