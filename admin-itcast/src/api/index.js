import axios from 'axios'
// 设置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// 设置拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  var token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 登录
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
// 获取所有数据
export const getalluserlist = (pa) => {
  return axios.get('users', pa).then((res) => {
    return res.data
  })
}
// 添加用户的功能实现
export const adduser = (pa) => {
  return axios.post('users', pa).then((res) => {
    return res.data
  })
}
/// / 编辑用户的功能实现
export const edituser = (pa) => {
  return axios.put(`users/${pa.id}`, pa).then((res) => {
    return res.data
  })
}
// 实现删除功能
export const deleteuserByid = (id) => {
  return axios.delete(`users/${id}`).then((res) => {
    return res.data
  })
}

// 修改用户的状态
export const updatauserstatus = (pa) => {
  return axios.put(`users/${pa.id}/state/${pa.mg_state}`).then((res) => {
    return res.data
  })
}
// 获取权限列表数据
export const getrightList = (pa) => {
  return axios.get(`rights/${pa}`).then((res) => {
    return res.data
  })
}
// 获取权限角色列表数据
export const getAllrloeList = () => {
  return axios.get('roles').then((res) => {
    return res.data
  })
}

// 删除角色指定权限数据
export const deleterloeByid = (roleId, rightId) => {
  return axios.delete(`roles/${roleId}/rights/${rightId}`).then((res) => {
    return res.data
  })
}
// 为指定角色授权权限
export const grantrloelright = (pa) => {
  return axios.post(`roles/${pa.roleId}/rights`, {rids: pa.rids}).then((res) => {
    return res.data
  })
}
// 添加用户
export const addrole = (pa) => {
  return axios.post('roles', pa).then((res) => {
    return res.data
  })
}
// 获取左侧菜单数据列表
export const getleftmenu = () => {
  return axios.get('menus').then((res) => {
    return res.data
  })
}
// 获取分类数据列表
export const getcategories = (type) => {
  return axios.get('categories', {params: {'type': type}}).then((res) => {
    return res.data
  })
}
