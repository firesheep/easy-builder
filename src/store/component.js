import { defineStore } from 'pinia'

export const useComponentStore = defineStore('component', {
  state: () => ({
    registeredComponents: new Map()
  }),
  actions: {
    registerComponent(type, component) {
      this.registeredComponents.set(type, component)
    },
    getComponent(type) {
      return this.registeredComponents.get(type)
    }
  }
})