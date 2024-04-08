<template>
  <div
    :class="sidebarClasses"
    class="bg-gray-800 text-white w-56 flex flex-col fixed h-full py-20 transition-transform duration-300"
  >
    <!-- Sidebar header -->
    <div class="mb-4 px-4">
      <!-- Use router-link instead of a -->
      <h2 class="text-xl font-semibold">
        <router-link to="/">Your App</router-link>
      </h2>
    </div>

    <!-- Sidebar menu items -->
    <ul>
      <li>
        <router-link to="/" class="block py-2 px-4 hover:bg-gray-700"
          >หน้าหลัก</router-link
        >
      </li>
      <li>
        <router-link to="/Exam" class="block py-2 px-4 hover:bg-gray-700"
          >ข้อสอบ</router-link
        >
      </li>
      <li>
        <router-link to="/Post" class="block py-2 px-4 hover:bg-gray-700"
          >ประกาศสมัครงาน</router-link
        >
      </li>
      <li>
        <router-link to="/ExamResults" class="block py-2 px-4 hover:bg-gray-700"
          >ผลสอบ</router-link
        >
        <!-- Dropdown menu -->
        <ul v-show="isInterviewResultsOpen" class="ml-4">
          <li>
            <router-link
              to="/Interview"
              class="block py-2 px-4 hover:bg-gray-700"
              >ผลสัมภาษณ์</router-link
            >
          </li>
        </ul>
        <button @click="toggleInterviewResults" class="ml-4 text-white">
          <!-- Icon for dropdown -->
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </li>
      <li>
        <a href="/Test" class="block py-2 px-4 hover:bg-gray-700">Test</a>
      </li>
    </ul>

    <!-- Logout button -->
    <button
      @click="logout"
      class="mt-auto py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold focus:outline-none"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  data() {
    return {
      isInterviewResultsOpen: false, // Variable to control the visibility of InterviewResults dropdown
    };
  },
  computed: {
    sidebarClasses() {
      return {
        "transform -translate-x-full": !this.isOpen, // Slide sidebar out when closed
        "transform translate-x-0": this.isOpen, // Slide sidebar in when open
      };
    },
  },
  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
    logout() {
      // Your logout logic here
    },
    handleResize() {
      if (window.innerWidth > 500) {
        this.closeSidebar();
      }
    },
    toggleInterviewResults() {
      this.isInterviewResultsOpen = !this.isInterviewResultsOpen; // Toggle the visibility of InterviewResults dropdown
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
