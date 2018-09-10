<template>
  <div>
    <!-- 面包屑(导航栏) -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="showrloeDialog">添加角色</el-button>
    </div>
    <template>
      <el-table :data="rloeList" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="first in scope.row.children" :key="first.id" style="margin:4px">
              <el-col :span="4">
                <el-tag @close="deleterloeright(scope.row,first.id)" closable type="success">
                  {{first.authName}}
                </el-tag>
              </el-col>
              <el-col :span="20">
                <el-row style="margin:4px" v-for="second in first.children" :key="second.id">
                  <el-col :span="4">
                    <el-tag @close="deleterloeright(scope.row,second.id)" closable type="info">
                      {{second.authName}}
                    </el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag style="margin:4px" @close="deleterloeright(scope.row,three.id)" v-for="three in second.children" :key="three.id" closable type="warning">
                      {{three.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if='scope.row.children.length===0'>
              <el-col>没有任何权限,请前往添加</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>

        <el-table-column label="描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button type="success" icon="el-icon-edit" plain></el-button>
            </el-tooltip>

            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" plain></el-button>
            </el-tooltip>
            <el-tooltip content="分配权限" placement="top">
              <el-button type="primary" @click='showGrantDialog(scope.row)' icon="el-icon-share" plain></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </template>
    <!-- 角色授权对话框 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogVisible">
      <div style="height:300px; overflow:auto">
        <el-tree :data="rightList" ref="tree" :default-expand-all="true" show-checkbox node-key="id" :default-checked-keys="checkArr" :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantrolesubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrloesubmit('addform')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  getAllrloeList,
  deleterloeByid,
  getrightList,
  grantrloelright,
  addrole
} from '@/api/index.js'
export default {
  data () {
    return {
      grantdialogVisible: false,
      roleId: '',
      rloeList: [],
      rightList: [],
      checkArr: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      adddialogFormVisible: false,

      addform: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        roleDesc: [{}]
      }
    }
  },
  mounted () {
    this.initlist()
  },
  methods: {
    // 添加角色
    addrloesubmit (addform) {
      // console.log(addformm)

      addrole(this.addform).then(res => {
        // console.log(res)
        if (res.meta.status === 201) {
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
        // console.log(this.$refs)
        this.$refs[addform].resetFields()

        this.adddialogFormVisible = false
      })
    },

    // 显示添加角色对话框
    showrloeDialog () {
      this.adddialogFormVisible = true
    },
    //   角色授权提交
    grantrolesubmit () {
      // 两个参数 roleId rids(字符串)
      this.grantdialogVisible = false
      //   console.log(this.$refs.tree.getCheckedNodes())
      // 得到一个对象数组  里面有我们需要的  id和 pid
      var nodeArr = this.$refs.tree.getCheckedNodes()
      // 遍历这个数组  获取到这个数组中每个对象的id和pid 进行拼接(用map方法)，返回一个新数组
      var idArr = nodeArr.map(value => {
        return value.id + ',' + value.pid
      })
      //   console.log(idArr)// 得到的结果是["105,104,101", "116,104,101", "117,104,101"]
      // 将这个数组拆分 用,分开
      var str = idArr.join(',')
      //   console.log(str)// 得到105,104,101,116,104,101,117,104,101
      // 去重复  因为不能直接对字符串去重复  所以先转成数组
      var ridsArr = str.split(',')
      //   console.log(ridsArr)
      var tempset = new Set(ridsArr)
      //   console.log(tempset)
      var final = Array.from(tempset)
      //   console.log(final)//得到["105", "104", "101", "116"]数组
      var rids = final.join(',')
      // 调用接口
      grantrloelright({ roleId: this.roleId, rids: rids }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.initlist()
          this.$refs.tree.setCheckedKeys([])
        }
      })
    },
    // 显示角色授权对话框
    showGrantDialog (row) {
      this.grantdialogVisible = true
      getrightList('tree').then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.rightList = res.data
        }
      })
      this.roleId = row.id
      // 加载默认选中项
      // 先清空上次的默认选中项
      this.checkArr.length = 0
      if (row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children.length > 0) {
                second.children.forEach(three => {
                  this.checkArr.push(three.id)
                })
              }
            })
          }
        })
      }
    },

    // 删除角色指定权限 roleId是角色id  rightId对应的指定权限id
    deleterloeright (row, rightId) {
      deleterloeByid(row.id, rightId).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          row.children = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    // 加载角色列表
    initlist () {
      getAllrloeList().then(res => {
        //   console.log(res)
        if (res.meta.status === 200) {
          this.rloeList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>
