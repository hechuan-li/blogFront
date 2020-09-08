<template>
  <div class="list ">
    <div class="card" v-for="item in article" :key='item.id'>
        <p class="title" @click='handleClick(item.id)'>{{item.title}}</p>
       <p class="date">{{item.publish_date}}</p>
       <p class="content">{{item.content}}</p>
    </div>
   
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      article:[]
    }
  },
  methods: {
    handleClick(id){
      this.$router.push('/detail/'+id)
    },
    getAllArticle(){
      this.$axios.get('/api/article/allArticle').then(value=>{
        if(value.data.code === 0){
          this.article = value.data.list
        }
      })
    }
  },
  created(){
    this.getAllArticle()
  }
};
</script>

<style lang="less" scoped>
.list {
  .card {
    padding-bottom: 20px;
    margin-top: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
    
    .title {
      font-size: 26px;
      color: #0085a1;
      font-weight: 600;
    }
    .date{
      font-style: italic;
      font-family: Lora,"Times New Roman",serif;
      color: #808080;
      margin-top: 10px;
    }
    .content{
      width: 1100px;
      display: inline-block;
      height: 30px;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
}
</style>