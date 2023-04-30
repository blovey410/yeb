import { defineStore } from 'pinia';

export const useStore = defineStore('yeb', {
  state: () => ({
    Authorization: '',
    tokenHeader: '',
    routers: [],
  }),
  getters: {},
  actions: {
    addAuthorization(value) {
      this.Authorization = value;
    },
    addTokenHeader(value) {
      this.tokenHeader = value;
    },
    addRouter(value) {
      this.routers = value;
    },
  },
});
