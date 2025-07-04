<template>
  <div class="products-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>

    <div class="navbar-wrapper">
      <NavBar />
    </div>

    <div class="products-card">
      <ProductCard :products="products" />
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from './NavBar.vue';
import ProductCard from './ProductCard.vue';
import products from '../data/products.json';

export default {
  components: { NavBar, ProductCard },
  data() {
    return { products };
  },
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

.products-wrapper {
  min-height: 100vh;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.bg-canvas {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
}

.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.products-card {
  position: relative;
  z-index: 1;
  padding: 2rem 1rem;
  width: 95%;
  max-width: 1300px;
  margin-top: 6rem;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Optional card base if needed here, else should be in ProductCard.vue */
.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #ffffff;
}

/* Button styles */
.add-btn,
.view-btn {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background 0.3s ease;
}

.add-btn {
  background-color: #ffffff;
  color: #000;
}

.view-btn {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
}

.view-btn:hover {
  background-color: #ffffff;
  color: #000;
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .products-card {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }

  h2 {
    font-size: 1.7rem;
  }
}

@media (max-width: 768px) {
  .products-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .products-card {
    padding: 1rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .add-btn,
  .view-btn {
    width: 100%;
    font-size: 0.9rem;
  }
}
</style>
