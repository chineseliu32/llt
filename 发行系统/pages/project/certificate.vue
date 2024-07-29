<template>
	<div class="certificate">
		<div class="banner">
			<div class="banner_detail">
				<div class="header_title">
					<p class="header_title_p">数字版权权利证书</p>
					<p class="header_title_p">证书编号:{{this.asset_id }}</p>
					<p class="header_title_p">
						<image src="../../static/image/xingxing.png" alt="" />
					</p>
				</div>
				<div class="information">
					<p class="zuopinName">
						商品信息
						<image src="../../static/image/textbj.png" alt="" />
					</p>
				</div>
				<div class="table">
					<van-row>
						<van-col span="24">
							<van-field label-align="left" label="商品名称" :value="index.project_name" disabled />
							<span class="mao">：</span>
						</van-col>
						<van-col span="24">
							<van-field label-align="left" label="发行数量" :value="index.financing_limit" disabled />
							<span class="mao">：</span>
						</van-col>
						<van-col span="24">
							<van-field label-align="left" label="发行单价" :value="'￥'+index.financing_limit_rmb" disabled />
							<span class="mao">：</span>
						</van-col>

		<!-- 				<van-col span="24">
							<van-field label-align="left" label="权利类型" :value="evidence.hold_rights" disabled />
							<span class="mao">：</span>
						</van-col>
						<van-col span="24">
							<van-field label-align="left" label="发行机构" :value="evidence.issuer" disabled />
							<span class="mao">：</span>
						</van-col>
						<van-col span="24">
							<van-field label-align="left" label="存证ID" :value="trans_evidence.trans_hash" rows="2"
								autosize type="textarea" disabled />
							<span class="mao">：</span>
						</van-col> -->
					</van-row>
				</div>
				<div class="liuxinxi">
					<p class="zuopinName">
						产权信息
						<image src="../../static/image/textbj.png" alt="" />
					</p>
					<van-row>
						<van-col span="24">
							<van-field label-align="left" label="持有人" :value="real_name.real_name" disabled />
							<span class="mao">：</span>
						</van-col>
	<!-- 					<van-col span="24">
							<van-field label-align="left" label="原持有人" :value="trans_evidence.original_holder"
								disabled />
							<span class="mao">：</span>
						</van-col> -->
						<van-col span="24">
							<van-field label-align="left" label="存证时间" :value="index.listing_start_time" disabled />
							<span class="mao">：</span>
						</van-col>
					</van-row>
				</div>
				<div class="zhanshi">
					<dl>
						<dt><image :src="index.img_url" alt="" /></dt>
						<dd>
							<p>存证机构：</p>
							<p>合交链（北京）数字科技有限公司</p>
						</dd>
					</dl>
					<p class="names">作品展示图</p>
				</div>
				<div class="shengming">
					<p class="names">「存证声明」</p>
					<div class="p_img">
						<p>
							此作品存证展示和流转仅在{{title}}平台及其授权合作机构，作品及其权利归持有人所有。特发此证，以兹证明。此证书自生成时间起生效。
						</p>
						<span ref="qrcode"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
 
import {
		projectFinancingLoangetById,
		getRealName

	} from "@/api/user.js";
	export default {
		components: {
			 
		},
		data() {
			return {
				asset_id: 0,
				product_id: 0,
				trans_evidence: {},
				evidence: {},
				title: '',
				index:{},
				real_name: {}
			}
		},
		onLoad(e) {
			this.asset_id = e.asset_id
			this.product_id = e.product_id


			this.loadTransEvidence()
			this.getUserInfo()
		},
		methods: {
			loadTransEvidence() {
				console.log(this.product_id)
				this.$get(`${projectFinancingLoangetById}`, {
					id: this.product_id,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					
					this.index = r.result
					console.log(this.index )
				}).catch((err) => {
					console.log(err)
				});
			},
			getUserInfo()
			{
				//查询实名信息
				this.$get(`${getRealName}`).then(r => {
					if (r.code == 0) {
				
						this.real_name = r.result;
						console.log(this.real_name)
					}
				}).catch((err) => {
					console.log(err)
				});
			},
/* 			loadEvidence() {
				this.$api.product.getEvidence(this.product_id).then(res => {
					this.evidence = res
					if (res.asset_url !== '') {
						//生成二维码
						new qrCode(this.$refs.qrcode, {
							text: res.asset_url,
							width: 100,
							height: 100
						})
					}
				})
			}, */
		}

	};
