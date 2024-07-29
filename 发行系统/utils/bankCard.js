var bankList = [
  {
    "bankName": "工商银行",
    "bankCode": "01020000",
    "patterns": []
  },
  {
    "bankName": "农业银行",
    "bankCode": "01030000",
    "patterns": []
  },
  {
    "bankName": "中国银行",
    "bankCode": "01040000",
    "patterns": []
  },
  {
    "bankName": "建设银行",
    "bankCode": "01050000",
    "patterns": []
  },
  {
    "bankName": "交通银行",
    "bankCode": "03010000",
    "patterns": []
  },
  {
    "bankName": "平安银行",
    "bankCode": "03134402",
    "patterns": []
  },
  {
    "bankName": "中信银行",
    "bankCode": "03020000",
    "patterns": []
  },
  {
    "bankName": "光大银行",
    "bankCode": "3030000",
    "patterns": []
  },
  {
    "bankName": "华夏银行",
    "bankCode": "03040000",
    "patterns": []
  },
  {
    "bankName": "民生银行",
    "bankCode": "03050000",
    "patterns": []
  },
  {
    "bankName": "广发银行",
    "bankCode": "03060000",
    "patterns": []
  },
  {
    "bankName": "招商银行",
    "bankCode": "03080000",
    "patterns": []
  },
  {
    "bankName": "兴业银行",
    "bankCode": "03090000",
    "patterns": []
  },
  {
    "bankName": "浦发银行",
    "bankCode": "03100000",
    "patterns": []
  },
  {
    "bankName": "北京银行",
    "bankCode": "03130011",
    "patterns": []
  },
  {
    "bankName": "天津银行",
    "bankCode": "03130012",
    "patterns": []
  },
  {
    "bankName": "上海银行",
    "bankCode": "03130031",
    "patterns": []
  },
  {
    "bankName": "江苏银行",
    "bankCode": "03130032",
    "patterns": []
  },
  {
    "bankName": "重庆银行",
    "bankCode": "03130050",
    "patterns": []
  },
  {
    "bankName": "大连银行",
    "bankCode": "3132102",
    "patterns": []
  },
  {
    "bankName": "哈尔滨银行",
    "bankCode": "03132301",
    "patterns": []
  },
  {
    "bankName": "南京银行",
    "bankCode": "03133201",
    "patterns": []
  },
  {
    "bankName": "杭州银行",
    "bankCode": "03133301",
    "patterns": []
  },
  {
    "bankName": "宁波银行",
    "bankCode": "03133302",
    "patterns": []
  },
  {
    "bankName": "温州银行",
    "bankCode": "03133308",
    "patterns": []
  },
  {
    "bankName": "恒丰银行",
    "bankCode": "03150000",
    "patterns": []
  },
  {
    "bankName": "浙商银行",
    "bankCode": "03160000",
    "patterns": []
  }
]

function getBankNames() {
	return bankList.map(bank => bank.bankName);
}

// 导出银行名称数组
module.exports = {
	getBankNames: getBankNames,
	bankList: bankList
};