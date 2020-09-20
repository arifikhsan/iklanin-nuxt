<template>
  <div class="space-y-8">
    <div class="md:flex md:space-x-6 lg:space-x-10 lg:px-4">
      <div class="md:w-1/2 lg:w-1/3 md:mt-4">
        <img
          class="object-cover w-full h-64 rounded-md"
          :src="item.cover_image.url.medium"
        />
        <div class="flex py-2 space-x-2">
          <img
            v-for="image in item.images"
            :key="image.id"
            class="object-cover w-16 h-16 rounded-md"
            :src="image.url.small"
          />
        </div>
      </div>
      <div class="mt-4 md:mt-0 md:w-1/2 lg:w-2/3">
        <h1 class="py-2 text-3xl font-bold text-grey-800">
          {{ item.title }}
        </h1>
        <div class="py-2">
          <p class="font-semibold text-red-500">Harga</p>
          <p class="mt-2">
            {{
              item.price.toLocaleString('id', {
                style: 'currency',
                currency: 'IDR',
              })
            }}
          </p>
        </div>
        <div class="py-2">
          <p class="font-semibold text-red-500">Deksripsi</p>
          <p class="mt-2">{{ item.detail }}</p>
        </div>
        <div class="py-2">
          <p class="font-semibold text-red-500">Kategori</p>
          <p class="mt-2">{{ item.category.name }}</p>
        </div>
        <div class="py-2">
          <div>
            <p class="font-semibold text-red-500">Hubungi kontak berikut</p>
            <div class="mt-2">
              <p>Nama: {{ item.user.name }}</p>
              <p>
                Nomor HP:
                {{
                  item.user.phone_number ? item.user.phone_number : 'Tidak tersedia'
                }}
              </p>
              <p>
                Nomor Whatsapp:
                {{
                  item.user.whatsapp_phone_number
                    ? item.user.whatsapp_phone_number
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
    <div>
      <div class="py-4"><h1 class="text-3xl font-bold">Iklan Sejenis</h1></div>
      <div class="flex flex-wrap">
        <div v-if="item.related.length === 0" class="w-full py-4 text-center">
          <p>Tidak ada iklan yang ditemukan.</p>
        </div>
        <div
          v-else
          class="flex flex-col justify-start w-full my-2 duration-500 md:w-1/3 lg:w-1/4"
          v-for="item in item.related"
          :key="item.id"
        >
          <div
            class="p-2 transition duration-500 ease-in-out rounded-md hover:shadow-md hover:border group hover:border-red-400"
          >
            <nuxt-link :to="{ name: 'item-slug', params: { slug: item.slug } }">
              <img
                class="object-cover w-full h-48 rounded-md"
                :src="item.cover_image_url"
              />
              <div class="p-2">
                <div
                  class="overflow-hidden text-xl font-medium leading-snug text-red-500 truncate group-hover:text-red-600"
                >
                  {{
                    item.price.toLocaleString('id', {
                      style: 'currency',
                      currency: 'IDR',
                    })
                  }}
                </div>
                <div class="mt-1">
                  <p class="truncate-3-lines">
                    {{ item.title }}
                  </p>
                  <p class="mt-1 text-xs">
                    {{ item.user.name }}
                  </p>
                </div>
              </div>
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
      title: this.item.title || 'Detail iklan',
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.item.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.item.detail,
        },
      ],
    }
  },
  async asyncData({ $axios, route }) {
    const response = await $axios.$get('/v1/items/' + route.params.slug)
    return { item: response.data }
  },
  data() {
    return {
      item: {},
      slug: this.$route.params.slug,
    }
  },
}
</script>