</script>

<style lang="scss" scoped>
	.certificate {
		.banner {
			background: url("../../static/image/certificatebackground.png") no-repeat;
			background-size: 100% 100%;
		}

		.banner_detail {
			width: 590upx;
			margin: 0 auto;
			padding-top: 70upx;
			padding-bottom: 80upx;

			.header_title {
				text-align: center;

				.header_title_p {
					&:first-child {
						font-size: 48upx;
						font-weight: 800;
						color: #333333;
						line-height: 48upx;
						letter-spacing: 5upx;
					}

					&:nth-child(2) {
						font-size: 22upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #2a81ef;
						margin: 20upx 0 10upx;
					}

					&:last-child {
						image {
							width: 320upx;
							display: block;
							height: 15upx;
							margin: 0 auto;
							margin-top: 10upx;
						}
					}
				}
			}
		}

		.table,
		.liuxinxi {
			.van-row {
				.van-col {
					position: relative;

					&:first-child {
						margin-top: 20upx;
					}
				}

				.mao {
					position: absolute;
					font-size: 28upx;
					font-weight: 400;
					color: #989898;
					top: 5upx;
					left: 122upx;
				}

				.van-cell {
					padding: 0;

					&::after {
						border: none;
					}
				}

				.van-field {
					line-height: 50upx;

					.van-cell__title {
						margin-right: 20upx;
						width: 120upx;
						text-align-last: justify;

						span {
							box-sizing: content-box;
							font-size: 28upx;
							font-weight: 400;
							color: #989898;
						}
					}

					.van-field__body {
						padding-left: 15upx;

						input {
							font-size: 28upx;

							&:disabled {
								color: black;
								-webkit-text-fill-color: black;
							}
						}

						textarea {
							font-size: 24upx;

							&:disabled {
								color: black;
								-webkit-text-fill-color: black;
							}
						}
					}
				}
			}
		}

		.zhanshi {
			dl {
				display: flex;
				margin-top: 10upx;

				dt {
					image {
						width: 166upx;
						height: 166upx;
						border-radius: 12upx;
						display: block;
					}
				}

				dd {
					padding: 0 30upx;
					box-sizing: border-box;
					background: #f7f7f7;

					p {
						font-size: 24upx;
						font-weight: 500;
						letter-spacing: 1upx;
						margin-top: 8upx;

						&:nth-child(odd) {
							color: #ff582d;
						}

						&:nth-child(even) {
							color: #333330;
						}
					}
				}
			}

			.names {
				width: 166upx;
				font-size: 20upx;
				font-weight: 600;
				color: #333333;
				line-height: 18upx;
				text-align: center;
				line-height: 40upx;
			}
		}

		.shengming {
			margin-top: 36upx;

			.names {
				font-size: 20upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ff2a00;
				line-height: 20upx;
			}

			.p_img {
				display: flex;
				margin-top: 20upx;

				p {
					flex: 4;
					font-size: 20upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #989898;
				}

				image {
					flex: 1;
					display: block;
					width: 125upx;
					height: 125upx;
				}
			}
		}

		.zuopinName {
			position: relative;
			// width: 128upx;
			height: 36upx;
			font-size: 32upx;
			font-weight: 600;
			color: #333333;
			line-height: 36upx;

			image {
				width: 62upx;
				height: 8upx;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}
	}
</style>