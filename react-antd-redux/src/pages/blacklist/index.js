import React, {PureComponent} from 'react'
import {Icon, Button, NoticeBar, Toast } from 'antd-mobile'
import Itemlist from 'components/Itemlist'
import Gzhcode from 'components/Gzhcode'
import gzhService from 'services/gzhcircle'
// 列表数据
import { codeResult } from '../../utils/index'
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import pic2 from '@/imgs/img1.jpg'

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  )
  return (
    <ul>{listItems}</ul>
  )	
}

const numbers = []

class Blacklist extends PureComponent {
    constructor(props){
        super(props);
        // 查询条件
        this.state = {
        	islogin: 'init',
            ismore: 0,
            total: 0,
            query: {
                sort: 0,
                pageNo: 1,
                pageSize: 7,
                paramStr: '',
                queryStr: '',
                openId: ''
            },
            resultData: [],
            topData: [],
            hasmore: false
        }
        this.hanlefunc = this.hanlefunc.bind(this)
        this.checkr = this.checkr.bind(this)
        this.getTip = this.getTip.bind(this)
        this.getMore = this.getMore.bind(this)
        this.serachChange = this.serachChange.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.querySearch = this.querySearch.bind(this)
        this.getTop = this.getTop.bind(this)
        document.title = '曝光查询'
    }
    componentDidMount (props) {
    	if (this.props.location.state) {
            let data = this.props.location.state
            let queryData = Object.assign({}, this.state.query, { paramStr: data.query || '' })
			queryData.queryStr = data.query
            let that = this
            this.setState({
    			islogin: 'yuyue',
                query: queryData
    		}, () => {
                that.state.total = 0
                that.getTip()
            })
    	}
        this.getTop()
        const search = decodeURIComponent(location.href)
        let code = codeResult(search)
        this.props.getUserInfo(code)
    }
    componentWillReceiveProps(nextProps) {
        // 数据发生变化
        this.state.query.openId = nextProps.userInfo.openId
        this.getTip()
    }
    checkr(props) {
        // 查看详情
        let that = this
        this.props.history.push({ pathname: '/detail' , state: { id: props, openId: that.state.query.openId }})
    }
    hanlefunc(props) {
        this.state.resultData = []
        this.state.ismore = -1
        let data = Object.assign({}, this.state.query, { sort: props, pageNo: 1 })
        this.state.query.pageNo = 1
        this.state.query.sort = props
		this.setState({
			query: data
		}, () => {
            this.getTip()
        })
    }
    querySearch () {
        this.state.query.paramStr = this.state.query.queryStr
        // this.state.query.pageNo = 1
        // this.state.ismore = -1
        // this.getTip()
        // if (!String(this.state.query.paramStr).length) {
        //     return Toast.fail('查询条件不能为空', 1)
        // }
        this.props.history.push({ pathname: '/querylist' , state: { query:  this.state.query.paramStr, openId: this.state.openId || '' }})
    }
    clearSearch () {
        this.state.query.queryStr = ''
        let data = Object.assign({}, this.state.query)
        this.setState({
            query: data
        })
    }
    serachChange (e) {
        let value = e.target.value
        this.state.query.queryStr = value
        let data = Object.assign({}, this.state.query)
        this.setState({
            query: data
        })
    }
    getMore() {
        this.state.query.pageNo++
        this.state.hasmore = true
        this.state.ismore = -1
        this.getTip()
    }
    getTop () {
        gzhService.topTip({}).then(res => {
            if (res.code * 1 === 200) {
                let list = res.result && res.result.list || []
                let resultDatas = list
                // this.state.topData = resultDatas
                this.setState({
                    topData: resultDatas
                })
            } else {
                this.state.topData = []
                this.setState({
                    topData: []
                })
            }
        }).catch(err => {
            console.log(err)
            this.state.topData = []
            this.setState({
                topData: []
            })
        })
    }
    getTip () {
        if (this.state.ismore === 1) return
        let { sort, pageNo, pageSize, paramStr, openId } = this.state.query
        Toast.loading('数据加载中...', 1)
        gzhService.listTip({sort, pageNo, pageSize, paramStr, openId}).then(res => {
            Toast.hide()
            if (res.code * 1 === 200) {
                let list = res.result && res.result.list || []
                let resultDatas = list
                let total = res.result && res.result.total || 0
                if (this.state.hasmore) {
                    resultDatas = this.state.resultData.concat(resultDatas)
                    this.state.hasmore = false
                }
                // let resultDatas = Object.assign([], this.state.resultData, res.result.list)
                if (list.length === this.state.query.pageSize) {
                    this.state.ismore = 2
                } else if (list.length) {
                    this.state.ismore = 1
                } else this.state.ismore = 0
                let ismore = this.state.ismore
                this.setState({
                    resultData: resultDatas,
                    ismore: ismore,
                    total: total
                })
            }
        }).catch(err => {
            console.log(err)
            Toast.hide()
            let resultData = this.state.resultData.concat(numbers)
            this.setState({
                resultData: resultData,
                total: 0
            })
        })
    }
	render() {
        let queryMore = null
        let ismore = this.state.ismore
        let resultData = this.state.resultData || []
        let topData = this.state.topData || []
        let total = this.state.total || 0
        let totalModel = <div>曝光结果查询，共查到{total || 0}条结果</div>
        if (ismore === 2) {
            queryMore = <div className='backlist-more' onClick={() => this.getMore()}>
                ↓点击显示更多内容
            </div>
        } else if (!ismore) {
            queryMore = <div className='backlist-more_01'>暂无更多数据</div>
        }
        // 内容块
        // <Itemlist data={resultData} checkr={this.checkr} />
		return (
			<div className='backlist'>
				<div className='bl-title'>
				    <NoticeBar marqueeProps={{ loop: true, style: { padding: '1px 7.5px'} }}>
				      注:点击'事件详情'可查看封杀的完整事件.
				    </NoticeBar>
				</div>
                <div className='bl-search-box'>
                    <div className='bl-search'>
                        <Icon type="search" size='lg' />
                        <div className='bl-search-ipt-box'>
                            <input className='bl-search-ipt' placeholder='输入关键字可进行查询' value={this.state.query.queryStr} onChange={this.serachChange}/>
                        </div>
                        <Icon type="cross-circle-o" size='md' className={['iconHide ', this.state.query && this.state.query.queryStr.length && ' queryTextShow' || '']} onClick={this.clearSearch}/>
                    </div>
                    <div className='bl-search-text' onClick={this.querySearch}>搜索</div>
                </div>
                <div className={['queryTitle ', this.state.query && this.state.query.paramStr.length && ' queryTitleShow' || '']}>
                    { totalModel }
                </div>
				<div className='flex-c backlistBar'>
					<Button className={['queryBtn', this.state.query.sort === 0 && 'queryBtnActive']} onClick={() => this.hanlefunc(0)} data-query='0'>按时间降序</Button>
					<Button className={['queryBtn', this.state.query.sort === 1 && 'queryBtnActive']} onClick={() => this.hanlefunc(1)} data-query='1'>按时间升序</Button>
					<Button className={['queryBtn', this.state.query.sort === 2 && 'queryBtnActive']} onClick={() => this.hanlefunc(2)} data-query='2'>顶</Button>
					<Button className={['queryBtn', this.state.query.sort === 3 && 'queryBtnActive']} onClick={() => this.hanlefunc(3)} data-query='3'>踩</Button>
				</div>
				<div className='backlisttable'>
                    <Itemlist data={topData} checkr={this.checkr} type='top'/>
                    <Itemlist data={resultData} checkr={this.checkr} type='content'/>
				</div>
                { queryMore }
                <div className='width90'>
                    < Gzhcode />
                </div>
			</div>
		)
	}
}

export default connect((userInfo) => userInfo, {getUserInfo})(Blacklist)