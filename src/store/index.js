import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    cart: []
  },
  mutations: {
  REMOVE_FROM_CART(state, id) {
    state.cart = state.cart.filter(item => item.id !== id);
  },
  INCREASE_QUANTITY(state, id) {
    const product = state.cart.find(item => item.id === id);
    if (product) product.quantity++;
  },
  DECREASE_QUANTITY(state, id) {
    const product = state.cart.find(item => item.id === id);
    if (product && product.quantity > 1) product.quantity--;
  },
  // This one should be used when adding to cart
  addToCart(state, product) {
    const existing = state.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
},


  getters: {
    cartCount: state => state.cart.length,
    getUser: state => state.user,
    getCart: state => state.cart
  }
});
