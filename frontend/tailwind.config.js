/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [
        require('daisyui'),
    ],
}
