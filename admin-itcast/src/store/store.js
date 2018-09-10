import Vue from 'Vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
const state = {
  username: ''
}
const mutations = {}
const actions = {}
const getters = {}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
// export default new Vuex.Store({
//   // 如果添加了严格模式，那么直接修改state中的数据会报错：Do not mutate vuex store state outside mutation handlers，所以还是需要使用mutations中的函数进行数据的修改
//   // strict: true,
//   state
//   // getters,
//   // actions,
//   // mutations
// })
