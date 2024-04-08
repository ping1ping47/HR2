<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="flex-1 md:px-1 md:py-2">
      <section class="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
        <section
          class="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start"
        >
          <!-- Use v-for to loop through results -->
          <section
            v-for="result in resultss"
            :key="result._id"
            class="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <img :src="result.image_url" alt="" />
            <!-- Assuming there's an image_url in your API response -->
            <div class="space-x-1 flex justify-center mt-10"></div>
            <h1 class="text-3xl my-5">{{ result.user_name }}</h1>
            <p class="mb-5">{{ result.results }}</p>
            <h2 class="font-semibold mb-5">{{ result.score }}</h2>
            <button
              class="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              รายละเอียด
            </button>

            <div
              class="flex-col flex justify-end mt-10 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              เรซูเม่
            </div>
          </section>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
// Import axios if not already imported
import axios from "axios";

export default {
  data() {
    return {
      resultss: [], // Initialize results array
    };
  },
  methods: {
    async fetchResults() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EXAMRESULTS}/examresults`
        );
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          console.log(response.data.data[0]); // Check the structure of the first data
          this.resultss = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching resultss:", error);
      }
    },
  },
  mounted() {
    this.fetchResults(); // Call fetchResults when component is mounted
  },
};
</script>
