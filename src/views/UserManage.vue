<template>
  <div>
    <div style="width:40%; margin: 10px auto;">
      <el-input placeholder="请输入 用户姓名 或 职位 或 账号" prefix-icon="el-icon-search" v-model="search">
      </el-input>
    </div>
    <el-table size="mini" class="users-table-body" :data="dataTemp" stripe style="width: 70%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" header-align="center" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="user_id" header-align="center" label="账号" width="100">
      </el-table-column>
      <el-table-column prop="blog_age" header-align="center" label="年龄" width="100">
      </el-table-column>
      <el-table-column prop="title" header-align="center" label="职业" width="100">
      </el-table-column>
      <el-table-column prop="address" header-align="center" label="所在地">
      </el-table-column>
      <el-table-column label="操作" header-align="center">
          <template slot-scope="scope">
              <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="showModel(scope.row, 'update')">编辑</el-button>
          </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户按钮 -->
    <div class="addButton">
        <el-button type="danger" icon="el-icon-plus" @click="showModel(null, 'add')" circle></el-button>
    </div>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" width="50%" custom-class="addUser-body" 
        :visible.sync="dialogTableVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="用户姓名：" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="职位：" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input-number v-model="form.blog_age" controls-position="right" :min="1" :max="110"></el-input-number>
          </el-form-item>
          <el-form-item label="账号：">
            <el-input v-if="isUpdate===false" placeholder="请输入全数字的账号" v-model="form.user_id"></el-input>
            <el-input v-if="isUpdate===true" :disabled="true" placeholder="请输入全数字的账号" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">提 交</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        dataTemp: [],
        search: '',
        isUpdate: false,
        dialogTableVisible: false,
        form: {
          address: '',
          blog_age: 0,
          user_id: '',
          password: '',
          title: '',
          username: ''
        },
        rules: {
          blog_age: 0,
          user_id: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入职务', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
        init() {
          this.axios.get('getAllUserInfo').then((res) => {
              this.tableData = res.data.data
              this.dataTemp = res.data.data
          })
        },
        showModel(params, type) {
          if(type === 'update') {
            this.form = params
            this.isUpdate = true
          } else if(type === 'add') {
            this.isUpdate = false
            this.form = { address: '', blog_age: 0,
              user_id: '', password: '', title: '', username: ''
            }
          }
          this.dialogTableVisible = true;
        },
        submit() {
          for( let item in this.form) {
            if(item === '') {
              this.$message.error('用户信息请添加完整');
              return
            }
          }
          if(this.isUpdate) {
            this.axios.post('updateUserInfoById', this.form).then((res) => {
                if(res.data.code === 200) {
                  this.$message({
                    message: '用户信息 修改成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.init();
                  this.dialogTableVisible = false
                }
            })
          }
          else {
            this.axios.post('addUser', this.form).then((res) => {
                if(res.data.code === 200) {
                  this.$message({
                    message: '用户信息 添加成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.init();
                  this.dialogTableVisible = false
                }
            })
          }
        },
        deleteUser(userInfo) {
          this.$confirm('确认关闭？')
            .then(_ => {
                this.axios.get('deleteUserById', {params: {
                  id: userInfo.id
                }}).then((res) => {
                    if(res.data.code === 200) {
                      this.$message({
                        message: '用户信息 删除',
                        type: 'success',
                        duration: 2000
                      });
                      this.init();
                    }
                })
            })
            .catch(_ => {});
        }
    },
    created: function() {
        this.init();
    },
    watch: {
      search: function() {
        if(this.search === '') {
          this.dataTemp = this.tableData
        } else {
          this.dataTemp = this.tableData.filter(
            data => !this.search || data.username.includes(this.search) || data.title.includes(this.search) || data.user_id == this.search
          )
        }
      }
    }
  }
</script>
<style>
  .users-table-body {
      margin: 10px auto;
  }
  .users-table-body .cell {
    text-align: center;
  }
</style>
