import { AVPlaybackSource } from 'expo-av';

export interface OnboardingStep {
    id: number;
    title: string;
    description: string;
    videoSource: AVPlaybackSource;
    accentColor: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
    {
        id: 0,
        title: 'Discover Gourmet\nFlavors',
        description:
            'Explore a curated world of culinary excellence — from hidden gems to Michelin-starred restaurants, all at your fingertips.',
        videoSource: require('../../assets/videos/step1_discovery.mp4'),
        accentColor: '#2B6B5A', // Earthy green
    },
    {
        id: 1,
        title: 'Fast Delivery &\nTable Reservations',
        description:
            'We collaborate with top-tier restaurants to bring gourmet meals to your door — or reserve the perfect table in seconds.',
        videoSource: require('../../assets/videos/step2_service.mp4'),
        accentColor: '#1A7A8A', // Teal
    },
    {
        id: 2,
        title: 'Your Privacy\nMatters',
        description:
            'Your data is encrypted end-to-end. We never sell your information. Dine with confidence knowing your privacy is our priority.',
        videoSource: require('../../assets/videos/step3_trust.mp4'),
        accentColor: '#D4845A', // Warm terracotta
    },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;
