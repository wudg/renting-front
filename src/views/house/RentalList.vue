<template>
  <div class="page-container">
    <!-- 新增出租房按钮 -->
    <el-button type="primary" @click="$router.push('/rental/house/add')" style="position:absolute;top:80px;right:20px;">新增出租房</el-button>
    <!-- 按小区名字搜索出租房 -->
    <el-input v-model="keyword" placeholder="请输入小区名称" @input="getHouseList" size="medium" style="width:300px;"></el-input>

    <!-- 出租房列表 -->
    <el-row>
      <el-col :md="24" :lg="8" v-for="house in houses" :key="house.id" class="house-item">
        <!-- 卡片方式展示出租房 -->
        <el-card shadow="hover" class="house-card">

          <!-- 主图 -->
          <div class="image-container">
            <img :src="house.cover" alt="" class="house-image" @click="goRentalDetail(house.id)"/>
          </div>

          <!-- 出租房其他描述信息 -->
          <div class="content-container">

            <!-- 出租类型-所在小区 -->
            <div class="house-title"> {{house.rentalMethod == 0 ? '整租' : '合租'}} - {{ house.villageName }}</div>

            <!-- 具体位置(所在区) -->
            <div class="house-address">地址： {{ house.address }}<span v-if="house.district">({{house.district}}) </span></div>

            <!-- 地铁站(地铁线路) -->
            <div class="house-subway">附近地铁： {{ house.subwayStation }}<span v-if="house.subwayLine">({{house.subwayLine}})</span> </div>

            <!-- 房子基本属性 -->
            <div class="house-info">
              <span>户型：{{ house.houseType }}</span>
              <span>房屋面积：{{ house.area }}平米</span>
              <span v-if="house.toilet==1">有卫生间</span>
              <span v-if="house.kitchen==1">有厨房</span>
              <span v-if="house.balcony==1">有阳台</span>
            </div>

            <!-- 费用相关 -->

            <div class="house-price-and-more">
              <!-- 月租 -->
              <div class="house-price">
                {{ house.price }}/月
              </div>
              <!-- 水费
              <div class="house-more">
                {{ house.wateRate }}
              </div> -->
              <!-- 电费 -->
              <!-- <div class="house-more">
                {{ house.powerRate }}
              </div> -->
            </div>

            <!-- 备注 -->
            <div class="house-description">
                {{ house.description ? house.description : '无备注信息' }}
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

import {houseList} from "@/http/api";

export default {
  name: 'RentalList',
  data() {
    return {
      // 出租房列表数据
      houses: [],
      // 出租房总数
      total: 0, //总条数
      // 当前页
      currentPage: 1, //初始页
      // 每页大小
      pagesize: 6, //    每页的数据
      // 关键词
      keyword:'',
    };
  },
  computed: {

  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange (size) {
        //每页数量修改，重新执行查询
        this.pagesize = size;
        this.getHouseList()
    },

    // 当前页码修改
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage;
      this.getHouseList()
    },

    // 获取所有出租房信息
    getHouseList(){
      console.log('axios headers', this.$http.defaults.headers)
      const param =  {
          pageSize: this.pagesize,
          pageNum: this.currentPage,
          keyword: this.keyword
        }
        houseList(param)
        .then(response => {
          console.log('response', response)
          this.houses = response.data.data.rows
          this.total = response.data.data.total
        })
        .catch(error => console.log(error))
      },

    // 跳转到出租房明细页面(携带出租房ID)
    goRentalDetail(houseId) {
        this.$router.push({ name: "rentalDetail", params: { id: houseId } });
    },
  },
  // 进页面即初始化
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

.house-item {
  margin-bottom: 20px;
}

.house-card {
  height: 100%;
}

.image-container {
  height: 200px;
  display: flex;
  justify-content: center;
}

.house-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.content-container {
  padding: 20px;
}

.house-info {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.house-price-and-more {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.house-description {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.house-price {
  font-size: 28px;
  color: #ff5a5f;
  font-weight: bold;
}

.house-title {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
}

.house-more {
  font-size: 12px;
  color: #bbb;
}
</style>
