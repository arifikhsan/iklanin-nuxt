<template>
  <div>
    <div>
      <div class="py-4 sm:px-6">
        <h3 class="text-lg font-medium text-gray-900">
          Detail Profil
        </h3>
        <p class="max-w-2xl mt-1 text-sm text-gray-500">
          Informasi personal yang akan ditampilkan di setiap iklan.
        </p>
      </div>
      <div>
        <form @submit.prevent="update" enctype="multipart/form-data">
          <div>
            <p class="text-gray-700">
              Nama lengkap <span class="text-red-500">*</span>
            </p>
            <input
              type="text"
              v-model="userDetail.name"
              class="block w-full mt-1 form-input"
              placeholder="Nama lengkap"
              required
            />
          </div>
          <div class="mt-4">
            <p class="text-gray-700">
              Nomor HP <span class="text-red-500">*</span>
            </p>
            <input
              type="text"
              v-model="userDetail.phone_number"
              class="block w-full mt-1 form-input"
              placeholder="+628912345678"
              required
            />
          </div>
          <div class="mt-4">
            <p class="text-gray-700">
              Nomor Whatsapp <span class="text-red-500">*</span>
            </p>
            <input
              type="text"
              v-model="userDetail.whatsapp_phone_number"
              class="block w-full mt-1 form-input"
              placeholder="+628912345678"
              required
            />
          </div>
          <div class="mt-6">
            <button
              class="block w-full px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Profil',
  },
  middleware: 'auth',
  async asyncData({ $axios }) {
    const res = await $axios.$get('/v1/user_details')

    return { userDetail: res.data }
  },
  methods: {
    update() {
      let req = { ...this.userDetail }
      delete req.id
      delete req.address
      delete req.dob
      delete req.gender

      this.$axios
        .put('/v1/user_details', { user_detail: req })
        .then((res) => {
          this.$toast.success('Sukses mengupdate profil.', {
            duration: 6000,
          })
        })
        .catch((err) => {
          this.$toast.error('Gagal mengupdate profil.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
