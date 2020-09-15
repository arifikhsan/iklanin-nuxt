<template>
  <div>
    <client-only>
      <div class="sm:px-4">
        <div class="mt-4">
          <h1 class="text-3xl font-bold text-red-500">Terbaru</h1>
          <div class="flex flex-wrap mt-4">
            <div v-if="ads.data.length === 0" class="w-full py-4 text-center">
              <p>Tidak ada iklan yang ditemukan.</p>
            </div>
            <div
              v-else
              class="flex flex-col justify-start w-1/2 my-2 duration-500 sm:w-1/3 md:w-1/4"
              v-for="ad in ads.data"
              :key="ad.id"
            >
              <div
                class="p-2 transition duration-500 ease-in-out rounded-md hover:shadow-md hover:border group hover:border-red-400"
              >
                <nuxt-link
                  :to="{ name: 'iklan-slug', params: { slug: ad.slug } }"
                >
                  <img
                    class="object-cover w-full h-32 rounded-md"
                    :src="ad.cover_image_url"
                  />
                  <div class="p-2">
                    <div
                      class="overflow-hidden text-xl font-medium leading-snug text-red-500 truncate group-hover:text-red-600"
                    >
                      {{
                        ad.price.toLocaleString('id', {
                          style: 'currency',
                          currency: 'IDR',
                        })
                      }}
                    </div>
                    <div class="mt-1">
                      <p class="truncate-3-lines">
                        {{ ad.title }}
                      </p>
                      <p class="mt-1 text-xs">
                        {{ ad.user.name }}
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between py-3 mt-6 bg-white border-t border-gray-200"
          >
            <div class="flex justify-between flex-1 sm:hidden">
              <nuxt-link
                v-if="!ads.pagination.is_first_page"
                :to="{
                  name: 'home',
                  query: { page: ads.pagination.prev_page },
                }"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
              >
                Previous
              </nuxt-link>
              <div v-else></div>
              <nuxt-link
                v-if="!ads.pagination.is_last_page && ads.data.length !== 0"
                :to="{
                  name: 'home',
                  query: { page: ads.pagination.next_page },
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
                    ads.pagination.current_page
                  }}</span>
                  dari
                  <span class="font-medium">{{
                    ads.pagination.total_pages
                  }}</span>
                  halaman.
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex shadow-sm">
                  <nuxt-link
                    v-if="!ads.pagination.is_first_page"
                    :to="{
                      name: 'home',
                      query: { page: ads.pagination.prev_page },
                    }"
                    class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                    aria-label="Previous"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </nuxt-link>
                  <div v-else></div>

                  <nuxt-link
                    v-if="!ads.pagination.is_last_page && ads.data.length !== 0"
                    :to="{
                      name: 'home',
                      query: { page: ads.pagination.next_page },
                    }"
                    class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                    aria-label="Next"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
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
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Iklan Terbaru',
  },
  data() {
    return {
      ads: {
        data: [],
        pagination: '',
      },
    }
  },
  watchQuery: true,
  async asyncData({ route, $axios }) {
    const pageNumber =
      Object.keys(route.query).length === 0 ? 1 : route.query.page
    const url = `/v1/ads?page=${pageNumber}`
    console.log(url)

    const ads = await $axios.$get(url)
    return { ads }
  },
}
</script>
