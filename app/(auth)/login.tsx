import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import AuthInput from '../../src/components/auth/AuthInput';
import PrimaryButton from '../../src/components/auth/PrimaryButton';
import SocialButton from '../../src/components/auth/SocialButton';

export default function LoginScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Background Image Header */}
            <View style={styles.headerBackground}>
                <ImageBackground
                    source={require('../../assets/login-images/login_background.jpg')}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                >
                    <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
                        <View style={styles.headerContent}>
                            <Animated.Text entering={FadeInUp.duration(600).delay(100)} style={styles.greetingText}>
                                Welcome back to
                            </Animated.Text>
                            <Animated.Text entering={FadeInUp.duration(600).delay(200)} style={styles.brandText}>
                                Tasty
                            </Animated.Text>
                        </View>
                    </BlurView>
                </ImageBackground>
            </View>

            {/* Foreground Form Card */}
            <Animated.View
                entering={FadeInDown.duration(600).springify().damping(18)}
                style={styles.formCard}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={-100} // adjust so gradient header is partially covered when keyboard shows
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formHeader}>
                            <Text style={styles.title}>Log In</Text>
                            <Text style={styles.subtitle}>Enter your details below</Text>
                        </View>

                        <View style={styles.form}>
                            <AuthInput
                                label="Email Address"
                                placeholder="mail@mail.com"
                                keyboardType="email-address"
                            />
                            <AuthInput
                                label="Password"
                                placeholder="Enter password"
                                isPassword
                            />

                            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <PrimaryButton
                                title="Log In"
                                onPress={() => { }} // Placeholder action
                                variant="solid"
                                style={styles.loginBtn}
                            />
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialContainer}>
                            <SocialButton provider="google" onPress={() => { }} />
                            <SocialButton provider="apple" onPress={() => { }} />
                            <SocialButton provider="facebook" onPress={() => { }} />
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.7}>
                                <Text style={styles.footerLink}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%', // Takes up top 40%
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingTop: 40,
    },
    greetingText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    brandText: {
        fontSize: 48,
        color: '#FFFFFF',
        fontWeight: '900',
        letterSpacing: -1,
        fontStyle: 'italic',
    },
    formCard: {
        flex: 1,
        marginTop: '30%', // Overlaps the header slightly
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // Sharp crisp shadow upward
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 20,
        overflow: 'hidden',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 32,
        paddingTop: 40,
        paddingBottom: 50,
    },
    formHeader: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#808080',
        fontWeight: '400',
    },
    form: {
        marginBottom: 24,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
        marginTop: -8,
    },
    forgotPasswordText: {
        color: '#FF6347',
        fontSize: 14,
        fontWeight: '600',
    },
    loginBtn: {
        marginTop: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    dividerText: {
        paddingHorizontal: 16,
        color: '#808080',
        fontSize: 14,
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 32,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    footerText: {
        color: '#808080',
        fontSize: 15,
    },
    footerLink: {
        color: '#FF6347',
        fontSize: 15,
        fontWeight: '700',
    },
});
