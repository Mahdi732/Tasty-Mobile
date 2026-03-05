import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import PrimaryButton from '../../src/components/auth/PrimaryButton';
import VideoBackground from '../../src/components/onboarding/VideoBackground';

export default function AuthLandingScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* 1. Video plays immediately */}
            <View style={StyleSheet.absoluteFill}>
                <VideoBackground source={require('../../assets/login-video/loginOnboarding.mp4')} />
            </View>

            {/* 2. Overlay fades in after 800ms */}
            <Animated.View
                style={StyleSheet.absoluteFill}
                entering={FadeIn.duration(1000).delay(800)}
            >
                <LinearGradient
                    colors={[
                        'rgba(0,0,0,0.1)',
                        'rgba(0,0,0,0.4)',
                        'rgba(0,0,0,0.85)',
                    ]}
                    locations={[0, 0.4, 1]}
                    style={styles.gradient}
                />
            </Animated.View>

            <View style={styles.content}>
                {/* 3. Logo fades in from top after 1600ms */}
                <Animated.View
                    entering={FadeInUp.duration(1000).delay(1600).springify()}
                    style={styles.logoContainer}
                >
                    <FontAwesome5 name="fire" size={48} color="#FF6347" style={styles.logoIcon} />
                    <Text style={styles.logoText}>Tasty</Text>
                </Animated.View>

                <View style={styles.bottomContainer}>
                    {/* 4. Description ascends after 2200ms */}
                    <Animated.View entering={FadeInDown.duration(800).delay(2200).springify()}>
                        <Text style={styles.title}>
                            Satisfy your{'\n'}pizza cravings.
                        </Text>
                        <Text style={styles.description}>
                            Experience the ultimate pizza indulgence with our irresistible deals. Order right to your door.
                        </Text>
                    </Animated.View>

                    <View style={styles.buttonContainer}>
                        {/* 5. Login button ascends after 2600ms */}
                        <Animated.View entering={FadeInDown.duration(800).delay(2600).springify()}>
                            <PrimaryButton
                                title="Login"
                                onPress={() => router.push('/(auth)/login')}
                                variant="solid"
                                style={styles.loginBtn}
                            />
                        </Animated.View>

                        {/* 6. Register button ascends after 3000ms */}
                        <Animated.View entering={FadeInDown.duration(800).delay(3000).springify()}>
                            <PrimaryButton
                                title="Register"
                                onPress={() => router.push('/(auth)/register')}
                                variant="glass"
                            />
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 120, // push logo down from top edge
        paddingHorizontal: 28,
        paddingBottom: 48,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        marginBottom: 8,
        shadowColor: '#FF6347',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    logoText: {
        fontSize: 56,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
        fontStyle: 'italic',
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
    },
    bottomContainer: {
        width: '100%',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#FFFFFF',
        lineHeight: 42,
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
        marginBottom: 32,
        fontWeight: '400',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    loginBtn: {
        marginBottom: 0,
    },
});
