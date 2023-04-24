<template>
  <div class="rental-add">
    <h2>新增出租房</h2>
    <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="100px" class="form">
      <el-form-item label="出租房所在地区">
        <el-cascader
          v-model="form.location"
          :options="options"
          :props="props"
          collapse-tags
          placeholder="请选择出租房所在地区">
        </el-cascader>
      </el-form-item>
      <el-form-item label="月租金" prop="rent">
        <el-input v-model="form.rent" type="number" placeholder="请输入月租金"></el-input>
      </el-form-item>
      <el-form-item label="水电费" prop="utilities">
        <el-input v-model="form.utilities" type="number" placeholder="请输入水电费"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">封面图不超过 5MB</div>
        </el-upload>
        <div v-if="form.cover_url" class="thumb-wrap">
          <img :src="form.cover_url" alt="" class="thumb">
        </div>
      </el-form-item>
      <el-form-item label="房间数量" prop="rooms">
        <el-input v-model="form.rooms" type="number" placeholder="请输入房间数量"></el-input>
      </el-form-item>
      <el-form-item label="客厅数量" prop="living_rooms">
        <el-input v-model="form.living_rooms" type="number" placeholder="请输入客厅数量"></el-input>
      </el-form-item>
      <el-form-item label="卫生间数量" prop="bathrooms">
        <el-input v-model="form.bathrooms" type="number" placeholder="请输入卫生间数量"></el-input>
      </el-form-item>
      <el-form-item label="是否有厨房" prop="has_kitchen">
        <el-switch v-model="form.has_kitchen"></el-switch>
      </el-form-item>
      <el-form-item label="是否有阳台" prop="has_balcony">
        <el-switch v-model="form.has_balcony"></el-switch>
      </el-form-item>
      <el-form-item label="出租房宣传照片">
        <el-upload
          ref="upload"
          class="upload-demo"
          :action="uploadURL"
          :on-success="handleSuccess"
          :multiple="true">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">宣传照片不超过 5MB</div>
        </el-upload>
        <div v-if="form.photos && form.photos.length" class="thumb-wrap">
          <img v-for="(photo, index) in form.photos" :src="photo" :key="index" alt="" class="thumb">
        </div>
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { Notification } from 'element-ui';

export default {
  name: 'RentalAdd',
  data() {
    return {
      form: {
        location: [],
        rent: '',
        utilities: '',
        cover_url: '',
        rooms: '',
        living_rooms: '',
        bathrooms: '',
        has_kitchen: false,
        has_balcony: false,
        photos: [],
      },
      props: { multiple: true },
        options: [{
          value: 1,
          label: '东南',
          children: [{
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          }, {
            value: 7,
            label: '江苏',
            children: [
              { value: 8, label: '南京' },
              { value: 9, label: '苏州' },
              { value: 10, label: '无锡' }
            ]
          }, {
            value: 12,
            label: '浙江',
            children: [
              { value: 13, label: '杭州' },
              { value: 14, label: '宁波' },
              { value: 15, label: '嘉兴' }
            ]
          }]
        }, {
          value: 17,
          label: '西北',
          children: [{
            value: 18,
            label: '陕西',
            children: [
              { value: 19, label: '西安' },
              { value: 20, label: '延安' }
            ]
          }, {
            value: 21,
            label: '新疆维吾尔族自治区',
            children: [
              { value: 22, label: '乌鲁木齐' },
              { value: 23, label: '克拉玛依' }
            ]
          }]
        }],
      rules: {
        location: [
          { required: true, message: '请选择出租房所在地区', trigger: 'change' }
        ],
        rent: [
          { required: true, message: '请输入月租金', trigger: 'blur' },
          { type: 'number', message: '月租金必须为数字值', trigger: 'blur' }
        ],
        utilities: [
          { required: true, message: '请输入水电费', trigger: 'blur' },
          { type: 'number', message: '水电费必须为数字值', trigger: 'blur' }
        ],
        rooms: [
          { required: true, message: '请输入房间数量', trigger: 'blur' },
          { type: 'number', message: '房间数量必须为数字值', trigger: 'blur' }
        ],
        living_rooms: [
          { required: true, message: '请输入客厅数量', trigger: 'blur' },
          { type: 'number', message: '客厅数量必须为数字值', trigger: 'blur' }
        ],
        bathrooms: [
          { required: true, message: '请输入卫生间数量', trigger: 'blur' },
          { type: 'number', message: '卫生间数量必须为数字值', trigger: 'blur' }
        ],
        cover_url: [
          { required: true, message: '请上传封面图', trigger: 'blur' }
        ]
      },
      uploadURL: 'YOUR_UPLOAD_URL_HERE'
    };
  },
  methods: {
    handleSuccess(res) {
      Notification.success('上传成功');
      this.form.cover_url = res.data.url; // res.data.url是上传成功后的图片地址
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('YOUR_API_URL_HERE', this.form)
            .then(res => {
              Notification.success('新增出租房成功');
              this.$router.push('/rental/list');
            })
            .catch(err => {
              Notification.error('新增出租房失败，请稍候再试');
            });
        }
      });
    }
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
