// Three.js and animation code (same as previous version)
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene-container').appendChild(renderer.domElement);

        const starsGeometry = new THREE.BufferGeometry();
        const starPositions = [];
        for(let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 2000;
            starPositions.push(x, y, z);
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
        
        const starsMaterial = new THREE.PointsMaterial({
            color: 0x00eeff,
            size: 0.7,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        camera.position.z = 5;

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
        });

        function animate() {
            requestAnimationFrame(animate);

            starField.rotation.y += 0.0005;
            starField.rotation.x += 0.0002;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll animations
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.card').forEach(card => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1
                }
            });
        });
