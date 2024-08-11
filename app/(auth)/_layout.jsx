import { Stack } from 'expo-router';

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name='sign-in'
                    options={{
                        headerShown: false,
                        title: "SignIn"
                    }} />
                <Stack.Screen
                    name="sign-up"
                    options={{
                        headerShown: false,
                        title: "SignUp"
                    }} />
            </Stack>
        </>
    )
}

export default AuthLayout
