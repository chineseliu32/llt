<template>
  <view class="rf-search-bar">
    <!-- 状态栏 -->
    <view v-if="headerShow" class="status" :style="{height:height}"></view>
    <!-- 顶部搜索栏 -->
    <view v-if="headerShow" class="header" :style="{top:height}">
      <!-- 跳转分类模块 -->
      <view class="addr" @tap.stop="link">
        <i class="iconfont" :class="icon"></i>
        {{ title }}
      </view>
      <!-- 搜索框 -->
      <view class="input-box" @tap.stop="discard" v-if="inputDisabled">
        <input
            @confirm="toSearch"
            :value="placeholder"
            @input="handleSearchValueChange" 
            :placeholder="placeholder ? '' : '请输入关键字'"
            style="color:#888;"
            placeholder-style="color:#ccc;"
        />
        <view class="icon search" @tap.stop="toSearch"></view>
      </view>
      <view class="input-box" v-else>
        <input
            @tap="toSearch"
            disabled
            :value="placeholder"
            placeholder-style="color:#ccc;"
        />
        <view class="icon search"></view>
      </view>
	  <!-- <image v-if="scan" src="../../static/scanCode.png" mode="widthFix" style="width: 40px;margin-right: 5px;" @click="scanCode()" ></image> -->
    </view>
    <!-- 占位 -->
    <view v-if="headerShow" class="place"></view>
  </view>
</template>

<script>
	import {hostUrl} from "@/api/params";
	export default {
		props: {
			headerShow: {
				type: Boolean,
				default: true
			},
			inputDisabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: '请输入关键字'
			},
			icon: {
				type: String,
				default: null
			},
			title: {
				type: String,
				default: null
			},
		},
		data() {
			return {
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop: null,
				statusTop: null,
				nVueTitle: null,
				scan: false,
				searchValue: this.placeholder,
				// #ifdef H5
				height:0,
				// #endif
				// #ifdef APP-PLUS || MP-WEIXIN
				height:0
				// #endif
			}
		},
        created(){
          // #ifdef APP-PLUS
			this.scan = true;
          // #endif
		  this.getShebei()
        },
		methods: {
			handleSearchValueChange(e) {
				this.searchValue = e.detail.value;
			},
			discard() {
			},
			link() {
				this.$emit('link')
			},
			getShebei(){
				console.log("123456")
				const res = uni.getSystemInfoSync();
				console.log(res)
				// #ifdef APP-PLUS || MP-WEIXIN
				this.height=res.statusBarHeight+"px"
				// #endif
			},
			scanCode() {
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: res.result.slice(hostUrl.length,res.result.length)
						})
				    }
				});

			},
			async toSearch() {
				await this.$emit('search', {
					searchValue: this.searchValue
				})
			}
		}
	}
</script>

<style scoped lang="scss">
  .rf-search-bar {
    background-color: #fff;
	display: flex;
	top: 0;
    .status {
      width: 100%;
      height: 0;
      position: fixed;
      z-index: 10;
      background:linear-gradient(90deg,rgba(201,22,30,1) 0%,rgba(201,20,30,1) 100%);
      // top: 0;
      /*  #ifdef  APP-PLUS  || MP-WEIXIN*/
      // height: var(--status-bar-height); //覆盖样式
      /*  #endif  */
    }

    .header {
      width: 100%;
      height: 100upx;
      display: flex;
      align-items: center;
      position: fixed;
      // top: 0;
      z-index: 10;
         background:linear-gradient(90deg,rgba(201,22,30,1) 0%,rgba(201,20,30,1) 100%)
      /*  #ifdef  APP-PLUS  || MP-WEIXIN*/
      // top: var(--status-bar-height);
      /*  #endif  */
      .addr {
        width: 120upx;
        height: 60upx;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        font-size: 28upx;

        .iconfont {
          height: 60upx;
          margin-right: 6upx;
          margin-left: 15upx;
          display: flex;
          align-items: center;
          font-size: 35upx;
          color: $base-color;
        }
      }

      .input-box {
        width: 100%;
        height: 60upx;
        background-color: #f5f5f5;
        border-radius: 30upx;
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 20upx 0 10upx;

        .icon {
          z-index: 9;
          display: flex;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
          width: 60upx;
          height: 60upx;
          font-size: 34upx;
          color: #c0c0c0;
        }

        input {
          width: 100%;
          padding-left: 28upx;
          height: 28upx;
          color: #888;
          font-size: 28upx;
        }
      }
    }

    .place {
      background-color: #ffffff;
      height: 100upx;
      /*  #ifdef  APP-PLUS  || MP-WEIXIN*/
      margin-top: var(--status-bar-height);
      /*  #endif  */
    }
  }
  
  .rf-search-bar .header .addr {
      width: 34px;
      height: 30px;
  }
  .header{
	  background:linear-gradient(90deg,rgba(201,22,30,1) 0%,rgba(201,20,30,1) 100%)
  }
  .rf-search-bar .header .addr .iconfont {
      font-size: 24px;
      color: #fefefe;
  }
</style>
