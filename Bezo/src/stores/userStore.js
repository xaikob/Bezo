import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    username: null,
    isLoggedIn: false
  }),
  actions: {
    setUser({ userId, username }) {
      this.userId = userId
      this.username = username
      this.isLoggedIn = true
    },
    logout() {
      this.userId = null
      this.username = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) return false

      try {
        const { data } = await axios.get('http://localhost:5174/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })

        this.setUser({
          userId: data.user.id,
          username: data.user.first_name
        })
        return true
      }catch{
        return
      }
    }
  },
  persist: true // сохранять в localStorage автоматически
})
