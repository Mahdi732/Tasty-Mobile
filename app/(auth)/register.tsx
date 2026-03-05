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

export default function RegisterScreen() {
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
                                Join the
                            </Animated.Text>
                            <Animated.Text entering={FadeInUp.duration(600).delay(200)} style={styles.brandText}>
                                Tasty Family
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
                    keyboardVerticalOffset={-80}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formHeader}>
                            <Text style={styles.title}>Register</Text>
                            <Text style={styles.subtitle}>Create your new account</Text>
                        </View>

                        <View style={styles.form}>
                            <AuthInput
                                label="Full Name"
                                placeholder="John Doe"
                                autoCapitalize="words"
                            />
                            <AuthInput
                                label="Email Address"
                                placeholder="mail@mail.com"
                                keyboardType="email-address"
                            />
                            <AuthInput
                                label="Create Password"
                                placeholder="Enter password"
                                isPassword
                            />

                            <View style={styles.termsContainer}>
                                <Text style={styles.termsText}>
                                    By creating an account, you agree to our{' '}
                                    <Text style={styles.termsHighlight}>Terms of Service</Text> and{' '}
                                    <Text style={styles.termsHighlight}>Privacy Policy</Text>.
                                </Text>
                            </View>

                            <PrimaryButton
                                title="Create Account"
                                onPress={() => { }} // Placeholder action
                                variant="solid"
                                style={styles.registerBtn}
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
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
                                <Text style={styles.footerLink}>Log In</Text>
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
        color: '#FF6347',
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
        marginBottom: 24,
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
    termsContainer: {
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    termsText: {
        fontSize: 12,
        color: '#808080',
        lineHeight: 18,
    },
    termsHighlight: {
        color: '#FF6347',
        fontWeight: '600',
    },
    registerBtn: {
        marginTop: 8,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
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
