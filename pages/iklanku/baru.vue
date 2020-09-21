<template>
  <div>
    <client-only>
      <div class="max-w-md mx-auto">
        <form @submit.prevent="sendAd" enctype="multipart/form-data">
          <div class="py-4">
            <h1 class="text-2xl font-semibold text-gray-700">
              Tambahkan iklan
            </h1>
          </div>
          <div class="block">
            <p class="text-gray-700">
              Judul <span class="text-red-500">*</span>
            </p>
            <input
              type="text"
              v-model="item.title"
              class="block w-full mt-1 form-input"
              placeholder="Judul iklan"
              required
            />
          </div>
          <div class="mt-4">
            <p class="text-gray-700">
              Gambar <span class="text-red-500">*</span>
            </p>
            <div>
              <div class="flex flex-wrap mt-4 space-y-6 md:space-x-6">
                <div
                  v-show="item.images.length != 0"
                  v-for="(image, index) in item.images"
                  :key="image.id"
                >
                  <img
                    class="object-cover w-48 h-32 border rounded-md"
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
                      <span class="ml-2 text-sm">Sampul</span>
                    </label>
                    <div class="text-sm">
                      <p class="text-gray-700">
                        Deskripsi singkat
                      </p>
                      <textarea
                        rows="4"
                        type="text"
                        class="block w-full mt-1 text-sm form-textarea"
                        placeholder="Tampak depan/samping/belakang"
                        v-model="image.detail"
                        required
                      />
                    </div>
                    <div class="mt-4">
                      <button
                        @click="removeImage(image)"
                        class="w-full px-4 py-2 text-sm text-center text-red-500 duration-500 bg-white border border-red-500 rounded-md hover:text-white hover:border-transparent hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
                <!-- add image -->
                <div
                  class="relative flex items-center justify-center w-48 h-48 p-2 mt-1 border-2 border-red-500 border-dashed rounded-md"
                >
                  <p class="text-sm italic text-center">Upload gambar</p>
                  <input
                    type="file"
                    class="absolute block w-full h-full bg-red-300 opacity-0 pin-r pin-t"
                    accept="image/*"
                    @change="onFileChange"
                    multiple
                    required
                  />
                </div>
              </div>
            </div>
            <p class="mt-1 text-sm italic text-gray-600">
              Dimensi gambar yang direkomendasikan 1080 x 1080. Ukuran maksimal
              2MB tiap gambar.
            </p>
          </div>
          <div class="block mt-4">
            <p class="text-gray-700">
              Harga <span class="text-red-500">*</span>
            </p>
            <input
              type="number"
              v-model="item.price"
              class="block mt-1 form-input"
              placeholder="20000"
              required
            />
          </div>
          <div class="block mt-4">
            <p class="text-gray-700">
              Pilih Kategori <span class="text-red-500">*</span>
            </p>
            <select
              v-model="item.category_id"
              class="block mt-1 form-select"
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
              v-model="item.detail"
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
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Tambahkan iklan',
  },
  middleware: 'auth',
  data() {
    return {
      item: {
        category_id: '',
        title: '',
        detail: '',
        price: null,
        images: [],
        // timeStart: this.$moment().format('YYYY-MM-DDTHH:mm'),
        // timeEnd: this.$moment().add(10, 'days').format('YYYY-MM-DDTHH:mm'),
      },
      done: false,
      slug: '',
      categories: {},
    }
  },
  async asyncData({ $axios, route }) {
    const categories = await $axios.$get('/v1/categories')

    return { categories: categories.data }
  },
  methods: {
    onFileChange(e) {
      const newFiles = [...e.target.files]
      const uploadedImages = [...this.item.images]
      const uploadedImageFiles = uploadedImages.map((e) => e.image.name)

      const newFilesNotDuplicate = []
      newFiles.forEach((newFile) => {
        if (uploadedImageFiles.includes(newFile.name)) {
          this.$toast.info(`Gambar ${newFile.name} sudah ada.`, {
            duration: 6000,
          })
        } else {
          newFilesNotDuplicate.push(newFile)
        }
      })

      // add
      newFilesNotDuplicate.map((file) => {
        this.item.images.push({
          id: Math.random(),
          name: file.name,
          detail: file.name.replace(/\.[^/.]+$/, ''),
          image: file,
          image_display: URL.createObjectURL(file),
          cover: false,
        })
      })

      // jika belum ada cover
      if (this.item.images.find((e) => e.cover !== true)) {
        this.item.images[0].cover = true
      }
    },
    selectedCoverChange(selectedIndex) {
      this.item.images.forEach((image, index) => {
        image.cover = index == selectedIndex
      })
    },
    removeImage(image) {
      this.item.images.splice(this.item.images.indexOf(image), 1)
    },
    sendAd() {
      const images = this.item.images.map(
        ({ id, image_display, ...keep }) => keep
      )

      let formData = new FormData()
      formData.append('category_id', this.item.category_id)
      formData.append('title', this.item.title)
      formData.append('detail', this.item.detail)
      formData.append('price', this.item.price)

      images.forEach((image, index) => {
        formData.append(`image_name[${index}]`, image.name)
        formData.append(`image_file[${index}]`, image.image)
        formData.append(`image_cover[${index}]`, image.cover)
        formData.append(`image_detail[${index}]`, image.detail)
      })

      this.$axios
        .$post('/v1/items', formData)
        .then((res) => {
          this.$toast.success('Sukses membuat iklan.', {
            duration: 6000,
          })
          this.slug = res.data.slug
          this.done = true
          this.item.title = ''
          this.item.detail = ''
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
      //       title: this.item.title,
      //       detail: this.item.detail,
      //       category_id: this.item.category_id,
      //       price: parseInt(this.item.price),
      //       time_start: this.$moment(this.item.timeStart).toISOString(),
      //       time_end: this.$moment(this.item.timeEnd).toISOString(),
      //       images: this.item.images.map(
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
