<template>
    <div class="home_head">
        <el-row class="head_row" :gutter="10">
            <el-col :xs="8" :sm="4" :md="4">
                <div class="head_title">
                    <img class="head_logo" src="../../assets/blog_logo.png" />
                </div>
            </el-col>
            <el-col :xs="0" :sm="5" :md="5">
                <div class="head_search">
                    <el-input placeholder="请输入内容" v-model="keyword" size="medium" :clearable="true" class="input-with-select">
                        <el-button @click="searchForKeyword()" @keypress="EnterPress()" @keydown="EnterPress()" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :xs="0" :sm="6" :md="8">
                <div style="float: right;">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="1" @click="toOtherPage('Home')">首页</el-menu-item>
                        <el-menu-item index="2" @click="toOtherPage('BlogManage')">博客</el-menu-item>
                        <el-menu-item index="3" @click="toOtherPage('CategaryManage')">文章分类</el-menu-item>
                        <el-menu-item index="4" @click="toOtherPage('Timeline')">时间轴</el-menu-item>
                        <el-menu-item index="5" v-if="this.$store.state.userInfo.role === 0" @click="toOtherPage('UserManage')">
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col :xs="4" :sm="3" :md="2">
                <div class="add_article_button" @click="addArticle()"><i class="el-icon-edit"></i>写文章</div>
                <!-- 添加文章模态框 -->
                <el-dialog title="添加文章" top='20px' custom-class="addBlog_body" 
                    :visible.sync="dialogTableVisible">
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
                        <tinymce id="d1" v-model="msg" class="editor_textArea"></tinymce>
                    </div>
                    <div class="addBlog_button">
                        <el-button type="primary" @click="submitArticle()">添加文章</el-button>
                    </div>
                </el-dialog>
            </el-col>
            <el-col :xs="12" :sm="6"  :md="5">
                <div class="head_user" v-if="!this.$store.state.isLogin">
                    <el-button style="color: #2862d5;" type="text" @click="dialogLogin = true">登录/注册</el-button>
                    <el-dialog :visible.sync="dialogLogin">
                        <el-tabs v-model="activeName" tab-position="left">
                            <el-tab-pane label="登 录" name="login">
                                <div style="min-height: 200px;">
                                    <el-form class="login-body" ref="floginForm" :model="loginForm" label-width="80px">
                                        <el-form-item>
                                            <div style="text-align: center;font-size:20px; font-weight: 700;">Hunter 登录</div>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-input v-model="loginForm.user_id" placeholder="账号"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-input  show-password v-model="loginForm.password" placeholder="密码"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" round @click="login">登录</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="注 册" name="registered">
                                <div style="min-height: 300px;">
                                    
                                    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                                        <div style="text-align: center;font-size:20px; font-weight: 700; line-height: 40px; marginBottom: 20px;">Hunter 注册</div>
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
                                            <el-input placeholder="请输入全数字的账号" v-model="form.user_id"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码：">
                                            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                                        </el-form-item>
                                        <el-form-item label="地址：">
                                            <el-input type="textarea" v-model="form.address"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" round @click="submit()">提 交</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-dialog>

                </div>
                <div class="head_user" v-if="this.$store.state.isLogin">
                    Hi, {{ this.$store.state.userInfo.username }}
                    <el-popover placement="bottom" width="300" trigger="click">
                        <img  slot="reference" class="user_icon" src="../../assets/user_icon.jpg" />
                        <UserInfo />
                    </el-popover>
                </div>   
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import UserInfo from './UserInfo.vue'

export default {
    data() {
        return {
            activeIndex: '1',
            categaryOptions: [],
            categaryValue: '',
            blogTitle: '',
            dialogTableVisible: false,
            msg: '',
            username: "宇航宇航宇航宇航宇航",
            keyword: '',
            dialogLogin: false,
            activeName: 'login',
            loginForm: {
                user_id: null,
                password: ''
            },
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
    components: { UserInfo },
    methods: {
        addArticle() {
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
            this.blogTitle = ''
            this.categaryValue = ''
            this.msg = ''
            this.dialogTableVisible = true
            this.$forceUpdate();
        },
        toOtherPage(page) {
            this.$router.push({ name: page })
        },
        submit() {
            for( let item in this.form) {
                if(item === '') {
                    this.$message.error('用户信息请添加完整');
                    return
                }
            }
            this.form["user_id"] = Number(this.form["user_id"]);
            this.axios.post('addUser', this.form).then((res) => {
                if(res.data.code === 200) {
                    this.$message({
                        message: '注册成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.loginForm= {
                        user_id: this.form.user_id,
                        password: this.form.password
                    }
                    this.login();
                    this.form= {
                        address: '',
                        blog_age: 0,
                        user_id: '',
                        password: '',
                        title: '',
                        username: ''
                    }
                    this.dialogTableVisible = false
                }
            })
        },
        submitArticle() {
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
                this.$forceUpdate()
            }).catch((error)=>{
                console.log(error)
            })
            this.dialogTableVisible = false
        },
        login() {
            if(this.loginForm.user_id === '' || this.loginForm.password === '') {
               this.$message({
                    message: '请输入帐号或密码',
                    type: 'error',
                    duration: 2000
                }); 
            }
            this.axios.post('login', this.loginForm).then((res) => {
                if(res.data.code === 301) {
                    this.$notify({
                        title: '警告',
                        message: res.data.message,
                        type: 'warning',
                        offset: 40,
                        duration: 2000
                    });
                } else {
                    var param = {
                        userInfo: res.data.data,
                        isLogin: true
                    }
                    this.$notify({
                        title: '成功',
                        message: '用户登录 成功',
                        type: 'success',
                        offset: 40,
                        duration: 2000
                    });
                    this.$store.commit('login',param)
                }
                this.dialogLogin = false
                this.loginForm= {
                    user_id: '',
                    password: ''
                }
            })
        },
        EnterPress() {
            console.log(123)
        },
        searchForKeyword() {
            if(this.keyword === '') {
                return
            }
            this.$store.commit('updateKeyword',this.keyword)
            this.$router.push({
                // path: `/LargeChart/${this.request_load}`,
                name: 'SearchInfo',
                params: { keyword: this.keyword }
            })
        },
        initCategary() {
            this.axios.get('getCategaryByUserId?userId='+this.$store.state.userInfo['user_id']).then((response) => {
                this.categaryOptions= response.data.data
            })
        }
    },
    created: function() {
        this.initCategary();
    }
}
</script>
<style>
    .home_head {
        height: 60px;
        width: 100%;
        background-color: rgb(255,255,255);
        z-index: 200;
    }
    .head_row {
        margin: 0px !important;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
    }
    .head_logo {
        line-height: 60px;
        height: 50px;
    }

    .head_search {
        line-height: 60px;
        background-color: rgb(255,255,255);
    }

    .head_user {
        float: right;
        margin-right: 20px;
        line-height: 60px;
        font-weight: 600;
        font-size: 16px;
    }
    .user_icon {
        line-height: 60px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-left: 10px;
        vertical-align: middle;
    }
    .login-body {
        width: 400px;
    }
    .add_article_button {
        cursor: pointer;
        float: right;
        height: 60px;
        line-height: 60px;
        margin: 0;
        font-size: 15px;
        color: #909399;
    }
    .add_article_button:hover {
        color: #000;
    }
</style>

