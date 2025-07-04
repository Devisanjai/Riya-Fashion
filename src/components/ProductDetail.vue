<template>
  <div class="details-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>

    <NavBar />

    <!-- ✅ Toast message -->
    <div v-if="showToast" class="toast-message">
      {{ toastText }}
    </div>

    <!-- ✅ Product details -->
    <div class="detail-container" v-if="product">
      <div class="detail-card">
        <div class="image-section">
          <img :src="product.images[selectedColor]" alt="Product Front" class="main-img" />
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

          <!-- ✅ Quantity Selector -->
          <div class="section quantity-selector">
            <strong>QUANTITY:</strong>
            <div class="qty-buttons">
              <button @click="decreaseQty">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQty">+</button>
            </div>
          </div>

          <!-- ✅ Buttons -->
          <button @click="addToCart" class="add-btn">ADD TO BAG</button>
          <button class="back-button" @click="$router.push('/products')">← Back to Products</button>

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
      selectedColor: '',
      quantity: 1,
      showToast: false,
      toastText: ''
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
      const item = {
        ...this.product,
        quantity: this.quantity
      };
      this.$store.commit('addToCart', item);
      this.toastText = `"${this.product.name}" added to cart!`;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2500);
    },
    increaseQty() {
      this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
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
  min-height: 100vh;
  position: relative;
  background: #000;
  color: white;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  padding-top: 100px;
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

/* ✅ Toast Message */
.toast-message {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f3eaea;
  color: rgb(27, 26, 26);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  z-index: 1000;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeSlide 2.5s ease-in-out;
}

@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
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
  margin-bottom: 4rem;
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

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.qty-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.qty-buttons button {
  padding: 0.4rem 1rem;
  background-color: #fff;
  border: none;
  color: #000;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.qty-buttons span {
  min-width: 20px;
  text-align: center;
  font-weight: bold;
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

/* ✅ Back Button */
.back-button {
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 0.5rem;
  transition: background 0.3s ease, color 0.3s ease;
}

.back-button:hover {
  background-color: white;
  color: black;
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
