import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './data/**/*.{ts,tsx}',
        './hooks/**/*.{ts,tsx}',
        './lib/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            boxShadow: {
                glow: '0 20px 80px rgba(232, 190, 165, 0.18)'
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -16px, 0)' }
                },
                drift: {
                    '0%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
                    '100%': { transform: 'translate3d(0, -24px, 0) rotate(8deg)' }
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.55' },
                    '50%': { opacity: '1' }
                }
            },
            animation: {
                float: 'float 7s ease-in-out infinite',
                drift: 'drift 14s linear infinite',
                pulseGlow: 'pulseGlow 5s ease-in-out infinite'
            }
        }
    },
    plugins: []
};

export default config;