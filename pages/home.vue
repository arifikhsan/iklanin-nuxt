<template>
  <div>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div>
        <h1 class="text-3xl font-bold text-red-500">Dipromosikan</h1>
        <div class="flex flex-wrap mt-4">
          <div
            class="flex flex-col justify-start w-1/2 p-1 duration-500 rounded-md sm:w-1/3 hover:shadow-md hover:border group hover:border-red-400"
            v-for="ad in ads.data"
            :key="ad.id"
          >
            <nuxt-link :to="{ name: 'iklan-slug', params: { slug: ad.slug } }">
              <div class="w-full h-32 bg-red-400 rounded-md"></div>
              <div class="p-2">
                <div
                  class="text-xl font-medium leading-snug text-red-500 group-hover:text-red-600"
                >
                  Rp. {{ ad.price }}
                </div>
                <div class="mt-1">
                  <p class="font-medium">
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
      <div class="mt-4">
        <h1 class="text-3xl font-bold text-red-500">Terbaru</h1>
        <div class="flex flex-wrap mt-4">
          <div
            class="flex flex-col justify-start w-1/2 p-1 duration-500 rounded-md sm:w-1/3 hover:shadow-md hover:border group hover:border-red-400"
            v-for="ad in ads.data"
            :key="ad.id"
          >
            <nuxt-link :to="{ name: 'iklan-slug', params: { slug: ad.slug } }">
              <div class="w-full h-32 bg-red-400 rounded-md"></div>
              <div class="p-2">
                <div
                  class="text-xl font-medium leading-snug text-red-500 group-hover:text-red-600"
                >
                  Rp. {{ ad.price }}
                </div>
                <div class="mt-1">
                  <p class="font-medium">
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
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Iklan Terbaru',
  },
  async asyncData({ $axios }) {
    const ads = await $axios.$get('/v1/ads')
    return { ads }
  },
  data() {
    return {
      allAds: '',
      ads: '',
    }
  },
}
</script>
