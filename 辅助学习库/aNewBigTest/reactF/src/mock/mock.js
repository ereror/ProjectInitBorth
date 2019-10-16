import Mock from 'mockjs'

Mock.mock('/api/user', {
	'name': '@name',
	'intro': '@word(20)'
})