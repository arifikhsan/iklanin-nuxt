<template>
  <div>
    <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-col space-y-4">
        <div
          class="p-2 border border-red-200 group hover:border-red-400 duration-500 rounded-md"
          v-for="ad in allAds"
          :key="ad.id"
        >
          <nuxt-link
            :to="{ name: 'iklan-slug', params: { slug: ad.slug } }"
            class="text-xl font-medium leading-snug text-red-500 group-hover:text-red-600"
          >
            {{ ad.title }}
          </nuxt-link>
          <div class="flex mt-2 justify-start">
            <p class="text-xs">
              {{ ad.user.name }}
            </p>
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
  data() {
    return {
      allAds: '',
    }
  },
  apollo: {
    allAds: gql`
      query {
        allAds {
          id
          title
          slug
          user {
            name
          }
        }
      }
    `,
  },
}
</script>
