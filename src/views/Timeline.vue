<template>
    <div class="timeLineClass">
        <div class="block">
            <el-timeline>
                <el-timeline-item v-for="(value, key) in activities" :timestamp="key" :key="key" placement="top">
                    <div v-for="item in value" :key="item.id" class="timeLineItem">
                        <ArticleCard :item="item" />
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<script>
    import ArticleCard from '../components/ArticleCard.vue';
    export default {
        data() {
            return {
                activities: {}
            }
        },
        components: { ArticleCard },
        methods: {
            initData() {
                this.axios.get('getAllArticle').then((res) => {
                    let temp = res.data;
                    let activitiesTemp = {}
                    for(let i in temp) {
                        if(activitiesTemp[temp[i].commentTime] == undefined) {
                            activitiesTemp[temp[i].commentTime] = []
                            activitiesTemp[temp[i].commentTime].push(temp[i])
                        } else {
                            activitiesTemp[temp[i].commentTime].push(temp[i])
                        }
                    }
                    this.activities = activitiesTemp
                })
            }
        },
        created: function() {
            this.initData();
        }
    }
</script>
<style>
    .timeLineClass {
        width: 80%;
        padding: 30px 10%;
    }
    .timeLineItem {
        background: #FFF;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
    }
</style>



