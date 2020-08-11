<template>
    <div class="comment_detail">
        <el-card class="comment_card" v-for="(item, index) in commentDatas" :key="index" shadow="always">
            <el-row v-if="commentDatas.length !== 0" :gutter="12">
                <el-col :span="12">
                    <div class="commentDetail_content comment_common">{{ item.article_content }}</div>
                </el-col>
                <el-col :span="6">
                    <div class="commentDetail_time comment_common">{{ item.create_time }}</div>
                </el-col>
                <el-col :span="3">
                    <div class="commentDetail_author comment_common">{{ item.user_name }}</div>
                </el-col>
                <el-col :span="3">
                    <el-button size="mini" type="danger" @click="handleDelete(item)">
                        删除
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card v-if="commentDatas.length === 0" class="comment_card" shadow="always">
            <el-row :gutter="12">
                <el-col :offset="8" :span="8">
                    <div class="empty">暂无评论</div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: this.$route.params.articleId,
            commentDatas: []
        }
    },
    methods: {
        handleDelete(comment) {
            if(Object.keys(this.$store.state.userInfo).length === 0) {
                this.$message.error('用户未登录，请先登录')
                return
            }
            this.axios.get('deleteCommentById', { params: {
                id: comment.id
            }}).then((res) => {
                this.axios.get("updateCommentAmount", {params:{
                    id: comment.article_id,
                    amount: this.commentDatas.length-1
                }}).then((res)=> {
                    this.$message.success('成功删除评论')
                    this.initData()
                }).catch((error)=>{
                    console.log(error)
                })

            })
        },
        initData() {
            this.axios.get('getCommentByArticleId', { params: {
                articleid: this.$route.params.articleId
            }}).then((res) => {
                this.commentDatas = res.data.data
            })
        }
    },
    created: function() {
        this.initData()
    }
}
</script>
<style>
    .comment_detail {
        background-color: #fff;
        width: 70%;
        margin: 10px auto 10px 16%;
        font-size: 15px;
    }
    .comment_card {
        margin-top: 15px;
    }
    .comment_common {
        line-height: 28px;
    }
    .commentDetail_time {
        
    }
    .commentDetail_author {
    }

    .empty {
        text-align: center;
        color: #a5a5a5;
    }
</style>
