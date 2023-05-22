<script setup>
import { Link } from '@inertiajs/inertia-vue3'
const navigation = [
  { name: 'Home', href: '/', pageName: 'Index' },
  { name: 'Login', href: '/login', pageName: 'Login' },
  { name: 'About', href: '/', pageName: 'About' },
  { name: 'Contact Us', href: '/', pageName: 'ContactUs' },
]

</script>

<template>
  <div>
    <div class="dark:bg-gray-900 border-b">
      <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <Link class="text-xl font-bold text-white md:text-2xl hover:text-blue-400"  href="/"> Logo </Link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button type="button" class="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul :class="showMenu ? 'flex' : 'hidden'" class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
          <li v-for="item in navigation" :key="item.name" class="text-sm font-bold text-white hover:text-blue-400">
            <Link :href="item.href" :class="{'font-bold underline': item.pageName === $page.component}"> {{ item.name }}</Link>
          </li>
        </ul>
      </nav>
    </div>
    <main>
      <section class="absolute w-full h-full">
        <div class="absolute top-0 w-full h-full bg-gray-900"
          style="background-size: 100%; background-repeat: no-repeat; z-index: -1;"></div>
        <slot />
      </section>
    </main>

  </div>
</template>

<script>

export default {
  data() {
    return {
      showMenu: false
    }
  }
}
</script>
