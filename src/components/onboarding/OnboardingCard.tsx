import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
    FadeInUp,
    FadeInDown,
} from 'react-native-reanimated';
import PaginationDots from './PaginationDots';
import ActionButton from './ActionButton';

interface OnboardingCardProps {
    title: string;
    description: string;
    currentStep: number;
    totalSteps: number;
    accentColor: string;
    onNext: () => void;
    onGetStarted: () => void;
}

/**
 * Bottom frosted-glass card overlay — contains the title, description,
 * pagination dots, and action button. Matches the layered card
 * aesthetic from the reference image.
 */
export default function OnboardingCard({
    title,
    description,
    currentStep,
    totalSteps,
    accentColor,
    onNext,
    onGetStarted,
}: OnboardingCardProps) {
    const isLastStep = currentStep === totalSteps - 1;

    return (
        <View style={styles.cardWrapper}>
            {/* Semi-transparent background layer */}
            <View style={styles.cardBackground} />

            <View style={styles.cardContent}>
                {/* Title */}
                <Animated.Text
                    entering={FadeInUp.duration(500).delay(100)}
                    key={`title-${currentStep}`}
                    style={styles.title}
                >
                    {title}
                </Animated.Text>

                {/* Description */}
                <Animated.Text
                    entering={FadeInUp.duration(500).delay(200)}
                    key={`desc-${currentStep}`}
                    style={styles.description}
                >
                    {description}
                </Animated.Text>

                {/* Bottom row: dots + button */}
                <Animated.View
                    entering={FadeInDown.duration(400).delay(300)}
                    key={`controls-${currentStep}`}
                    style={styles.controlsRow}
                >
                    <PaginationDots
                        totalSteps={totalSteps}
                        currentStep={currentStep}
                        activeColor={accentColor}
                    />

                    <ActionButton
                        variant={isLastStep ? 'start' : 'next'}
                        onPress={isLastStep ? onGetStarted : onNext}
                        accentColor={accentColor}
                    />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 280,
    },
    cardBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    cardContent: {
        paddingHorizontal: 28,
        paddingTop: 32,
        paddingBottom: 48,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#1A1A1A',
        lineHeight: 42,
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 15,
        fontWeight: '400',
        color: '#555555',
        lineHeight: 22,
        marginBottom: 32,
    },
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
