/**
 * TastySplashScreen.tsx
 *
 * Animated splash screen for the "Tasty" brand.
 * Uses React Native's built-in Animated API with useNativeDriver: true.
 *
 * Animation flow:
 *  1. "Tasty" title scales + fades in from the centre.
 *  2. Food emoji icons spawn off every screen edge simultaneously.
 *  3. They converge toward the centre, easing to a stop in a ring around the title.
 *  4. Each icon enters an infinite idle-float animation.
 *  5. `onComplete` fires ~800 ms after all icons have settled.
 */

import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: SW, height: SH } = Dimensions.get('window');
const CX = SW / 2; // screen centre X
const CY = SH / 2; // screen centre Y

const COLORS = {
    bg: '#F6F4E8',  // warm cream
    red: '#B9000D', // deep brand red
};

const FOOD_GLYPHS = [
    '🍔', '🍕', '🍗', '🥤', '🌮', '🍟',
    '🌯', '🥪', '🍱', '🍣', '🧆', '🥗',
];

const ICON_COUNT = 22;
const R_MIN = 90;  // min settle radius from centre (px)
const R_MAX = 160; // max settle radius from centre (px)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

/** Returns a start offset (from screen centre) just off one of the four edges */
function edgeOffset(): { x: number; y: number } {
    const m = 80; // margin beyond the edge
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
        case 0: return { x: rand(-CX, CX), y: -CY - m };       // top
        case 1: return { x: CX + m, y: rand(-CY, CY) };         // right
        case 2: return { x: rand(-CX, CX), y: CY + m };         // bottom
        default: return { x: -CX - m, y: rand(-CY, CY) };      // left
    }
}

/** Returns a settle offset (from screen centre) inside the ring */
function ringOffset(): { x: number; y: number } {
    const angle = rand(0, Math.PI * 2);
    const r = rand(R_MIN, R_MAX);
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
}

// ─── Icon Data ────────────────────────────────────────────────────────────────

interface IconData {
    id: number;
    glyph: string;
    // Offsets from screen centre
    startX: number; startY: number;
    endX: number; endY: number;
    delay: number;    // stagger delay (ms)
    duration: number; // convergence duration (ms)
    spinDeg: number;  // degrees rotated during travel
    size: number;     // font size (px)
    floatDuration: number; // idle float cycle duration
}

/** Built once at module level so icons are stable across renders */
const ICONS: IconData[] = Array.from({ length: ICON_COUNT }, (_, i) => {
    const start = edgeOffset();
    const end = ringOffset();
    return {
        id: i,
        glyph: FOOD_GLYPHS[i % FOOD_GLYPHS.length],
        startX: start.x, startY: start.y,
        endX: end.x, endY: end.y,
        delay: rand(0, 500),
        duration: rand(950, 1650),
        spinDeg: rand(-270, 270),
        size: rand(20, 34),
        floatDuration: rand(1400, 2200),
    };
});

// ─── FloatingIcon ─────────────────────────────────────────────────────────────

interface FloatingIconProps {
    icon: IconData;
    onDone: () => void;
}

