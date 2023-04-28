import request from './request'

/* 查询商品分类列表 */
export const login = (query) => {
    return request({
        url: '/api/login',
        method: 'post',
        data: query
    })
}

export const houseList = (query) => {
    return request({
        url: `/api/house/pageList?pageSize=${query.pageSize}&pageNum=${query.pageNum}&keyword=${query.keyword}`,
        method: 'get',
        data: query
    })
}

// 新增出租房
export const addHouse = (query) => {
  return request({
      url: '/api/house/save',
      method: 'post',
      data: query
  })
}

// 南昌区域信息
export const queryRegionData = (query) => {
  return request({
      url: '/api/house/mapCity',
      method: 'get',
      data: query
  })
}


// 南昌地铁信息
export const querySubwayData = (query) => {
  return request({
      url: '/api/house/mapSubway',
      method: 'get',
      data: query
  })
}

export const queryHouseTypeData = (query) => {
  return request({
      url: '/api/house/listHouseType',
      method: 'get',
      data: query
  })
}

export const getHouseDetail = (query) => {
  return request({
      url: `/api/house/detail?id=${query.id}`,
      method: 'get',
      data: query
  })
}

export const uploadImg = (file) => {
  return request({
      url: '/api/house/uploadImg',
      method: 'post',
      data: file,
      headers:{ //请求头
        'Content-Type': 'mutipart/form-data'
    }
  })
}
