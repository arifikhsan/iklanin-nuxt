<template>
  <div>
    <app-header />
    <div>
      <div class="font-sans text-gray-800">
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
