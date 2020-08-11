<template>
    <div class="home_table_item">
        <el-row class="home_table_row">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="blog_info">
                <div class="blog_info_title" @click="toArticleDetail(item)">{{ item.title }} </div>
                <div class="blog_info_content">{{ item.summary }}</div>
                <div class="read_info">
                    <el-tag class="categary-tag" type="success" size="mini" :closable="false">{{ item.categary }}</el-tag>
                    <span><i class="el-icon-s-custom"></i>发布者: <span style="color:#2962d3;margin-right: 10px;">{{ item.authorName }}</span> </span>
                    <span>发布时间: {{ item.commentTime }} </span>
                    <span class="readinfo_link"><i class="el-icon-view"></i> 阅读 ({{ item.readAmount }})  </span>
                    <span class="readinfo_link"><i class="el-icon-edit-outline"></i> 评论 ({{ item.commentAmount }})</span>
                </div>
            </el-col>
            <!-- <el-col :xs="4" :sm="4" :md="4" :lg="3" :xl="2">
                <img class="author_img" src="../assets/user_icon.jpg" />
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="21" :xl="22" class="blog_info">
            <div class="blog_info_title" @click="toArticleDetail(item)">[{{ item.title }}] </div>
            <div class="blog_info_content">{{ item.summary }}</div>
            <div class="read_info">
                <span>发布者: <span style="color:#2962d3;margin-right: 10px;">{{ item.authorName }}</span> </span>
                <span>发布时间: {{ item.commentTime }} </span>
                <span class="readinfo_link"><i class="el-icon-view"></i> 阅读 ({{ item.readAmount }})  </span>
                <span class="readinfo_link"><i class="el-icon-edit-outline"></i> 评论 ({{ item.commentAmount }})</span>
            </div>
            </el-col> -->
        </el-row>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: {
            toArticleDetail(article) {
                article.readAmount += 1
                this.axios.get("updateReadAmountById", { params: {
                    id: article.id,
                    amount: article.readAmount
                }}).then((res)=> {
                }).catch((error)=>{
                    console.log(error)
                })
                this.$router.push({ name: 'ViewArticle', params: { article: article } })
            }
        }
    }
</script>
<style>
    .home_table_row {
        height: 80px;
    }
    .read_info {
        font-size: 12px;
        text-align: left;
        margin-top: 10px;
    }
    .readinfo_link {
        color: #0863da;
        cursor: pointer;
    }
    .blog_info {
        text-align: left;
    }
    .blog_info_title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
        cursor: pointer;

        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        max-width: 100%;
    }
    .blog_info_title:hover {
        color: #a11616;
    }
    .blog_info_content {
        font-size: 14px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        max-width: 95%;
    }
    .readinfo_link:hover {
        color: #a11616;
    }
    .categary-tag {
        float: left;
    }
</style>


