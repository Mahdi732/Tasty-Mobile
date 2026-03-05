import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, SplashScreen } from 'expo-router';
import { getOnboardingStatus } from '../src/services/storage';

// Prevent auto-hide while we check onboarding status
SplashScreen.preventAutoHideAsync();

/**
 * Entry screen — checks AsyncStorage and redirects to
 * onboarding or auth based on the "hasOnboarded" flag.
 */
export default function IndexScreen() {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const hasOnboarded = await getOnboardingStatus();

                if (hasOnboarded) {
                    router.replace('/(auth)/landing');
                } else {
                    router.replace('/(onboarding)');
                }
            } catch (error) {
                console.warn('[Index] Check error:', error);
                router.replace('/(onboarding)');
            } finally {
                setIsChecking(false);
                SplashScreen.hideAsync();
            }
        };

        checkOnboarding();
    }, []);

    // Show blank screen while checking (splash screen covers it)
    return <View style={styles.container} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
});
