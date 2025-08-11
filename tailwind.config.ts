import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
         corporate: {
          50: "#f5f7fa",
          100: "#ebeef3",
          200: "#d2dae5",
          300: "#adbace",
          400: "#8295b2",
          500: "#637999",
          600: "#4f6282",
          700: "#41506a",
          800: "#384459",
          900: "#323c4d",
          950: "#1f2533",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Notion-inspired corporate color palette
        brand: {
          50: "#f7f7f5",
          100: "#eeeeeb",
          200: "#ddddd6",
          300: "#c8c7bd",
          400: "#b0aea0",
          500: "#37352f", // Notion's primary dark color
          600: "#2f2d26",
          700: "#25241e",
          800: "#1c1b16",
          900: "#16150f",
          950: "#0d0c08",
        },
        // Clean neutral grays (Notion style)
        neutral: {
          25: "#fdfdfc",
          50: "#fbfbfa",
          100: "#f7f6f3",
          200: "#f1f1ee",
          300: "#e9e9e6",
          400: "#d9d9d6",
          500: "#9b9a97",
          600: "#787774",
          700: "#5e5d5a",
          800: "#37352f",
          900: "#2f2d26",
          950: "#1c1b16",
        },
        // Corporate status colors (no yellow)
        // success: {
        //   50: "#f0fdf4",
        //   500: "#22c55e",
        //   600: "#16a34a",
        // },
        // warning: {
        //   50: "#fff7ed",
        //   500: "#f97316", // Orange instead of yellow
        //   600: "#ea580c",
        // },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
        // Professional auction status colors (no yellow)
        auction: {
          active: "#22c55e", // Green for active/live auctions
          scheduled: "#3b82f6", // Blue for scheduled
          draft: "#6366f1", // Indigo for draft
          ended: "#6b7280", // Gray for ended
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
         "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-up": {
          "0%": {
            transform: "translateY(10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "confetti-fall": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
         confetti: "confetti-fall 4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        // "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        "slide-up": "slide-up 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        // "slide-down": "slide-down 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
