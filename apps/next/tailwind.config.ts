import type { Config } from "tailwindcss";
const { createPreset } = require("fumadocs-ui/tailwind-plugin");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@uidu/web/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/web/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/web/components/core/**/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/web/components/forms/**/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/web/components/media/**/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/fumadocs-ui/dist/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        danger: {
          DEFAULT: 'var(--danger)',
        },
        default: {
          DEFAULT: 'var(--default)',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        uiduThemes: {
          red: {
            50: '#FFEBE6', 
            75: '#FFBDAD',
            100: '#FF8F73',
            200: '#FF7452' ,
            300: '#FF5630' ,
            400: '#DE350B' ,
            500: '#BF2600',
          },
          yellow: {
            50: '#FFFAE6', 
            75: '#FFF0B3',
            100: '#FFE380',
            200: '#FFC400' ,
            300: '#FFAB00',
            400: '#FF991F',
            500: '#FF8B00',
          },
          green: {
            50: '#E3FCEF', 
            75: '#ABF5D1',
            100: '#79F2C0',
            200: '#57D9A3',
            300:'#36B37E' ,
            400: '#00875A',
            500: '#006644',
          },
          blue:{
            50: '#DEEBFF', 
            75:'#B3D4FF' ,
            100: '#4C9AFF',
            200: '#2684FF',
            300: '#0065FF',
            400: '#0052CC',
            500: '#0747A6',
          },
          purple: {
            50: '#EAE6FF', 
            75: '#C0B6F2',
            100: '#998DD9',
            200: '#8777D9',
            300: '#6554C0',
            400: '#5243AA',
            500: '#403294',
          },
          teal: {
            50: '#E6FCFF', 
            75: '#B3F5FF',
            100: '#79E2F2',
            200: '#00C7E6',
            300: '#00B8D9',
            400: '#00A3BF',
            500: '#008DA6',
          },
          neutral : {
            0: '#FFFFFF',
            10: '#FAFBFC',
            20: '#F4F5F7',
            30: '#EBECF0',
            40: '#DFE1E6',
            50: '#C1C7D0', 
            60: '#B3BAC5',
            70: '#A5ADBA',
            80: '#97A0AF',
            90: '#8993A4',
            100: '#7A869A',
            200: '#6B778C',
            300: '#5E6C84',
            400: '#505F79',
            500: '#42526E',
            600: '#344563',
            700: '#253858',
            800: '#172B4D', 
            900: '#091E42'
          },
          darkNeutral :{
            900: '#E6EDFA',
            800: '#DCE5F5',
            700: '#CED9EB',
            600: '#B8C7E0',
            500: '#ABBBD6',
            400: '#9FB0CC',
            300: '#8C9CB8',
            200: '#7988A3', 
            100: '#67758F', 
            90: '#56637A',
            80: '#455166',
            70: '#3B475C',
            60: '#313D52',
            50: '#283447',
            40: '#202B3D',
            30: '#1B2638',
            20: '#121A29',
            10: '#0E1624',
            0: '#0D1424',
          }
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  presets: [
    createPreset({
      preset: "ocean",
    }),
  ],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
