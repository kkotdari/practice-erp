<template>
  <div class="home-container">
    <div class="title">
      <span class="title-text">
        어서오세요. 롯데칠성음료 홈페이지입니다.<br>
        저희의 대표상품을 이미지로 확인하세요!
      </span>
    </div>
    <div class="product-show"> 
      <MyAutoCarousel
        :images=images
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import img1 from '~/assets/images/home-product-show/product1.jpg'
import img2 from '~/assets/images/home-product-show/product2.jpg'
import img3 from '~/assets/images/home-product-show/product3.jpg'
import img4 from '~/assets/images/home-product-show/product4.jpg'
const images: string[] = [ img1, img2, img3, img4 ]
</script>

<style lang="css" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 24px;
}
.title {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;

}
.title-text {
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  font-weight: 500;
}
.product-show {
  display: flex;
  justify-content: center;
}
</style>