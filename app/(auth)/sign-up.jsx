import { ScrollView, Text, View, Image, Alert } from 'react-native';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [isSubmitting, setSubmitting] = useState(false);
    const { setUser, setIsLogged } = useGlobalContext();
    const submit = async () => {
        if (form.username == '' || form.email == '' || form.password == '') {
            Alert.alert('Error: Please fill in all fields');
            return;
        }
        try {
            setSubmitting(true);
            const result = await createUser(form.email, form.password, form.username);
            if (result) {
                setUser(result);
                setIsLogged(true);
                router.replace('/home');
            }
        } catch (error) {
            Alert.alert(error.message)
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
                        Sing Up to Aora
                    </Text>

                    <FormField
                        value={form.username}
                        handleOnChangeText={v => setForm({ ...form, username: v })}
                        otherStyles='mt-5'
                        title='Username'
                        placeholder='Your unique username' />

                    <FormField
                        value={form.email}
                        handleOnChangeText={v => setForm({ ...form, email: v })}
                        keyBoardType='email-address'
                        otherStyles='mt-7'
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
                        <Text className="text-gray-100 text-base font-pregular">Already have an account?</Text>
                        <Link href='/sign-in' className='text-secondary-200 text-base font-psemibold'>Sing In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn