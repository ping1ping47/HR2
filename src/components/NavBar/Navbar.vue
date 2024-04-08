<template>
  <div
    :class="{
      'bg-gray-900 shadow-lg': !isScrolled,
      'bg-gray-800 shadow': isScrolled,
    }"
    class="text-white flex justify-between w-full py-3 fixed top-0 left-0 z-50 transition-all duration-300"
  >
    <button @click="toggleSidebar" class="text-white focus:outline-none">
      <svg
        class="h-6 w-10"
        fill="none"
        viewBox="0 0 10 20"
        z
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
    <h1 class="text-xl font-semibold">Your App</h1>
    <!-- Other Navbar content here -->
    <div class="flex items-center space-x-4">
      <!-- Profile -->
      <div v-if="isLoggedIn" class="flex items-center">
        <span class="text-sm font-medium mr-5">{{ userName }}</span>
        <span class="text-xs text-gray-300 mr-10">{{ userId }}</span>
        <button
          @click="isOpen = !isOpen"
          class="realtive z-12 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
        >
          <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isScrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
  },
  computed: {
    isLoggedIn() {
      // Your login status check logic here
      return true; // For demonstration, assuming the user is logged in
    },
    userName() {
      // Your logic to get the user's name here
      return "Name"; // For demonstration
    },
    userId() {
      // Your logic to get the user's ID here
      return "(123456)"; // For demonstration
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
