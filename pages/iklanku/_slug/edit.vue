<template>
  <div>
    <form @submit.prevent="updateAd">
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">Edit iklan</h1>
      </div>
      <label class="block">
        <span class="text-gray-700">Judul</span>
        <input
          type="text"
          v-model="ad.title"
          class="block w-full mt-1 form-input"
          placeholder="Judul iklan"
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Harga</span>
        <input
          type="number"
          v-model="ad.price"
          class="block w-full mt-1 form-input"
          placeholder="20000"
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Pilih Kategori</span>
        <select
          v-model="ad.categoryIds"
          class="form-multiselect block w-full mt-1"
          multiple
        >
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
            >{{ category.name }}
          </option>
        </select>
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Deskripsi</span>
        <textarea
          v-model="ad.detail"
          class="block w-full mt-1 form-textarea"
          rows="3"
          placeholder="Deskripsi iklan"
          required
        ></textarea>
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Tanggal mulai terbit</span>
        <input
          type="datetime-local"
          :value="$moment(ad.timeStart).format('YYYY-MM-DDTHH:mm')"
          @change="changeTimeStart"
          class="block w-full mt-1 form-input"
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Tanggal selesai terbit</span>
        <input
          type="datetime-local"
          :value="$moment(ad.timeEnd).format('YYYY-MM-DDTHH:mm')"
          class="block w-full mt-1 form-input"
        />
      </label>
      <div class="mt-4">
        <button
          class="block w-full px-4 py-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Update
        </button>
      </div>
      <div v-if="done">
        <nuxt-link
          class="block w-full px-4 py-2 mt-2 text-center text-white duration-500 bg-blue-500 rounded-md hover:bg-blue-600"
          :to="{ name: 'barang-slug', params: { slug: newslug } }"
        >
          <a>Lihat barang</a>
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Edit barang',
  },
  middleware: 'auth',
  data() {
    return {
      ad: {},
      categories: {},
      done: false,
      newslug: '',
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
            timeStart
            timeEnd
          }
        }
      `,
    },
    categories: gql`
      query {
        categories: allCategories {
          id
          name
          slug
        }
      }
    `,
  },
  created() {
    console.log(this.ad)
    console.log(this.$moment(this.ad.timeStart).format('YYYY-MM-DDTHH:mm'))
    // this.getProduct()
  },
  methods: {
    changeTimeStart(e) {
      console.log(e)
    },
    async getProduct() {
      const slug = this.$route.params.slug
      const product = await this.$apollo.mutate({
        variables: {
          slug,
        },
        mutation: gql`
          mutation($slug: String!) {
            getProduct(input: { slug: $slug }) {
              product {
                id
                name
                detail
              }
            }
          }
        `,
      })
      const result = product.data.getProduct.product
      this.product = result
    },
    updateAd() {
      this.$apollo
        .mutate({
          variables: {
            slug: this.$route.params.slug,
            name: this.product.name,
            detail: this.product.detail,
          },
          mutation: gql`
            mutation($slug: String!, $name: String!, $detail: String!) {
              updateAd(input: { slug: $slug, name: $name, detail: $detail }) {
                message
                slug
              }
            }
          `,
        })
        .then((res) => {
          this.$toast.success('Sukses mengupdate barang.', {
            duration: 6000,
          })
          this.newslug = res.data.updateAd.slug
          this.done = true
        })
        .catch(() => {
          this.$toast.error('Gagal mengupdate barang.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
