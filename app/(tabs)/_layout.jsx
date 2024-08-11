import { StyleSheet, Text, View, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ name, color, focused, icon }) => {
    return (
        <View className="flex justify-center items-center gap-1">
            <Image
                source={icon}
                tintColor={color}
                resizeMethod='contain'
                className='w-5 h-5'
            />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color: color }}
            >{name}</Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 60,
                }
            }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Home"
                                icon={icons.home}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Profile"
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="Create"
                                icon={icons.plus}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                name="bookmark"
                                icon={icons.bookmark}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs >
        </>
    )
}

export default TabLayout

const styles = StyleSheet.create({})