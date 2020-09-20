<template>
  <div>
    <div class="md:flex md:space-x-4 lg:space-x-10 lg:px-4">
      <div class="md:w-1/2 lg:w-1/3 lg:mt-4">
        <img
          class="object-cover w-full h-64 rounded-md"
          :src="ad.cover_image.url.medium"
        />
        <div class="flex py-2 space-x-2">
          <img
            v-for="image in ad.images"
            :key="image.id"
            class="object-cover w-16 h-16 rounded-md"
            :src="image.url.small"
          />
        </div>
      </div>
      <div class="mt-4 md:mt-0 md:w-1/2 lg:w-2/3">
        <h1 class="py-2 text-3xl font-bold text-grey-800">
          {{ ad.title }}
        </h1>
        <div class="py-2">
          <p class="font-semibold text-red-500">Harga</p>
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
          <p class="font-semibold text-red-500">Deksripsi</p>
          <p class="mt-2">{{ ad.detail }}</p>
        </div>
        <div class="py-2">
          <p class="font-semibold text-red-500">Kategori</p>
          <p class="mt-2">{{ ad.category.name }}</p>
        </div>
        <div class="py-2">
          <div>
            <p class="font-semibold text-red-500">Hubungi kontak berikut</p>
            <div class="mt-2">
              <p>Nama: {{ ad.user.name }}</p>
              <p>
                Nomor HP:
                {{
                  ad.user.phone_number ? ad.user.phone_number : 'Tidak tersedia'
                }}
              </p>
              <p>
                Nomor Whatsapp:
                {{
                  ad.user.whatsapp_phone_number
                    ? ad.user.whatsapp_phone_number
                    : 'Tidak tersedia'
                }}
              </p>
            </div>
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
          hid: 'title',
          name: 'title',
          content: this.ad.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.ad.detail,
        },
      ],
    }
  },
  async asyncData({ $axios, route }) {
    const response = await $axios.$get('/v1/items/' + route.params.slug)
    return { ad: response.data }
  },
  data() {
    return {
      ad: {},
      slug: this.$route.params.slug,
    }
  },
}
</script>
