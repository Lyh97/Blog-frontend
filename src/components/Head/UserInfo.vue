<template>
    <div>
        <div v-if="this.$store.state.isLogin">
            <div slot="header" style="text-align:center;" class="clearfix">
                <h3>用户信息</h3>
            </div>
            <div class="divided"></div>
            <el-row v-for="(value, key) in userOptions" :key="key" class="text item head_user_info_item" :gutter="20">
                <el-col :span="6"><span>{{ key }}: </span></el-col>
                <el-col :span="18"><span> {{ $store.state.userInfo[value] }} </span></el-col>
            </el-row>
            <div>
                <el-button class="head_logout_button" type="danger" @click="logout()" round>退出登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {},
            userOptions: {
                "姓 名": 'username',
                "年 龄": "blog_age",
                "职 业": 'title',
                "所 在 地": 'address'
            },
            userId: '',
            password: ''
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout')
        }
    }
}
</script>
<style>
    .divided {
        width: 100%;
        border: 0.5px solid rgb(218, 218, 218);
    }

    .head_user_info_item {
        font-size: 20px;
        font-weight: 500;
        margin-top: 15px;
    }

    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
    }
    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 480px;
    }

    .head_logout_button {
        font-size: 20px;
        font-weight: 600;
        width: 100%;
    }
</style>
