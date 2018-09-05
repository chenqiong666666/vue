<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <a href="/">用户管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>

        </el-breadcrumb>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select " style="width:300px">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain>添加用户</el-button>
        </div>
        <template>
            <el-table :data="tableData" border style="width: 100%;margin-top:15px">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="180">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="success" icon="el-icon-edit" plain></el-button>
                        </el-tooltip>

                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" icon="el-icon-delete" plain></el-button>
                        </el-tooltip>
                        <el-tooltip content="授权角色" placement="top">
                            <el-button type="primary" icon="el-icon-share" plain></el-button>
                        </el-tooltip>

                    </template>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </el-table-column>
            </el-table>

        </template>
    </div>
</template>

<script>
import { getalluserlist } from '@/api/index.js'

export default {
  data () {
    return {
      input5: ' ',

      tableData: [ ]

    }
  },
  mounted () {
    getalluserlist({query: '', pagenum: 1, pagesize: 4}).then(res => {
    //   console.log(568)

      console.log(res)
      this.tableData = res.data.users
    })
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }

}
</script>

<style lang="scss" scoped>
/* 覆盖element导航菜单的样式 */
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>
