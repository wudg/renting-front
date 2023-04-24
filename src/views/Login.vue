<template>
  <div class="login">
    <el-form ref="loginForm" label-position="top" :model="form" :rules="rules">
      <h3>账号登录</h3>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密　码：" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登　录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过后的逻辑
          axios.post('/api/login', {
            username: this.form.username,
            password: this.form.password
          })
          .then(response => {
            console.log(response.data)
            const token = response.data.data
            const decoded = jwtDecode(token)
            localStorage.setItem('currentUser', JSON.stringify(decoded))
            localStorage.setItem('token', token)
            console.log(localStorage)
            this.$router.push('/')
          })
          .catch(error => console.log(error))
        }
      })
    }
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 60px 30px;
  box-shadow: 0 0 20px #ccc;
  border-radius: 6px;
}

h3 {
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
}
</style>
