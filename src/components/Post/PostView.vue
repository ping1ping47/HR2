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
              ประกาศงาน บริษัท: {{ formData.Company }}
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
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.Company }}
              </p>
            </div>

            <div>
              <label
                for="Header"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                หัวข้อ
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.Header }}
              </p>
            </div>
          </div>

          <div class="mt-4">
            <label
              for="Description"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              รายละเอียด
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-32"
            >
              {{ formData.Description }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                for="department"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ตำแหน่ง
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.department }}
              </p>
            </div>

            <div>
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                จำนวนที่รับ
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.amount }}
              </p>
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
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.salary }}
              </p>
            </div>

            <div>
              <label
                for="sex"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                เพศ
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.sex }}
              </p>
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
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.age.start_age }} - {{ formData.age.end_age }}
              </p>
            </div>

            <div>
              <label
                for="experience"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                ประสบการณ์
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.experience }}
              </p>
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
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.Education.Education_lv }}
              </p>
            </div>

            <div>
              <label
                for="Field_of_study"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                สาขาวิชา
              </label>
              <p
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                {{ formData.Education.Field_of_study }}
              </p>
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
            <ul
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              <li v-for="(item, index) in formData.feature" :key="index">
                {{ item.feature_detail }}
              </li>
            </ul>
          </div>

          <!-- Working inputs -->
          <div class="mt-4">
            <label
              for="Working"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              ลักษณะงาน
            </label>
            <ul
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              <li v-for="(item, index) in formData.Working" :key="index">
                {{ item.working }}
              </li>
            </ul>
          </div>

          <!-- Welfare inputs -->
          <div class="mt-4">
            <label
              for="Welfare"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              สวัสดิการ
            </label>
            <ul
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              <li v-for="(item, index) in formData.Welfare" :key="index">
                {{ item.welfare }}
              </li>
            </ul>
          </div>

          <div class="mt-4">
            <label
              for="end_date"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              วันที่สิ้นสุด
            </label>
            <p
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            >
              {{ formData.end_date }}
            </p>
          </div>

          <div class="mt-4">
            <label
              for="image"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              รูปภาพ
            </label>
            <img
              v-if="formData.image"
              :src="formData.image"
              alt="Job Posting Image"
              class="mt-2 max-w-full h-auto"
            />
          </div>

          <div class="flex justify-end mt-6">
            <!-- Close buttons -->

            <button
              @click.prevent="ModalClose"
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  name: "ShowPopup",
  props: {
    post: Object, // รับข้อมูลข้อสอบที่จะแสดง
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
    };
  },

  created() {
    // นำข้อมูลข้อสอบที่ได้รับมาใส่ใน formData
    this.formData = { ...this.post };
  },

  methods: {
    ModalClose() {
      this.$emit("close");
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