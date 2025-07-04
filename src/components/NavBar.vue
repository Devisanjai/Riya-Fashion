<template>
  <nav class="navbar">
    <div class="nav-left">
      <span class="logo" @click="$router.push('/main')">DemiFashion </span>
    </div>

    <div class="nav-toggle" @click="toggleMenu">
      ☰
    </div>

    <div class="nav-center">
      <span class="username">Welcome {{ user }}</span>
    </div>

    <div class="nav-right" :class="{ 'show-mobile': showMenu }">
      <button @click="$router.push('/main')">Home</button>
      <button @click="$router.push('/products')">Product</button>
      <button @click="$router.push('/cart')">Cart ({{ cartCount }})</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.navbar {
  font-family: 'Poppins', sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.nav-left {
  flex: 1;
  display: flex;
  align-items: center;
}

.nav-center {
  margin: 0 auto;
  font-weight: 500;
  font-size: 1.1rem;
  color: #f1f1f1;
  text-align: center;
}

.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo {
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.username {
  font-size: 1rem;
  font-weight: 500;
  color: #f1f1f1;
}

button {
  background-color: #f3ebef;
  border: none;
  color: rgb(16, 16, 16);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #e0dcdc;
}

/* Hamburger icon hidden on desktop */
.nav-toggle {
  display: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-center {
    order: 3;
    width: 100%;
    text-align: center;
    margin: 0.5rem 0;
  }

  .nav-right {
    display: none;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 0.5rem;
  }

  .nav-right.show-mobile {
    display: flex;
  }

  .nav-left {
    justify-content: space-between;
    width: 100%;
  }

  button {
    width: 90%;
    max-width: 300px;
    margin: 0.25rem 0;
  }

  .logo {
    font-size: 1.3rem;
  }

  .username {
    font-size: 1rem;
  }
}
</style>
