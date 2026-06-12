# Screen Tester & Calibration Suite

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

An interactive, high-fidelity display panel diagnostics and calibration application built with **Vue 3**, **Vite**, and **Express SSR** (Server-Side Rendering). This utility allows users to test screens of mobile devices, laptops, tablets, and desktop displays for physical defects, panel degradation, color accuracy, and motion response.

---

## 🎨 Design Theme & Interface
- **Premium Aesthetics**: Fully dark-mode design utilizing glassmorphism styling (`backdrop-filter: blur()`), glowing accents, and smooth hover micro-animations.
- **Unified Global Assets**: Fonts (Outfit & Poppins) and Bootstrap Icons loaded globally to optimize client performance.
- **Immersive Viewport Diagnostics**: Fullscreen toggle controls allow taking over the entire panel space to test every single pixel without scrollbars or menu overlays.

---

## 🛠️ Diagnostics Suite (10 Core Tests)

1. **Touch Sensitivity Test**: Draw on a high-precision canvas grid (useful for smartphones/tablets). Diagnostic blocks turn green when touched to check for digitizer dead zones.
2. **RGB Color Test**: Cycle full-screen primary solid fields (Red, Green, Blue, White, Black) to check for tint issues or panel discoloration.
3. **Dead Pixel Test**: Multi-color cycle (8 profiles) with a toggleable **1px calibration grid** overlay to isolate defective or stuck subpixels.
4. **Uniformity Test**: Inspect backlight bleed and "dirty screen effect" (DSE) by displaying solid fields of 100%, 80%, 50%, 20%, and 0% gray.
5. **Color Distances Test**: A gamified color-discrimination grid that gets progressively harder as shade deltas shrink.
6. **Gradients Test**: Render smooth spectrum arrays (radial, vertical, horizontal). Features a toggle to simulate **8-Bit banding** vs **10-Bit smoothness**.
7. **Sharpness Test**: Alternate 1px vertical/horizontal lines and a Snellen font size scale (7px to 18px) to inspect panel convergence and scaling artifacts.
8. **Viewing Angle Test**: High-contrast gradient grids with an animated tilt-calibration indicator to check panel color shift.
9. **Gamma Estimation Test**: Alternating horizontal 1px stripes alongside a luminance-adjustable slider square.
10. **Response Time & Ghosting**: High frame-rate moving saucer (UFO) animation driven by `requestAnimationFrame` to evaluate display trailing, ghosting, and overdrive artifacts.

---

## 🚀 Installation & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch SSR Development Server
Runs Vite in middleware mode inside Express. Includes Hot Module Replacement (HMR) and server-side rendering on page load:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Builds & Deployment

This project compiles separate client assets and server bundles to enable production Server-Side Rendering.

### 1. Compile Client & Server Bundles
```bash
npm run build
```
- Client bundles are compiled into `dist/client`.
- Server entry points are compiled into `dist/server`.

### 2. Execute SSR Server in Production Mode
```bash
npm run serve
```
The Express server will serve static client assets and dynamically pre-render server-side HTML.

### 3. Deploying to Vercel (SSR Mode)
This project is configured for serverless deployment on **Vercel** via the `vercel.json` configuration.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the CLI prompt to link the project. Vercel will automatically run `npm run build` and deploy the Express application as a serverless function with static routing optimized for Vite's client assets.


---

## 📁 Repository Structure
```text
├── public/
│   ├── robots.txt         # Crawler exclusions
│   ├── sitemap.xml        # SEO Page mapping
│   └── vite.svg           # Logo icon
├── src/
│   ├── assets/            # Global svg icons
│   ├── components/        # Isolated Vue test components
│   ├── locales/           # Localization JSON definitions
│   ├── entry-client.js    # Client hydration script
│   ├── entry-server.js    # Server pre-rendering function
│   ├── main.js            # Universal Vue instance factory
│   ├── style.css          # Core CSS variables & glass system
│   └── App.vue            # Layout shell and test sequencer
├── server.js              # Express SSR Node server
├── vite.config.js         # Vite configuration
└── package.json           # Scripts & modules
```
