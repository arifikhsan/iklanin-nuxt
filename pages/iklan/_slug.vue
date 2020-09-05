<template>
  <div>
    <div>
      <h1 class="text-3xl font-bold text-grey-800">
        {{ ad.title }}
      </h1>
      <div class="py-2">
        <p class="font-medium text-red-400">Harga</p>
        <p class="mt-2">Rp. {{ ad.price }}</p>
      </div>
      <div class="py-2">
        <p class="font-medium text-red-400">Deksripsi</p>
        <p class="mt-2">{{ ad.detail }}</p>
      </div>
      <div class="py-2">
        <p class="font-medium text-red-400">Kategori</p>
        <p class="mt-2">{{ ad.category.name }}</p>
      </div>
    </div>
    <div class="py-2">
      <div>
        <p class="font-medium text-red-400">Hubungi kontak berikut</p>
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
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Detail Nuxt.js ',
        },
      ],
    }
  },
  data() {
    return {
      ad: {
        user: {},
        category: {},
      },
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
            category {
              name
            }
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
