<template>
    <div class="categaryArticle-body">
        <div class="categary-title">
            <div style="width: 200px; margin: 0px auto; fontWeight:700; fontSize: 50px; padding-top: 65px;">{{ this.$route.params.articleInfo.categary_name }}</div>
        </div>
        <div class="categary-article" v-for="item in articleDatas" :key="item.id">
            <ArticleCard :item='item'/>
        </div>
    </div>
</template>
<script>
    import ArticleCard from '../components/ArticleCard.vue';
    export default {
        data() {
            return {
                articleDatas: []
            }
        },
        components: { ArticleCard },
        methods: {
            initData() {
                this.axios.get('getArticleByCategary', { 
                    params:{
                        categaryName: this.$route.params.articleInfo.categary_name
                    }
                }).then((res) => {
                    this.articleDatas = res.data
                })
            }
        },
        created: function() {
            this.initData()
        }
    }
</script>
<style>
    .categary-title {
        height: 200px;
        background: #fff;
        text-align: center;
        width: 100%;
    }
    .categary-article {
        background: #ffffff;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        margin: 10px 150px;
    }
</style>


