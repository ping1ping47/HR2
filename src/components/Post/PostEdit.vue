<template>
  <div
    class="popup-overlay fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    @click.self="ModalClose"
    v-show="showPopup"
  >
    <div class="popup-content bg-white rounded-lg overflow-auto max-h-[80vh]">
      <div>
        <form @submit.prevent="updatePostRequest" class="p-6">
          <!-- Modal header -->
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-semibold">
              แก้ไขประกาศงาน บริษัท: {{ formData.Company }}
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
                for="Company"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                บริษัท
              </label>
              <input
                v-model="formData.Company"
                type="text"
                name="Company"
                id="Company"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ชื่อบริษัท"
                required
              />
            </div>

            <div>
              <label
                for="Header"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                หัวข้อ
              </label>
              <input
                v-model="formData.Header"
                type="text"
                name="Header"
                id="Header"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน หัวข้อ"
                required
              />
            </div>
          </div>

          <div class="mt-4">
            <label
              for="Description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              รายละเอียด
            </label>
            <textarea
              v-model="formData.Description"
              name="Description"
              id="Description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
              placeholder="ป้อน รายละเอียด"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="department"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำแหน่ง
              </label>
              <select
                v-model="formData.department"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              >
                <option value="">เลือกตำแหน่ง</option>
                <option
                  v-for="type in ExamType"
                  :key="type._id"
                  :value="type.extype_name"
                >
                  {{ type.extype_name }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                จำนวนที่รับ
              </label>
              <input
                v-model="formData.amount"
                type="text"
                name="amount"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน จำนวนที่รับ"
                required
                @input="validateNumber"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="salary"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เงินเดือน
              </label>
              <input
                v-model="formData.salary"
                type="text"
                name="salary"
                id="salary"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน เงินเดือน"
                required
                @input="validateNumber"
              />
            </div>

            <div>
              <label
                for="sex"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <input
                v-model="formData.sex"
                type="text"
                name="sex"
                id="sex"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน เพศ"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="age"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                อายุ
              </label>
              <input
                v-model="formData.age.start_age"
                type="text"
                name="start_age"
                id="start_age"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="อายุเริ่มต้น"
                required
                @input="validateNumber"
              />
              <input
                v-model="formData.age.end_age"
                type="text"
                name="end_age"
                id="end_age"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="อายุสิ้นสุด"
                required
                @input="validateNumber"
              />
            </div>

            <div>
              <label
                for="experience"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ประสบการณ์
              </label>
              <input
                v-model="formData.experience"
                type="text"
                name="experience"
                id="experience"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ประสบการณ์"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="Education_lv"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ระดับการศึกษา
              </label>
              <input
                v-model="formData.Education.Education_lv"
                type="text"
                name="Education_lv"
                id="Education_lv"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน ระดับการศึกษา"
                required
              />
            </div>

            <div>
              <label
                for="Field_of_study"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                สาขาวิชา
              </label>
              <input
                v-model="formData.Education.Field_of_study"
                type="text"
                name="Field_of_study"
                id="Field_of_study"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="ป้อน สาขาวิชา"
                required
              />
            </div>
          </div>

          <!-- Feature inputs -->
          <div class="mt-4">
            <label
              for="feature"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              คุณสมบัติ
            </label>
            <div
              v-for="(item, index) in formData.feature"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.feature_detail"
                :name="'feature[' + index + '][feature_detail]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน คุณสมบัติ"
                required
              ></textarea>
              <button
                @click.prevent="removeFeature(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addFeature"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              เพิ่ม Feature
            </button>
          </div>

          <!-- Working inputs -->
          <div class="mt-4">
            <label
              for="Working"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              ลักษณะงาน
            </label>
            <div
              v-for="(item, index) in formData.Working"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.working"
                :name="'Working[' + index + '][working]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน ลักษณะงาน"
              ></textarea>
              <button
                @click.prevent="removeWorking(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addWorking"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              เพิ่ม Working
            </button>
          </div>

          <!-- Welfare inputs -->
          <div class="mt-4">
            <label
              for="Welfare"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              สวัสดิการ
            </label>
            <div
              v-for="(item, index) in formData.Welfare"
              :key="index"
              class="flex items-center mb-2"
            >
              <textarea
                v-model="item.welfare"
                :name="'Welfare[' + index + '][welfare]'"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-20 mr-2"
                placeholder="ป้อน สวัสดิการ"
                required
              ></textarea>
              <button
                @click.prevent="removeWelfare(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                ลบ
              </button>
            </div>
            <button
              @click.prevent="addWelfare"
              class="bg-green-500 text-white px-3 py-1 rounded-md mt-2"
            >
              Add Welfare
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div class="mt-4">
              <label
                for="end_date"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                วันที่สิ้นสุด
              </label>
              <input
                v-model="formData.end_date"
                type="date"
                name="end_date"
                id="end_date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>

            <div class="mt-4">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                รูปภาพ
              </label>
              <div class="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  ref="fileInput"
                  @change="handleImageUpload"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <div class="mt-4 flex justify-center">
                <!-- Show uploaded image -->
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Uploaded Image"
                  class="ml-4 max-h-48"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <!-- Save and Close buttons -->
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              บันทึก
            </button>
            <button
              @click.prevent="ModalClose"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditPopup",
  props: {
    post: Object, // รับข้อมูลข้อสอบที่จะแก้ไข
  },
  data() {
    return {
      showPopup: true,
      formData: {
        Company: "",
        Header: "",
        Description: "",
        department: "",
        amount: "",
        salary: "",
        sex: "",
        age: {
          start_age: "",
          end_age: "",
        },
        experience: "",
        Education: {
          Education_lv: "",
          Field_of_study: "",
        },
        feature: [{ feature_detail: "" }],
        Working: [{ working: "" }],
        Welfare: [{ welfare: "" }],
        image: "", // Change to null initially
        end_date: "",
      },
      imagePreview: null,
      ExamType: [],
      Employees: [],
    };
  },

  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาแสดงในฟอร์มเมื่อคอมโพเนนต์ถูกสร้างขึ้น
    this.formData = { ...this.post };
  },

  mounted() {
    this.fetchPostTypes(); // Fetch post types when component mounts
    this.fetchEmployees(); // Fetch post types when component mounts
  },

  methods: {
    handleImageUpload() {
      const file = this.$refs.fileInput.files[0];
      this.formData.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },

    async fetchPostTypes() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST}/exam-type`
        );
        if (response.data.status) {
          // ตรวจสอบ status ใน JSON response
          this.ExamType = response.data.data; // แสดงค่าจาก key "data"
        } else {
          console.error("Error fetching post types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching post types:", error);
      }
    },

    async fetchEmployees() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_POST}/employees`
        );
        if (response.data.status) {
          // ตรวจสอบ status ใน JSON response
          this.Employees = response.data.data; // แสดงค่าจาก key "data"
        } else {
          console.error("Error fetching post types:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching post types:", error);
      }
    },

    async updatePostRequest() {
      try {
        // สร้างอ็อบเจกต์ FormData
        const formData = new FormData();

        // ลูปผ่านข้อมูลใน this.formData
        for (const key in this.formData) {
          // ตรวจสอบว่าข้อมูลใน this.formData เป็น array หรือไม่
          if (Array.isArray(this.formData[key])) {
            // หากเป็น array ให้ลูปผ่านทุกองค์ประกอบของ array
            this.formData[key].forEach((item, index) => {
              // ลูปผ่าน key และ value ของทุกองค์ประกอบใน array แล้วนำไปเพิ่มเข้าใน FormData
              for (const itemKey in item) {
                formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
              }
            });
          } else if (typeof this.formData[key] === "object") {
            // ตรวจสอบว่าข้อมูลใน this.formData เป็น object หรือไม่
            // หากเป็น object ให้ลูปผ่าน key และ value ของ object แล้วนำไปเพิ่มเข้าใน FormData
            for (const subKey in this.formData[key]) {
              formData.append(`${key}[${subKey}]`, this.formData[key][subKey]);
            }
          } else {
            // หากไม่ใช่ array และไม่ใช่ object ให้เพิ่มค่าเข้าใน FormData โดยตรง
            formData.append(key, this.formData[key]);
          }
        }

        // ส่งคำขอแก้ไขข้อมูลไปยัง API โดยใช้ข้อมูลจาก this.formData
        await axios.put(
          `${import.meta.env.VITE_API_POST}/post/update-post/${
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
            console.log(this.formData);
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

    // Methods for handling feature, working, and welfare inputs
    addFeature() {
      this.formData.feature.push({ feature_detail: "" });
    },
    removeFeature(index) {
      this.formData.feature.splice(index, 1);
    },
    addWorking() {
      this.formData.Working.push({ working: "" });
    },
    removeWorking(index) {
      this.formData.Working.splice(index, 1);
    },
    addWelfare() {
      this.formData.Welfare.push({ welfare: "" });
    },
    removeWelfare(index) {
      this.formData.Welfare.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  background-color: rgba(0, 0, 0, 0.1);
}

.popup-content {
  max-width: 800px;
  width: 90%;
}
</style>