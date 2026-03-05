import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

interface SocialButtonProps {
    provider: 'facebook' | 'google' | 'apple';
    onPress: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SocialButton({
    provider,
    onPress,
}: SocialButtonProps) {
    const scale = useSharedValue(1);

    const getIconConfig = () => {
        switch (provider) {
            case 'facebook':
                return { name: 'facebook-f', color: '#1877F2' };
            case 'google':
                return { name: 'google', color: '#DB4437' };
            case 'apple':
                return { name: 'apple', color: '#000000' };
        }
    };

    const { name, color } = getIconConfig();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <AnimatedTouchable
            style={[styles.button, animatedStyle]}
            onPress={onPress}
            onPressIn={() => (scale.value = withSpring(0.9, { damping: 15 }))}
            onPressOut={() => (scale.value = withSpring(1, { damping: 15 }))}
            activeOpacity={0.9}
        >
            <FontAwesome5 name={name} size={22} color={color} brand={provider !== 'apple'} />
        </AnimatedTouchable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30, // Perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        // Elegant soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
});
