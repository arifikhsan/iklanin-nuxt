<template>
  <div class="space-y-8">
    <div class="flex flex-col">
      <div>
        <h1 class="py-2 text-3xl font-bold leading-relaxed text-grey-800">
          {{ item.title }}
        </h1>
      </div>
      <div class="mt-6 md:flex md:space-x-6 lg:space-x-10">
        <div class="md:w-1/2 lg:w-2/5 md:mt-4">
          <div
            @click="toggleSlide"
            class="bg-gray-100 rounded-md cursor-pointer"
          >
            <img
              class="object-contain w-full h-64"
              :src="coverImage.url.medium"
              :alt="coverImage.detail"
            />
          </div>
          <div class="fixed inset-0" v-show="slideOpen">
            <div
              @click="toggleSlide"
              class="flex flex-col items-center justify-between w-full h-full bg-gray-800 bg-opacity-75"
            >
              <div class="w-full text-right">
                <button class="p-2 text-white">
                  Tutup
                </button>
              </div>
              <img :src="coverImage.url.original" :alt="coverImage.detail" />
              <div></div>
            </div>
          </div>
          <div class="flex flex-wrap py-2">
            <div
              v-for="image in item.images"
              :key="image.id"
              class="mb-2 mr-2 bg-gray-100 rounded-md cursor-pointer"
              :class="{
                'border-2 border-red-500': image.id === coverImage.id,
              }"
            >
              <img
                class="object-contain w-16 h-16"
                :src="image.url.small"
                :alt="image.detail"
                @click="coverImage = image"
              />
            </div>
          </div>
        </div>
        <div class="mt-4 md:mt-0 md:w-1/2 lg:w-3/5">
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
            <p class="font-semibold text-red-500">Kategori</p>
            <p class="mt-2">{{ item.category.name }}</p>
          </div>
          <div class="py-2">
            <p class="font-semibold text-red-500">Hubungi kontak berikut</p>
            <div class="mt-2">
              <p>Nama: {{ item.user.name }}</p>
              <p>
                Nomor HP:
                {{
                  item.user.phone_number
                    ? item.user.phone_number
                    : 'Tidak tersedia'
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
          <div class="py-2">
            <p class="font-semibold text-red-500">Deksripsi</p>
            <p class="mt-2 prose break-words" v-html="item.detail"></p>
          </div>
          <div class="py-2">
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
    <div>
      <div class="py-4"><h1 class="text-3xl font-bold">Iklan Sejenis</h1></div>
      <div class="flex flex-wrap -mx-2">
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
    const coverImage = response.data.images.find((e) => e.cover)
    return { item: response.data, coverImage }
  },
  data() {
    return {
      item: {},
      slug: this.$route.params.slug,
      coverImage: {
        url: {},
      },
      slideOpen: false,
    }
  },
  methods: {
    toggleSlide() {
      this.slideOpen = !this.slideOpen
    },
  },
}
</script>
