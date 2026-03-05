import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    TextInputProps,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface AuthInputProps extends TextInputProps {
    label: string;
    error?: string;
    isPassword?: boolean;
}

export default function AuthInput({
    label,
    error,
    isPassword,
    style,
    ...rest
}: AuthInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(isPassword);

    // 0 = unfocused, 1 = focused
    const focusProgress = useSharedValue(0);

    const handleFocus = () => {
        setIsFocused(true);
        focusProgress.value = withTiming(1, { duration: 250 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        focusProgress.value = withTiming(0, { duration: 250 });
    };

    const animatedContainerStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            focusProgress.value,
            [0, 1],
            ['transparent', '#FF6347']
        );
        const backgroundColor = interpolateColor(
            focusProgress.value,
            [0, 1],
            ['#F5F5F8', '#FFFFFF']
        );

        return {
            borderColor: error ? '#FF3B30' : borderColor,
            backgroundColor,
        };
    });

    return (
        <View style={[styles.wrapper, style]}>
            <Text style={styles.label}>{label}</Text>

            <Animated.View style={[styles.inputContainer, animatedContainerStyle]}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#A0A0A0"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    selectionColor="#FF6347"
                    {...rest}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        style={styles.iconContainer}
                        activeOpacity={0.7}
                    >
                        <Feather
                            name={isSecure ? 'eye-off' : 'eye'}
                            size={20}
                            color={isFocused ? '#FF6347' : '#A0A0A0'}
                        />
                    </TouchableOpacity>
                )}
            </Animated.View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        color: '#333333',
        marginBottom: 8,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        // Soft inner shadow could be added via an image or specific library, 
        // but a solid tinted background is standard premium practice.
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    iconContainer: {
        padding: 4,
        marginLeft: 8,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 6,
        fontWeight: '500',
    },
});
