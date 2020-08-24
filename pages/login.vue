<template>
  <div class="max-w-xs mx-auto">
    <form @submit.prevent="login" class="mt-16">
      <label class="block">
        <span class="text-gray-700">Email</span>
        <input
          type="email"
          v-model="credential.email"
          class="block w-full mt-1 form-input"
          placeholder="Email"
        />
      </label>
      <label class="block mt-2">
        <span class="text-gray-700">Password</span>
        <input
          type="password"
          v-model="credential.password"
          class="block w-full mt-1 form-input"
          placeholder="Password"
        />
      </label>
      <div class="mt-4">
        <button
          class="block w-full px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
    <div class="mt-4">
      <nuxt-link class="duration-500 hover:text-red-500" to="/register">
        <a>Belum punya akun?</a>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Login',
  },
  auth: 'guest',
  data() {
    return {
      credential: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('local', { data: this.credential })
        .then((res) => {
          this.$apolloHelpers.onLogin(res.data.access_token)
          this.$toast.success('Login sukses', { duration: 6000 })
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 6000 })
        })
      if (this.$auth.loggedIn) {
        this.$router.push('/home')
      }
    },
  },
}
</script>
