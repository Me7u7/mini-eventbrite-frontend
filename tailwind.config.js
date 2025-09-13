/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'media',
    theme: {
    extend: {
        colors: {
        brand: {
            DEFAULT: '#540000ff',
            light: '#e80000ff',
            dark: '#af4040ff'
        },
        bg: {
            light: '#ffffff',
            dark: '#00171f'
        },
        text: {
            light: '#0f172a',
            dark: '#e2e8f0'
        }
        },
        boxShadow: {
        soft: '0 8px 24px rgba(2, 6, 23, 0.08)'
        },
        borderRadius: {
        xl2: '1.25rem'
        }
    }
    },
    plugins: []
}