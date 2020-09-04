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
      <div class="mt-3">
        <p class="text-gray-700">Gambar <span class="text-red-500">*</span></p>
        <label class="block">
          <input
            type="file"
            class="block w-full mt-1 form-input"
            placeholder="Judul iklan"
            accept="image/*"
            @change="onFileChange"
            multiple
            required
          />
        </label>
        <p class="mt-1 text-sm italic text-gray-600">
          Dimensi gambar yang direkomendasikan 1080 x 1080. Ukuran maksimal 2MB
          tiap gambar.
        </p>
        <div v-if="ad.images.length != 0">
          <div class="flex flex-wrap mt-3">
            <div
              v-for="(image, index) in ad.images"
              :key="image.name"
              class="m-2"
            >
              <img
                class="object-cover w-32 h-32 border"
                :src="image.image_display"
              />
              <div class="mt-2">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    class="text-red-500 form-radio"
                    name="radio"
                    :value="index"
                    @change="selectedCoverChange(index)"
                    :checked="index == 0"
                  />
                  <span class="ml-2">Sampul</span>
                </label>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="px-4 py-2 mt-3 text-sm border rounded"
            @click="ad.images = []"
          >
            Hapus semua gambar
          </button>
        </div>
      </div>
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
          v-model="ad.categoryId"
          class="block w-full mt-1 form-select"
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
        title: 'aa',
        images: [],
        detail: 'aa',
        categoryId: 1,
        price: '123',
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
    onFileChange(e) {
      const files = [...e.target.files]
      console.log(files)
      files.map((file) => {
        this.ad.images.push({
          name: file.name,
          image: file,
          image_display: URL.createObjectURL(file),
          cover: false,
        })
      })
      if (this.ad.images.length == 1) {
        this.ad.images[0].cover = true
      }
      console.log(this.ad.images)
    },
    selectedCoverChange(selectedIndex) {
      console.log(selectedIndex)
      this.ad.images.forEach((image, index) => {
        image.cover = index == selectedIndex
      })
      console.log(this.ad.images)
    },
    sendAd() {
      console.log(this.ad.images)
      // this.$apollo
      //   .mutate({
      //     variables: {
      //       ad_id: 1,
      //       // name: this.ad.images[0].name,
      //       image: this.ad.images[0].image,
      //       cover: this.ad.images[0].cover,
      //     },
      //     mutation: gql`
      //       mutation(
      //         $ad_id: Int!
      //         # $name: String!
      //         $image: [Upload!]!
      //         $cover: Boolean!
      //       ) {
      //         createAdImages(
      //           input: {
      //             adId: $ad_id
      //             # name: $name
      //             image: $image
      //             cover: $cover
      //           }
      //         ) {
      //           message
      //         }
      //       }
      //     `,
      //   })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err))
      // this.$apollo
      //   .mutate({
      //     variables: {
      //       title: this.ad.title,
      //       detail: this.ad.detail,
      //       category_id: this.ad.categoryIds,
      //       price: parseInt(this.ad.price),
      //       time_start: this.$moment(this.ad.timeStart).toISOString(),
      //       time_end: this.$moment(this.ad.timeEnd).toISOString(),
      //     },
      //     mutation: gql`
      //       mutation(
      //         $category_id: Int!
      //         $title: String!
      //         $price: Int!
      //         $detail: String!
      //         $time_start: ISO8601DateTime!
      //         $time_end: ISO8601DateTime!
      //       ) {
      //         createAd(
      //           input: {
      //             categoryId: $category_id
      //             title: $title
      //             price: $price
      //             detail: $detail
      //             timeStart: $time_start
      //             timeEnd: $time_end
      //           }
      //         ) {
      //           message
      //           slug
      //         }
      //       }
      //     `,
      //   })
      //   .then((res) => {
      //     this.$toast.success('Sukses membuat iklan.', {
      //       duration: 6000,
      //     })
      //     this.slug = res.data.createAd.slug
      //     this.done = true
      //     this.ad.title = ''
      //     this.ad.detail = ''
      //   })
      //   .catch(() => {
      //     this.$toast.error('Gagal membuat iklan.', {
      //       duration: 6000,
      //     })
      //   })
    },
  },
}
</script>
