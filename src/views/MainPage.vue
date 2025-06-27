<template>
  <div class="main-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>

    <div class="navbar-wrapper">
      <NavBar />
    </div>

    <div class="main-card">
      <div class="main-content">
        <h1>Welcome to Riya Clothing</h1>
        <p>Explore our collection of mordern cloths with a touch of laxury</p>
        <button @click="$router.push('/products')">Go to Products</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'MainPage',
  components: { NavBar },
  methods: {
    initThree() {
      const canvas = this.$refs.bgCanvas;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); 

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 300;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.BufferGeometry();
      const particleCount = 500;
      const positions = [];

      for (let i = 0; i < particleCount; i++) {
        positions.push(
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600)
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 3,
        color: '#ffffff', 
        transparent: true,
        opacity: 0.85
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const animate = () => {
        requestAnimationFrame(animate);
        points.rotation.y += 0.001;
        points.rotation.x += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  },
  mounted() {
    this.initThree();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.main-wrapper {
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
}

.bg-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
}

.main-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 600px;
  text-align: center;
  color: #fff;
}

.main-content h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.main-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #ccc;
}

button {
  padding: 0.8rem 1.5rem;
  background-color: #ffffff;
  border: none;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
