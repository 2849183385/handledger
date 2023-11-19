<script setup>

</script>

<template>
    <div class="footer">
        <div class="top">
            <div class="container">
                <div class="helpbox">
                    <p class="title">新手帮助</p>
                    <div class="contentbox">

                        <a href="javascript:;" title="什么是手帐？">什么是<strong>手帐</strong>？</a>
                        <a href="javascript:;" title="为什么要写手帐？">为什么要写手帐？</a>
                        <a href="javascript:;" title="手帐能做什么？">手帐能做什么？</a>
                        <a href="javascript:;" title="写手帐前的准备？">写手帐前的准备？</a>
                        <a href="javascript:;" title="手帐写什么内容？">手帐写什么内容？</a>

                        <a href="" title="如何利用手帐自我提升？">如何利用手帐自我提升？</a>
                        <a href="" title="什么是电子手帐？">什么是电子手帐？</a>

                    </div>
                </div>
                <div class="links">
                    <p class="title">友情链接 </p>
                    <a href="https://gi.qijieya.cn" target="_bank" title="原神启动">原神启动！</a>
                </div>
                <div class="about">
                    about
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="container">
                <span>Copyright @chan 2023 </span>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.footer {

    a {
        margin: 10px 0;
        display: block;
        font-size: 14px;
    }

    .top {
        width: 100%;
        background-color: #647372;
        overflow: hidden;
        justify-content: space-between;
        align-items: flex-start;

        .container {

            margin: 40px auto ;
            display: flex;
            justify-content: center;
           
            .title {
                margin-bottom: 19px;
                font-weight: 700;
                text-align: left;
                font-size: 18px;
                font-weight: 500;
            }

            .helpbox {
                min-width: 250px;
                margin: 10px 20px 0 50px;
                flex: 1;
                .contentbox {
                    max-height: 200px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                }
            }

            .links {
                margin: 10px 20px 0 0;
                flex: 1;
                
            }

            .about {
                margin: 10px 20px 0 0;

                flex: 1;
            }

        }
    }


    .bottom {
        overflow: hidden;
        width: 100%;
        background-color: #333;
        display: flex;

        span {
            flex: 1;
            display: block;
            line-height: 60px;
            text-align: center;
            font-size: large;
            color: gray;
            font-weight: bold;
        }
    }
}</style>
