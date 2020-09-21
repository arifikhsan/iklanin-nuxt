<template>
  <div>
    <client-only>
      <form-item
        :is-edit="true"
        :done="done"
        :item="item"
        :slug="slug"
        :categories="categories"
        :update-or-create-function="updateItem"
      />
    </client-only>
  </div>
</template>

<script>
import formItem from '@/components/form-item'

export default {
  head: {
    title: 'Edit iklan',
  },
  components: {
    'form-item': formItem,
  },
  middleware: 'auth',
  data() {
    return {
      item: {
        category: {},
      },
      categories: {},
      done: false,
      slug: '',
    }
  },
  async asyncData({ $axios, route }) {
    const item = await $axios.$get('/v1/items/' + route.params.slug + '/edit')
    const categories = await $axios.$get('/v1/categories')

    // const formattedItem =

    return { item: item.data, categories: categories.data }
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
    updateItem() {
      console.log('update')

      // const images = this.item.images.map(
      //   ({ id, image_display, ...keep }) => keep
      // )

      // let formData = new FormData()
      // formData.append('category_id', this.item.category_id)
      // formData.append('title', this.item.title)
      // formData.append('detail', this.item.detail)
      // formData.append('price', this.item.price)

      // images.forEach((image, index) => {
      //   formData.append(`image_name[${index}]`, image.name)
      //   formData.append(`image_file[${index}]`, image.image)
      //   formData.append(`image_cover[${index}]`, image.cover)
      //   formData.append(`image_detail[${index}]`, image.detail)
      // })

      // this.$axios
      //   .$put('/v1/items', formData)
      //   .then((res) => {
      //     this.$toast.success('Sukses mengedit iklan.', {
      //       duration: 6000,
      //     })
      //     this.slug = res.data.slug
      //     this.done = true
      //     this.item = {
      //       category_id: '',
      //       title: '',
      //       detail: '',
      //       price: null,
      //       images: [],
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     this.$toast.error('Gagal membuat iklan.', {
      //       duration: 6000,
      //     })
      //   })

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
      //       this.slug = res.data.updateAd.slug
      //       this.done = true
      //     })
      //     .catch((err) => {
      //       this.$toast.error('Gagal mengupdate iklan.', {
      //         duration: 6000,
      //       })
      //     })
    },
  },
}
</script>
