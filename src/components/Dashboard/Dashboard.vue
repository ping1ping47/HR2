<template>
  <section class="p-6 xl:max-w-6xl xl:mx-auto h-screen">
    <section class="mb-6 flex items-center justify-between">
      <div class="flex items-center justify-start">
        <h1 class="text-3xl leading-tight" ref="dateDisplay">วว/ดด/ปป</h1>
      </div>
    </section>

    <!-- ************************************************************** -->

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
      <!-- Employee Stats -->
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="rounded-2xl bg-white dark:bg-black/80 flex flex-col justify-between"
      >
        <div class="p-6">
          <div class="justify-between items-center flex">
            <div>
              <h3
                class="text-lg leading-tight text-gray-500 dark:text-gray-400"
              >
                {{ stat.label }}
              </h3>
              <h1 class="text-3xl leading-tight font-semibold">
                {{ stat.value }}
              </h1>
            </div>
            <span
              class="inline-flex justify-center items-center h-16 text-emerald-500"
            >
              <svg
                viewBox="0 0 24 24"
                width="48"
                height="48"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ************************************************************************* -->

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Employee Table -->
      <div
        v-for="(table, index) in tables"
        :key="index"
        class="rounded-2xl bg-white dark:bg-white/70 flex flex-col justify-between"
      >
        <div class="p-6">
          <h1>{{ table.title }}</h1>
          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="py-2 px-4"></th>
                  <th class="py-2 px-4">ชื่อ</th>
                  <th class="py-2 px-4">{{ table.column1 }}</th>
                  <th class="py-2 px-4">{{ table.column2 }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- Table Content Goes Here -->
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
          >
            <div class="justify-between items-center block md:flex">
              <div class="flex items-center justify-center mb-6 md:mb-0">
                <div class="flex items-center justify-start flex-wrap -mb-3">
                  <!-- Pagination Buttons -->
                  <button
                    v-for="(page, index) in table.pages"
                    :key="index"
                    class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-gray-100 dark:border-gray-800 ring-gray-200 dark:ring-gray-500 bg-gray-200 dark:bg-gray-100 hover:bg-gray-200 hover:dark:bg-gray-100 text-sm p-1 mr-3 last:mr-0 mb-3"
                  >
                    <span class="px-2">{{ page }}</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-center">
                <small>{{ table.paginationText }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    // Update the date immediately
    this.updateDate();

    // Update the date every second
    this.intervalId = setInterval(this.updateDate, 1000);
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  },
  methods: {
    updateDate() {
      const dateElement = this.$refs.dateDisplay;
      const currentDate = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("th-TH", options).format(
        currentDate
      );
      dateElement.innerText = formattedDate;
    },
  },
  data() {
    return {
      stats: [
        { label: "พนักงาน", value: "000" },
        { label: "เข้างาน", value: "000/000" },
        { label: "พนักงานลา", value: "000" },
        { label: "งาน", value: "000" },
      ],
      tables: [
        {
          title: "พนักงาน",
          column1: "เวลาเข้า",
          column2: "เวลาออก",
          pages: [1],
          paginationText: "Page 1 of 0",
        },
        {
          title: "พนักงานลา",
          column1: "วัน",
          column2: "ถึง",
          pages: [1],
          paginationText: "Page 1 of 0",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
