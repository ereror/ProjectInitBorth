<template lang="pug">
  div.mult-tree
    div(v-for="(item, index) in data", :key="item.userid")
      ul.card
        li.img-wrapper
          img.avatar(:src="item.icon")
        li
          p.no-warp {{ item.nick }}
          p ID:{{ item.userid }}
        li
          p
            span(v-show="item.total_one") {{text[0]}}
            span(v-show="item.total_two") {{text[1]}}
            span(v-show="item.total_three") {{text[2]}}
          p(v-show="item.total_one")
            span
             | (
             span {{item.total_one}}
             span(v-show='item.total_two') {{'/' + item.total_two}}
             span(v-show='item.total_three') {{'/' + item.total_three}}
             | )
        li(@click="checkmore(index)") 
          img.imgdetail(src="~assets/image/arrow.png" style="" v-show='item.down && item.down.length', :class="{'imgmoredetail': item.showmore}")
      //- transition(enter-active-class="animated fadeIn", leave-active-class="animated fadeOut")
      mult-tree(v-show="item.down && item.down.length && item.showmore", :data="item.down" , :level="level + 1")
</template>
<script>
  export default {
    name: 'multTree',
    props: {
      data: {
        type: Array,
        required: true
      },
      level: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        childrenTreeHidden: [],
        text: ['一级', '二级', '三级'],
        levelInfo: {
          text: ['一级 二级 三级', '二级 三级', '三级'],
          count: ['(51/234/112)', '(234/112)', '112']
        }
      }
    },
    methods: {
      checkmore (index) {
        this.data[index].showmore = !this.data[index].showmore
        this.$set(this.data, index, this.data[index])
      },
      visibleHandle (index) {
        this.$set(this.childrenTreeHidden, index, !this.childrenTreeHidden[index])
      }
    }
  }
</script>
<style scoped>
  .mult-tree {
    width: 100%;
    padding: 6px 0 6px 12px;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 2rem;
    margin-bottom: 12px;
    border-radius: 10px;
    background-color: #FEFEFE;
    &>li {
      height: 100%;
    }
  }
  .imgdetail {
    transform:rotate(0deg);
    height:0.8rem;
    margin-right:0.5rem;
    float:right;
    margin-top: 0.2rem;
    transition: all .5s;
  }
  .imgmoredetail {
    transform:rotate(90deg);    
  }
  .img-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .avatar {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .no-warp {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
