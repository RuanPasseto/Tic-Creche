import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.tsx'
  ],
  safelist: ['home-page'], 

  theme: {
    extend: {
      
    },
  },
  plugins: [],
}
export default config
