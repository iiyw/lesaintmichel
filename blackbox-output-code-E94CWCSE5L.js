/* ================================================
   LE SAINT-MICHEL - ULTRA PREMIUM JAVASCRIPT
   ================================================ */

// ==================== DOM ELEMENTS ====================
const loader = document.getElementById('loader');
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const heroCanvas = document.getElementById('hero-canvas');
const particlesContainer = document.getElementById('particles');

// ==================== GLOBAL VARIABLES ====================
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
let scrollY = 0;
let isLoaded = false;

// ==================== UTILITY FUNCTIONS ====================
const lerp = (start, end, factor) => start + (end - start) * factor;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const randomRange = (min, max) => Math.random() * (max - min) + min;

// Debounce function
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== LOADING SCREEN ====================
function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            isLoaded = true;
            loader.classList.add('loaded');
            
            // Trigger entrance animations after loading
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                animateEntranceElements();
            }, 800);
        }, 2800);
    });
}

function animateEntranceElements() {
    const reveals = document.querySelectorAll('.reveal-up');
    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 150);
    });
}

// ==================== CUSTOM CURSOR ====================
function initCursor() {
    if (window.innerWidth <= 1024) return;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Update cursor positions
    function updateCursor() {
        followerX = lerp(followerX, mouseX, 0.08);
        followerY = lerp(followerY, mouseY, 0.08);
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .menu-item, .feature-card, .gallery-item, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// ==================== THREE.JS BACKGROUND ====================
function initThreeBackground() {
    if (!heroCanvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: heroCanvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        
        colors[i * 3] = 0.788; // R (gold)
        colors[i * 3 + 1] = 0.663; // G
        colors[i * 3 + 2] = 0.384; // B
        
        sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Create geometric shapes
    const shapesGroup = new THREE.Group();
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(8, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
        color: 0xc9a962,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 3;
    shapesGroup.add(torus);
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
        color: 0xc9a962,
        wireframe: true,
        transparent: true,
        opacity: 0.05
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    icosahedron.position.set(15, -10, -20);
    shapesGroup.add(icosahedron);
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(5, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({
        color: 0xc9a962,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(-15, 10, -15);
    shapesGroup.add(octahedron);
    
    scene.add(shapesGroup);
    
    camera.position.z = 30;
    
    // Mouse interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetRotationY = (e.clientX / window.innerWidth - 0.5) * 0.2;
        targetRotationX = (e.clientY / window.innerHeight - 0.5) * 0.2;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
        
        // Smooth rotation based on mouse
        shapesGroup.rotation.y = lerp(shapesGroup.rotation.y, targetRotationY, 0.02);
        shapesGroup.rotation.x = lerp(shapesGroup.rotation.x, targetRotationX, 0.02);
        
        // Animate individual shapes
        torus.rotation.z += 0.001;
        icosahedron.rotation.y += 0.002;
        octahedron.rotation.x += 0.001;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==================== PARTICLES SYSTEM ====================
function initParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${randomRange(10, 25)}s`;
        particle.style.opacity = randomRange(0.2, 0.6);
        particle.style.width = `${randomRange(2, 5)}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    // Scroll behavior
    const handleScroll = debounce(() => {
        scrollY = window.scrollY;
        
        // Navbar state
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 50);
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// ==================== REVEAL ANIMATIONS ====================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleParallax = throttle(() => {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 16);
    
    window.addEventListener('scroll', handleParallax);
}

// ==================== MENU FILTERING ====================
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn