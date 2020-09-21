<template>
  <div>
    <div class="py-4">
      <h1 class="text-3xl font-bold">Iklanku</h1>
    </div>
    <div class="my-4 space-y-4 text-gray-800">
      <div class="flex flex-col space-y-8">
        <div v-for="item in items.data" :key="item.id">
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p class="truncate-3-lines">{{ item.detail }}</p>
          <div class="mt-4 text-sm">
            <p>Tanggal terbit: {{ $moment(item.time_start).format('LLLL') }}</p>
            <p>Tanggal selesai: {{ $moment(item.time_end).format('LLLL') }}</p>
          </div>
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
    <pagination link-name="iklanku" :items="items"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/pagination'

export default {
  head: {
    title: 'Iklanku',
  },
  components: {
    pagination,
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
