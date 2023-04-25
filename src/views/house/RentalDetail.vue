<template>
  <div class="rental-details">
    <h2>{{rental.address}}</h2>
    <el-row>
      <el-col :span="12">面积：{{rental.area}}平方米</el-col>
      <el-col :span="12">每月水电费：{{rental.waterRate}}元/吨，{{rental.powerRate}}元/度</el-col>
      <el-col :span="12">是否有厨房：{{rental.kitchen ? '有' : '没有'}}</el-col>
      <el-col :span="12">是否有卫生间：{{rental.toilet ? '有' : '没有'}}</el-col>
      <el-col :span="12">是否有阳台：{{rental.balcony ? '有' : '没有'}}</el-col>
      <el-col :span="12">房租：{{rental.price}}元/月</el-col>
      <el-col :span="12">出租方式：{{rental.rentalMethod}}</el-col>
      <el-col :span="12">位置所在区：{{rental.district}}</el-col>
      <el-col :span="12">小区名字：{{rental.villageName}}</el-col>
      <el-col :span="12">附近地铁站：{{rental.subwayStation}}</el-col>
      <el-col :span="12">附近地铁线路：{{rental.subwayLine}}</el-col>
      <el-col :span="12">备注：{{rental.description}}</el-col>
      <el-col :span="12">上次更新时间：{{rental.updateTime}}</el-col>
      <el-col :span="12">创建时间：{{rental.createTime}}</el-col>
      <el-col :span="12">
        户型：
        <el-row>
          <el-col :span="12">{{rental.houseType}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="24" v-if="true">
        <h3>出租房照片(点击查看更多图片)</h3>
        <el-image
          :src="rental.cover"
          :preview-src-list="photos"
          style="width: 500px; height: 500px"
          fit="fill"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from "axios";  //引入axios

export default {
  name: 'RentalDetail',
  data() {
    return {
      rental: {},
      photos:[]
    };
  },
  mounted() {
    const houseId = this.$route.params.id;
    // 根据id获取相应的出租房信息
    // 我们可以假设house数据是通过http请求获取的
    // 这里我们使用假数据
    this.getHouseById(houseId);
    console.log('rental', this.rental)
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
          this.rental = response.data.data
          this.photos = JSON.parse(this.rental.images)
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
