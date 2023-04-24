<template>
  <div class="detail">
    <div class="image-container">
      <img v-if="house.images && house.images[0]" :src="house.images[0]" alt="出租房图片">
    </div>
    <div class="info-container">
      <h3 class="title">{{ house.title }}</h3>
      <p class="detail" v-if="house.rooms && house.halls && house.toilets && house.size && house.price">{{ house.rooms }}室{{ house.halls }}厅{{ house.toilets }}卫 | {{ house.size }}平米 | {{ house.price }}元/月</p>
      <p class="location">{{ house.province }}{{ house.city }}{{ house.district }}{{ house.street }}{{ house.address }}</p>
      <p class="description">{{ house.description }}</p>
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
export default {
  name: 'RentalDetail',
  data() {
    return {
      house: {},
    };
  },
  mounted() {
    // 获取出租房id
    const houseId = this.$route.params.id;
    // 根据id获取相应的出租房信息
    // 我们可以假设house数据是通过http请求获取的
    // 这里我们使用假数据
    this.house = this.getHouseById(houseId);
    console.log('house', house)
  },
  methods: {
    getHouseById(id) {
      const houses = [
        {
          id: 1,
          mages: ['./assets/house-image.jpg'],
          title: '001 整租 福城花园 3室2厅 120平米',
          rooms: '3',
          halls: '2',
          toilets: '2',
          size: '120',
          price: '5500',
          province: '广东省',
          city: '广州市',
          district: '白云区',
          street: '',
          address: '福泽路168号',
          description: '福城花园中间楼层 中装3房2厅2卫，房子朝南，阳光充足，视野开阔。',
          bus: '地铁白云大道北 站 14、15、29、30、32、50、57、65、74、76、85、118、130、155、171、179、199、244、271、292、298、305、507、807、860等白云大道北.',
          subway: '地铁2号线白云大道北站C口，步行约10分钟，附近有公交站可乘坐。'
        },
        {
          id: 2,
          mages: ['./assets/house-image.jpg'],
          title: '002整租 福城花园 3室2厅 120平米',
          rooms: '3',
          halls: '2',
          toilets: '2',
          size: '120',
          price: '5500',
          province: '广东省',
          city: '广州市',
          district: '白云区',
          street: '',
          address: '福泽路168号',
          description: '福城花园中间楼层 中装3房2厅2卫，房子朝南，阳光充足，视野开阔。',
          bus: '地铁白云大道北 站 14、15、29、30、32、50、57、65、74、76、85、118、130、155、171、179、199、244、271、292、298、305、507、807、860等白云大道北.',
          subway: '地铁2号线白云大道北站C口，步行约10分钟，附近有公交站可乘坐。'
        },
        {
          id: 3,
          mages: ['./assets/house-image.jpg'],
          title: '003整租 福城花园 3室2厅 120平米',
          rooms: '3',
          halls: '2',
          toilets: '2',
          size: '120',
          price: '5500',
          province: '广东省',
          city: '广州市',
          district: '白云区',
          street: '',
          address: '福泽路168号',
          description: '福城花园中间楼层 中装3房2厅2卫，房子朝南，阳光充足，视野开阔。',
          bus: '地铁白云大道北 站 14、15、29、30、32、50、57、65、74、76、85、118、130、155、171、179、199、244、271、292、298、305、507、807、860等白云大道北.',
          subway: '地铁2号线白云大道北站C口，步行约10分钟，附近有公交站可乘坐。'
        },
      ];
      return houses.find((house) => house.id == id);
    },
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
