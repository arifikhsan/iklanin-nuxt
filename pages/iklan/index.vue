<template>
  <div>
    <form @submit.prevent="sendAd">
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">
          Tambahkan iklan
        </h1>
      </div>
      <label class="block">
        <span class="text-gray-700">Judul</span>
        <input
          type="text"
          v-model="ad.title"
          class="block w-full mt-1 form-input"
          placeholder="Judul iklan"
          required
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Harga</span>
        <input
          type="number"
          v-model="ad.price"
          class="block w-full mt-1 form-input"
          placeholder="20000"
          required
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Pilih Kategori</span>
        <select
          v-model="ad.categoryIds"
          class="form-select block w-full mt-1"
          required
        >
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Deskripsi</span>
        <textarea
          v-model="ad.detail"
          class="block w-full mt-1 form-textarea"
          rows="6"
          placeholder="Tulis deskripsi"
          required
        ></textarea>
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Tanggal mulai terbit</span>
        <input
          type="datetime-local"
          v-model="ad.timeStart"
          class="block w-full mt-1 form-input"
          required
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Tanggal selesai terbit</span>
        <input
          type="datetime-local"
          v-model="ad.timeEnd"
          class="block w-full mt-1 form-input"
          required
        />
      </label>
      <div class="mt-6">
        <div v-if="!done">
          <button
            class="block w-full px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
            type="submit"
          >
            Kirim
          </button>
        </div>
        <div v-else>
          <nuxt-link
            class="block w-full px-4 py-2 mt-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
            :to="{ name: 'iklan-slug', params: { slug: slug } }"
          >
            <a>Lihat iklan</a>
          </nuxt-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  head: {
    title: 'Tambahkan iklan',
  },
  middleware: 'auth',
  data() {
    return {
      ad: {
        title: '',
        detail: '',
        categoryIds: [],
        price: '',
        timeStart: this.$moment().format('YYYY-MM-DDTHH:mm'),
        timeEnd: this.$moment().add(10, 'days').format('YYYY-MM-DDTHH:mm'),
      },
      done: false,
      slug: '',
      categories: {},
    }
  },
  apollo: {
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
  methods: {
    sendAd() {
      this.$apollo
        .mutate({
          variables: {
            title: this.ad.title,
            detail: this.ad.detail,
            category_id: this.ad.categoryIds,
            price: parseInt(this.ad.price),
            time_start: this.$moment(this.ad.timeStart).toISOString(),
            time_end: this.$moment(this.ad.timeEnd).toISOString(),
          },
          mutation: gql`
            mutation(
              $category_id: Int!
              $title: String!
              $price: Int!
              $detail: String!
              $time_start: ISO8601DateTime!
              $time_end: ISO8601DateTime!
            ) {
              createAd(
                input: {
                  categoryId: $category_id
                  title: $title
                  price: $price
                  detail: $detail
                  timeStart: $time_start
                  timeEnd: $time_end
                }
              ) {
                message
                slug
              }
            }
          `,
        })
        .then((res) => {
          this.$toast.success('Sukses membuat iklan.', {
            duration: 6000,
          })
          this.slug = res.data.createAd.slug
          this.done = true
          this.ad.title = ''
          this.ad.detail = ''
        })
        .catch(() => {
          this.$toast.error('Gagal membuat iklan.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
