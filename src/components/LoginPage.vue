<template>
  <div class="login-wrapper">
    <canvas ref="bgCanvas" class="bg-canvas"></canvas>

    <div class="login-card">
      <h2>RIYA FASHION</h2>
      <p class="tagline">Place where Fashion Meets Elegance</p>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" id="username" placeholder="Enter Username" required />
        </div>
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: ''
    };
  },
  methods: {
    login() {
      if (this.username.trim()) {
        this.$store.commit('setUser', this.username);
        this.$router.push('/main');
      }
    },
    initThree() {
      const canvas = this.$refs.bgCanvas;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); // black background

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
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
        color: '#ffffff', // white particles
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
  },
  mounted() {
    this.initThree();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.login-wrapper {
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background: #000; /* solid black background */
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

.login-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05); /* light frosted glass */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 420px;
  text-align: center;
  color: #fff;
}

.login-card h2 {
  font-size: 2rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #ffffff;
}

.tagline {
  font-size: 0.95rem;
  margin-bottom: 2rem;
  color: #ccc;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
  color: #fff;
}

.input-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 0.6rem 0.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
}

.input-group input::placeholder {
  color: #ddd;
}

.login-btn {
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

.login-btn:hover {
  background-color: #e0e0e0;
}
</style>
