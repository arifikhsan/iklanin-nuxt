<template>
  <div>
    <app-header />
    <div class="max-w-5xl p-4 mx-auto">
      <div class="text-gray-800 font-body">
        <nuxt />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'

export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
}
</script>
