<template>
  <div class="home">
    <el-row class="blog_body">
      <el-col :span="24">
        <el-tabs tab-position="top">
          <el-tab-pane label="查询结果">
            <ArticleTab :tabUrl='url'/>
          </el-tab-pane>
            <div class="searchInfo_body">
                <div class="searchInfo_table" v-for="item in searchData" :key="item.id">
                    <ArticleCard :item='item'/>
                </div>
            </div>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ArticleCard from '../../components/ArticleCard.vue';
export default {
    data() {
        return {
            searchData: []
        }
    },
    components: { ArticleCard },
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
        pageChange(val) {
            console.log(val);
        },
        loadSearchInfo() {
            this.axios.get('searchArticle',{ params: {
                info: this.$route.params.keyword,
                pageIndex: 0,
                pageSize: 10
            }}).then((res) => {
                this.searchData = res.data
            })
        }
    },
    created: function() {
        this.loadSearchInfo()
    },
    computed: {
        getStoreKeyword() {
            return this.$store.state.keyword
        }
    },
    watch: {
        getStoreKeyword: function() {
            this.loadSearchInfo()
        },
    }
}
</script>
<style>
    .searchInfo_table {
        background: #ffffff;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
    }
</style>

