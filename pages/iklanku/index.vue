<template>
  <div>
    <div class="py-4">
      <h1 class="text-3xl font-bold">Iklanku</h1>
    </div>
    <div class="my-4 space-y-4 text-gray-800">
      <div class="flex flex-col space-y-8">
        <div v-for="item in items.data" :key="item.id">
          <nuxt-link
            :to="{ name: 'item-slug', params: { slug: item.slug } }"
            class="block text-xl font-semibold transition duration-500 hover:text-gray-700"
            >{{ item.title }}</nuxt-link
          >
          <div class="mt-4 text-sm text-gray-600">
            <p>Status: {{ item.status }}</p>
            <p>
              Terbit: {{ $moment(item.time_start).fromNow() }} ({{
                $moment(item.time_start).format('LL')
              }})
            </p>
            <p>
              Selesai: {{ $moment(item.time_end).fromNow() }} ({{
                $moment(item.time_end).format('LL')
              }})
            </p>
          </div>
          <div class="flex justify-end mt-4 text-sm">
            <div class="relative inline-block text-left">
              <client-only>
                <div>
                  <span class="rounded-md shadow-sm">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      @click="
                        dropdownItemIdOpen === item.id
                          ? (dropdownItemIdOpen = 0)
                          : (dropdownItemIdOpen = item.id)
                      "
                    >
                      Pilihan
                      <!-- Heroicon name: chevron-down -->
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </div>

                <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-class="transform scale-95 opacity-0"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div
                    v-show="dropdownItemIdOpen === item.id"
                    class="absolute right-0 z-10 w-56 mt-2 origin-top-right rounded-md shadow-lg"
                  >
                    <div
                      class="bg-white rounded-md shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div class="py-1">
                        <nuxt-link
                          :to="{
                            name: 'iklanku-slug-edit',
                            params: { slug: item.slug },
                          }"
                          class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                          >Edit</nuxt-link
                        >
                        <!-- <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            >Buat lagi seperti ini</a
                          > -->
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <div class="py-1">
                        <!-- <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            >Batal terbit</a
                          > -->
                        <button
                          @click="push(item)"
                          class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Terbit ulang (sundul)
                        </button>
                      </div>
                      <div class="border-t border-gray-100"></div>
                      <!-- <div class="py-1">
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            >Bagikan</a
                          >
                          <button
                            @click="copyLink(item.id)"
                            class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                          >
                            Salin link
                          </button>
                        </div> -->
                      <div class="border-t border-gray-100"></div>
                      <div class="py-1">
                        <button
                          @click="deleteAd(item)"
                          class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </client-only>
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
      dropdownItemIdOpen: 0,
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
    copyLink(id) {
      console.log(this.$refs)
      // console.log(this.$refs.itemLink[id])
    },
    push(item) {
      if (confirm('Perbarui iklan selama 90 hari kedepan?')) {
        this.$axios
          .put(`/v1/items/${item.slug}/push`)
          .then(() => {
            this.refetch()
            this.$toast.success('Iklan telah diperbarui.', {
              duration: 6000,
            })
          })
          .catch(() => {
            this.$toast.error('Iklan gagal diperbarui', {
              duration: 6000,
            })
          })
      }
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
