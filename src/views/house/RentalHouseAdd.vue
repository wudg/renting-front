<template>
  <div class="rental-add"  style="width:100%; height:80%;">
    <!-- 新建出租房的表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="150px" class="form"  style="width:60%; height:80%;margin-left:auto;">
      <h2 style="font-size:50px;color:red;">新增出租房</h2>
      <!-- 出租房位置选择(级联) -->
      <el-form-item label="出租房所在地区" prop="regionLocation">
        <el-cascader
        v-model="form.regionLocation"
        :options="regionOptions"
        :props="{ checkStrictly: true }"
        placeholder="请选择出租房所在地区"
        clearable></el-cascader>
      </el-form-item>

      <!-- 出租房附近地铁选择(级联) -->
      <el-form-item label="出租房附近地铁" prop="subwayLocation">
        <el-cascader
        v-model="form.subwayLocation"
        :options="subwayOptions"
        :props="{ checkStrictly: true }"
        placeholder="请选择出租房附近地铁"
        clearable></el-cascader>
      </el-form-item>

      <!-- 小区名字输入 -->
      <el-form-item label="小区/村名称" prop="villageName">
        <el-input v-model="form.villageName" type="string" placeholder="请输入小区/村名称" style="width:200px;"></el-input>
      </el-form-item>

      <!-- 出租房具体房号选择 -->
      <el-form-item label="房号信息" prop="houseNo">
        <el-input v-model="form.houseNo" type="string" placeholder="请输入房号" style="width:200px;"></el-input>
      </el-form-item>

      <!-- 出租房面积大小输入 -->
      <el-form-item label="总面积" prop="area">
        <el-input v-model="form.area" type="number" placeholder="请输入总面积" style="width:200px;"></el-input>
      </el-form-item>

      <!-- 出租房月租金输入 -->
      <el-form-item label="月租金" prop="price">
        <el-input v-model="form.price" type="number" placeholder="请输入月租金" style="width:200px;"></el-input>
      </el-form-item>

      <!-- 水电费 -->
      <el-form-item label="电费/度" prop="powerRate">
        <el-input v-model="form.powerRate" type="number" placeholder="请输入水电费" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="水费/吨" prop="waterRate">
        <el-input v-model="form.waterRate" type="number" placeholder="请输入水电费" style="width:200px;"></el-input>
      </el-form-item>

      <!-- 出租房主图 -->
      <el-form-item label="封面图" >
        <el-upload
          :http-request="uploadImgLocal"
          class="upload-demo"
          action="action"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :on-success="handleSuccess1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">封面图不超过 5MB</div>
        </el-upload>
        <div v-if="form.cover" class="thumb-wrap">
          <img :src="form.cover" alt="" class="thumb">
        </div>
      </el-form-item>

      <!-- 出租房户型下拉选择 -->
      <el-form-item label="户型" prop="houseTypeId">
        <el-select v-model="form.houseTypeId" placeholder="请选择户型">
        <el-option
          v-for="item in houseTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>

      <!-- 出租方式选择 -->
      <el-form-item label="出租方式" prop="rentalMethod">
        <el-radio v-model="form.rentalMethod" label="0">整租</el-radio>
        <el-radio v-model="form.rentalMethod" label="1">合租</el-radio>
      </el-form-item>

      <!-- 装修级别选择 -->
      <el-form-item label="装修级别" prop="level">
        <el-radio v-model="form.level" label="0">简装</el-radio>
        <el-radio v-model="form.level" label="1">精装</el-radio>
      </el-form-item>

      <!-- 朝向选择 -->
      <el-form-item label="朝向" prop="toward">
        <el-radio v-model="form.toward" label="0">东</el-radio>
        <el-radio v-model="form.toward" label="1">西</el-radio>
        <el-radio v-model="form.toward" label="2">南</el-radio>
        <el-radio v-model="form.toward" label="3">北</el-radio>
      </el-form-item>

      <!-- 厨卫阳台选择 -->
      <el-form-item label="是否有卫生间" prop="toilet">
        <el-switch v-model="form.toilet"></el-switch>
      </el-form-item>
      <el-form-item label="是否有厨房" prop="kitchen">
        <el-switch v-model="form.kitchen"></el-switch>
      </el-form-item>
      <el-form-item label="是否有阳台" prop="balcony">
        <el-switch v-model="form.balcony"></el-switch>
      </el-form-item>

      <!-- 一系列出租房宣传照片选择 -->
      <el-form-item label="出租房宣传照片">
        <el-upload
          ref="upload"
          class="upload-demo"
          :http-request="uploadImgBatchLocal"
          action="action"
          :on-remove="handleRemove"
          :on-success="handleSuccess2"
          :multiple="true">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">【可上传多张】</div>
        </el-upload>

        <!-- 展示已上传图片 -->
        <div v-if="form.photos && form.photos.length" class="thumb-wrap">
          <img v-for="(photo, index) in form.photos" :src="photo" :key="index" alt="" class="thumb">
        </div>
      </el-form-item>

      <!-- 备注信息 -->
      <el-form-item label="备注" prop="description">
        <el-input v-model="form.description" type="string" placeholder="请输入备注信息" style="width:400px;"></el-input>
      </el-form-item>

      <!-- 提交表单 -->
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { Notification } from 'element-ui';
import {addHouse, queryRegionData, querySubwayData, queryHouseTypeData, uploadImg} from '@/http/api'


