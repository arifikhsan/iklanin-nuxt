<template>
  <!-- pagination -->
  <div
    class="flex items-center justify-between py-3 mt-6 bg-white border-gray-200"
  >
    <div class="flex justify-between flex-1 sm:hidden">
      <nuxt-link
        v-if="!items.pagination.is_first_page"
        :to="{
          name: 'home',
          query: { page: items.pagination.prev_page },
        }"
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
      >
        Previous
      </nuxt-link>
      <div v-else></div>
      <nuxt-link
        v-if="!items.pagination.is_last_page && items.data.length !== 0"
        :to="{
          name: 'home',
          query: { page: items.pagination.next_page },
        }"
        class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
      >
        Next
      </nuxt-link>
      <div v-else></div>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm leading-5 text-gray-700">
          Halaman
          <span class="font-medium">{{ items.pagination.current_page }}</span>
          dari
          <span class="font-medium">{{ items.pagination.total_pages }}</span>
          halaman.
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <nuxt-link
            v-if="!items.pagination.is_first_page"
            :to="{
              name: 'home',
              query: { page: items.pagination.prev_page },
            }"
            class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
            aria-label="Previous"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </nuxt-link>
          <div v-else></div>

          <nuxt-link
            v-if="!items.pagination.is_last_page && items.data.length !== 0"
            :to="{
              name: 'home',
              query: { page: items.pagination.next_page },
            }"
            class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
            aria-label="Next"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </nuxt-link>
          <div v-else></div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props
}
</script>
