import React, { useState, useCallback } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import VideoBackground from '../../src/components/onboarding/VideoBackground';
import OnboardingCard from '../../src/components/onboarding/OnboardingCard';
import {
    ONBOARDING_STEPS,
    TOTAL_STEPS,
} from '../../src/constants/onboardingData';
import { setOnboardingComplete } from '../../src/services/storage';

/**
 * Onboarding screen — manages the 3-step flow.
 * Each step shows a different video background + card content.
 * On completion, persists the flag and navigates to auth.
 */
export default function OnboardingScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const step = ONBOARDING_STEPS[currentStep];

    /** Advance to the next step */
    const handleNext = useCallback(() => {
        if (currentStep < TOTAL_STEPS - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    }, [currentStep]);

    /** Complete onboarding — persist flag and navigate to landing */
    const handleGetStarted = useCallback(async () => {
        await setOnboardingComplete();
        router.replace('/(auth)/landing');
    }, [router]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            {/* Background video — keyed to force remount on step change */}
            <Animated.View
                key={`video-${currentStep}`}
                entering={FadeIn.duration(600)}
                exiting={FadeOut.duration(300)}
                style={StyleSheet.absoluteFill}
            >
                <VideoBackground source={step.videoSource} />
            </Animated.View>

            {/* Gradient overlay for text readability */}
            <View style={styles.overlay} />

            {/* Bottom card */}
            <OnboardingCard
                title={step.title}
                description={step.description}
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                accentColor={step.accentColor}
                onNext={handleNext}
                onGetStarted={handleGetStarted}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // Subtle darkening at the bottom for card readability
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
});
