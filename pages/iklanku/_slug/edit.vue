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
          v-model="ad.category.id"
          class="form-select block w-full mt-1"
          required
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
          v-model="newTimeStart"
          class="block w-full mt-1 form-input"
          required
        />
      </label>
      <label class="block mt-3">
        <span class="text-gray-700">Tanggal selesai terbit</span>
        <input
          type="datetime-local"
          v-model="newTimeEnd"
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
            Update
          </button>
        </div>
        <div v-else>
          <nuxt-link
            class="block w-full px-4 py-2 mt-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
            :to="{ name: 'item-slug', params: { slug: newslug } }"
          >
            <a>Lihat Iklan</a>
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
    title: 'Edit iklan',
  },
  middleware: 'auth',
  data() {
    return {
      ad: {
        category: {},
      },
      categories: {},
      done: false,
      newslug: '',
    }
  },
  computed: {
    newTimeStart: {
      get() {
        return this.$moment(this.ad.timeStart).format('YYYY-MM-DDTHH:mm')
      },
      set(val) {
        this.ad.timeStart = val
      },
    },
    newTimeEnd: {
      get() {
        return this.$moment(this.ad.timeEnd).format('YYYY-MM-DDTHH:mm')
      },
      set(val) {
        this.ad.timeEnd = val
      },
    },
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
            category {
              id
            }
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
  methods: {
    updateAd() {
      this.$apollo
        .mutate({
          variables: {
            slug: this.$route.params.slug,
            title: this.ad.title,
            detail: this.ad.detail,
            category_id: this.ad.category.id,
            price: parseInt(this.ad.price),
            time_start: this.$moment(this.ad.timeStart).toISOString(),
            time_end: this.$moment(this.ad.timeEnd).toISOString(),
          },
          mutation: gql`
            mutation(
              $slug: String!
              $category_id: Int!
              $title: String!
              $price: Int!
              $detail: String!
              $time_start: ISO8601DateTime!
              $time_end: ISO8601DateTime!
            ) {
              updateAd(
                input: {
                  slug: $slug
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
          this.$toast.success('Sukses mengupdate iklan.', {
            duration: 6000,
          })
          this.newslug = res.data.updateAd.slug
          this.done = true
        })
        .catch((err) => {
          this.$toast.error('Gagal mengupdate iklan.', {
            duration: 6000,
          })
        })
    },
  },
}
</script>
