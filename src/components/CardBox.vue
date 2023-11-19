<script setup>

</script>

<template>
    <div class="content">
        <div class="card">
            <div class="show-wrapper">
                <div class="pic-wrapper">
                    <image src="src/assets/images/bg.png" style="height:300px;"></image>
                </div>
                <h2 class="title">Mario</h2>
                <div class="show-info">
                    <div class="show-info-item">

                    </div>
                    <div class="show-info-item">

                    </div>
                </div>
            </div>
            <div class="hover-wrapper">
                <div class="hover-info">
                    <div class="info-item">
                        <span>13k</span>
                        <span class="info-item-title">Loveing</span>
                    </div>
                    <div class="line"></div>
                    <div class="info-item">
                        <span>14k</span>
                        <span class="info-item-title">Watching</span>
                    </div>
                </div>
                <button class="btn">See More</button>
            </div>
            <div class="background"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {

    position: absolute;

    .card {
        position: relative;

        .show-wrapper {
            z-index: 10;
            transition: 0.4s;

            .pic-wrapper {
                overflow: hidden;
                border-radius: 20px;
                width: 270px;
                height: 300px;
                transition: 0.4s;
                
            }

            .title {
                margin: 10px 0;
            }

            .show-info {
                display: flex;
                flex-direction: row;
                color: #cccccc;
                justify-content: space-between;

                .show-info-item {
                    
                }
            }
        }
        .hover-wrapper {
            display: none;
            position: relative;
            flex-direction: column;
            align-items: center;
            opacity: 1;
            transition: 0.5s;

            .hover-info {
                display: flex;
                flex-direction: row;
                justify-content: center;
                height: 100%;
                font-size: 2vw;

                .info-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .info-item-title {
                        font-size: 0.8vw;
                        color: #cccccc;
                    }
                }

                .line {
                    width: 2px;
                    height: 4vh;
                    margin: 0 1vw;
                    background: #cccccc;
                }
            }

            .btn {
                width: 90%;
                height: 40px;
                margin-top: 2vh;
                border-radius: 50px;
                background-color: rgb(67, 119, 216);
                border: 0;
                font-size: 1vw;
                cursor: pointer;
                color: #fff;
            }
        }
        .background {
            background-color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 20px;
            z-index: -1;
            transition: 0.5s;
            transform: scale(0.2, 0.9);
            opacity: 0;
            height: 80%;
            box-shadow: 0px 10px 32px 1px rgb(221, 219, 219);
            background-image: linear-gradient(rgba(255, 255, 255, 0.4) 0%,
                    rgba(255, 255, 255, 0.7) 20%,
                    rgba(255, 255, 255, 1) 60%,
                    rgba(255, 255, 255, 1) 100%),
                url(src/assets/images/bg.png);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top;
        }

        &:hover {
            .show-wrapper {
                transform: translateY(-25%);

                .pic-wrapper {
                    transform: scale(0.8);
                }

                .title {
                    animation: nameAmt 0.5s ease-in-out forwards;
                }

                .show-info {
                    opacity: 0;
                }
            }

            .hover-wrapper {
                animation: hoverWrapperAmt 0.5s ease-in-out forwards;
                display: flex;
                transform: translateY(-100%);
            }

            .background {
                opacity: 1;
                transform: scale(1.1);
            }
        }
    }
}

@keyframes nameAmt {
    0% {
        opacity: 0;
        text-align: center;
    }

    100% {
        opacity: 1;
        text-align: center;
        transform: translateY(-55%);
    }
}

@keyframes hoverWrapperAmt {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>