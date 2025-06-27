<template>
  <div class="cart-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    <NavBar />
    <div class="cart-content">
      <h2>Your Cart</h2>
      <div v-if="cart.length">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.images[item.colors[0]]" alt="Product Image" />
          <p>{{ item.name }} - ₹{{ item.price }}</p>
          <button class="remove-button" @click="removeFromCart(item.id)">Remove</button>
        </div>
        <p class="total-amount">Total: ₹{{ totalAmount }}</p>
        <button class="cart-button" @click="goToPayment">Proceed to Payment</button>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    }
  },
  mounted() {
    this.initThree();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  methods: {
    initThree() {
      const canvas = this.$refs.bgCanvas;
      
      // Set canvas size to match window
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 300;

      this.renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: false
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

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

      const material = new THREE.PointsMaterial({
        size: 2,
        color: '#ffffff',
        transparent: true,
        opacity: 0.9
      });

      this.points = new THREE.Points(geometry, material);
      this.scene.add(this.points);

      this.animate();
    },
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      this.points.rotation.y += 0.001;
      this.points.rotation.x += 0.0005;
      this.renderer.render(this.scene, this.camera);
    },
    handleResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    goToPayment() {
      this.$router.push('/payment');
    },
    removeFromCart(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.cart-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #101010;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  color: #fff;
  overflow-y: auto;
}

.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.cart-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin: 2rem 0;
}

.cart-content h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #f1f1f1;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item p {
  flex: 1;
  color: #ddd;
  font-size: 1.1rem;
  margin: 0 1rem;
}

.remove-button {
  padding: 0.6rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.remove-button:hover {
  background-color: #e60000;
  transform: scale(1.05);
}

.total-amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-top: 2rem;
}

.cart-button {
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cart-button:hover {
  background-color: #141616;
  transform: scale(1.05);
}

.cart-wrapper .empty-cart-message {
  font-size: 1.2rem;
  color: #bbb;
  text-align: center;
  margin-top: 2rem;
}
</style>