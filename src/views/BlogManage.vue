<template>
    <div class="blog_table_body">
        <div style="width: 40%; margin: 10px auto">
            <el-input v-model="search" size="small" placeholder="搜索 标题 关键字"/>
        </div>
        <el-table :default-sort = "{prop: 'readAmount', order: 'descending'}"
            :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%" size="mini" cell-class-name="row-omit" 
            header-row-class-name="blog_table_row_head" stripe>
            <el-table-column type="index" header-align="center" width="40">
            </el-table-column>
            <el-table-column label="状态" header-align="center" width="50">
                <template slot-scope="scope">
                    <div v-if="scope.row.status === 1" style="color: green;">发布</div>
                    <div v-if="scope.row.status === 0" style="color: red;">未发布</div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" header-align="center" min-width="120">
                <template slot-scope="scope">
                    <span class="blogTable_comment_count" @click="handleClick(scope.row)">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="summary" label="内容" header-align="center" min-width="220">
            </el-table-column>
            <el-table-column prop="readAmount" sortable label="阅读量" header-align="center" width="90">
            </el-table-column>
            <el-table-column prop="commentAmount" sortable label="评论量" header-align="center" width="90">
                <template slot-scope="scope">
                    <span class="blogTable_comment_count" @click="toCommentPage(scope.row)">{{ scope.row.commentAmount }}</span>
                </template>
            </el-table-column>


            <el-table-column prop="categary" sortable label="类别" header-align="center" width="90">
                <template slot-scope="scope">
                    <span class="categary">{{ scope.row.categary }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布" header-align="center" width="90">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 0" @click="updateArticleStatus(scope.row, 1)" type="success" size="mini">发布</el-button>
                    <el-button v-if="scope.row.status === 1" @click="updateArticleStatus(scope.row, 0)" type="danger" size="mini">撤回</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center">
                <template slot-scope="scope">
                    <el-button @click="deleteArticle(scope.row)" type="text" size="small">删除</el-button>
                    <el-button type="text" size="small" @click="showUpdateModel(scope.row, 'update')">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 类别框 -->
        <div class="categary_table">
            <div class="categary_title">博客类别</div>
            <div style="width:110%; border: 0.5px solid #EBEEF5;margin: 0px -5%;"></div>
            <div @click="filterByCategary('All')" class="categary_item">
                All
            </div>
            <div v-for="item in categaryOptions" :key="item.id" @click="filterByCategary(item.categary_name)" class="categary_item">
                {{ item.categary_name }} （{{ item.article_count }}）
            </div>
        </div>

        <!-- 添加文章按钮 -->
        <div class="addButton">
            <el-button type="danger" icon="el-icon-plus" @click="showUpdateModel(null, 'add')" circle></el-button>
        </div>

        <!-- 添加文章模态框 -->
        <el-dialog title="添加文章" top='20px' custom-class="addBlog_body" 
            :before-close="handleClose" :visible.sync="dialogTableVisible">
            <div>
                <span class="addBlog_title">标题：</span>
                <el-input placeholder="请输入标题" class="addBlog_input" v-model="blogTitle" clearable size="small"></el-input>
            </div>
            <div style="margin-top: 10px;">
                <span class="addBlog_title">分类：</span>
                <el-select v-model="categaryValue" filterable allow-create 
                    class="addBlog_input" default-first-option placeholder="请输入文章分类" size="medium">
                    <el-option v-for="item in categaryOptions" :key="item.categary_name"
                        :label="item.categary_name" :value="item.categary_name">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span class="addBlog_title">内容：</span>
                <tinymce id="d2" v-model="msg" class="editor_textArea"></tinymce>
            </div>
            <div class="addBlog_button">
                <el-button type="primary" @click="submit()">提交</el-button>
            </div>
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
            categaryOptions: [],
            categaryValue: '',
            blogTitle: '',
            dialogTableVisible: false,
            msg: '',
            tableData: [],
            tableDataSpare: [],
            buttonType: '',
            row: {},
            inputVisible: false,
            inputValue: '',
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
        filterByCategary(categaryName) {
            if(categaryName !== 'All') {
                this.tableData = this.tableDataSpare.filter(data => data.categary===categaryName);
            }
            else
                this.tableData = this.tableDataSpare;
        },
        toCommentPage(article) {
            this.$router.push({
                // path: `/LargeChart/${this.request_load}`,
                name: 'CommentDetail',
                params: { articleId: article.id }
            })
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        deleteArticle(article) {
            this.axios.post("deleteArticle", {
                articleId: article.id
            }).then((res)=> {
                if(res.data.code === 200) {
                    this.init();
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        updateArticleStatus(params, updateStatus) {
            if(Object.keys(this.$store.state.userInfo).length === 0) {
                this.$notify({
                    title: '警告',
                    message: '用户未登录，请先登录',
                    type: 'warning',
                    offset: 100,
                    duration: 2000
                });
                // this.$message.error('用户未登录，请先登录')
                return
            }
            params.status = updateStatus
            this.axios.post("updateArticleStatus", params).then((res)=> {
                if(res.data.code === 200) {
                    this.$message({
                        showClose: true,
                        message: '修改文章 成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.init();
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        submit() {
            if(Object.keys(this.$store.state.userInfo).length === 0) {
                this.$notify({
                    title: '警告',
                    message: '用户未登录，请先登录',
                    type: 'warning',
                    offset: 100,
                    duration: 2000
                });
                // this.$message.error('用户未登录，请先登录')
                return
            }

            if(this.buttonType === 'update') {
                this.row.title = this.blogTitle
                this.row.content = this.msg
                this.row.categary = this.categaryValue
                this.axios.post("updateArticle", this.row).then((res) => {
                    this.$message({
                        showClose: true,
                        message: '修改文章 成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.init()
                }).catch((error)=>{
                    console.log(error)
                })
            }
            else if(this.buttonType === 'add') {
                this.axios.post("addArticle",{
                    authorId: this.$store.state.userInfo['user_id'],
                    title: this.blogTitle,
                    summary: this.msg.replace(/<[^>]+>/g,"").replace(/(\n)/g, "").replace(/&nbsp;/ig,"").slice(0,80).trim(),
                    content: this.msg,
                    categary: this.categaryValue,
                    authorName: this.$store.state.userInfo.username,
                }).then((res) => {
                    this.$message({
                        showClose: true,
                        message: '添加文章 成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.init()
                }).catch((error)=>{
                    console.log(error)
                })
            }
            this.dialogTableVisible = false
        },
        showUpdateModel(row, type) {
            if(type === 'update') {
                this.row = row
                this.row.oldCategary = row.categary
                this.buttonType = type
                this.blogTitle = row.title
                this.categaryValue = row.categary
                this.msg = row.content
                this.dialogTableVisible = true
                this.$forceUpdate();
            } else
            if(type === 'add') {
                this.buttonType = type
                this.blogTitle = ''
                this.categaryValue = ''
                this.msg = ''
                this.dialogTableVisible = true
                this.$forceUpdate();
            }
        },
        handleClick(article) {
            article.readAmount += 1
            this.$router.push({ name: 'ViewArticle', params: { article: article } })
        },
        init() {
            this.blogLoading = true;
            if(Object.keys(this.$store.state.userInfo).length === 0) {
                this.$notify({
                    title: '警告',
                    message: '用户未登录，请先登录',
                    type: 'warning',
                    offset: 40,
                    duration: 2000
                });
                // this.$message.error('用户未登录，请先登录')
                return
            }

            this.axios.get('getCategaryByUserId?userId='+this.$store.state.userInfo['user_id']).then((response) => {
                this.categaryOptions= response.data.data
            })

            this.axios.get('getArticleByUserId?userId='+this.$store.state.userInfo['user_id']).then((response) => {
                this.tableData = response.data;
                this.tableDataSpare = response.data;
            })
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
            this.categaryOptions=[]
            this.init()
        }
    },
    created: function() {
        this.init();
    }
}
</script>

<style>
    .categary_table {
        width: 16%;
        padding: 10px;
        min-height: 500px;
        position: absolute;
        right:20px;
        top: 70px;
        border-radius: 5px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        background-color: #FFF;
    }
    .categary_title {
        height: 63px;
        line-height: 70px;
        margin: -10px -10px 0px -10px;
        font-size: 20px;
        text-align: center;
    }
    .categary_item {
        margin: 10px;
        font-size: 13px;
        text-align: center;
        cursor: pointer;
        color: #6dd110;
    }


    .blog_table_body {
        width: 76%;
        margin: 10px auto 10px 3%;
    }

    .blog_table_row_head {
        color: #000;
        font-size: 14px;
        font-weight: 400;
    }
    .row-omit .cell {
        text-align: center;
        overflow:hidden !important;
        white-space:nowrap !important;
        text-overflow:ellipsis !important;
        max-width: 99%;
    }

    .blogTable_comment_count {
        color: #409EFF;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
    }

    .addButton {
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
    .addButton .el-button--danger {
        background-color: #fa2626;
        height: 60px;
        width: 60px;
    }
    .addButton .el-icon-plus {
        font-size: 20px;
    }

    .editor_textArea {
        height: 636px;
        width: 100%;
    }
    .editor_textArea .mce-edit-area {
        height: 500px;
    }
    .editor_textArea .mce-edit-area iframe {
        height: 100% !important;
    }

    .addBlog_body .el-dialog__body {
        padding-top: 0px;
    }
    .addBlog_title {
        font-size: 16px;
        font-weight: 500;
    }

    .addBlog_input .el-input__inner {
        border: 1px solid #bcbcbc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .addBlog_button {
        margin-top: 10px;
    }
</style>

