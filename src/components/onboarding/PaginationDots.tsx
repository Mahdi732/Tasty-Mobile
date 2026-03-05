import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';

interface PaginationDotsProps {
    totalSteps: number;
    currentStep: number;
    activeColor: string;
}

/**
 * Horizontal dot indicators — active dot is wider and colored,
 * inactive dots are small circles. Matches the reference image.
 */
export default function PaginationDots({
    totalSteps,
    currentStep,
    activeColor,
}: PaginationDotsProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }, (_, index) => (
                <Dot
                    key={index}
                    isActive={index === currentStep}
                    activeColor={activeColor}
                />
            ))}
        </View>
    );
}

function Dot({
    isActive,
    activeColor,
}: {
    isActive: boolean;
    activeColor: string;
}) {
    const animatedStyle = useAnimatedStyle(() => ({
        width: withTiming(isActive ? 28 : 10, {
            duration: 300,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        backgroundColor: withTiming(isActive ? activeColor : '#C0C0C0', {
            duration: 300,
        }),
        opacity: withTiming(isActive ? 1 : 0.5, { duration: 300 }),
    }));

    return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        height: 10,
        borderRadius: 5,
    },
});
