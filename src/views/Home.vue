<template>
  <div class="home">
    <div class="home-list">
    <RentalList />
    </div>
  </div>
</template>
<script>

import RentalList from './house/RentalList.vue'


export default {
  name: 'Home',
  components: {
    RentalList
  },
  data() {
    return {
      homeItems: []
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.home-header {
    background-color: #fff;
    height: 70px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .home-header-wrapper {
      height: 70px;
      margin: 0 auto;
      max-width: 1200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .home-header-logo {
        img {
          height: 50px;
        }
      }
      .home-header-nav {
        ul {
          display: flex;
          li {
            margin-right: 30px;
            a {
              color: #333;
              font-size: 16px;
              font-weight: bold;
              &:hover {
                color: #ff6b6b;
              }
            }
          }
        }
      }
    }
  }
  .home-banner {
    position: relative;
    height: 500px;
    width: 100%;
    .home-banner-slider {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .home-banner-slide {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        text-align: center;
        h3,
        p {
          color: #fff;
        }
        h3 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          margin-bottom: 40px;
        }
        a {
          display: inline-block;
          text-align: center;
          padding: 10px 20px;
          background-color: #ff6b6b;
          color: #fff;
          border-radius: 30px;
          &:hover {
            background-color: #fd5a5a;
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .home-search {
    padding: 50px 0;
    background-color: #f4f4f4;
    .home-search-form {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      input[type='text'] {
        width: 500px;
        height: 50px;
        padding: 0 20px;
        border: none;
        border-radius: 30px 0 0 30px;
      }
      button[type='submit'] {
        height: 50px;
        line-height: 50px;
        background-color: #ff6b6b;
        color: #fff;
        font-size: 16px;
        padding: 0 30px;
        border: none;
        border-radius: 0 30px 30px 0;
        cursor: pointer;
        &:hover {
          background-color: #fd5a5a;
        }
      }
    }
  }
  .home-list {
    background-color: #fff;
    padding: 50px 0;
    .home-list-title {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 24px;
      }
      a {
        color: #333;
        font-size: 16px;
        font-weight: bold;
        &:hover {
          color: #ff6b6b;
        }
      }
    }
    .home-list-items {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      .home-list-item {
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .home-list-item-desc {
          padding: 20px;
          h3 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            color: #999;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
</style>
