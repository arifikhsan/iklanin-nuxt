<template>
  <div>
    <div class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <client-only>
        <div class="flex flex-col space-y-4">
          <div
            class="p-2 duration-500 border border-red-200 rounded-md group hover:border-red-400"
            v-for="ad in allAds"
            :key="ad.id"
          >
            <nuxt-link
              :to="{ name: 'iklan-slug', params: { slug: ad.slug } }"
              class="text-xl font-medium leading-snug text-red-500 group-hover:text-red-600"
            >
              {{ ad.title }}
            </nuxt-link>
            <div class="flex justify-start mt-2">
              <p class="text-xs">
                {{ ad.user.name }}
              </p>
            </div>
          </div>
        </div>
      </client-only>
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
