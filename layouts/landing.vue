<template>
  <div>
    <app-header />
    <div>
      <div class="leading-loose text-gray-800 font-body">
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
