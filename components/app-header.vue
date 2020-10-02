<template>
  <div class="leading-loose font-body">
    <div class="flex items-center justify-between max-w-5xl p-4 md:mx-auto">
      <div>
        <client-only>
          <nuxt-link
            class="text-2xl font-bold text-red-500"
            :to="$auth.loggedIn ? '/home' : '/'"
          >
            Iklanin
          </nuxt-link>
        </client-only>
      </div>

      <!-- hamburger -->
      <div class="flex items-center -mr-2 md:hidden">
        <button
          @click="toggleNav"
          type="button"
          class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
        >
          <svg
            class="w-6 h-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div class="hidden md:block">
        <client-only>
          <div v-if="$auth.loggedIn">
            <nuxt-link
              to="/iklanku/baru"
              class="inline-block font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >Buat iklan
            </nuxt-link>
            <nuxt-link
              to="/iklanku"
              class="inline-block ml-8 font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >Iklanku
            </nuxt-link>
            <button
              @click="logout"
              class="ml-8 font-medium text-red-500 transition duration-150 ease-in-out bg-gray-50 focus:text-red-700 hover:text-gray-900 focus:outline-none"
            >
              Logout
            </button>
          </div>
          <div v-else>
            <nuxt-link
              to="/login"
              class="px-6 py-3 font-medium text-red-500 transition duration-150 ease-in-out bg-white border border-red-500 rounded-md focus:outline-none"
            >
              Login
            </nuxt-link>
            <nuxt-link
              to="/register"
              class="px-6 py-3 ml-4 font-medium text-white transition duration-150 ease-in-out bg-red-500 rounded-md focus:outline-none"
            >
              Register
            </nuxt-link>
          </div>
        </client-only>
      </div>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out transform"
      enter-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in transform"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="menu"
        class="fixed inset-x-0 top-0 z-50 transition origin-top-right transform"
      >
        <div class="rounded-lg shadow-md">
          <div
            @click="toggleNav"
            class="overflow-hidden bg-white rounded-lg shadow-xs"
          >
            <div class="flex items-center justify-between p-4">
              <div class="text-2xl font-bold text-red-500">
                <client-only>
                  <p v-if="$auth.loggedIn">Halo, {{ $auth.user.name }}</p>
                  <nuxt-link to="/" v-else>Iklanin</nuxt-link>
                </client-only>
              </div>

              <!-- close -->
              <div class="-mr-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                >
                  <svg
                    class="w-6 h-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-2 pt-2 pb-3">
              <client-only>
                <template v-if="$auth.loggedIn">
                  <nuxt-link
                    to="/iklanku/baru"
                    class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-200 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Buat iklan
                  </nuxt-link>
                  <nuxt-link
                    to="/iklanku"
                    class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-200 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Iklanku
                  </nuxt-link>
                  <nuxt-link
                    to="/profile"
                    class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-200 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Profil
                  </nuxt-link>
                </template>
                <template>
                  <nuxt-link
                    to="/home"
                    class="block px-3 py-2 mt-1 text-base font-medium text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-200 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50"
                  >
                    Listing
                  </nuxt-link>
                </template>
              </client-only>
            </div>
            <div>
              <client-only>
                <button
                  v-if="$auth.loggedIn"
                  @click="logout"
                  class="block w-full px-5 py-3 font-medium text-center text-red-500 transition duration-150 ease-in-out bg-gray-50 hover:bg-gray-100 hover:text-red-700 focus:outline-none focus:bg-gray-100 focus:text-red-700"
                >
                  Logout
                </button>
                <nuxt-link
                  v-else
                  to="/login"
                  class="block w-full px-5 py-3 font-medium text-center text-white transition duration-150 ease-in-out bg-red-600 hover:bg-red-800 hover:text-white focus:outline-none focus:bg-red-700"
                >
                  Login
                </nuxt-link>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    toggleNav: function () {
      this.menu = !this.menu
    },
    async logout() {
      await this.$auth.logout()
      await this.$apolloHelpers.onLogout()
      this.$toast.success('Logout sukses', { duration: 6000 })
    },
  },
}
</script>