function FloatingIcon({ icon, onDone }: FloatingIconProps) {
    const txAnim = useRef(new Animated.Value(icon.startX)).current;
    const tyAnim = useRef(new Animated.Value(icon.startY)).current;
    const opAnim = useRef(new Animated.Value(0)).current;
    const rotAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const convergence = Animated.sequence([
            Animated.delay(icon.delay),
            Animated.parallel([
                // Fade in quickly at start
                Animated.timing(opAnim, {
                    toValue: 1, duration: 300,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                // Slide to settle position, ease-out cubic
                Animated.timing(txAnim, {
                    toValue: icon.endX, duration: icon.duration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(tyAnim, {
                    toValue: icon.endY, duration: icon.duration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                // Spin during travel
                Animated.timing(rotAnim, {
                    toValue: 1, duration: icon.duration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]),
        ]);

        convergence.start(({ finished }) => {
            if (!finished) return;
            onDone();

            // Continuous slow float after landing
            Animated.loop(
                Animated.sequence([
                    Animated.timing(tyAnim, {
                        toValue: icon.endY - 8,
                        duration: icon.floatDuration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(tyAnim, {
                        toValue: icon.endY + 8,
                        duration: icon.floatDuration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });

        return () => convergence.stop();
        // Icons are stable, so this only runs once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rotate = rotAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${icon.spinDeg}deg`],
    });

    return (
        <Animated.Text
            style={{
                position: 'absolute',
                // Anchored to screen centre; translations move it relative to that
                top: CY - icon.size / 2,
                left: CX - icon.size / 2,
                fontSize: icon.size,
                opacity: opAnim,
                transform: [
                    { translateX: txAnim },
                    { translateY: tyAnim },
                    { rotate },
                ],
            }}
        >
            {icon.glyph}
        </Animated.Text>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
    onComplete?: () => void;
}

export default function TastySplashScreen({ onComplete }: Props) {
    const convergedCount = useRef(0);

    // Title entrance
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleScale = useRef(new Animated.Value(0.7)).current;
    // Tagline entrance
    const taglineOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Title: scale-up + fade-in with a gentle back-ease
        Animated.sequence([
            Animated.delay(150),
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1, duration: 750,
                    easing: Easing.out(Easing.back(1.4)),
                    useNativeDriver: true,
                }),
                Animated.timing(titleScale, {
                    toValue: 1, duration: 750,
                    easing: Easing.out(Easing.back(1.4)),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        // Tagline: delayed simple fade-in
        Animated.sequence([
            Animated.delay(700),
            Animated.timing(taglineOpacity, {
                toValue: 1, duration: 600,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    }, [titleOpacity, titleScale, taglineOpacity]);

    const handleIconDone = () => {
        convergedCount.current += 1;
        if (convergedCount.current === ICON_COUNT) {
            setTimeout(() => onComplete?.(), 800);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

            {/* ── Icon layer (behind title) ── */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {ICONS.map((icon) => (
                    <FloatingIcon key={icon.id} icon={icon} onDone={handleIconDone} />
                ))}
            </View>

            {/* ── Brand title ── */}
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.titleBlock,
                    {
                        opacity: titleOpacity,
                        transform: [{ scale: titleScale }],
                    },
                ]}
            >
                {/* Top bar */}
                <View style={styles.decorBar} />

                <Text style={styles.brandName}>Tasty</Text>

                {/* Dot trio */}
                <View style={styles.dotRow}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, { opacity: 0.5 }]} />
                    <View style={[styles.dot, { opacity: 0.25 }]} />
                </View>

                {/* Bottom bar */}
                <View style={styles.decorBar} />
            </Animated.View>

            {/* ── Tagline ── */}
            <Animated.Text
                pointerEvents="none"
                style={[styles.tagline, { opacity: taglineOpacity }]}
            >
                DISCOVER · ORDER · ENJOY
            </Animated.Text>
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBlock: {
        alignItems: 'center',
        gap: 10,
    },
    decorBar: {
        width: 52,
        height: 2.5,
        backgroundColor: COLORS.red,
        borderRadius: 2,
    },
    brandName: {
        fontSize: 96,
        fontWeight: '900',
        // Bold serif font — Georgia on iOS, system serif on Android
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        color: COLORS.red,
        letterSpacing: -3,
        lineHeight: 104,
        // Depth shadow
        textShadowColor: 'rgba(185,0,13,0.2)',
        textShadowOffset: { width: 3, height: 5 },
        textShadowRadius: 10,
    },
    dotRow: {
        flexDirection: 'row',
        gap: 7,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: COLORS.red,
    },
    tagline: {
        marginTop: 16,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 4,
        color: COLORS.red,
        opacity: 0.7,
    },
});
