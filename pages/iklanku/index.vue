<template>
  <div>
    <div class="py-4">
      <h1 class="text-3xl font-bold">Iklanku</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <div class="flex flex-col space-y-8">
        <div v-for="item in items.data" :key="item.id">
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p class="truncate-3-lines">{{ item.detail }}</p>
          <div class="flex justify-between mt-2 text-sm">
            <div>
              <nuxt-link
                :to="{ name: 'item-slug', params: { slug: item.slug } }"
                class="inline-block px-4 py-2 text-gray-700 transition duration-500 border rounded hover:border-transparent hover:bg-gray-200"
              >
                Lihat
              </nuxt-link>
              <nuxt-link
                :to="{
                  name: 'iklanku-slug-edit',
                  params: { slug: item.slug },
                }"
                class="inline-block px-4 py-2 text-gray-700 transition duration-500 border rounded hover:border-transparent hover:bg-gray-200"
              >
                Edit
              </nuxt-link>
            </div>
            <div>
              <button
                @click="deleteAd(item)"
                class="inline-block px-4 py-2 text-red-500 transition duration-500 border rounded hover:border-transparent hover:bg-red-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- pagination -->
      <div
        class="flex items-center justify-between py-3 mt-6 bg-white border-gray-200"
      >
        <div class="flex justify-between flex-1 sm:hidden">
          <nuxt-link
            v-if="!items.pagination.is_first_page"
            :to="{
              name: 'iklanku',
              query: { page: items.pagination.prev_page },
            }"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          >
            Previous
          </nuxt-link>
          <div v-else></div>
          <nuxt-link
            v-if="!items.pagination.is_last_page && items.data.length !== 0"
            :to="{
              name: 'iklanku',
              query: { page: items.pagination.next_page },
            }"
            class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          >
            Next
          </nuxt-link>
          <div v-else></div>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm leading-5 text-gray-700">
              Halaman
              <span class="font-medium">{{
                items.pagination.current_page
              }}</span>
              dari
              <span class="font-medium">{{
                items.pagination.total_pages
              }}</span>
              halaman.
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex shadow-sm">
              <nuxt-link
                v-if="!items.pagination.is_first_page"
                :to="{
                  name: 'iklanku',
                  query: { page: items.pagination.prev_page },
                }"
                class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                aria-label="Previous"
              >
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
              <div v-else></div>

              <nuxt-link
                v-if="!items.pagination.is_last_page && items.data.length !== 0"
                :to="{
                  name: 'iklanku',
                  query: { page: items.pagination.next_page },
                }"
                class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                aria-label="Next"
              >
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </nuxt-link>
              <div v-else></div>
            </nav>
          </div>
        </div>
      </div>

      <!-- <div v-for="product in myItems" :key="product.id">
        <div>
          <nuxt-link
            :to="{ name: 'item-slug', params: { slug: product.slug } }"
            class="block py-2 text-xl font-semibold duration-500 hover:text-red-500"
          >
            {{ product.title }}
          </nuxt-link>
        </div>
        <div class="flex mt-1 space-x-2">
          <nuxt-link
            :to="{ name: 'iklanku-slug-edit', params: { slug: product.slug } }"
            class="px-4 py-2 text-sm duration-500 rounded-md hover:bg-red-400"
          >
            Edit
          </nuxt-link>
          <button
            @click="deleteAd(product.slug)"
            class="px-4 py-2 text-sm duration-500 rounded-md hover:bg-red-400"
          >
            Hapus
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Iklanku',
  },
  middleware: 'auth',
  data() {
    return {
      items: {
        data: [],
        pagination: '',
      },
    }
  },
  watchQuery: true,
  async asyncData({ route, $axios }) {
    const page = Object.keys(route.query).length === 0 ? 1 : route.query.page
    const items = await $axios.$get(`/v1/items/me?page=${page}`)
    return { items }
  },
  methods: {
    async refetch() {
      const page =
        Object.keys(this.$route.query).length === 0 ? 1 : this.$route.query.page
      const items = await this.$axios.$get(`/v1/items/me?page=${page}`)
      this.items = items
    },
    deleteAd(item) {
      if (confirm('Hapus iklan ini?')) {
        this.$axios
          .delete(`/v1/items/${item.slug}`)
          .then(() => {
            this.refetch()
            this.$toast.success('Iklan telah dihapus.', {
              duration: 6000,
            })
          })
          .catch(() => {
            this.$toast.error('Iklan gagal dihapus', {
              duration: 6000,
            })
          })
      }
    },
  },
}
</script>
