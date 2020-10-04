<template>
  <div class="max-w-xl mx-auto">
    <form
      @submit.prevent="updateOrCreateFunction"
      enctype="multipart/form-data"
    >
      <div class="py-4">
        <h1 class="text-2xl font-semibold text-gray-700">
          {{ isEdit ? 'Edit' : 'Tambahkan' }} iklan
        </h1>
      </div>
      <div class="block">
        <p class="text-gray-700">Judul <span class="text-red-500">*</span></p>
        <input
          type="text"
          v-model="item.title"
          class="block w-full mt-1 form-input"
          placeholder="Judul iklan"
          required
        />
      </div>
      <div class="mt-4">
        <p class="text-gray-700">Gambar <span class="text-red-500">*</span></p>
        <div>
          <div class="flex flex-wrap mt-4">
            <div
              v-show="item.images.length != 0"
              v-for="(image, index) in item.images"
              :key="image.id"
              class="p-2"
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
                    v-model="image.cover"
                    :value="true"
                    @change="selectedCoverChange(index)"
                  />
                  <!-- <input
                    type="radio"
                    class="text-red-500 form-radio"
                    name="radio"
                    :value="index"
                    @change="selectedCoverChange(index)"
                    :checked="index == 0"
                  /> -->
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
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
            <!-- add image -->
            <div class="p-2 mt-1" v-show="item.images.length < 5">
              <div
                class="relative flex items-center justify-center w-48 h-48 border-2 border-red-500 border-dashed rounded-md"
              >
                <p class="text-sm italic text-center">Upload gambar</p>
                <input
                  type="file"
                  class="absolute block w-full h-full bg-red-300 opacity-0 pin-r pin-t"
                  accept="image/*"
                  @change="onFileChange"
                  multiple
                  :required="item.images.length < 0"
                />
              </div>
            </div>
          </div>
        </div>
        <ul class="px-4 mt-1 text-sm italic text-gray-600 list-disc">
          <li>Dimensi gambar yang direkomendasikan 1080 x 1080.</li>
          <li>Ukuran maksimal 2MB tiap gambar.</li>
          <li>Maksimal 5 gambar.</li>
        </ul>
      </div>
      <div class="block mt-4">
        <p class="text-gray-700">Harga <span class="text-red-500">*</span></p>
        <input
          type="number"
          v-model="item.price"
          class="block mt-1 form-input"
          placeholder="0"
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
        <editor :value="item.detail" v-on:input="item.detail = $event" />
      </div>
      <div v-show="!isEdit" class="my-4">
        <p>Iklan akan langsung tayang hingga 90 hari kedepan.</p>
      </div>
      <div class="mt-6">
        <div v-if="!done || isEdit">
          <button
            class="block w-full px-4 py-2 text-center text-white duration-500 bg-red-500 rounded-md hover:bg-red-600"
            type="submit"
          >
            {{ isEdit ? 'Update' : 'Buat Iklan!' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Editor from '@/components/editor'

export default {
  components: {
    editor: Editor,
  },
  props: {
    isEdit: Boolean,
    done: Boolean,
    slug: String,
    updateOrCreateFunction: Function,
    item: Object,
    categories: Array,

    // edit only
    removedImageIds: Array,
  },
  methods: {
    onFileChange(e) {
      const newFiles = [...e.target.files]
      const uploadedImages = [...this.item.images]
      const uploadedImageFiles = uploadedImages.map((e) => e.image.name)

      if (newFiles.length + uploadedImages.length > 5) {
        this.$toast.info('Gambar tidak boleh lebih dari 5', {
          duration: 6000,
        })
        return
      }

      const newFilesNotDuplicate = []
      newFiles.forEach((newFile) => {
        if (newFile.size > 2000000) {
          this.$toast.error(
            `Gambar tidak boleh lebih dari 2 MB. Nama file: (${newFile.name})`,
            {
              duration: 6000,
            }
          )
          return
        }

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
        const newImage = {
          id: Math.random(),
          name: file.name,
          detail: file.name.replace(/\.[^/.]+$/, ''),
          image: file,
          image_display: URL.createObjectURL(file),
          cover: false,
        }
        this.item.images.push(newImage)
        // if (this.isEdit) this.addedImages.push(newImage)
      })

      // jika belum ada cover
      if (this.item.images.find((e) => e.cover !== true)) {
        this.item.images[0].cover = true
      }
    },
    selectedCoverChange(selectedIndex) {
      this.item.images.map((image, index) => {
        // image.cover = index == selectedIndex
        if (selectedIndex != index) {
          image.cover = false
        }
      })

      // this.item.images.filter((e, i) => i != selectedIndex)

      // if (this.isEdit) {
      //   this.addedImages.forEach((image, index) => {
      //     image.cover = index == selectedIndex
      //   })
      // }
    },
    removeImage(image) {
      this.item.images.splice(this.item.images.indexOf(image), 1)
      if (this.isEdit) this.removedImageIds.push(image.id)
    },
  },
}
</script>
