<template>
    <div class="article_class">
        <div class="article_body">
            <div class="article_title">
                <span>{{ this.article.title }}</span>
            </div>
            <div style="margin-bottom: 70px;">
                <div v-html="this.article.content"></div>
            </div>
            <el-alert class="end-class" title="文章结束..." type="success" :closable="false"></el-alert>
            <div class="read_info">
                <span>发布时间: {{this.article.commentTime}}  </span>
                <span><i class="el-icon-view"></i>  阅读 ( {{this.article.readAmount}} )  </span>
                <span><i class="el-icon-edit-outline"></i>  评论 ( {{this.article.commentAmount}} )</span>
            </div>
        </div>

        <div>
            <el-button class="toTop" type="success" icon="el-icon-arrow-up" circle plain @click="toTop()"></el-button>
        </div>
        <div class="article_comment">
            <span style="font-size: 17px; line-height: 35px; padding-top: 20px;">评论：</span>
            <el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 5}"
                placeholder="请输入内容" v-model="commentInfo">
            </el-input>
            <el-button type="primary" style="margin-top: 10px;" size="small" @click="submitComment()">提交</el-button>
        </div>
        <div class="comment_body">
            <div class="comment_item" v-for="item in comments" :key="item.id">
                <div style="line-height: 30px;">
                    {{ item.create_time }} <span class="comment_username">{{ item.user_name }}</span> :
                </div>
                <div class="comment_comment">
                    {{ item.article_content }}
                </div>
                <div style="width: 100%; border: 0.5px solid #ccc;"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            article: this.$route.params.article,
            commentInfo: '',
            comments: []
        }
    },
    methods: {
        toTop() {
            scrollTo(0,0);
        },
        submitComment() {
            this.axios.post("addComment", {
                article_id: this.article.id,
                user_name: this.$store.state.userInfo.username,
                article_content: this.commentInfo
            }).then((res)=> {
                if(res.data.code === 200) {
                    this.article.commentAmount += 1
                    this.axios.get("updateCommentAmount", { params: {
                        id: this.article.id,
                        amount: this.article.commentAmount
                    }}).then((res)=> {
                        if(res.data.code === 200) {
                            this.init();
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })

                    this.$message({
                        message: '添加评论成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.commentInfo = '';
                    this.init();
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        init() {
            this.axios.get('getCommentByArticleId', {params: {
                articleid: this.article.id
            }}).then((res) => {
                if(res.data.code === 200) {
                    this.comments = res.data.data
                }
            })
        }
    },
    created: function() {
        this.init();
    }
}
</script>
<style>
    .article_class {
        background: #fff;
        padding: 50px 150px;
    }

    .article_body {
        background-color: #fff;
        /* -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04); */
    }
    .article_title {
        text-align: left;
        font-size: 30px;
        font-weight: 700;
        line-height: 50px;
    }

    .read_info {
        font-size: 12px;
        font-weight: 500;
        text-align: right;
        line-height: 30px;
        padding-right: 10px;
        color: #666;
    }

    .article_comment {
        width: 500px;
    }

    .comment_body {
        margin-top: 20px;
    }
    .comment_item {
        color: #000;
        height: 60px;
    }
    .comment_username {
        font-size: 15px;
        font-weight: 500;
    }
    .comment_comment {
        font-size: 14px;
        margin-left: 20px;
        line-height: 20px;
    }
    .end-class{
        font-weight: 600;
    }
    .toTop {
        position: fixed;
        right: 40px;
        bottom: 100px;
    }
</style>

