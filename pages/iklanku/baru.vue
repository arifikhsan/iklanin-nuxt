<template>
  <div>
    <client-only>
      <form-item
        :is-edit="false"
        :done="done"
        :item="item"
        :slug="slug"
        :categories="categories"
        :update-or-create-function="sendAd"
      />
    </client-only>
  </div>
</template>

<script>
import formItem from '@/components/form-item'

export default {
  head: {
    title: 'Tambahkan iklan',
  },
  components: {
    'form-item': formItem,
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
          this.item = {
            category_id: '',
            title: '',
            detail: '',
            price: null,
            images: [],
          }
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
