<template>
  <div class="categories">
    <!-- 面包屑(导航栏) -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="showaddDialog">添加分类</el-button>
    </div>
   <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="categorieslist"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>

  </div>
</template>

<script>
import {getcategories} from '@/api/index.js'
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  data () {
    return {
      categorieslist: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  components: {
    'tree-grid': TreeGrid
  },
  methods: {
    // 添加分类
    showaddDialog () {},
    // 删除数据
    deleteCategory () {},
    // 编辑数据
    editCategory () {}

  },
  mounted () {
    // 调用接口
    getcategories(3).then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.categorieslist = res.data
      } else {
        this.$message({
          message: res.meta.msg,
          type: 'error'
        })
      }
    })
  }
}
</script>

<style scoped>
</style>
