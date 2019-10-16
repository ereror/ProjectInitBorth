//本地穿透
// const baseURL = 'https://sns.myxianxiaobao.com' //测试数据
const baseURL = 'https://sns.peiwochoujiang.com' // 正式服
const TokenURL = '/mobile/Token/getToken'
const selfHeight = []
for (var i = 0, j = 150; i <= 70; i++) {
	let temp = {
		text: 150 + i + 'cm',
		value: 150 + i
	}
	selfHeight.push(temp)
}

export default {
  timeout: 1000,
  baseURL,
  TokenURL,
  miniAppName: '',
  sexConfig: [
	{ text: '男', value: 1, checked: true},
	{ text: '女', value: 2}
  ],
  selfHeight: selfHeight,
  selfPays: [
	  { text: '小于10w', value: 0},
	  { text: '10~20w', value: 1},
	  { text: '20~30w', value: 2},
	  { text: '大于30w', value: 3}
 ],
  selfTypes: [
	  { text: '旅行', value: 0},
	  { text: '运动', value: 1},
	  { text: '恋爱', value: 2},
	  { text: '唱歌', value: 3},
	  { text: '吃饭', value: 4},
	  { text: '喝一杯', value: 5},
	  { text: '看电影', value: 6},
	  { text: '玩游戏', value: 7}
  ],
  selfadvice : [
	  { text: '头像、资料作假', value: '头像、资料作假'},
	  { text: '广告、营销', value: '广告、营销'},
	  { text: '诈骗、托儿', value: '诈骗、托儿'},
	  { text: '色情低俗', value: '色情低俗'},
	  { text: '恶意骚扰、不文明语言', value: '恶意骚扰、不文明语言'},
	  { text: '其他', value: '其他'},
  ]
}