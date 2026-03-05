import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, ResizeMode, AVPlaybackSource } from 'expo-av';

interface VideoBackgroundProps {
    source: AVPlaybackSource;
}

/**
 * Full-screen looping muted video background.
 * Optimized to not block the UI thread — video plays natively.
 */
export default function VideoBackground({ source }: VideoBackgroundProps) {
    const videoRef = useRef<Video>(null);

    useEffect(() => {
        // Ensure video plays when source changes
        videoRef.current?.playAsync();
    }, [source]);

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={source}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
                // Prevent video from pausing on background — reduce re-mount lag
                useNativeControls={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    video: {
        flex: 1,
    },
});
