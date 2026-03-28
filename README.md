3D Dog — Interactive 3D Web Experience
A visually immersive, scroll-driven 3D web experience built with React, Three.js, and GSAP. Inspired by the Dogstudio creative studio aesthetic, the project features an animated 3D dog model that reacts to scrolling and hovering, set against a dynamic background with smooth material transitions.

What It Does

A 3D animated dog model is rendered at the center of the screen using WebGL
As the user scrolls, the dog moves, rotates, and repositions using a GSAP scroll-driven timeline
Hovering over project titles in the second section changes the dog's matcap material with a smooth shader transition effect
Each project title also swaps the background image with a full-screen crossfade
The overall layout has three sections: a hero, a project showcase, and a closing section


Tech Stack
Tool                Purpose
React + Vite        UI framework and build tooling
Three.js            3D rendering engine
@react-three/fiber  React renderer for Three.js
@react-three/drei   Helpers: model loading, textures, animations, orbit controls
GSAP+ScrollTrigger  Scroll-based animations and material transitions
@gsap/react         React integration for GSAP

Getting Started
bash# Install dependencies
cd 3D-Dog
npm install

# Run locally
npm run dev

# Build for production
npm run build
