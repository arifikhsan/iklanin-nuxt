<template>
  <div>
    <div class="max-w-md mx-auto">
        <form @submit.prevent="updateItem" enctype="multipart/form-data">
          <div class="py-4">
            <h1 class="text-2xl font-semibold text-gray-700">
              Edit iklan
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
                Update
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
  </div>
</template>

<script>
export default {
  head: {
    title: 'Edit iklan',
  },
  middleware: 'auth',
  data() {
    return {
      item: {
        category: {},
      },
      categories: {},
      done: false,
      newslug: '',
    }
  },
  async asyncData({ $axios, route }) {
    const items = await $axios.$get('/v1/items/' + route.params.slug)
    const categories = await $axios.$get('/v1/categories')

    return { item: items.data, categories: categories.data }
  },
  computed: {
    newTimeStart: {
      get() {
        return this.$moment(this.item.timeStart).format('YYYY-MM-DDTHH:mm')
      },
      set(val) {
        this.item.timeStart = val
      },
    },
    newTimeEnd: {
      get() {
        return this.$moment(this.item.timeEnd).format('YYYY-MM-DDTHH:mm')
      },
      set(val) {
        this.item.timeEnd = val
      },
    },
  },
  methods: {
    // updateItem() {
    //   this.$apollo
    //     .mutate({
    //       variables: {
    //         slug: this.$route.params.slug,
    //         title: this.item.title,
    //         detail: this.item.detail,
    //         category_id: this.item.category.id,
    //         price: parseInt(this.item.price),
    //         time_start: this.$moment(this.item.timeStart).toISOString(),
    //         time_end: this.$moment(this.item.timeEnd).toISOString(),
    //       },
    //       mutation: gql`
    //         mutation(
    //           $slug: String!
    //           $category_id: Int!
    //           $title: String!
    //           $price: Int!
    //           $detail: String!
    //           $time_start: ISO8601DateTime!
    //           $time_end: ISO8601DateTime!
    //         ) {
    //           updateAd(
    //             input: {
    //               slug: $slug
    //               categoryId: $category_id
    //               title: $title
    //               price: $price
    //               detail: $detail
    //               timeStart: $time_start
    //               timeEnd: $time_end
    //             }
    //           ) {
    //             message
    //             slug
    //           }
    //         }
    //       `,
    //     })
    //     .then((res) => {
    //       this.$toast.success('Sukses mengupdate iklan.', {
    //         duration: 6000,
    //       })
    //       this.newslug = res.data.updateAd.slug
    //       this.done = true
    //     })
    //     .catch((err) => {
    //       this.$toast.error('Gagal mengupdate iklan.', {
    //         duration: 6000,
    //       })
    //     })
    // },
  },
}
</script>
