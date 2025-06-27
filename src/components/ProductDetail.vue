<template>
  <div class="details-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    <NavBar />
    <div class="detail-container" v-if="product">
      <div class="detail-card">
        <div class="image-section">
          <img :src="product.images[selectedColor]" alt="Product Front" class="main-img" />
          <!-- <img :src="getAltImageUrl(product)" alt="Product Side" class="alt-img" /> -->
        </div>
        <div class="info-section">
          <h2>{{ product.name }}</h2>
          <p class="price">₹{{ product.price }}</p>

          <div class="section size-options">
            <strong>SIZE:</strong>
            <span v-for="size in product.sizes" :key="size" class="size-badge">{{ size }}</span>
          </div>

          <div class="section">
            <strong>COLOR:</strong>
            <span
              v-for="color in product.colors"
              :key="color"
              class="color-swatch"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></span>
          </div>

          <button @click="addToCart" class="add-btn">ADD TO BAG</button>

          <div class="features">
            <div><i class="icon">🚚</i> Free shipping</div>
            <div><i class="icon">🔄</i> Easy Returns</div>
            <div><i class="icon">🧵</i> Fresh Fashion</div>
          </div>

          <div class="details">
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>SKU:</strong> 301023053001</p>
            <p><strong>Dimensions:</strong> 81cm</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from './NavBar.vue';
import products from '../data/products.json';

export default {
  components: { NavBar },
  data() {
    return {
      product: null,
      selectedColor: ''
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id);
    this.product = products.find(p => p.id === id);
    if (this.product) {
      this.selectedColor = this.product.colors[0];
    }
    this.initThree();
  },
  methods: {
    addToCart() {
      this.$store.commit('addToCart', this.product);
    },
    getAltImageUrl(product) {
      const colorKeys = Object.keys(product.images);
      return colorKeys.length > 1 ? product.images[colorKeys[1]] : product.images[colorKeys[0]];
    },
    initThree() {
      const canvas = this.$refs.bgCanvas;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 300;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry = new THREE.BufferGeometry();
      const particleCount = 600;
      const positions = [];
      for (let i = 0; i < particleCount; i++) {
        positions.push(
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600),
          THREE.MathUtils.randFloatSpread(600)
        );
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ size: 2, color: '#ffffff', transparent: true, opacity: 0.9 });
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
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.details-wrapper {
  height: 100vh;
  position: relative;
  background: #000;
  color: white;
  font-family: 'Poppins', sans-serif;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
}

.detail-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  z-index: 1;
}

.detail-card {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
  margin-top: 2rem;
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-section img {
  width: 300px;
  border-radius: 8px;
  object-fit: cover;
  background: white;
}

.info-section {
  max-width: 500px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.size-options .size-badge {
  border: 1px solid white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  margin: 0.2rem;
  font-weight: 600;
  cursor: default;
}

.color-swatch {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 0.2rem;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
}

.add-btn {
  padding: 0.8rem 1.5rem;
  background-color: #fff;
  border: none;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-btn:hover {
  background-color: #e0e0e0;
}

.features {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.features .icon {
  margin-right: 0.5rem;
}

.details {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #ccc;
}
</style>
