/**
 * Escuela de Fútbol Lucmar de Huachipa - 3D Scroll Experience
 * Three.js + GSAP ScrollTrigger powered interactive 3D background
 */

(function() {
    'use strict';

    // ========================================
    // THREE.JS 3D SCENE SETUP
    // ========================================

    let scene, camera, renderer, composer;
    let shieldObject, ballObject, particles = [];
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    let currentSection = 'hero';
    let isInitialized = false;
    let animationId = null;

    // Section references for scroll triggers
    const sections = {
        hero: document.getElementById('hero'),
        programas: document.getElementById('programas'),
        logo3d: document.getElementById('logo-3d-section'),
        uniforme: document.getElementById('uniforme'),
        contacto: document.getElementById('contacto')
    };

    // Color palette matching CSS
    const COLORS = {
        gold: 0xFFF200,
        goldDark: 0xD4C400,
        green: 0x00FF00,
        greenDark: 0x00CC00,
        cyan: 0x00A2E8,
        dark: 0x070D1E,
        darkLight: 0x0A1428,
        white: 0xFFFFFF
    };

    /**
     * Initialize Three.js scene
     */
    function initThreeJS() {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) return;

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(COLORS.dark, 0.0015);

        // Camera
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 8);

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = false; // Disabled - using glowing materials instead

        // Lights
        setupLights();

        // Create 3D Objects
        createShieldObject();
        createBallObject();
        createParticles();

        // Handle resize
        window.addEventListener('resize', onWindowResize, { passive: true });

        // Mouse parallax
        document.addEventListener('mousemove', onMouseMove, { passive: true });

        // Start render loop
        animate();

        isInitialized = true;
    }

    /**
     * Setup scene lighting
     */
    function setupLights() {
        // Ambient light
        const ambient = new THREE.AmbientLight(COLORS.white, 0.4);
        scene.add(ambient);

        // Main directional light (sun-like) - NO SHADOWS
        const mainLight = new THREE.DirectionalLight(COLORS.gold, 1.2);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = false;
        scene.add(mainLight);

        // Green accent light
        const greenLight = new THREE.PointLight(COLORS.green, 0.8, 30);
        greenLight.position.set(-5, 0, 5);
        greenLight.castShadow = false;
        scene.add(greenLight);

        // Cyan accent light
        const cyanLight = new THREE.PointLight(COLORS.cyan, 0.6, 25);
        cyanLight.position.set(5, -3, -5);
        cyanLight.castShadow = false;
        scene.add(cyanLight);

        // Rim light for edge highlight
        const rimLight = new THREE.DirectionalLight(COLORS.gold, 0.4);
        rimLight.position.set(-3, -5, -8);
        rimLight.castShadow = false;
        scene.add(rimLight);

        // Store references for animation
        scene.userData.lights = {
            main: mainLight,
            green: greenLight,
            cyan: cyanLight,
            rim: rimLight
        };
    }

    /**
     * Create the Lucmar Shield 3D Object
     */
    function createShieldObject() {
        const group = new THREE.Group();
        group.name = 'shield';

        // Shield shape - using a custom geometry
        const shieldShape = new THREE.Shape();
        const width = 1.8;
        const height = 2.2;
        const curveHeight = height * 0.4;

        shieldShape.moveTo(0, -height/2);
        shieldShape.bezierCurveTo(width/2, -height/2, width/2, -height/4, width/2, 0);
        shieldShape.bezierCurveTo(width/2, height/2 - curveHeight, 0, height/2, 0, height/2);
        shieldShape.bezierCurveTo(0, height/2, -width/2, height/2 - curveHeight, -width/2, 0);
        shieldShape.bezierCurveTo(-width/2, -height/4, -width/2, -height/2, 0, -height/2);

        const extrudeSettings = {
            depth: 0.15,
            bevelEnabled: true,
            bevelSegments: 8,
            bevelSize: 0.05,
            bevelThickness: 0.05
        };

        const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
        shieldGeometry.center();

        // Shield materials - BRIGHT GLOWING VERSION (no black solid)
        const shieldMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x0A1428,  // Dark blue base
            metalness: 0.3,
            roughness: 0.4,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.85,
            depthWrite: true
        });

        const goldMaterial = new THREE.MeshPhysicalMaterial({
            color: COLORS.gold,
            metalness: 1,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0,
            emissive: COLORS.gold,
            emissiveIntensity: 0.3
        });

        const greenMaterial = new THREE.MeshPhysicalMaterial({
            color: COLORS.green,
            metalness: 0.5,
            roughness: 0.3,
            emissive: COLORS.green,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9,
            depthWrite: true
        });

        // Main shield body - NO SHADOWS (was causing black mask)
        const shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
        shieldMesh.castShadow = false;
        shieldMesh.receiveShadow = false;
        group.add(shieldMesh);

        // Inner shield (gold border) - glowing
        const innerGeometry = shieldGeometry.clone();
        innerGeometry.scale(0.92, 0.92, 1);
        const innerMesh = new THREE.Mesh(innerGeometry, goldMaterial);
        innerMesh.position.z = 0.08;
        innerMesh.castShadow = false;
        group.add(innerMesh);

        // Central circle (ball area) - subtle
        const circleGeo = new THREE.CircleGeometry(0.45, 32);
        const circleMat = new THREE.MeshPhysicalMaterial({
            color: 0x0A1428,
            metalness: 0.3,
            roughness: 0.4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6,
            depthWrite: true
        });
        const circleMesh = new THREE.Mesh(circleGeo, circleMat);
        circleMesh.position.z = 0.15;
        circleMesh.castShadow = false;
        circleMesh.receiveShadow = false;
        group.add(circleMesh);

        // "LUCMAR" text representation - gold bars
        const textGroup = new THREE.Group();
        const barGeo = new THREE.BoxGeometry(1.2, 0.12, 0.05);
        const barMat = goldMaterial.clone();
        
        ['L', 'U', 'C', 'M', 'A', 'R'].forEach((char, i) => {
            const bar = new THREE.Mesh(barGeo, barMat);
            bar.position.y = 0.35 - i * 0.18;
            bar.position.z = 0.2;
            bar.castShadow = false;
            textGroup.add(bar);
        });
        group.add(textGroup);

        // "HUACHIPA" - smaller green bars
        const smallBarGeo = new THREE.BoxGeometry(1.4, 0.08, 0.04);
        const smallBarMat = greenMaterial.clone();
        
        ['H', 'U', 'A', 'C', 'H', 'I', 'P', 'A'].forEach((char, i) => {
            const bar = new THREE.Mesh(smallBarGeo, smallBarMat);
            bar.position.y = -0.55 - i * 0.14;
            bar.position.z = 0.2;
            bar.castShadow = false;
            textGroup.add(bar);
        });

        // Stars on top
        for (let i = 0; i < 3; i++) {
            const starGeo = new THREE.TetrahedronGeometry(0.08, 1);
            const starMat = goldMaterial.clone();
            const star = new THREE.Mesh(starGeo, starMat);
            star.position.set((i - 1) * 0.3, 0.9, 0.2);
            star.rotation.z = Math.PI / 4;
            star.castShadow = false;
            group.add(star);
        }

        // Add glow outline around shield
        const outlineGeo = shieldGeometry.clone();
        outlineGeo.scale(1.05, 1.05, 1.1);
        const outlineMat = new THREE.MeshBasicMaterial({
            color: COLORS.gold,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
            depthWrite: false
        });
        const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
        group.add(outlineMesh);

        // Initial position - Hero section (center-right)
        group.position.set(2.5, 0.5, 0);
        group.rotation.y = -0.3;
        group.scale.setScalar(1);

        group.userData = {
            basePosition: new THREE.Vector3(2.5, 0.5, 0),
            baseRotation: new THREE.Euler(0, -0.3, 0),
            baseScale: 1,
            outlineMesh: outlineMesh
        };

        scene.add(group);
        shieldObject = group;
    }

    /**
     * Create a Football/Soccer Ball as secondary object
     */
    function createBallObject() {
        const group = new THREE.Group();
        group.name = 'ball';

        // Ball geometry - soccer ball style
        const radius = 0.5;
        const detail = 2;
        const ballGeo = new THREE.IcosahedronGeometry(radius, detail);
        
        // White material for ball
        const whiteMat = new THREE.MeshPhysicalMaterial({
            color: 0xFFFFFF,
            metalness: 0.1,
            roughness: 0.8,
            clearcoat: 0.5,
            clearcoatRoughness: 0.3
        });

        // Black pentagon material
        const blackMat = new THREE.MeshPhysicalMaterial({
            color: 0x111111,
            metalness: 0.1,
            roughness: 0.9
        });

        // Create multi-material ball (approximate soccer ball pattern)
        const ballMesh = new THREE.Mesh(ballGeo, whiteMat);
        ballMesh.castShadow = false;
        ballMesh.receiveShadow = false;
        group.add(ballMesh);

        // Glowing outline
        const outlineGeo = new THREE.SphereGeometry(radius * 1.05, 32, 32);
        const outlineMat = new THREE.MeshBasicMaterial({
            color: COLORS.gold,
            transparent: true,
            opacity: 0.2,
            side: THREE.BackSide,
            depthWrite: false
        });
        const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
        group.add(outlineMesh);

        // Initial position - hidden below
        group.position.set(-3, -2, -2);
        group.rotation.set(0, 0, 0);
        group.scale.setScalar(0.8);

        group.userData = {
            basePosition: new THREE.Vector3(-3, -2, -2),
            baseRotation: new THREE.Euler(0, 0, 0),
            baseScale: 0.8,
            outlineMesh: outlineMesh
        };

        scene.add(group);
        ballObject = group;
    }

    /**
     * Create ambient particles
     */
    function createParticles() {
        const count = 800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        const alphas = new Float32Array(count);

        const colorGold = new THREE.Color(COLORS.gold);
        const colorGreen = new THREE.Color(COLORS.green);
        const colorCyan = new THREE.Color(COLORS.cyan);

        for (let i = 0; i < count; i++) {
            const radius = 15 + Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            sizes[i] = Math.random() * 2 + 0.5;
            
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                colors[i * 3] = colorGold.r;
                colors[i * 3 + 1] = colorGold.g;
                colors[i * 3 + 2] = colorGold.b;
            } else if (colorChoice < 0.7) {
                colors[i * 3] = colorGreen.r;
                colors[i * 3 + 1] = colorGreen.g;
                colors[i * 3 + 2] = colorGreen.b;
            } else {
                colors[i * 3] = colorCyan.r;
                colors[i * 3 + 1] = colorCyan.g;
                colors[i * 3 + 2] = colorCyan.b;
            }
            
            alphas[i] = Math.random() * 0.5 + 0.1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(geometry, particleMaterial);
        particleSystem.name = 'particles';
        scene.add(particleSystem);
        
        // Store for animation
        scene.userData.particles = particleSystem;
    }

    /**
     * Window resize handler
     */
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    /**
     * Mouse move handler for parallax
     */
    function onMouseMove(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    /**
     * Animation loop
     */
    function animate() {
        animationId = requestAnimationFrame(animate);

        if (!isInitialized) return;

        const time = performance.now() * 0.001;

        // Shield auto-rotation
        if (shieldObject) {
            shieldObject.rotation.y += 0.0015;
            shieldObject.rotation.x = Math.sin(time * 0.5) * 0.05;
            
            // Mouse parallax
            shieldObject.rotation.y += mouseX * 0.02;
            shieldObject.rotation.x += mouseY * 0.02;
        }

        // Ball rotation
        if (ballObject) {
            ballObject.rotation.y += 0.003;
            ballObject.rotation.x += 0.002;
            
            // Floating animation
            ballObject.position.y += Math.sin(time * 1.5) * 0.001;
        }

        // Particles rotation
        const particles = scene.userData.particles;
        if (particles) {
            particles.rotation.y += 0.0001;
            particles.rotation.x += 0.00005;
        }

        // Animate lights
        const lights = scene.userData.lights;
        if (lights) {
            lights.green.intensity = 1 + Math.sin(time * 2) * 0.3;
            lights.cyan.intensity = 0.8 + Math.cos(time * 1.5) * 0.2;
            lights.rim.intensity = 0.5 + Math.sin(time * 3) * 0.2;
        }

        // Smooth camera follow
        if (camera) {
            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (targetY - camera.position.y) * 0.02;
        }

        renderer.render(scene, camera);
    }

    // ========================================
    // GSAP SCROLLTRIGGER ANIMATIONS
    // ========================================

    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Hero Section - Initial state
        ScrollTrigger.create({
            trigger: sections.hero,
            start: 'top top',
            end: 'bottom top',
            onEnter: () => setSection('hero'),
            onEnterBack: () => setSection('hero'),
            onLeave: () => setSection('programas'),
            onLeaveBack: () => setSection('hero')
        });

        // Programas Section
        ScrollTrigger.create({
            trigger: sections.programas,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setSection('programas'),
            onEnterBack: () => setSection('programas'),
            onLeave: () => setSection('logo3d'),
            onLeaveBack: () => setSection('hero')
        });

        // Logo 3D Section
        ScrollTrigger.create({
            trigger: sections.logo3d,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setSection('logo3d'),
            onEnterBack: () => setSection('logo3d'),
            onLeave: () => setSection('uniforme'),
            onLeaveBack: () => setSection('programas')
        });

        // Uniforme Section
        ScrollTrigger.create({
            trigger: sections.uniforme,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setSection('uniforme'),
            onEnterBack: () => setSection('uniforme'),
            onLeave: () => setSection('contacto'),
            onLeaveBack: () => setSection('logo3d')
        });

        // Contacto Section
        ScrollTrigger.create({
            trigger: sections.contacto,
            start: 'top center',
            end: 'bottom bottom',
            onEnter: () => setSection('contacto'),
            onEnterBack: () => setSection('contacto')
        });

        // Parallax effect on sections
        gsap.utils.toArray('section').forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Subtle background color shift based on scroll
                    if (section.id === 'hero') {
                        document.body.style.backgroundPosition = `center ${progress * 100}px`;
                    }
                }
            });
        });
    }

    /**
     * Handle section transitions
     */
    function setSection(sectionName) {
        if (currentSection === sectionName) return;
        currentSection = sectionName;

        if (!shieldObject || !ballObject) return;

        const shield = shieldObject;
        const ball = ballObject;
        const lights = scene.userData.lights;

        switch (sectionName) {
            case 'hero':
                // Center-right, gentle rotation
                gsap.to(shield.position, {
                    x: 2.5, y: 0.5, z: 0,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.rotation, {
                    y: -0.3, x: 0, z: 0,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 1.5, ease: 'elastic.out(1, 0.5)'
                });
                
                gsap.to(ball.position, {
                    x: -3, y: -2, z: -2,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(ball.scale, { x: 0.8, y: 0.8, z: 0.8, duration: 1 });
                
                // Lights
                gsap.to(lights.main, { intensity: 1.5, duration: 1 });
                gsap.to(lights.green, { intensity: 1, duration: 1 });
                break;

            case 'programas':
                // Move to left, rotate 180°, scale up slightly
                gsap.to(shield.position, {
                    x: -3, y: 0, z: 1,
                    duration: 1.8, ease: 'power3.inOut'
                });
                gsap.to(shield.rotation, {
                    y: Math.PI - 0.3, x: 0.1, z: 0,
                    duration: 1.8, ease: 'power3.inOut'
                });
                gsap.to(shield.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1.5, ease: 'elastic.out(1, 0.5)' });
                
                // Ball moves to right side
                gsap.to(ball.position, {
                    x: 3, y: 1, z: -1,
                    duration: 1.8, ease: 'power3.inOut'
                });
                gsap.to(ball.rotation, { y: Math.PI, duration: 1.8 });
                gsap.to(ball.scale, { x: 1, y: 1, z: 1, duration: 1.5 });
                
                // Green glow emphasis
                gsap.to(lights.green, { intensity: 2, duration: 1 });
                gsap.to(lights.cyan, { intensity: 0.5, duration: 1 });
                break;

            case 'logo3d':
                // Center stage, prominent
                gsap.to(shield.position, {
                    x: 0, y: 0.5, z: 1.5,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.rotation, {
                    y: 0, x: 0, z: 0,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 1.5, ease: 'elastic.out(1, 0.4)' });
                
                // Ball orbits around shield
                gsap.to(ball.position, { x: 0, y: -1, z: 3, duration: 1.5, ease: 'power3.out' });
                gsap.to(ball.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 1 });
                
                // Gold glow emphasis
                gsap.to(lights.main, { intensity: 2, duration: 1 });
                gsap.to(lights.rim, { intensity: 1, duration: 1 });
                break;

            case 'uniforme':
                // Left side, rotated for viewing
                gsap.to(shield.position, {
                    x: -2.5, y: 0, z: 1,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.rotation, {
                    y: -Math.PI / 2, x: 0.15, z: 0,
                    duration: 1.5, ease: 'power3.out'
                });
                gsap.to(shield.scale, { x: 1, y: 1, z: 1, duration: 1.2 });
                
                // Ball moves to showcase
                gsap.to(ball.position, { x: 2.5, y: 0.5, z: 0, duration: 1.5, ease: 'power3.out' });
                gsap.to(ball.rotation, { x: Math.PI / 4, duration: 1.5 });
                gsap.to(ball.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 });
                
                // Cyan accent
                gsap.to(lights.cyan, { intensity: 1.5, duration: 1 });
                break;

            case 'contacto':
                // Bottom center with glow pulse
                gsap.to(shield.position, {
                    x: 0, y: -2, z: 0.5,
                    duration: 1.8, ease: 'power3.inOut'
                });
                gsap.to(shield.rotation, {
                    y: Math.PI, x: -0.2, z: 0,
                    duration: 1.8, ease: 'power3.inOut'
                });
                gsap.to(shield.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 1.5 });
                
                // Ball at center bottom
                gsap.to(ball.position, { x: 0, y: -3.5, z: -1, duration: 1.8, ease: 'power3.inOut' });
                gsap.to(ball.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 1 });
                
                // Full glow - all lights
                gsap.to(lights.main, { intensity: 2.5, duration: 1 });
                gsap.to(lights.green, { intensity: 1.5, duration: 1 });
                gsap.to(lights.cyan, { intensity: 1.5, duration: 1 });
                gsap.to(lights.rim, { intensity: 1.5, duration: 1 });
                
                // Pulse animation on shield
                gsap.to(shield.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
                });
                break;
        }
    }

    // ========================================
    // MOBILE NAVIGATION & EXISTING FEATURES
    // ========================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const preinscripcionForm = document.getElementById('preinscripcion-form');

    let isMenuOpen = false;
    let lastScrollY = window.scrollY;

    function init() {
        // Wait for DOM and external libs
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initThreeJS();
                initScrollAnimations();
                setupMobileMenu();
                setupNavbarScroll();
                setupSmoothScroll();
                setupWhatsAppTracking();
                setupPreinscripcionForm();
            });
        } else {
            initThreeJS();
            initScrollAnimations();
            setupMobileMenu();
            setupNavbarScroll();
            setupSmoothScroll();
            setupWhatsAppTracking();
            setupPreinscripcionForm();
        }
    }

    // ... existing mobile menu functions ...
    function setupMobileMenu() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', toggleMenu);
        navToggle.addEventListener('keydown', handleToggleKeydown);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('resize', handleResize);
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active', isMenuOpen);
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    function handleToggleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    }

    function handleOutsideClick(event) {
        if (isMenuOpen && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            closeMenu();
        }
    }

    function handleEscapeKey(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
            navToggle.focus();
        }
    }

    function handleResize() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    }

    function setupNavbarScroll() {
        if (!navbar) return;

        let ticking = false;

        function handleScroll() {
            lastScrollY = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        function updateNavbar() {
            const scrolled = lastScrollY > 50;
            navbar.classList.toggle('scrolled', scrolled);
            ticking = false;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateNavbar();
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                    
                    gsap.to(window, {
                        scrollTo: { y: targetPosition, autoKill: false },
                        duration: 1,
                        ease: 'power3.inOut'
                    });

                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    function setupWhatsAppTracking() {
        const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        event_category: 'engagement',
                        event_label: this.textContent.trim()
                    });
                }
                document.dispatchEvent(new CustomEvent('whatsappClick', {
                    detail: { text: this.textContent.trim(), href: this.href }
                }));
            });
        });
    }

    function setupPreinscripcionForm() {
        if (!preinscripcionForm) return;

        preinscripcionForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(preinscripcionForm);
            const padreNombre = formData.get('padreNombre').trim();
            const alumnoNombre = formData.get('alumnoNombre').trim();
            const categoria = formData.get('categoria');
            const telefono = formData.get('telefono').trim();

            if (!padreNombre || !alumnoNombre || !categoria || !telefono) {
                return;
            }

            const message = `Hola, soy ${padreNombre}, deseo una clase de prueba gratis para mi hijo ${alumnoNombre} en la categoría ${categoria}. Mi celular es ${telefono}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/51944897167?text=${encodedMessage}`;

            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'preinscripcion_clase_prueba'
                });
            }

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });

        const inputs = preinscripcionForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.required && !this.value.trim()) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '';
                }
            });

            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 68, 68)') {
                    this.style.borderColor = '';
                }
            });
        });
    }

    // Start
    init();

    // Expose for debugging
    window.Lucmar3D = {
        scene,
        camera,
        renderer,
        shieldObject,
        ballObject,
        setSection
    };

})();