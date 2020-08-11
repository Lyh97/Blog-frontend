<template>
    <div>
        <div class="home_table" v-for="item in blogData" :key="item.id">
            <ArticleCard :item='item'/>
            <!-- <div class="table_parting_line"></div> -->
        </div>
        <!-- <el-pagination :page-size="20" :pager-count="11" 
            layout="prev, pager, next" :total="blogData.length" @current-change="pageChange"
        ></el-pagination> -->
    </div>
</template>
<script>
import ArticleCard from '../../components/ArticleCard.vue';
export default {
    props: ['tabUrl'],
    data() {
        return {
            blogData: []
        }
    },
    components: { ArticleCard },
    methods: {
        initDate(url) {
            this.axios.get(url).then((response) => {
                if(response.data.code === 200) {
                    this.blogData = response.data.data
                }
            })
        }
    },
    created: function() {
        this.initDate(this.tabUrl)
    },
    watch: {
      tabUrl: function() {
        this.initDate(this.tabUrl)
      }
    }
}
</script>
<style>
  .home_table {
    background: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
  .table_parting_line {
    width: 100%;
    margin: 5px 10px;
    border: 0.7px solid #f5f5f5;
  }
</style>

