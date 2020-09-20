<template>
  <div>
    <client-only>
      <form @submit.prevent="sendAd" enctype="multipart/form-data">
        <div class="py-4">
          <h1 class="text-2xl font-semibold text-gray-700">
            Tambahkan iklan
          </h1>
        </div>
        <div class="block">
          <p class="text-gray-700">Judul <span class="text-red-500">*</span></p>
          <input
            type="text"
            v-model="ad.title"
            class="block w-full mt-1 form-input"
            placeholder="Judul iklan"
            required
          />
        </div>
        <div class="mt-4">
          <p class="text-gray-700">
            Gambar <span class="text-red-500">*</span>
          </p>
          <label class="block">
            <input
              type="file"
              class="block w-full mt-1 form-input"
              accept="image/*"
              @change="onFileChange"
              multiple
              required
            />
          </label>
          <p class="mt-1 text-sm italic text-gray-600">
            Dimensi gambar yang direkomendasikan 1080 x 1080. Ukuran maksimal
            2MB tiap gambar.
          </p>
          <div v-if="ad.images.length != 0">
            <div class="flex flex-wrap mt-4">
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
              class="px-4 py-2 mt-4 text-sm border rounded"
              @click="ad.images = []"
            >
              Hapus semua gambar
            </button>
          </div>
        </div>
        <div class="block mt-4">
          <p class="text-gray-700">Harga <span class="text-red-500">*</span></p>
          <input
            type="number"
            v-model="ad.price"
            class="block w-full mt-1 form-input"
            placeholder="20000"
            required
          />
        </div>
        <div class="block mt-4">
          <p class="text-gray-700">
            Pilih Kategori <span class="text-red-500">*</span>
          </p>
          <select
            v-model="ad.category_id"
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
        </div>
        <div class="block mt-4">
          <p class="text-gray-700">
            Deskripsi <span class="text-red-500">*</span>
          </p>
          <textarea
            v-model="ad.detail"
            class="block w-full mt-1 form-textarea"
            rows="6"
            placeholder="Tulis deskripsi"
            required
          ></textarea>
        </div>
        <div class="my-4">
          <p>Iklan akan langsung tayang hingga 90 hari kedepan.</p>
        </div>
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
              class="block w-full px-4 py-2 mt-2 text-center text-red-500 duration-500 bg-white border border-red-500 rounded-md hover:bg-red-600 hover:text-white"
              :to="{ name: 'item-slug', params: { slug: slug } }"
            >
              <a>Lihat iklan</a>
            </nuxt-link>
          </div>
        </div>
      </form>
    </client-only>
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
        category_id: 1,
        title: 'aa',
        detail: 'aaa',
        price: '123',
        images: [],
        // timeStart: this.$moment().format('YYYY-MM-DDTHH:mm'),
        // timeEnd: this.$moment().add(10, 'days').format('YYYY-MM-DDTHH:mm'),
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
      files.map((file) => {
        this.ad.images.push({
          name: file.name,
          image: file,
          image_display: URL.createObjectURL(file),
          cover: false,
        })
      })
      this.ad.images[0].cover = true
    },
    selectedCoverChange(selectedIndex) {
      this.ad.images.forEach((image, index) => {
        image.cover = index == selectedIndex
      })
    },
    sendAd() {
      const images = this.ad.images.map(
        ({ name, image_display, ...keep }) => keep
      )

      let formData = new FormData()
      formData.append('category_id', this.ad.category_id)
      formData.append('title', this.ad.title)
      formData.append('detail', this.ad.detail)
      formData.append('price', this.ad.price)

      images.forEach((image, index) => {
        formData.append(`image_file[${index}]`, image.image)
        formData.append(`image_cover[${index}]`, image.cover)
      })

      // for (var value of formData.keys()) {
      //   console.log(value)
      // }
      // for (var value of formData.values()) {
      //   console.log(value)
      // }

      this.$axios
        .$post('/v1/items', formData)
        .then((res) => {
          this.$toast.success('Sukses membuat iklan.', {
            duration: 6000,
          })
          this.slug = res.data.slug
          this.done = true
          this.ad.title = ''
          this.ad.detail = ''
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error('Gagal membuat iklan.', {
            duration: 6000,
          })
        })
      // this.$apollo
      //   .mutate({
      //     variables: {
      //       title: this.ad.title,
      //       detail: this.ad.detail,
      //       category_id: this.ad.category_id,
      //       price: parseInt(this.ad.price),
      //       time_start: this.$moment(this.ad.timeStart).toISOString(),
      //       time_end: this.$moment(this.ad.timeEnd).toISOString(),
      //       images: this.ad.images.map(
      //         ({ name, image_display, ...keep }) => keep
      //       ),
      //     },
      //     mutation: gql`
      //       mutation(
      //         $category_id: Int!
      //         $title: String!
      //         $price: Int!
      //         $detail: String!
      //         $time_start: ISO8601DateTime!
      //         $time_end: ISO8601DateTime!
      //         $images: [AdImageInput!]!
      //       ) {
      //         createAd(
      //           input: {
      //             category_id: $category_id
      //             title: $title
      //             price: $price
      //             detail: $detail
      //             timeStart: $time_start
      //             timeEnd: $time_end
      //             images: $images
      //           }
      //         ) {
      //           message
      //           slug
      //         }
      //       }
      //     `,
      //   })
    },
  },
}
</script>