export default {
  name: 'RentalAdd',
  data() {
    return {
      // 表单数据对象
      form: {
        regionLocation: [],
        subwayLocation:[],
        price: '',
        area:'',
        powerRate: '',
        waterRate: '',
        villageName: '',
        rentalMethod: '',
        level: '',
        cover: '',
        houseTypeId:'',
        houseNo: '',
        description: '',
        toilet: false,
        kitchen: false,
        balcony: false,
        photos: [],
      },

      // 出租房类型字典数据
      houseTypeList:[],

      // 出租房所在区域字典数据
      regionOptions: [],
      // 出租房附近地铁字典数据
      subwayOptions: [],

      // 表单规则
      rules: {
        regionLocation: [
          { required: true, message: '请选择出租房所在地区', trigger: 'change' }
        ],
        subwayLocation: [
          { required: true, message: '请选择出租房附近地铁', trigger: 'change' }
        ],
        villageName: [
          { required: true, message: '请选择出租房所在小区或村名称', trigger: 'change' }
        ],
        houseNo: [
          { required: true, message: '请选择出租房房号信息(楼层和编号)', trigger: 'change' }
        ],
        area: [
          { required: true, message: '请选择出租房面积大小', trigger: 'change' }
        ],
        houseTypeId: [
          { required: true, message: '请选择出租房户型', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入月租金', trigger: 'blur' }
        ],
        waterRate: [
          { required: true, message: '请输入水费', trigger: 'blur' }
        ],
        powerRate: [
          { required: true, message: '请输入电费', trigger: 'blur' }
        ],
        // toilet: [
        //   { required: true, message: '请选择是否有卫生间', trigger: 'change' }
        // ],
        rentalMethod: [
          { required: true, message: '请选择出租方式', trigger: 'change' }
        ],
        toward: [
          { required: true, message: '请选择出租房朝向', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请选择装修级别', trigger: 'change' }
        ],
        cover: [
          { required: true, message: '请上传封面图', trigger: 'blur' }
        ],
        phoots: [
          { type: `array`, required: true, message: '请上传宣传照片', trigger: 'blur' }
        ]
      },
      // 后端图片上传路径
      // uploadURL: '/api/house/uploadImg'
    };
  },
  methods: {
    beforeUpload(file){

    },
    // 出租房主图上传成功后回调
    handleSuccess1(res) {
      console.log('handleSuccess1 res', res)
      Notification.success('上传成功');
      this.form.cover = res.data; // res.data.url是上传成功后的图片地址
    },

    // 对已上传成功的宣传照片删除，从photo中移除
    handleRemove(file, photos) {
      console.log('handleSuccess2 photos', photos)
      let index = photos.indexOf(file.response.data);
      this.form.photos.splice(index, 1)
    },

    // 出租房宣传照片上传成功后回调
    handleSuccess2(res) {
      Notification.success('上传成功');
      this.form.photos.push(res.data); // res.data.url是上传成功后的图片地址
      console.log('所有图片', this.form.photos)
    },

    uploadImgLocal(param){
      var formData = new FormData()
      console.log('param', param)
      console.log('file', param.file)
      formData.append("file", param.file)
      uploadImg(formData)
        .then(response => {
          console.log('uploadImgLocal-response', response)
          console.log('response.data.data', response.data.data)
          this.form.cover = response.data.data
        })
        .catch(error => console.log(error))
    },

    uploadImgBatchLocal(param){
      var formData = new FormData()
      console.log('param', param)
      console.log('file', param.file)
      formData.append("file", param.file)
      console.log('formData', formData)
      Notification.success('上传成功');
      uploadImg(formData)
        .then(response => {
          console.log('uploadImgLocal-response', response)
          console.log('response.data.data', response.data.data)
          this.form.photos.push(response.data.data);
        })
        .catch(error => console.log(error))
    },

    // 获取南昌级联区域数据
    getMapCity(){
      queryRegionData()
        .then(response => {
          this.regionOptions = response.data.data
        })
        .catch(error => console.log(error))
      },
      // 获取南昌地铁级联数据
      listMapSubway(){
        querySubwayData()
        .then(response => {
          this.subwayOptions = response.data.data
        })
        .catch(error => console.log(error))
      },
      // 获取出租房户型数据
      listHouseType(){
        queryHouseTypeData()
        .then(response => {
          this.houseTypeList = response.data.data
        })
        .catch(error => console.log(error))
      },
    // 提交表单
    submitForm(formName) {
      addHouse(this.form)
            .then(res => {
              Notification.success('新增出租房成功');
              this.$router.push('/');
            })
            .catch(err => {
              console.log(err)
              Notification.error('新增出租房失败，请稍候再试');
            });
    }
  },
  created() {
    this.getMapCity()
    this.listHouseType()
    this.listMapSubway()
  }
};
</script>

<style scoped>
  .thumb-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .thumb {
    object-fit: cover;
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>
