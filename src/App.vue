<template>
  <div>
    <el-menu class="menu" :default-active="$route.path" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
      <el-menu-item index="/"><router-link to="/">首页</router-link></el-menu-item>
      <el-submenu index="rent">
        <template slot="title">出租</template>
        <el-menu-item index="/rent/house"><router-link to="/rent/house">出租房源</router-link></el-menu-item>
        <el-menu-item index="/rent/tenant"><router-link to="/rent/tenant">找租户</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="search">
        <template slot="title">求租</template>
        <el-menu-item index="/search/house"><router-link to="/search/house">求租房源</router-link></el-menu-item>
        <el-menu-item index="/search/tenant"><router-link to="/search/tenant">找房源</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="/login"><router-link to="/login">登陆</router-link></el-menu-item>
      <el-menu-item index="/register"><router-link to="/register">注册</router-link></el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      links: [
        { text: '首页', url: '/' },
        { text: '求租', url: '/about' },
        { text: '出租', url: '/contract' },
        { text: '登陆', url: '/login' },
        { text: '注册', url: '/register' }
      ]
    }
  }
}
</script>

<style>
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}

nav li {
  margin-right: 20px;
}

nav a {
  font-size: 18px;
  color: #333;
  text-decoration: none;
}

nav a:hover {
  color: #007bff;
}
</style>
