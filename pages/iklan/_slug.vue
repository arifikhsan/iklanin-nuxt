<template>
  <div>
    <div>
      <div>
        <img class="object-cover w-full h-64 rounded-md" :src="ad.cover_image.url.medium" />
      </div>
      <h1 class="py-2 text-3xl font-bold text-grey-800">
        {{ ad.title }}
      </h1>
      <div class="py-2">
        <p class="font-medium text-red-500">Harga</p>
        <p class="mt-2">
          {{
            ad.price.toLocaleString('id', {
              style: 'currency',
              currency: 'IDR',
            })
          }}
        </p>
      </div>
      <div class="py-2">
        <p class="font-medium text-red-500">Deksripsi</p>
        <p class="mt-2">{{ ad.detail }}</p>
      </div>
      <div class="py-2">
        <p class="font-medium text-red-500">Kategori</p>
        <p class="mt-2">{{ ad.category.name }}</p>
      </div>
    </div>
    <div class="py-2">
      <div>
        <p class="font-medium text-red-500">Hubungi kontak berikut</p>
        <p>Nama: {{ ad.user.name }}</p>
        <p>Email: {{ ad.user.email }}</p>
      </div>
      <div v-if="!$auth.loggedIn" class="mt-8">
        <nuxt-link
          to="/login"
          class="block px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
        >
          Mau buat iklan seperti ini?
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.ad.title || 'Detail iklan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Detail Nuxt.js ',
        },
      ],
    }
  },
  async asyncData({ $axios, route }) {
    const response = await $axios.$get('/v1/ads/' + route.params.slug)
    return { ad: response.data }
  },
  data() {
    return {
      ad: '',
      slug: this.$route.params.slug,
    }
  },
}
</script>
