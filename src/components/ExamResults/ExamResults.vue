<template>
  <div class="max-w-screen-lg mx-auto">
    <div class="flex-1 md:px-1 md:py-2">
      <div class="px-4 container mx-auto">
        <div class="my-8 flex items-center justify-between md:justify-center">
          <span
            class="border-b-2 border-t-2 w-8 md:w-24 inline-block mr-2 rounded"
          ></span>
          <h1
            class="my-4 text-3xl flex justify-center font-medium tracking-wider text-purple-700"
          >
            ผลการสอบ
          </h1>
          <span
            class="border-b-2 border-t-2 w-8 md:w-24 inline-block ml-2 rounded"
          ></span>
        </div>
      </div>

      <div class="flex-col">
        <Calendar />
        <h1>ปฏิทิน</h1>
        <div
          class="border-indigo-500 border-b-2 border-t-2 w-32 md:w-16 rounded"
        ></div>
      </div>

      <div class="flex justify-center items-center space-x-3">
        <div class="flex items-center">
          <input
            type="text"
            v-model="searchText"
            placeholder="ค้นหาบริษัท..."
            class="px-3 py-1 border border-gray-300 rounded-md h-10"
            @input="searchPostById"
          />
        </div>
        <!-- **************************************************** -->
        <div class="flex items-center">
          <div class="text-sm font-medium">เลือกตำแน่ง: {{}}</div>
          <select
            class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            v-model="selectedPostType"
            @change="fetchResults"
          >
            <option value="0">แสดงทั้งหมด</option>
            <option
              v-for="type in examTypes"
              :key="type.extype_id"
              :value="type.extype_name"
            >
              {{ type.extype_name }}
            </option>
          </select>
        </div>

        <div>
          <button
            @click="togglePopup"
            class="btn-add bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
          >
            เพิ่มประกาศงาน
          </button>
          <Add v-if="AddPopup" :results="AddPopup" @close="AddPopup = false" />
        </div>
      </div>

      <table class="mx-auto">
        <thead>
          <tr>
            <th class="border border-gray-300 text-center px-2 py-2">ลำดับ</th>
            <th class="border border-gray-300 text-center px-2 py-2">ชื่อ</th>
            <th class="border border-gray-300 text-center px-2 py-2">
              ผลการสอบ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">คะแนน</th>

            <th class="border border-gray-300 text-center px-2 py-2">
              วันที่สอบ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              วันที่นัดหมาย
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              สถานะนัดหมาย
            </th>

            <th class="border border-gray-300 text-center px-2 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(results, index) in paginatedResults" :key="index">
            <td class="py-4 border border-gray-300 table-cell">
              {{ index + 1 }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              {{ results.user_name }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              {{ results.results }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              {{ results.score }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              {{ results.exam_at }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              {{ results.meeting_at }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ results.status }}
            </td>

            <td class="py-4 border border-gray-300 table-cell">
              <button
                @click="openDetailsPopup(results)"
                class="btn-details bg-blue-500 hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <View
                v-if="ShowPopup"
                :results="selectedPost"
                @close="ShowPopup = false"
              />
              <button
                @click="openEditModal(results)"
                class="btn-edit bg-yellow-500 hover:bg-yellow-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 17L21 12 16 7"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7l-5 5 5 5"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h13"
                  />
                </svg>
              </button>
              <Edit
                v-if="EditPopup"
                :results="PostToEdit"
                @close="EditPopup = false"
              />
              <button
                @click="deletef(results)"
                class="btn-delete bg-red-500 hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-center items-center mt-4 space-x-4">
        <!-- Showing X to Y of Z -->
        <div class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * perPage + 1 }} to
          {{ Math.min(currentPage * perPage, filteredResults.length) }} of
          {{ filteredResults.length }}
        </div>

        <!-- Previous Page Button -->
        <button
          v-if="currentPage > 1"
          @click="currentPage--"
          class="btn-pagination bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          &lt; Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex space-x-4">
          <button
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="currentPage = pageNumber"
            :class="{
              'bg-purple-500 text-white': pageNumber === currentPage,
              'bg-gray-200': pageNumber !== currentPage,
            }"
            class="btn-pagination px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white"
          >
            {{ pageNumber }}
          </button>
        </div>

        <!-- Next Page Button -->
        <button
          v-if="currentPage < totalPages"
          @click="currentPage++"
          class="btn-pagination bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Next &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import Add from "./ResultAdd.vue";
import Edit from "./ResultEdit.vue";
import View from "./ResultView.vue";
import Calendar from "./Calendar.vue";

export default {
  components: {
    Add,
    Edit,
    View,
    Calendar,

    displayedItems() {
      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(
        this.currentPage * this.perPage,
        this.filteredResults.length
      );
      return `Showing ${start} to ${end} of ${this.filteredResults.length}`;
    },
  },

  data() {
    return {
      examTypes: [], // กำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
      selectedPostType: "0",
      selectedPostTypeName: "แสดงทั้งหมด",
      resultss: [],
      perPage: 10, // จำนวนข้อมูลต่อหน้า
      currentPage: 1, // หน้าปัจจุบัน
    };
  },

  computed: {
    filteredResults() {
      if (this.selectedPostType === "0") {
        return this.resultss;
      } else {
        return this.resultss.filter(
          (post) => post.extype_id === this.selectedPostType
        );
      }
    },

    totalPages() {
      return Math.ceil(this.filteredResults.length / this.perPage);
    },

    paginatedResults() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredResults.slice(start, end);
    },
  },
  methods: {
    fetchPostTypes() {
      fetch(import.meta.env.VITE_API_EXAM + "/exam-type")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.examTypes = data.data;
          this.fetchResults();
        })
        .catch((error) => {
          console.error("Error fetching exam types:", error);
        });
    },
    fetchResults() {
      fetch(import.meta.env.VITE_API_EXAMRESULTS + "/examresults")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.resultss = data.data;
        })
        .catch((error) => {
          console.error("Error fetching resultss:", error);
        });
    },
  },
  mounted() {
    this.fetchPostTypes();
  },

  setup() {
    const resultss = ref([]);
    const originalResults = ref([]);
    const searchText = ref("");
    const ShowPopup = ref(false);
    const AddPopup = ref(false);
    const EditPopup = ref(false);
    const PostToEdit = ref(null);
    const selectedPost = ref(null);
    const selectedExtTypeId = ref("ALL"); // Change here
    const positions = ref([]); // Add this line

    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EXAMRESULTS}/examresults`
        );
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          console.log(response.data.data[0]); // ตรวจสอบโครงสร้างของข้อมูลแรก
          resultss.value = response.data.data;
          originalResults.value = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching resultss:", error);
        resultss.value = [];
        originalResults.value = [];
      }
    };

    onMounted(async () => {
      await fetchResults();
      await fetchPositionById();
    });

    const togglePopup = () => {
      AddPopup.value = !AddPopup.value;
    };

    const openEditModal = (results) => {
      PostToEdit.value = results;
      EditPopup.value = true;
    };

    const handleClose = () => {
      ShowPopup.value = false;
    };

    const deletef = async (results) => {
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this results?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePost(results);
        }
      });
    };

    const deletePost = async (result) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_EXAMRESULTS}/examresults/delete-exam/${
            result._id
          }`
        );
        Swal.fire("Deleted!", "The results has been deleted.", "success");
        resultss.value = resultss.value.filter(
          (item) => item._id !== result._id
        );
        originalResults.value = originalResults.value.filter(
          (item) => item._id !== result._id
        );
      } catch (error) {
        console.error("Error deleting results:", error);
        Swal.fire("Error!", "Failed to delete the results.", "error");
      }
    };

    const searchPostById = () => {
      if (searchText.value.trim()) {
        const filteredResults = originalResults.value.filter((results) =>
          results.Company.includes(searchText.value)
        );
        resultss.value = filteredResults;
      } else {
        resultss.value = [...originalResults.value];
      }
    };

    const fetchPositionById = async () => {
      if (typeof selectedExtTypeId.value !== "undefined") {
        // ตรวจสอบว่า selectedExtTypeId มีค่าหรือไม่
        if (selectedExtTypeId.value !== "ALL") {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_EXAM}/exam-type/${
                selectedExtTypeId.value
              }`
            );
            if (response.status === 200 && response.data) {
              positions.value = response.data; // Set positions with the fetched data
            } else {
              console.error(
                "Invalid response format or empty data:",
                response.data
              );
            }
          } catch (error) {
            console.error("Error fetching exam-type:", error);
          }
        } else {
          positions.value = []; // Reset positions if all positions are selected
        }
      }
    };

    const openDetailsPopup = (results) => {
      selectedPost.value = results;
      ShowPopup.value = true;
    };

    return {
      resultss,
      searchText,
      ShowPopup,
      AddPopup,
      EditPopup,
      PostToEdit,
      selectedPost,
      selectedExtTypeId,
      positions, // Add positions here
      fetchResults,
      togglePopup,
      openEditModal,
      handleClose,
      deletef,
      deletePost,
      searchPostById,
      openDetailsPopup,
      fetchPositionById, // Add fetchPositionById here
    };
  },
};
</script>
