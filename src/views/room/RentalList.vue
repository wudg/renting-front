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
      style="margin-top: 20px; text-align: center;"
      layout="prev, pager, next"
      :total="rooms.length"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>

import axios from "axios";  //引入axios

export default {
  name: 'RentalList',
  data() {
    return {
      rooms: [
        {
          id: 1,
          title: '光华路SOHO一期',
          address: '北京市朝阳区光华路SOHO一期',
          image: 'https://picsum.photos/400/300?image=1042',
          type: '3室1厅1卫',
          area: 100,
          price: '12000',
          more: '带阳台，家电齐全，免中介'
        },
        {
          id: 2,
          title: '团结湖公寓',
          address: '北京市朝阳区团结湖公寓',
          image: 'https://picsum.photos/400/300?image=1067',
          type: '2室2厅1卫',
          area: 80,
          price: '8500',
          more: '交通便利，小区绿化好，求有缘人'
        },
        {
          id: 3,
          title: '望京SOHO',
          address: '北京市朝阳区望京SOHO',
          image: 'https://picsum.photos/400/300?image=1074',
          type: '1室0厅1卫',
          area: 50,
          price: '5800',
          more: '独立卫浴，家电齐全，随时可以入住'
        },
        {
          id: 4,
          title: '中关村SOHO',
          address: '北京市海淀区中关村SOHO',
          image: 'https://picsum.photos/400/300?image=1079',
          type: '2室1厅1卫',
          area: 90,
          price: '9500',
          more: '近科技园区，房子新装修，随时可以看房'
        },
        {
          id: 5,
          title: '丰台城区',
          address: '北京市丰台区城区',
          image: 'https://picsum.photos/400/300?image=1075',
          type: '3室2厅2卫',
          area: 120,
          price: '12800',
          more: '近地铁口，周边设施齐全，求找室友'
        },
        {
          id: 6,
          title: '北京邮电大学家属区',
          address: '北京市海淀区北京邮电大学家属区',
          image: 'https://picsum.photos/400/300?image=1058',
          type: '1室1厅1卫',
          area: 70,
          price: '7500',
          more: '出门便是公交车站，周边超市购物方便'
        },
        {
          id: 7,
          title: '雅宝路小区',
          address: '上海市闵行区雅宝路小区',
          image: 'https://picsum.photos/400/300?image=1080',
          type: '2室1厅1卫',
          area: 85,
          price: '8700',
          more: '治安好，近公园，干净整洁'
        },
        {
          id: 8,
          title: '广州市天河区公寓',
          address: '广州市天河区天河区公寓',
          image: 'https://picsum.photos/400/300?image=1077',
          type: '1室1厅1卫',
          area: 60,
          price: '6500',
          more: '安全方便，装修精致，周围环境好'
        },
        {
          id: 9,
          title: '深圳市罗湖区公寓',
          address: '深圳市罗湖区罗湖区公寓',
          image: 'https://picsum.photos/400/300?image=1065',
          type: '2室2厅1卫',
          area: 90,
          price: '9800',
          more: '交通方便，靠近火车站和地铁口'
        },
        {
          id: 10,
          title: '杭州市江干区公寓',
          address: '杭州市江干区江干区公寓',
          image: 'https://picsum.photos/400/300?image=1050',
          type: '2室1厅1卫',
          area: 80,
          price: '8500',
          more: '干净明亮，拎包入住，随时可以看房'
        }
      ],
      currentPage: 1,
      pageSize: 3
    };
  },
  computed: {
    paginatedRooms() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.rooms.slice(startIndex, endIndex);
    }
  },
  methods: {
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    getRooms(){
      axios.get('/api/room/pageList', {
        })
        .then(response => {
          console.log(response)
          console.log('response.data.data.rows', response.data.data.rows)
          this.rooms = response.data.data.rows
          this.pageSize  = response.data.data.pages
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
