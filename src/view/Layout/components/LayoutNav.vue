 <script>

</script>
<template>
<div class="nav">
   <!-- 顶栏 -->
  <div class="container">
    <ul>
      <li>1</li>
      <li>
        222
      </li>
      <li><i class="iconfont icon-yonghu">{{user}}</i></li>
    </ul>
  </div>
</div>

</template>


<style lang="scss" scoped>
.nav{
  position: relative;
  background-color: #aac2c4;
  width: 100%;
  .container{
        height: 55px;
        margin: 0 auto;
        ul{ 

          margin: 0 auto;
          height: 100%;
          width: 100%;
          display:flex;
          align-items: center;
          justify-content: flex-end;
          li{  
            text-align: center;
            line-height: 53px;
            height: 53px;
            margin: 1px 5px;
            flex: 1;
            .el-dropdown-link {
              margin: 5px 10px;
              cursor: pointer;
              height: 25px;
              .icon-yonghu{
                font-size: 30px;  
                height: 20px;
                width: 25px;
              }
            }
           
          }
        
        }
      }
    }
</style>