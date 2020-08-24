<template>
  <div>
    <div>
      <h1 class="text-3xl font-bold text-grey-800">
        {{ ad.title }}
      </h1>
      <div class="py-4">
        <p class="font-medium text-red-500 text-xl">Rp. {{ ad.price }}</p>
      </div>
      <p class="py-4">{{ ad.detail }}</p>
    </div>
    <div class="py-4">
      <div v-if="ad.user">
        <p class="font-medium text-red-400">Hubungi kontak berikut:</p>
        <p>Nama: {{ ad.user.name }}</p>
        <p>Email: {{ ad.user.email }}</p>
      </div>
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
</template>

<script>
import gql from 'graphql-tag'

export default {
  head() {
    return {
      title: this.ad.title || 'Detail iklan',
    }
  },
  data() {
    return {
      ad: '',
      slug: this.$route.params.slug,
    }
  },
  apollo: {
    ad: {
      variables() {
        return {
          slug: this.$route.params.slug,
        }
      },
      query: gql`
        query($slug: String!) {
          ad: findAd(slug: $slug) {
            id
            price
            title
            detail
            user {
              name
              email
            }
          }
        }
      `,
    },
  },
}
</script>
