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
            ข้อมูลข้อสอบ
          </h1>
          <span
            class="border-b-2 border-t-2 w-8 md:w-24 inline-block ml-2 rounded"
          ></span>
        </div>
      </div>

      <div class="flex justify-end items-center space-x-3">
        <div class="flex items-center">
          <input
            type="text"
            v-model="searchText"
            placeholder="ค้นหาหมายเลขข้อสอบ	..."
            class="px-3 py-1 border border-gray-300 rounded-md h-10"
            @input="searchExamById"
          />
        </div>
        <!-- **************************************************** -->
        <div class="flex items-center">
          <div class="text-sm font-medium">เลือกตำแหน่งข้อสอบ: {{}}</div>
          <select
            class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            v-model="selectedExamType"
            @change="fetchExams"
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
            เพิ่มข้อสอบ
          </button>
          <Add v-if="AddPopup" :exam="AddPopup" @close="AddPopup = false" />
        </div>
      </div>

      <table class="mx-auto">
        <thead>
          <tr>
            <th class="border border-gray-300 text-center px-2 py-2">ลำดับ</th>
            <th class="border border-gray-300 text-center px-2 py-2">
              หมายเลขข้อสอบ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              ประเภทข้อสอบ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              รายละเอียด 1
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              คำตอบที่ถูก
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              พนักงาน
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              สถานะข้อสอบ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exam, index) in paginatedExams" :key="index">
            <td class="py-4 border border-gray-300 table-cell">
              {{ index + 1 }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ exam.exam_id }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ exam.extype_id }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              <span v-if="exam.question_1 && exam.question_1.length <= 24">{{
                exam.question_1.length
              }}</span>
              <span v-else>{{
                exam.question_1 ? exam.question_1.slice(0, 21) + "..." : ""
              }}</span>
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ exam.cr_answer }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ exam.em_id }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ exam.statusquestion }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              <button
                @click="openDetailsPopup(exam)"
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
                :exam="selectedExam"
                @close="ShowPopup = false"
              />
              <button
                @click="openEditModal(exam)"
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
                :exam="ExamToEdit"
                @close="EditPopup = false"
              />
              <button
                @click="deletef(exam)"
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
          {{ Math.min(currentPage * perPage, filteredExams.length) }} of
          {{ filteredExams.length }}
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
import Add from "./ExamAdd.vue";
import Edit from "./ExamEdit.vue";
import View from "./ExamView.vue";

export default {
  components: {
    Add,
    Edit,
    View,

    displayedItems() {
      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(
        this.currentPage * this.perPage,
        this.filteredExams.length
      );
      return `Showing ${start} to ${end} of ${this.filteredExams.length}`;
    },
  },

  data() {
    return {
      examTypes: [], // กำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
      selectedExamType: "0",
      selectedExamTypeName: "แสดงทั้งหมด",
      exams: [],
      perPage: 10, // จำนวนข้อมูลต่อหน้า
      currentPage: 1, // หน้าปัจจุบัน
    };
  },

  computed: {
    filteredExams() {
      if (this.selectedExamType === "0") {
        return this.exams;
      } else {
        return this.exams.filter(
          (exam) => exam.extype_id === this.selectedExamType
        );
      }
    },

    totalPages() {
      return Math.ceil(this.filteredExams.length / this.perPage);
    },

    paginatedExams() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredExams.slice(start, end);
    },
  },
  methods: {
    fetchExamTypes() {
      fetch(import.meta.env.VITE_API_EXAM + "/exam-type")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.examTypes = data.data;
          this.fetchExams();
        })
        .catch((error) => {
          console.error("Error fetching exam types:", error);
        });
    },
    fetchExams() {
      let url = import.meta.env.VITE_API_EXAM + "/exam";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.exams = data.data;
        })
        .catch((error) => {
          console.error("Error fetching exams:", error);
        });
    },
  },

  mounted() {
    this.fetchExamTypes();
  },

  setup() {
    const exams = ref([]);
    const originalExams = ref([]);
    const searchText = ref("");
    const ShowPopup = ref(false);
    const AddPopup = ref(false);
    const EditPopup = ref(false);
    const ExamToEdit = ref(null);
    const selectedExam = ref(null);
    const selectedExtTypeId = ref("ALL"); // Change here
    const positions = ref([]); // Add this line

    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EXAM}/exam`
        );
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          exams.value = response.data.data;
          originalExams.value = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        exams.value = [];
        originalExams.value = [];
      }
    };

    onMounted(async () => {
      await fetchExams();
      await fetchPositionById();
    });

    const togglePopup = () => {
      AddPopup.value = !AddPopup.value;
    };

    const openEditModal = (exam) => {
      ExamToEdit.value = exam;
      EditPopup.value = true;
    };

    const handleClose = () => {
      ShowPopup.value = false;
    };

    const deletef = async (exam) => {
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this exam?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteExam(exam);
        }
      });
    };

    const deleteExam = async (exam) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_EXAM}/exam/delete-exam/${exam._id}`
        );
        Swal.fire("Deleted!", "The exam has been deleted.", "success");
        exams.value = exams.value.filter((item) => item._id !== exam._id);
        originalExams.value = originalExams.value.filter(
          (item) => item._id !== exam._id
        );
      } catch (error) {
        console.error("Error deleting exam:", error);
        Swal.fire("Error!", "Failed to delete the exam.", "error");
      }
    };

    const searchExamById = () => {
      if (searchText.value.trim()) {
        const filteredExams = originalExams.value.filter((exam) =>
          exam.exam_id.includes(searchText.value)
        );
        exams.value = filteredExams;
      } else {
        exams.value = [...originalExams.value];
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

    const openDetailsPopup = (exam) => {
      selectedExam.value = exam;
      ShowPopup.value = true;
    };

    return {
      exams,
      searchText,
      ShowPopup,
      AddPopup,
      EditPopup,
      ExamToEdit,
      selectedExam,
      selectedExtTypeId,
      positions, // Add positions here
      fetchExams,
      togglePopup,
      openEditModal,
      handleClose,
      deletef,
      deleteExam,
      searchExamById,
      openDetailsPopup,
      fetchPositionById, // Add fetchPositionById here
    };
  },
};
</script>
