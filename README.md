# 🧬 3D DNA Bioinformatics & AI Personal Portfolio

A cinematic, futuristic **3D personal profile and portfolio website** built around a giant, procedurally generated **3D DNA Double Helix** engine.

---

## ✨ Features & Architecture

- **Procedural 3D DNA Double Helix Engine**: Dual sugar-phosphate backbones, color-coded A-T and G-C base pairs, hydrogen bond bridges, and dynamic bioluminescent pulse waves powered by **Three.js**.
- **Cinematic Scroll-Driven Camera Spline**: The camera swoops and orbits through the 3D double helix across 9 interconnected journey sections powered by **Lenis Smooth Scroll** and **GSAP ScrollTrigger**.
- **Futuristic Glassmorphic Interface**: Dark obsidian surfaces, 1px cyan/purple neon borders, scanlines, and rotating holographic avatar reticle.
- **Synthesized Sci-Fi Audio Ambience**: Procedural Web Audio API sound synthesizer providing interactive clicks, hover blips, and activation chimes (zero external audio files needed).
- **Live DNA Sequence Stream Ticker**: Real-time nucleotide stream and scroll depth telemetry in the top HUD.
- **Interactive Project Modal & 1-Click Email Copy**: Smooth modal views with key performance metrics and quick clipboard copy.
- **100% Configurable**: All personal details, images, skills, projects, and links are located in `src/data/portfolioData.js`.

---

## 📂 Project Structure

```
├── index.html                   # Master HTML shell & glassmorphism layout
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Cyberpunk & bioinformatics color palettes
├── src/
│   ├── data/
│   │   └── portfolioData.js     # 👈 EDIT YOUR PLACEHOLDERS & INFO HERE
│   ├── three/
│   │   ├── dnaHelix.js          # Procedural 3D DNA double helix generator
│   │   ├── particleSystem.js    # Bioluminescent molecular dust & cyber grids
│   │   ├── cameraController.js  # 3D Catmull-Rom camera spline & mouse parallax
│   │   └── sceneManager.js      # Three.js renderer, lighting & render loop
│   ├── components/
│   │   ├── hud.js               # HUD telemetry, live ticker, and waypoints
│   │   └── soundEffects.js      # Web Audio procedural sound synthesizer
│   ├── styles/
│   │   └── main.css             # Glassmorphism, reticle rings & glow effects
│   └── main.js                  # App bootstrap, Lenis, and GSAP ScrollTrigger
```

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, ready to deploy to Netlify, Vercel, GitHub Pages, or Firebase Hosting.

---

## ✏️ Customizing Your Information

Open `src/data/portfolioData.js` to customize:
- `hero.name` (`[MY NAME]`)
- `hero.title` (`[MY PROFESSIONAL TITLE]`)
- `hero.photoUrl` (`[MY PHOTO]`)
- `hero.introText` (`[SHORT INTRO]`)
- `about.bioParagraphs` (`[ABOUT ME TEXT]`)
- `studies.degree` (`[CURRENT DEGREE]`)
- `studies.institution` (`[UNIVERSITY / INSTITUTION]`)
- `skills.categories` (`[SKILLS]`)
- `projects` (`[PROJECTS]`)
- `certifications` (`[CERTIFICATES]`)
- `achievements` (`[ACHIEVEMENTS]`)
- `journey` (`[LEARNING MILESTONES]`)
- `contact.email` (`[EMAIL]`)
- `contact.linkedin` (`[LINKEDIN URL]`)
- `contact.github` (`[GITHUB URL]`)
