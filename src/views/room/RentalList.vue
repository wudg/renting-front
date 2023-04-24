<template>
  <div class="page-container">
    <el-button type="primary" @click="$router.push('/rental/room/add')">新增出租房</el-button>
    <el-row>
      <el-col :md="24" :lg="8" v-for="room in rooms" :key="room.id" class="room-item">
        <el-card shadow="hover" class="room-card">
          <div class="image-container">
            <img :src="room.cover" alt="" class="room-image" v-on:click="goRentalDetail(room.id)"/>
          </div>
          <div class="content-container">
            <div class="room-title">{{ room.villageName }}</div>
            <div class="room-address">{{ room.address }}</div>
            <div class="room-info">
              <span>户型：{{ room.roomNumber }} 室 {{ room.roomNumber }} 厅 {{ room.saloonNumber }} 卫生间 {{ room.toiletNumber }} 厨房 {{ room.kitchen }} 阳台 {{ room.balcony }}</span>
              <span>房屋面积：{{ room.area }}平米</span>
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
      :page-sizes="[5, 10, 15, 20]"
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
      pagesize: 5, //    每页的数据
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
        this.getRooms()
    },
    handleCurrentChange (currentPage) {
      console.log(currentPage,'currentPage');
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.getRooms()
    },
    getRooms(){
      console.log('getRooms当前页:', this.currentPage)
      console.log('getRooms当前页数量:', this.pagesize)
      axios.get('/api/room/pageList', {
        params: {
          pageSize: this.pagesize,
          pageNum: this.currentPage
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
    this.getRooms()
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
