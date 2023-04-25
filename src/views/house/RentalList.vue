<template>
  <div class="page-container">
    <el-button type="primary" @click="$router.push('/rental/room/add')" style="position:absolute;top:80px;right:20px;">新增出租房</el-button>
    <el-input v-model="keyword" placeholder="请输入小区名称" @input="getHouseList" size="medium"></el-input>
    <el-row>
      <el-col :md="24" :lg="8" v-for="room in rooms" :key="room.id" class="room-item">
        <el-card shadow="hover" class="room-card">
          <div class="image-container">
            <img :src="room.cover" alt="" class="room-image" v-on:click="goRentalDetail(room.id)"/>
          </div>
          <div class="content-container">
            <div class="room-title"> {{ room.address }} </div>
            <div class="room-address"> {{room.rentalMethod == 0 ? '整租' : '合租'}} - {{ room.villageName }}</div>
            <div class="room-info">
              <span>户型：{{ room.houseType }}</span>
              <span>房屋面积：{{ room.area }}平米</span>
            </div>
            <div>
              <span v-if="room.toilet==1">有卫生间</span>
              <span v-if="room.kitchen==1">有厨房</span>
              <span v-if="room.balcony==1">有阳台</span>
            </div>
            <div class="room-price-and-more">
              <div class="room-price">
                {{ room.price }}/月
              </div>
              <div class="room-more">
                {{ room.description }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6, 9, 12, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

import axios from "axios";  //引入axios

export default {
  name: 'RentalList',
  data() {
    return {
      rooms: [],
      total: 0, //总条数
      currentPage: 1, //初始页
      pagesize: 6, //    每页的数据
      keyword:'',
    };
  },
  computed: {

  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange (size) {
        console.log(size,'size');
        this.pagesize = size;
        console.log(this.pagesize); //每页下拉显示数据
        this.getHouseList()
    },
    handleCurrentChange (currentPage) {
      console.log(currentPage,'currentPage');
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.getHouseList()
    },
    getHouseList(){
      axios.get('/api/house/pageList', {
        params: {
          pageSize: this.pagesize,
          pageNum: this.currentPage,
          keyword: this.keyword
        }
        })
        .then(response => {
          console.log(response)
          console.log('response.data.data.rows', response.data.data.rows)
          this.rooms = response.data.data.rows
          // this.pagesize  = response.data.data.pages
          this.total = response.data.data.total
          console.log('-----------rooms', this.rooms)
        })
        .catch(error => console.log(error))
      },
    goRentalDetail(roomId) {
        this.$router.push({ name: "rentalDetail", params: { id: roomId } });
    },
  },
  created(){
    this.getHouseList()
  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.room-item {
  margin-bottom: 20px;
}

.room-card {
  height: 100%;
}

.image-container {
  height: 200px;
  display: flex;
  justify-content: center;
}

.room-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.content-container {
  padding: 20px;
}

.room-info {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.room-price-and-more {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.room-price {
  font-size: 24px;
  color: #ff5a5f;
  font-weight: bold;
}

.room-address {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.room-more {
  font-size: 12px;
  color: #bbb;
}
</style>
