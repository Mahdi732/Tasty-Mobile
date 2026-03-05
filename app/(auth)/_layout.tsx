import { Stack } from 'expo-router';

/**
 * Auth group layout — headerless stack for login/signup screens.
 */
export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        />
    );
}
