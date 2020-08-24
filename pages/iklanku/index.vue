<template>
  <div>
    <div class="py-4">
      <h1 class="text-2xl font-semibold text-gray-700">Iklanku</h1>
    </div>
    <div class="mt-4 space-y-4 text-gray-800">
      <div v-for="product in myAds" :key="product.id">
        <div>
          <nuxt-link
            :to="{ name: 'iklan-slug', params: { slug: product.slug } }"
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
      </div>
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
      myAds: '',
    }
  },
  apollo: {
    myAds: gql`
      query {
        myAds {
          id
          slug
          title
        }
      }
    `,
  },
  methods: {
    async deleteAd(slug) {
      await this.$apollo
        .mutate({
          variables: {
            slug,
          },
          mutation: gql`
            mutation($slug: String!) {
              deleteAd(input: { slug: $slug }) {
                message
              }
            }
          `,
        })
        .then(() => {
          this.$toast.success('Iklan telah dihapus.', {
            duration: 6000,
          })
          this.$apollo.queries.myAds.refetch()
        })
        .catch(() => {
          this.$toast.error('Iklan gagal dihapus', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
