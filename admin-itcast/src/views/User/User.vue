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
            <el-input placeholder="请输入内容" v-model="searchval" @keydown.native.enter="searchuserlist" class="input-with-select " style="width:300px">
                <el-button slot="append" icon="el-icon-search" @click="searchuserlist"></el-button>
            </el-input>
            <el-button type="success" plain @click="showadddialog">添加用户</el-button>
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
                        <el-switch @change="changestatus(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="success"  @click="showeditdialog(scope.row)" icon="el-icon-edit" plain></el-button>
                        </el-tooltip>

                        <el-tooltip content="删除" placement="top">
                            <el-button type="danger" @click="deleteuser(scope.row.id)" icon="el-icon-delete" plain></el-button>
                        </el-tooltip>
                        <el-tooltip content="授权角色" placement="top">
                            <el-button type="primary"  icon="el-icon-share" plain></el-button>
                        </el-tooltip>

                    </template>

                </el-table-column>
            </el-table>

        </template>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
            <el-form :model="addform" :rules="rules" ref="addform" label-width=" 100px" >
                <el-form-item label="用户名"  prop="username"  >
                    <el-input v-model="addform.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password"  >
                    <el-input v-model="addform.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email"  >
                    <el-input v-model="addform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话"  prop="mobile" >
                    <el-input v-model="addform.mobile" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addusersubmit('addform')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 添加编辑对话框 -->
         <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
            <el-form :model="editform" :rules="rules" ref="editform" label-width=" 100px" >
                <el-form-item label="用户名"  prop="username"   >
                    <el-input v-model="editform.username" disabled auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email"  >
                    <el-input v-model="editform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话"  prop="mobile" >
                    <el-input v-model="editform.mobile" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editusersubmit('editform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getalluserlist, adduser, edituser, deleteuserByid, updatauserstatus } from '@/api/index.js'

export default {
  data () {
    return {
      searchval: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      tableData: [],
      //   添加用户
      adddialogFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        moble: ''
      },
      // 编辑用户
      editdialogFormVisible: false,
      editform: {
        id: '',
        username: '',
        email: '',
        moble: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  mounted () {
    this.initlist()
  },
  methods: {

    // 修改用户数据的状态
    changestatus (row) {
      console.log(row)
      updatauserstatus({id: row.id, mg_state: row.mg_state}).then((res) => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.initlist()
        } else {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        }
      })
    },
    // 删除功能实现
    deleteuser (id) {
      this.$confirm(`此操作将永久删除id号为${id}的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteuserByid(id).then((res) => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.initlist()
          } else {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 显示编辑数据对话框
    showeditdialog (row) {
    //   console.log(row)
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.id = row.id
      this.editform.mobile = row.mobile
      this.editdialogFormVisible = true
    },
    // 编辑功能实现，
    editusersubmit (editform) {
      this.$refs[editform].validate((valid) => {
        if (valid) {
          edituser(this.editform).then((res) => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.initlist()
              this.editdialogFormVisible = false
            } else {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '输入不合法'
          })
        }
      })
    },
    // 添加数据
    addusersubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          adduser(this.addform).then((res) => {
            // console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.initlist()
              //   隐藏添加数据对话框
              this.adddialogFormVisible = false
              // 重置表单的内容
              this.$refs[formName].resetFields()
            } else {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '数据输入不合法'
          })
        }
      })
    },
    // 添加用户数据对话框
    showadddialog () {
      this.adddialogFormVisible = true
    },
    // 用户数据的搜索
    searchuserlist () {
      this.initlist()
    },
    // 分页事件 当每页显示的记录数发生改变的时候触发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initlist()
    },
    // 分页事件 当当前页码发生变化的时候触发
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initlist()
    },

    // 加载用户列表
    initlist () {
      getalluserlist({
        params: {
          query: this.searchval,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        //   console.log(568)
        // console.log(res)
        this.tableData = res.data.users
        this.total = res.data.total
      })
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
