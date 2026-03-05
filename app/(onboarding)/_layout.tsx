import { Stack } from 'expo-router';

/**
 * Onboarding group layout — headerless stack.
 */
export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        />
    );
}
