<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex justify-center items-center"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="updateExamRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              แก้ไขข้อสอบ ตำแหน่ง: {{ formData.extype_id }}
            </h3>
            <!-- Close button -->
            <button
              @click.prevent="ModalClose"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="exam_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >หมายเลขข้อสอบ</label
              >
              <input
                v-model="formData.exam_id"
                type="text"
                name="exam_id"
                id="exam_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน หมายเลขข้อสอบ"
                required=""
                @input="validateNumber"
              />
            </div>

            <!-- extype_id to display extype_name -->
            <div>
              <label
                for="extype_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >ประเภทข้อสอบ</label
              >
              <select
                v-model="formData.extype_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="">เลือกประเภทข้อสอบ</option>
                <option
                  v-for="type in ExamType"
                  :key="type._id"
                  :value="type.extype_name"
                >
                  {{ type.extype_name }}
                  <!-- แสดง extype_name แทน extype_id -->
                </option>
              </select>
            </div>
          </div>

          <div class="flex">
            <div class="col-span-2 flex-grow mb-4 mr-6">
              <label
                for="question_1"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 1</label
              >
              <textarea
                v-model="formData.question_1"
                type="text"
                name="question_1"
                id="question_1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
                placeholder="ป้อน คำถามที่ 1"
                required=""
              ></textarea>
            </div>

            <div class="col-span-2 flex-grow mb-4 mr-6">
              <label
                for="question_2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 2</label
              >
              <textarea
                v-model="formData.question_2"
                type="text"
                name="question_2"
                id="question_2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
                placeholder="ป้อน คำถามที่ 2"
              ></textarea>
            </div>

            <div class="col-span-2 flex-grow mb-4">
              <label
                for="question_3"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำถามที่ 3</label
              >
              <textarea
                v-model="formData.question_3"
                type="text"
                name="question_3"
                id="question_3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
                placeholder="ป้อน คำถามที่ 3"
              ></textarea>
            </div>
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-4">
            <div class="col-span-2">
              <label
                for="c1"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 1</label
              >
              <input
                v-model="formData.c1"
                type="text"
                name="c1"
                id="c1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบ"
                required=""
              />
            </div>

            <div class="col-span-2">
              <label
                for="c1_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 1</label
              >
              <input
                v-model="formData.c1_point"
                type="text"
                name="c1_point"
                id="c1_point"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required=""
                @input="validateNumber"
              />
            </div>

            <div class="col-span-2">
              <label
                for="c2"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 2</label
              >
              <input
                v-model="formData.c2"
                type="text"
                name="c2"
                id="c2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบ"
                required=""
              />
            </div>

            <div class="col-span-2">
              <label
                for="c2_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 2</label
              >
              <input
                v-model="formData.c2_point"
                type="text"
                name="c2_point"
                id="c2_point"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required=""
                @input="validateNumber"
              />
            </div>

            <div class="col-span-2">
              <label
                for="c3"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 3</label
              >
              <input
                v-model="formData.c3"
                type="text"
                name="c3"
                id="c3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบ"
                required=""
              />
            </div>

            <div class="col-span-2">
              <label
                for="c3_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 3</label
              >
              <input
                v-model="formData.c3_point"
                type="text"
                name="c3_point"
                id="c3_point"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required=""
                @input="validateNumber"
              />
            </div>

            <div class="col-span-2">
              <label
                for="c4"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบข้อ 4</label
              >
              <input
                v-model="formData.c4"
                type="text"
                name="c4"
                id="c4"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบ"
                required=""
              />
            </div>

            <div class="col-span-2">
              <label
                for="c4_point"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คะแนนข้อ 4</label
              >
              <input
                v-model="formData.c4_point"
                type="text"
                name="c4_point"
                id="c4_point"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คะแนน"
                required=""
                @input="validateNumber"
              />
            </div>

            <div class="col-span-2">
              <label
                for="cr_answer"
                class="block mb-2 text-sm font-medium text-gray-900"
                >คำตอบที่ถูก</label
              >
              <input
                v-model="formData.cr_answer"
                type="text"
                name="cr_answer"
                id="cr_answer"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน คำตอบที่ถูก"
              />
            </div>

            <!-- em_id to display em_firstname && em_lastname -->
            <div class="col-span-2">
              <label
                for="em_id"
                class="block mb-2 text-sm font-medium text-gray-900"
                >พนักงาน</label
              >
              <select
                v-model="formData.em_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="">เลือกพนักงาน</option>
                <option
                  v-for="employee in Employees"
                  :key="employee._id"
                  :value="employee.em_firstname + ' ' + employee.em_lastname"
                >
                  {{ employee.em_firstname }} {{ employee.em_lastname }}
                </option>
              </select>
            </div>

            <div class="col-span-2">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900"
                >รูปภาพ</label
              >
              <input
                type="file"
                accept="image/*"
                ref="fileInput"
                @change="handleImageUpload"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
              <!-- Show uploaded image -->
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Uploaded Image"
                class="mt-2 max-w-full h-auto"
              />
            </div>
          </div>

          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <!-- Save and Close buttons -->
            <button
              type="submit"
              class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
            >
              Save
            </button>
            <button
              @click.prevent="ModalClose"
              class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <!-- เช่น ข้อความ รูปภาพ หรือ Component อื่นๆ -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPopup",
  props: {
    exam: Object, // รับข้อมูลข้อสอบที่จะแก้ไข
  },
  data() {
    return {
      isOpen: false,
      formData: {
        exam_id: "",
        extype_id: "",
        question_1: "",
        question_2: "",
        question_3: "",
        c1: "",
        c1_point: "",
        c2: "",
        c2_point: "",
        c3: "",
        c3_point: "",
        c4: "",
        c4_point: "",
        cr_answer: "",
        em_id: "",
        statusquestion: "", // Default value for statusquestion
        image: "",
      },
      imagePreview: null,
      ExamType: [], // Array to store exam types
      Employees: [], // Array to store exam types
    };
  },
  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาแสดงในฟอร์มเมื่อคอมโพเนนต์ถูกสร้างขึ้น
    this.formData = { ...this.exam };
  },

  mounted() {
    this.fetchExamTypes(); // Fetch exam types when component mounts
    this.fetchEmployees(); // Fetch exam types when component mounts
  },

  methods: {
    handleImageUpload() {
      const file = this.$refs.fileInput.files[0];
      this.formData.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },

    async fetchExamTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EXAM}/exam-type`
        );
        if (response.data.status) {
          // ตรวจสอบ status ใน JSON response
          this.ExamType = response.data.data; // แสดงค่าจาก key "data"
        } else {
          console.error("Error fetching exam types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    },

    async fetchEmployees() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_EXAM}/employees`
        );
        if (response.data.status) {
          // ตรวจสอบ status ใน JSON response
          this.Employees = response.data.data; // แสดงค่าจาก key "data"
        } else {
          console.error("Error fetching exam types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    },

    async updateExamRequest() {
      try {
        // ส่งคำขอแก้ไขข้อมูลไปยัง API โดยใช้ข้อมูลจาก this.formData
        await axios.put(
          `${import.meta.env.VITE_API_EXAM}/exam/update-exam/${
            this.formData._id
          }`,
          this.formData
        );

        // หลังจากแก้ไขข้อมูลสำเร็จ
        // แสดงข้อความยืนยัน
        Swal.fire({
          title: "Confirm Update",
          text: "Are you sure you want to update?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then((result) => {
          // หากผู้ใช้กดปุ่ม OK
          if (result.isConfirmed) {
            window.location.reload(); // รีโหลดหน้า
          }
        });
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire("Error!", "Failed to update data", "error");
      }
    },

    ModalClose() {
      this.$emit("close");
    },

    validateNumber(event) {
      const inputValue = event.target.value;
      const regex = /^[0-9]*$/; // ตรวจสอบว่าเป็นตัวเลขหรือไม่
      if (!regex.test(inputValue)) {
        event.target.value = inputValue.replace(/[^0-9]/g, ""); // ลบอักขระที่ไม่ใช่ตัวเลข
      }
    },
    updateExam() {
      // ทำการอัพเดตข้อมูลข้อสอบโดยใช้ this.formData
      // ในที่นี้คุณสามารถใช้ axios หรือวิธีการส่งคำขอ API ที่คุณใช้งานอยู่เพื่ออัพเดตข้อมูลข้อสอบ
      console.log("Updated exam data:", this.formData);
    },
  },
};
</script>

<style scoped>
.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>