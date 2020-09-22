<template>
  <div>
    <client-only>
      <div>
        <div class="mt-4">
          <h1 class="text-3xl font-bold">Terbaru</h1>
          <div class="flex flex-wrap mt-4 -mr-2">
            <div v-if="items.data.length === 0" class="w-full py-4 text-center">
              <p>Tidak ada iklan yang ditemukan.</p>
            </div>
            <div
              v-else
              class="flex flex-col justify-start w-1/2 my-2 duration-500 md:w-1/3 lg:w-1/4"
              v-for="ad in items.data"
              :key="ad.id"
            >
              <div
                class="p-2 transition duration-500 ease-in-out rounded-md hover:shadow-md hover:border group hover:border-red-400"
              >
                <nuxt-link
                  :to="{ name: 'item-slug', params: { slug: ad.slug } }"
                >
                  <img
                    class="object-cover w-32 h-32 rounded-md md:w-48 md:h-48"
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

          <pagination link-name="home" :items="items"></pagination>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import pagination from '@/components/pagination'

export default {
  head: {
    title: 'Iklan Terbaru',
  },
  components: {
    pagination,
  },
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
    const pageNumber =
      Object.keys(route.query).length === 0 ? 1 : route.query.page
    const url = `/v1/items?page=${pageNumber}`

    const items = await $axios.$get(url)
    return { items }
  },
}
</script>
