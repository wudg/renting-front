<template>
  <div class="detail" style="margin-top:250px">
    <div class="image-container">
      <img :src="house.cover" alt="出租房图片">
    </div>
    <div class="info-container">
      <p>{{house.rentalMethod == 0 ? '整租' : '合租'}} - {{ house.villageName }}</p>
      <p class="description">备注：{{ house.description }}</p>
      <span>户型：{{ house.houseType }}</span>
      <span>房屋面积：{{ house.area }}平米</span>
      <span v-if="house.toilet==1">有卫生间</span>
      <span v-if="house.kitchen==1">有厨房</span>
      <span v-if="house.balcony==1">有阳台</span>
      <div class="transportation">
        <el-row>
          <el-col :xs="24" :sm="12">
            <p class="label">附近公交：</p>
            <p class="content">{{ house.bus }}</p>
          </el-col>
          <el-col :xs="24" :sm="12">
            <p class="label">附近地铁：</p>
            <p class="content">{{ house.subway }}</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";  //引入axios

export default {
  name: 'RentalDetail',
  data() {
    return {
      house: {},
    };
  },
  mounted() {
    const houseId = this.$route.params.id;
    // 根据id获取相应的出租房信息
    // 我们可以假设house数据是通过http请求获取的
    // 这里我们使用假数据
    this.getHouseById(houseId);
    console.log('house', this.house)
  },
  methods: {
    getHouseById(id) {
      axios.get('/api/house/detail', {
        params:{
          id: id
        }

        })
        .then(response => {
          console.log('response', response)
          this.house = response.data.data
        })
        .catch(error => console.log(error))
    }
  },
  created(){

  }
}
</script>

<style scoped>
.detail {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  .image-container {
    width: 50%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
    }
  }

  .info-container {
    width: 50%;

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .detail {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .location {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .description {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .transportation {
      margin-top: 30px;

      .label {
        font-size: 16px;
        font-weight: bold;
      }

      .content {
        font-size: 16px;
      }
    }
  }
}
</style>
