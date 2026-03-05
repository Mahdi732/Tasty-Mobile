import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

interface ActionButtonProps {
    /** 'next' = circle arrow button, 'start' = pill "GET STARTED" button */
    variant: 'next' | 'start';
    onPress: () => void;
    accentColor: string;
}

/**
 * Dual-variant action button matching the reference design:
 * - Steps 1 & 2: circular button with a "›" arrow
 * - Step 3: pill-shaped "START" button
 */
export default function ActionButton({
    variant,
    onPress,
    accentColor,
}: ActionButtonProps) {
    if (variant === 'start') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[styles.pillButton, { backgroundColor: accentColor }]}
            >
                <Text style={styles.pillText}>START</Text>
            </TouchableOpacity>
        );
    }

    // 'next' variant — circle with arrow
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.circleButton, { backgroundColor: accentColor }]}
        >
            <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>›</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circleButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        // Subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '300',
        marginTop: -2, // Optical alignment
    },
    pillButton: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    pillText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 2,
    },
});
