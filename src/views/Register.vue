<template>
  <div class="register">
    <el-form ref="registerForm" label-position="top" :model="form" :rules="rules">
      <h3>账号注册</h3>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密　码：" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="form.role">
          <el-option v-for="item in roles"
          :key="item.id"
          :value="item.id"
          :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注　册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      roles: [],
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6-18个字符', trigger: ['blur', 'change'] }
        ],
        confirmPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过后的逻辑
          axios.post('/api/register', {
            username: this.form.username,
            password: this.form.password,
            role: this.form.role
          })
          .then(response => {
            console.log(response)
            this.$router.push('/login')
          })
          .catch(error => console.log(error))
        }
      })
    },
    listRoles () {
      axios.get('/api/roles', {

      })
      .then(response => {
        console.log(response)
        this.roles = response.data.data
      })
      .catch(error => console.log(error))
    }
  },
  created() {
    this.listRoles()
  }
}
</script>

<style>
.register {
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
