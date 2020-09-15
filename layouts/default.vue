<template>
  <div>
    <app-header />
    <div class="max-w-5xl p-4 mx-auto">
      <div class="font-body text-gray-800">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
export default {
  components: {
    'app-header': AppHeader,
  },
}
</script>
