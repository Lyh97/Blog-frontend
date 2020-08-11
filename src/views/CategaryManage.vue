<template>
    <div class="categary_table_body">
        <el-table :default-sort = "{prop: 'readAmount', order: 'descending'}"
            :data="categaryData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" size="mini" cell-class-name="row-omit" 
            header-row-class-name="categary_table_row_head" v-loading="categaryLoading" stripe>
            <el-table-column type="index" header-align="center" width="50">
            </el-table-column>
            <el-table-column prop="categary_name" label="类名" header-align="center">
            </el-table-column>
            <el-table-column prop="create_time" sortable label="创建时间" header-align="center">
            </el-table-column>
            <el-table-column prop="article_count" sortable label="文件数量" header-align="center">
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="deleteCategary(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="showUpdateModel(scope.row, 'update')">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加类别按钮 -->
        <div class="addButton">
            <el-button type="danger" icon="el-icon-plus" @click="showUpdateModel(null, 'add')" circle></el-button>
        </div>
        
        <!-- 添加类别模态框 -->
        <el-dialog title="添加类别" width="30%" custom-class="addCategary-body" 
            :before-close="handleClose" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item style="fontWeight: 600;" label="类别名： ">
                    <el-input v-model="form.categary_name"></el-input>
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
import Vue from 'vue'
import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

export default {
    data() {
        return {
            search: '',
            categaryData: [],
            dialogTableVisible: false,
            form: {
                categary_name: '',
                user_id: this.$store.state.userInfo['user_id'],
                article_count: 0,
                id: 0
            },
            isUpdate: false,
            categaryLoading: true,
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        deleteCategary(row) {
            this.axios.get('deleteCategaryById', {params:{
                id: row.id
            }}).then((res) => {
                this.$message({
                    showClose: true,
                    message: '类别删除 成功',
                    type: 'success',
                    duration: 2000
                });
                this.dialogTableVisible = false;
                this.init();
            })
        },
        showUpdateModel(row, type) {
            this.form.categary_name = ''
            this.isUpdate = false
            if(type === 'update') {
                this.isUpdate = true
                this.form.categary_name = row.categary_name
                this.form.article_count = row.article_count
                this.form.id = row.id
            }
            this.dialogTableVisible = true;
        },
        submit() {
            if(!this.isUpdate) {
                this.axios.post('addCategary', this.form).then((res) => {
                    if(res.data.code === 200) {
                        this.$message({
                            showClose: true,
                            message: '添加类别 成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.form= {
                            categary_name: '',
                            user_id: this.$store.state.userInfo['user_id'],
                            article_count: 0,
                            id: 0
                        }
                        this.dialogTableVisible = false;
                        this.init();
                    }
                    if(res.data.code === 302) {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning',
                            duration: 2000
                        });
                    }
                })
            } else {
                this.axios.post('updateCategaryById', this.form).then((res) => {
                    if(res.data.code === 200) {
                        this.$message({
                            showClose: true,
                            message: '类别修改 成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.form= {
                            categary_name: '',
                            user_id: this.$store.state.userInfo['user_id'],
                            article_count: 0,
                            id: 0
                        }
                        this.dialogTableVisible = false;
                        this.init();
                    }
                    if(res.data.code === 302) {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning',
                            duration: 2000
                        });
                    }
                })
            }
        },
        init() {
            this.categaryLoading = true;
            if(Object.keys(this.$store.state.userInfo).length === 0) {
                this.$notify({
                    title: '警告',
                    message: '用户未登录，请先登录',
                    type: 'warning',
                    offset: 40,
                    duration: 2000
                });
                return
            }
            // if(this.$store.state.userInfo.role === 0) {
            //     this.axios.get('getAllCategary').then((response) => {
            //         this.categaryData= response.data.data
            //     })
            // } else {
                this.axios.get('getCategaryByUserId', {params: {
                    userId: this.$store.state.userInfo.user_id
                }}).then((response) => {
                    this.categaryData= response.data.data
                    this.categaryLoading = false;
                })
            // }
        }
    },
    computed: {
        getLoginStatus() {
            return this.$store.state.isLogin
        }
    },
    watch: {
        getLoginStatus: function(){
            this.tableData=[]
            this.init()
        }
    },
    created: function() {
        this.init();
    }
}
</script>

<style>
    .categary_table_body {
        width: 76%;
        margin: 10px auto;
    }
    .categary_table_row_head {
        color: #000;
        font-size: 14px;
        font-weight: 400;
    }
    .addCategary-body .el-dialog__body {
        padding: 25px 30px 15px 10px;
    }
</style>

