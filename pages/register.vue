<template>
  <div class="max-w-xs py-12 mx-auto">
    <form @submit.prevent="register">
      <div>
        <span class="text-gray-700"
          >Nama <span class="text-red-500">*</span></span
        >
        <input
          type="text"
          v-model="credential.name"
          class="block w-full mt-1 form-input"
          placeholder="Nama lengkap"
          required
        />
      </div>
      <div class="mt-2">
        <span class="text-gray-700"
          >Email <span class="text-red-500">*</span></span
        >
        <input
          type="email"
          v-model="credential.email"
          class="block w-full mt-1 form-input"
          placeholder="Email"
          required
        />
      </div>
      <div class="mt-2">
        <span class="text-gray-700"
          >Password <span class="text-red-500">*</span></span
        >
        <input
          type="password"
          v-model="credential.password"
          class="block w-full mt-1 form-input"
          placeholder="Password"
          required
        />
      </div>
      <div class="mt-4">
        <button
          class="block w-full px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
          type="submit"
        >
          Daftar
        </button>
      </div>
    </form>
    <div class="mt-4">
      <nuxt-link class="duration-500 hover:text-red-500" to="/login">
        <a>Sudah punya akun?</a>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Register',
  },
  auth: 'guest',
  data() {
    return {
      credential: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async register() {
      await this.$axios
        .post('/register', this.credential)
        .then((res) => {
          this.$toast.success('Berhasil mendaftar. Silahkan login', {
            duration: 6000,
          })
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$toast.error(err.response.data.message, {
            duration: 6000,
          })
        })
    },
  },
}
</script>
