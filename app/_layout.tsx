import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments, SplashScreen } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { getOnboardingStatus } from '../src/services/storage';

// Keep the splash screen visible while we check onboarding status
SplashScreen.preventAutoHideAsync();

/**
 * Root layout — checks onboarding status and redirects accordingly.
 * Uses Slot instead of Stack to avoid double-navigator issues.
 */
export default function RootLayout() {
    return <Slot />;
}
