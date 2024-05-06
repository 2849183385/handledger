<script setup >
   
</script>

<template>
    <div class="menu-container">
          <el-menu :default-active='routePath' :collapse="isCollapse" @open="handleOpen"  class="el-menu-vertical"
                @close="handleClose" :router="true">
                <el-sub-menu>
        <el-menu-item index="/">
                    <el-icon>
                        <House />
                    </el-icon>
                    
                </el-menu-item>
                <el-menu-item index="/plan">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    
                </el-menu-item>
                 <el-menu-item index="/notes">
                        <el-icon><Notebook /></el-icon>
                        
                    </el-menu-item>
                <el-menu-item index="/favorites">
                   <el-icon><Star /></el-icon>
                    
                </el-menu-item>
                <el-menu-item index="/publish">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                   
                </el-menu-item>
                <el-menu-item index="/user">
                    <el-icon>
                        <User/>
                    </el-icon>
                   
                </el-menu-item>
            <el-menu-item index="setting">
                <el-icon><Setting/></el-icon>
              
              
            
            </el-menu-item>
             <el-menu-item index="/help">
                    <el-icon><QuestionFilled /></el-icon>
                 
                </el-menu-item>
                </el-sub-menu>
                
            </el-menu>
    </div>
   


</template>

<style lang='scss' scoped>

.menu-container {
   display: flex;
  justify-content: layout;
  align-items: layout;
    width: 75px;
    height: 75px;
    position: fixed;
    top: 200px;
    left: 200px;
}               
.el-menu{
    border-radius: 50%;
    font-size:14px;
}
</style>