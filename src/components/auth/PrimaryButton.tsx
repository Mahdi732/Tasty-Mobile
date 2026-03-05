import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    Pressable,
    View,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'solid' | 'glass';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PrimaryButton({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
    variant = 'solid',
}: PrimaryButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    };

    const renderContent = () => (
        <>
            {isLoading ? (
                <ActivityIndicator color={variant === 'solid' ? '#FFFFFF' : '#FFFFFF'} />
            ) : (
                <Animated.Text style={[styles.text, textStyle]}>
                    {title}
                </Animated.Text>
            )}
        </>
    );

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || isLoading}
            style={[
                styles.container,
                (disabled || isLoading) && styles.disabled,
                style,
                animatedStyle,
            ]}
        >
            {variant === 'solid' ? (
                <LinearGradient
                    colors={['#FF6347', '#E63900']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.background}
                >
                    {renderContent()}
                </LinearGradient>
            ) : (
                <View style={styles.glassContainer}>
                    <BlurView intensity={30} tint="light" style={styles.background}>
                        {renderContent()}
                    </BlurView>
                </View>
            )}
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        overflow: 'hidden',
        // Soft outer shadow for the button container
        shadowColor: '#FF6347',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    glassContainer: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
