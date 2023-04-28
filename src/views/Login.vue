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
        <el-button type="primary" @click="userLogin('loginForm')">登　录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {login} from "@/http/api";

export default {
  data() {
    return {
      token: '',
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
    userLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过后的逻辑
          const param = {
            username: this.form.username,
            password: this.form.password
          };
          login(param)
          .then(response => {
            this.token = response.data.data
            localStorage.setItem('token', `Bearer ${this.token}`);
            // 跳转到首页
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
