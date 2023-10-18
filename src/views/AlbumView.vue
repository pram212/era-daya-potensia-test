<template>
  <div class="card">
    <div class="card-title h1">Album Saya</div>
    <hr />
    <div class="card-body bg-light">
      <div>
        <div class="input-group mb-3">
          <input type="file" class="form-control" ref="fileInput" @change="handleFileUpload" />
          <button :disabled="isLoading" class="btn btn-primary" id="basic-addon2" @click="uploadImage">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
            Upload
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3 p-2" v-for="(imageUrl, index) in uploadedImages" :key="index">
          <img :src="imageUrl" alt="Uploaded Image" class="img-thumbnail mx-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AlbumView",
  mounted() { },
  data() {
    return {
      selectedImage: null,
      uploadedImages: JSON.parse(localStorage.getItem("uploadedImages")) || [],
      isLoading: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      // Mengambil file gambar yang dipilih oleh pengguna
      this.selectedImage = event.target.files[0];
    },
    async uploadImage() {
      this.isLoading = true;
      const apiKey = "627c085a4fbdc34669dad981971e2da7";
      const formData = new FormData();
      formData.append("image", this.selectedImage);

      // Validasi tipe file dan ukuran
      const allowedExtensions = ["jpg", "jpeg", "bmp", "png", "gif"];
      const allowedSize = 2 * 1024 * 1024; // 2 MB dalam bytes

      if (!this.selectedImage) {
        swal.fire({
          icon: "error",
          text: "Upload error: Pilih file gambar terlebih dahulu.",
        });
        this.isLoading = false
        return;
      }

      if (
        !allowedExtensions.includes(
          this.selectedImage.name.split(".").pop().toLowerCase()
        )
      ) {
        swal.fire({
          icon: "error",
          text: "Upload error: Hanya boleh file gambar (jpg, jpeg, bmp, png, gif).",
        });
        this.isLoading = false
        return;
      }

      if (this.selectedImage.size > allowedSize) {
        swal.fire({
          icon: "error", text:
            "Upload error: File gambar terlalu besar (Maksimal 2 MB)."
        });
        this.isLoading = false
        return;
      }

      try {
        swal.fire({
          icon: 'info',
          title: "Loading...",
          showConfirmButton: false,
          showCancelButton: false,
        })

        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=" + apiKey,
          formData
        );
        const imageUrl = response.data.data.url;
        // Menambahkan URL gambar ke dalam array
        this.uploadedImages.push(imageUrl);

        // Menyimpan array gambar ke local storage
        localStorage.setItem(
          "uploadedImages",
          JSON.stringify(this.uploadedImages)
        );

        // Tampilkan URL gambar yang berhasil diunggah
        swal.fire({
          icon: "success",
          text: "Gambar Berhasil diupload",
        });

        this.$refs.fileInput.value = null;
        
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
      }
    },
  },
};
</script>
