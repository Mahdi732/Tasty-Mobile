import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@tasty/hasOnboarded';

/**
 * Storage service for onboarding persistence.
 * Manages the "first time" flag to decide whether to show onboarding.
 */

/** Returns true if the user has already completed onboarding */
export async function getOnboardingStatus(): Promise<boolean> {
    try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        return value === 'true';
    } catch (error) {
        console.warn('[Storage] Failed to read onboarding status:', error);
        return false;
    }
}

/** Marks onboarding as complete — future launches will skip it */
export async function setOnboardingComplete(): Promise<void> {
    try {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch (error) {
        console.warn('[Storage] Failed to save onboarding status:', error);
    }
}

/** Resets onboarding flag — useful for development/testing */
export async function resetOnboarding(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ONBOARDING_KEY);
    } catch (error) {
        console.warn('[Storage] Failed to reset onboarding status:', error);
    }
}
