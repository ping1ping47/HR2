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
            ข้อมูลประกาศงาน
          </h1>
          <span
            class="border-b-2 border-t-2 w-8 md:w-24 inline-block ml-2 rounded"
          ></span>
        </div>
      </div>

      <div class="mx-auto">
        <h1><graph />กราฟวิเคราะห์จำนวนผู้สมัคร</h1>
        <div
          class="border-indigo-500 border-b-2 border-t-2 w-32 md:w-56 rounded"
        ></div>
      </div>

      <div class="flex justify-end items-center space-x-3">
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
          <div class="text-sm font-medium">เลือกตำแหน่ง: {{}}</div>
          <select
            class="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            v-model="selectedPostType"
            @change="fetchPosts"
          >
            <option value="0">แสดงทั้งหมด</option>
            <option
              v-for="type in examTypes"
              :key="type.extype_name"
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
          <Add v-if="AddPopup" :post="AddPopup" @close="AddPopup = false" />
        </div>
      </div>
      <table class="mx-auto">
        <thead>
          <tr>
            <th class="border border-gray-300 text-center px-2 py-2">ลำดับ</th>
            <th class="border border-gray-300 text-center px-2 py-2">บริษัท</th>
            <th class="border border-gray-300 text-center px-2 py-2">หัวข้อ</th>
            <th class="border border-gray-300 text-center px-2 py-2">
              ตำแหน่ง
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              รายละเอียด
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              วันที่ประกาศ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              วันที่ปิดประกาศ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">
              สถานะประกาศ
            </th>
            <th class="border border-gray-300 text-center px-2 py-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in paginatedPosts" :key="index">
            <td class="py-4 border border-gray-300 table-cell">
              {{ index + 1 }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ post.Company }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ post.Header }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ post.department }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              <span v-if="post.Description && post.Description.length <= 24">{{
                post.Description.slice(0, 24)
              }}</span>
              <span v-else>{{
                post.Description ? post.Description.slice(0, 21) + "..." : ""
              }}</span>
            </td>
            <td class="py-4 border border-gray-300table-cell">
              {{ post.post_date }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ post.end_date }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              {{ post.Post_status }}
            </td>
            <td class="py-4 border border-gray-300 table-cell">
              <button
                @click="openDetailsPopup(post)"
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
                :post="selectedPost"
                @close="ShowPopup = false"
              />
              <button
                @click="openEditModal(post)"
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
                :post="PostToEdit"
                @close="EditPopup = false"
              />
              <button
                @click="deletef(post)"
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
          {{ Math.min(currentPage * perPage, filteredPosts.length) }} of
          {{ filteredPosts.length }}
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
import Add from "./PostAdd.vue";
import Edit from "./PostEdit.vue";
import View from "./PostView.vue";
import Graph from "./Graph.vue";

export default {
  components: {
    Add,
    Edit,
    View,
    Graph,

    displayedItems() {
      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(
        this.currentPage * this.perPage,
        this.filteredPosts.length
      );
      return `Showing ${start} to ${end} of ${this.filteredPosts.length}`;
    },
  },

  data() {
    return {
      examTypes: [], // กำหนดค่าเริ่มต้นเป็นอาร์เรย์ว่าง
      selectedPostType: "0",
      selectedPostTypeName: "แสดงทั้งหมด",
      posts: [],
      perPage: 10, // จำนวนข้อมูลต่อหน้า
      currentPage: 1, // หน้าปัจจุบัน
    };
  },

  computed: {
    filteredPosts() {
      if (this.selectedPostType === "0") {
        return this.posts;
      } else {
        return this.posts.filter(
          (post) => post.department === this.selectedPostType
        );
      }
    },

    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.perPage);
    },

    paginatedPosts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredPosts.slice(start, end);
    },
  },
  methods: {
    fetchPostTypes() {
      fetch(import.meta.env.VITE_API_POST + "/exam-type")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.examTypes = data.data;
          this.fetchPosts();
        })
        .catch((error) => {
          console.error("Error fetching exam types:", error);
        });
    },
    fetchPosts() {
      let url = import.meta.env.VITE_API_POST + "/exam";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.posts = data.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
  },
  mounted() {
    this.fetchPostTypes();
  },

  setup() {
    const posts = ref([]);
    const originalPosts = ref([]);
    const searchText = ref("");
    const ShowPopup = ref(false);
    const AddPopup = ref(false);
    const EditPopup = ref(false);
    const PostToEdit = ref(null);
    const selectedPost = ref(null);
    const selectedExtTypeId = ref("ALL"); // Change here
    const positions = ref([]); // Add this line

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST}/post`
        );
        if (
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          posts.value = response.data.data;
          originalPosts.value = response.data.data;
        } else {
          console.error(
            "Invalid response format or empty data array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        posts.value = [];
        originalPosts.value = [];
      }
    };

    onMounted(async () => {
      await fetchPosts();
      await fetchPositionById();
    });

    const togglePopup = () => {
      AddPopup.value = !AddPopup.value;
    };

    const openEditModal = (post) => {
      PostToEdit.value = post;
      EditPopup.value = true;
    };

    const handleClose = () => {
      ShowPopup.value = false;
    };

    const deletef = async (post) => {
      Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePost(post);
        }
      });
    };

    const deletePost = async (post) => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_POST}/post/delete-post/${post._id}`
        );
        Swal.fire("Deleted!", "The post has been deleted.", "success");
        posts.value = posts.value.filter((item) => item._id !== post._id);
        originalPosts.value = originalPosts.value.filter(
          (item) => item._id !== post._id
        );
      } catch (error) {
        console.error("Error deleting post:", error);
        Swal.fire("Error!", "Failed to delete the post.", "error");
      }
    };

    const searchPostById = () => {
      if (searchText.value.trim()) {
        const filteredPosts = originalPosts.value.filter((post) =>
          post.Company.includes(searchText.value)
        );
        posts.value = filteredPosts;
      } else {
        posts.value = [...originalPosts.value];
      }
    };

    const fetchPositionById = async () => {
      if (typeof selectedExtTypeId.value !== "undefined") {
        // ตรวจสอบว่า selectedExtTypeId มีค่าหรือไม่
        if (selectedExtTypeId.value !== "ALL") {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_POST}/exam-type/${
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

    const openDetailsPopup = (post) => {
      selectedPost.value = post;
      ShowPopup.value = true;
    };

    return {
      posts,
      searchText,
      ShowPopup,
      AddPopup,
      EditPopup,
      PostToEdit,
      selectedPost,
      selectedExtTypeId,
      positions, // Add positions here
      fetchPosts,
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
