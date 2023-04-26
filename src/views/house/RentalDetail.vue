<template>
  <div class="rental-details">
    <div class="container">
    <div class="left">
      <div v-for="(image, index) in photos" :key="index">
        <img :src="image">
      </div>
    </div>
    <div class="right" style="font-size:30px;">
      <!-- 标题：出租类型：小区名称：户型：朝向 -->
      <h2 style="font-size:50px;">{{rental.rentalMethod == 0 ? '整租' : '合租'}}·{{rental.villageName}} {{ rental.houseType}} {{rental.toward == 0 ? '东' : (rental.toward == 1 ? '西' : (rental.toward == 2 ? '南' : '北'))}}</h2>
      <el-row>面积：{{rental.area}}平方米</el-row>
      <el-row>每月水电费：{{rental.waterRate}}元/吨，{{rental.powerRate}}元/度</el-row>
      <el-row>是否有厨房：{{rental.kitchen ? '有' : '没有'}}</el-row>
      <el-row>是否有卫生间：{{rental.toilet ? '有' : '没有'}}</el-row>
      <el-row>是否有阳台：{{rental.balcony ? '有' : '没有'}}</el-row>
      <el-row>房租：{{rental.price}}元/月</el-row>
      <el-row>小区名字：{{rental.address}}-{{rental.villageName}}({{ rental.district }})</el-row>
      <el-row>附近地铁站：{{rental.subwayStation}}({{rental.subwayLine}})</el-row>
      <el-row>备注：{{rental.description}}</el-row>
      <el-row>上次更新时间：{{rental.updateTime}}</el-row>
      <el-row>创建时间：{{rental.createTime}}</el-row>
      <el-row>户型：{{rental.houseType}}</el-row>
      <el-row>户型：{{rental.houseType}}</el-row>
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
          if(this.rental.images){
            this.photos = JSON.parse(this.rental.images)
          }
          this.photos.push(this.rental.cover)
        })
        .catch(error => console.log(error))
    }
  },
  created(){

  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.left {
  width: 50%;
  height: 800px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.left img {
  width: 90%;
  margin: 10px;
  max-height: 400px;
  object-fit: cover;
}

.right {
  width: 50%;
  padding: 30px;
}

.right h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
}

.right p {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
