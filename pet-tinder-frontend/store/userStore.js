import { defineStore } from 'pinia';
import api from '~/services/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null, 
  }),
  
  // This uses the 'pinia-plugin-persistedstate' you installed to remember the user.
  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async signup(userData) {
      try {
        const response = await api.signup(userData);
        this.token = response.data.token;
        return true;
      } catch (error) {
        console.error("Signup failed:", error.response.data);
        return false;
      }
    },

    async login(credentials) {
      try {
        const response = await api.login(credentials);
        this.token = response.data.token;
        return true;
      } catch (error) {
        console.error("Login failed:", error.response.data);
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      useRouter().push('/login');
    }
  }
});