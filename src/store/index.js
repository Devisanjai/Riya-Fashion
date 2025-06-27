import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    cart: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addToCart(state, product) {
      state.cart.push(product);
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  getters: {
    cartCount: state => state.cart.length,
    getUser: state => state.user,
    getCart: state => state.cart
  }
});
