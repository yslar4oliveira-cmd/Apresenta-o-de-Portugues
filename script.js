// ==================== GSAP SETUP ==================== 

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ==================== INITIAL STATE ==================== 

const pages = document.querySelectorAll('.book-page');
let currentPage = 0;

// ==================== PAGE REVEAL ON SCROLL ==================== 

function setupPageReveals() {
    pages.forEach((page, index) => {
        const pageContent = page.querySelector('.page-content');
        
        gsap.to(pageContent, {
            scrollTrigger: {
                trigger: page,
                start: 'top 80%',
                end: 'top 30%',
                onEnter: () => {
                    pageContent.classList.add('active');
                },
                onLeaveBack: () => {
                    pageContent.classList.remove('active');
                }
            }
        });
    });
}

// ==================== PARALLAX EFFECTS ==================== 

function setupParallaxEffects() {
    pages.forEach((page, index) => {
        gsap.to(page, {
            scrollTrigger: {
                trigger: page,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
            },
            y: 100,
            ease: 'none'
        });
    });
}

// ==================== TEXT REVEAL ANIMATIONS ==================== 

function setupTextAnimations() {
    // Animate page titles
    gsap.to('.page-title', {
        scrollTrigger: {
            trigger: '.page-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 1,
        x: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Animate text blocks
    gsap.to('.text-block p', {
        scrollTrigger: {
            trigger: '.text-block',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// ==================== CARD ANIMATIONS ==================== 

function setupCardAnimations() {
    // Info cards
    gsap.to('.info-card', {
        scrollTrigger: {
            trigger: '.info-cards-wrapper',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'back.out'
    });

    // Value cards
    gsap.to('.value-card', {
        scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.7,
        opacity: 1,
        y: 0,
        stagger: 0.12,
        ease: 'back.out'
    });

    // Characteristics list items
    gsap.to('.characteristics-list li', {
        scrollTrigger: {
            trigger: '.character-deep-info',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.5,
        opacity: 1,
        x: 0,
        stagger: 0.08,
        ease: 'power2.out'
    });
}

// ==================== HOVER EFFECTS ==================== 

function setupHoverEffects() {
    const interactiveElements = document.querySelectorAll(
        '.info-card, .value-card, .character-card, .detail-item'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

// ==================== PAGE TURN EFFECT ==================== 

function setupPageTurnEffect() {
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        pages.forEach((page, index) => {
            const pageStart = (index / pages.length) * 100;
            const pageEnd = ((index + 1) / pages.length) * 100;
            
            if (scrollPercentage >= pageStart && scrollPercentage < pageEnd) {
                const pageProgress = (scrollPercentage - pageStart) / (pageEnd - pageStart);
                
                // Subtle rotation effect
                gsap.to(page, {
                    rotationX: pageProgress * 2,
                    duration: 0.1,
                    ease: 'none'
                });
            }
        });
    });
}

// ==================== PROGRESS BAR ==================== 

function setupProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c9a961, #d4534f, #8a9db0);
        z-index: 1000;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        gsap.to(progressBar, {
            width: scrollPercentage + '%',
            duration: 0.2,
            ease: 'none'
        });
    });
}

// ==================== THREE.JS BACKGROUND ==================== 

function setupThreeJSBackground() {
    const canvas = document.getElementById('canvas-bg');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xc9a961,
        size: 0.5,
        opacity: 0.6,
        transparent: true
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    camera.position.z = 50;

    function animate() {
        requestAnimationFrame(animate);

        particleSystem.rotation.x += 0.0002;
        particleSystem.rotation.y += 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ==================== INITIALIZATION ==================== 

function init() {
    // Set initial opacity to 0 for animated elements
    gsap.set('.page-content', { opacity: 0, y: 50 });
    gsap.set('.page-title', { opacity: 0, x: -30 });
    gsap.set('.text-block p', { opacity: 0, y: 20 });
    gsap.set('.info-card', { opacity: 0, y: 30 });
    gsap.set('.value-card', { opacity: 0, y: 30 });
    gsap.set('.characteristics-list li', { opacity: 0, x: -20 });

    // Setup all animations
    setupPageReveals();
    setupParallaxEffects();
    setupTextAnimations();
    setupCardAnimations();
    setupHoverEffects();
    setupPageTurnEffect();
    setupProgressBar();

    // Setup Three.js background
    try {
        setupThreeJSBackground();
    } catch (e) {
        console.log('Three.js not fully loaded, continuing without 3D background');
    }

    ScrollTrigger.refresh();
}

// ==================== EVENT LISTENERS ==================== 

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ==================== SMOOTH SCROLL SUPPORT ==================== 

document.addEventListener('wheel', (e) => {
    // Enhance scroll smoothness
    const delta = e.deltaY;
    window.scrollBy({
        top: delta * 0.8,
        left: 0
    });
}, { passive: true });

// ==================== KEYBOARD NAVIGATION ==================== 

document.addEventListener('keydown', (e) => {
    const scrollAmount = window.innerHeight * 0.8;
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        e.preventDefault();
    } else if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 

// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-out';
    imageObserver.observe(img);
});

console.log('✨ Apresentação de Mariana Iniciada! ✨');