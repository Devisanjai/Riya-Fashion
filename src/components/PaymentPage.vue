<template>
  <div class="payment-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>
    <NavBar />

    <div class="payment-card">
      <h2>Choose Payment Method</h2>
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Full Name" />
        <input type="number" v-model="age" placeholder="Age" min="1" />
        <input type="text" v-model="phone" placeholder="Phone Number (10 digits)" maxlength="10" />
        <input type="email" v-model="email" placeholder="Email Address" />
        <textarea v-model="address" placeholder="Delivery Address" rows="3"></textarea>
      </div>
      <ul class="payment-options">
        <li>
          <input type="radio" id="card" value="Card" v-model="method" />
          <label for="card">Credit/Debit Card</label>
        </li>
        <li>
          <input type="radio" id="upi" value="UPI" v-model="method" />
          <label for="upi">UPI</label>
        </li>
        <li>
          <input type="radio" id="cod" value="Cash on Delivery" v-model="method" />
          <label for="cod">Cash on Delivery</label>
        </li>
      </ul>
      <div v-if="method === 'Card'" class="form-group">
        <input type="text" v-model="cardNumber" placeholder="Card Number (16 digits)" maxlength="16" />
        <input type="text" v-model="expiry" placeholder="MM/YY" maxlength="5" />
        <input type="password" v-model="cvv" placeholder="CVV" maxlength="3" />
      </div>

      <div v-if="method === 'UPI'" class="form-group">
        <input type="text" v-model="upiId" placeholder="Enter UPI ID (e.g., yourname@bank)" />
      </div>

      <p v-if="method === 'Cash on Delivery'" class="note">
        Pay with cash once your order arrives. Available for orders below ₹2000 only.
      </p>

      <button class="pay-btn" @click="pay">Pay Now</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },
  data() {
    return {
      username: '',
      age: '',
      phone: '',
      email: '',
      address: '',

      // Payment
      method: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      upiId: ''
    };
  },
  computed: {
    total() {
      return this.$store.getters.getCartTotal;
    }
  },
  mounted() {
    this.initThree();
  },
  methods: {
    pay() {
      if (!this.username.trim()) {
        alert('Please enter your full name.');
        return;
      }
      if (!this.age || this.age < 1 || this.age > 120) {
        alert('Enter a valid age.');
        return;
      }
      if (!/^\d{10}$/.test(this.phone)) {
        alert('Enter a valid 10-digit phone number.');
        return;
      }
      if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(this.email)) {
        alert('Enter a valid email address.');
        return;
      }
      if (!this.address.trim()) {
        alert('Please enter your address.');
        return;
      }

      if (!this.method) {
        alert('Please select a payment method.');
        return;
      }

      if (this.method === 'Card') {
        if (!/^\d{16}$/.test(this.cardNumber)) {
          alert('Enter a valid 16-digit card number.');
          return;
        }
        if (!/^\d{2}\/\d{2}$/.test(this.expiry)) {
          alert('Enter expiry in MM/YY format.');
          return;
        }
        if (!/^\d{3}$/.test(this.cvv)) {
          alert('Enter a valid 3-digit CVV.');
          return;
        }
      }

      if (this.method === 'UPI' && !/^[\w.-]+@[\w.-]+$/.test(this.upiId)) {
        alert('Enter a valid UPI ID.');
        return;
      }

      if (this.method === 'Cash on Delivery' && this.total > 2000) {
        alert('Cash on Delivery is available only for orders below ₹2000.');
        return;
      }

  
      alert(`Payment successful via ${this.method}.\nName: ${this.username}\nPhone: ${this.phone}`);
      this.$store.commit('clearCart');
      this.$router.push('/main');
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

      const material = new THREE.PointsMaterial({
        size: 2,
        color: '#ffffff',
        transparent: true,
        opacity: 0.9
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
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.payment-wrapper {
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  top: 0;
  left: 0;
}

.payment-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 500px;
  text-align: center;
  color: #fff;
}

.payment-card h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.payment-options {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-bottom: 1rem;
}

.payment-options li {
  margin-bottom: 1rem;
}

.payment-options label {
  margin-left: 0.5rem;
  font-weight: 500;
}

.form-group {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-group input,
.form-group textarea {
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  resize: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #ccc;
}

.note {
  font-size: 0.85rem;
  color: #ccc;
  margin-top: 1rem;
}

.pay-btn {
  margin-top: 2rem;
  width: 100%;
  padding: 0.8rem;
  background-color: #ffffff;
  border: none;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pay-btn:hover {
  background-color: #e0e0e0;
}
</style>
