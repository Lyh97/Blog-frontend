<template>
  <div class="home">
    <el-row class="blog_body">
      <el-col :span="16">
        <el-tabs tab-position="top" @tab-click="handleClick">
          <el-tab-pane label="最新文章">
            <ArticleTab :tabUrl='url'/>
          </el-tab-pane>
          <el-tab-pane label="最热文章">
            <ArticleTab :tabUrl='url'/>
          </el-tab-pane>
          <el-tab-pane label="热议文章">
            <ArticleTab :tabUrl='url'/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card side-card hot-categary">
          <div slot="header" class="sideCard-title clearfix">
            <span>最热类别</span>
          </div>
          <div v-if="userCategary.length === 0" v-loading="true" style="height:100%;"></div>
          <el-tag class="tag-class" v-for="item in userCategary" :key="item.id" type="success" @click="toCategaryPage(item)">{{item.categary_name}}</el-tag>
        </el-card>
        <el-card class="box-card side-card hot-article">
          <div slot="header" class="sideCard-title clearfix">
            <span>热议文章</span>
          </div>
          <el-tooltip v-for="i in 0" :key="i" class="item" effect="dark" :content="blogData[i].title" placement="bottom">
            <div class="hotArticleClass" type="success" @click="toArticleDetail(blogData[i])">* {{ blogData[i-1].title }}</div>
          </el-tooltip>
        </el-card>
      </el-col>
    </el-row>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleTab from './ArticleTab.vue'
export default {
  name: 'home',
  data() {
    return {
      url: 'getNewTopArticle',
      hello: "123",
      userCategary: [],
      blogData: []
    }
  },
  components: { ArticleTab },
  methods: {
    toArticleDetail(article) {
        article.readAmount += 1
        this.axios.get("updateReadAmountById", { params: {
            id: article.id,
            amount: article.readAmount
        }}).then((res)=> {
            if(res.data.code === 200) {
                this.init();
            }
        }).catch((error)=>{
            console.log(error)
        })
        this.$router.push({ name: 'ViewArticle', params: { article: article } })
    },
    getCategary() {
      this.axios.get('getHotCategary').then((response) => {
          this.userCategary= response.data.data
      })
      this.axios.get('getCommentTopArticle').then((response) => {
          if(response.data.code === 200) {
              this.blogData = response.data.data
          }
      })
    },
    handleClick(tab, event) {
      switch (tab.label) {
        case '热议文章':
          this.url = 'getCommentTopArticle'
          break;
        case '最热文章':
          this.url = 'getHotTopArticle'
          break;
        default:
          this.url = 'getNewTopArticle'
      }
    },
    toCategaryPage(info) {
      this.$router.push({ name: 'CategaryArticle', params: { articleInfo: info } })
    }
  },
  created: function() {
    this.getCategary();
  }
}
</script>
<style>
  .blog_body {
    margin: 10px 150px;
  }
  .side-card {
    background:#fff;
    min-height: 150px;
    width:100%;
    margin-left:20px;
    border-radius: 8px;
  }
  .sideCard-title {
    font-size: 18px;
    font-weight: 700;
  }
  .hot-categary {
    margin-top: 50px;
  }
  .hot-article {
    margin-top: 20px;
  }
  .tag-class {
    margin: 5px 8px;
    cursor: pointer;
  }
  .hotArticleClass {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
    cursor: pointer;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width: 95%;
    color: #5FB878;
  }
</style>
