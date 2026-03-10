import { useEffect } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import TastySplashScreen from '../src/screens/SplashScreen';

// Prevent the native splash screen from auto-hiding so our custom animation runs
SplashScreen.preventAutoHideAsync();

/**
 * Root entry – shows the animated Tasty splash screen then navigates
 * forward. Replace '/(next-screen)' with your real destination route.
 */
export default function IndexScreen() {
    const router = useRouter();

    const handleComplete = () => {
        // TODO: replace with your real next screen once it's built
        // e.g. router.replace('/(auth)/landing');
        console.log('Splash complete – navigate to next screen here');
    };

    useEffect(() => {
        // Hide the native splash once our component is mounted
        SplashScreen.hideAsync();
    }, []);

    return <TastySplashScreen onComplete={handleComplete} />;
}

