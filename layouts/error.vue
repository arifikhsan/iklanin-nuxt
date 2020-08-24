<template>
  <div>
    <div class="my-6">
      <h1 v-if="error.statusCode === 404">Halaman tidak ditemukan 😢</h1>
      <h1 v-else>Terjadi error 😭</h1>
    </div>
    <nuxt-link class="px-4 py-2 border rounded" to="/"
      >Ke halaman utama</nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
