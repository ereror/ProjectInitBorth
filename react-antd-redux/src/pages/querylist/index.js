import React, {PureComponent} from 'react'
import {Icon, Button, NoticeBar, Toast } from 'antd-mobile'
import Itemlistq from 'components/Itemlistq'
import Gzhcode from 'components/Gzhcode'
import gzhService from 'services/gzhcircle'
import LocalStorageService from 'services/storage'
// 列表数据
import { codeResult, repfunc } from '../../utils/index'
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import pic2 from '@/imgs/img1.jpg'

class Querylist extends PureComponent {
    constructor(props){
        super(props);
        // 查询条件
        this.state = {
            ismore: 0,
            total: 0,
            query: {
                sort: 0,
                pageNo: 1,
                pageSize: 10,
                paramStr: '',
                queryStr: '',
                openId: ''
            },
            resultData: [],
            topData: [],
            hasmore: false
        }
        this.checkr = this.checkr.bind(this)
        this.getTip = this.getTip.bind(this)
        this.getMore = this.getMore.bind(this)
        this.serachChange = this.serachChange.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
        this.querySearch = this.querySearch.bind(this)
        this.goDestination = this.goDestination.bind(this)
        document.title = '搜索查询'
    }
    componentDidMount (props) {
        let data = this.props.location.state || {}
        let queryData = Object.assign({}, this.state.query, { paramStr: data.query || '' })
        if(!Object.keys(data).length) {
            data.query = LocalStorageService.get('queryStr') || ''
        } else {
            LocalStorageService.set('queryStr', data.query)
        }
		queryData.queryStr = data.query
        this.state.query.queryStr = data.query
        let that = this
        this.setState({
			islogin: 'yuyue',
            query: queryData
		}, () => {
            that.state.total = 0
            that.querySearch()
        })
        const search = decodeURIComponent(location.href)
        let code = codeResult(search)
        this.props.getUserInfo(code)
    }
    componentWillReceiveProps(nextProps) {
        // 数据发生变化
        this.state.query.openId = nextProps.userInfo.openId
        this.querySearch()
    }
    checkr(props) {
        // 查看详情
        let that = this
        this.props.history.push({ pathname: '/detail' , state: { id: props, openId: that.state.query.openId }})
    }
    querySearch () {
        this.state.query.paramStr = this.state.query.queryStr
        this.state.query.pageNo = 1
        this.state.ismore = -1
        this.getTip()
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
    goDestination (type) {
        LocalStorageService.remove('queryStr')
        switch(type) {
            case 'add':
                this.props.history.push({ pathname: '/addNew' , state: { openId: this.state.query.openId }})
                break
            case 'query':
                this.props.history.push({ pathname: '/query' })
                break
            case 'list':
                this.props.history.push({ pathname: '/blacklist' })
                break
        }
    }
    repfunc(str, rec) {
      let queryrec = new RegExp(rec, 'gi')
      return str.replace(queryrec, function($1, $2, $3){
        // console.log($1, $2, $3)
        return "<span style='color: red;font-weight:600'>" + $1 + '</span>'
      })
    }
    getMore() {
        this.state.query.pageNo++
        this.state.hasmore = true
        this.state.ismore = -1
        this.getTip()
    }
    getTip () {
        if (this.state.ismore === 1) return
        let { pageNo, pageSize, queryStr, openId } = this.state.query
        let paramStr = queryStr + ''
        // if (!paramStr.length) {
        //     return Toast.fail('查询条件不能为空', 1)
        // }
        Toast.loading('数据加载中...', 1)
        gzhService.searchTip({pageNo, pageSize, paramStr, openId}).then(res => {
            Toast.hide()
            if (res.code * 1 === 200) {
                let list = res.result && res.result.list || []
                let resultDatas = list
                let total = res.result && res.result.total || 0
                if (this.state.hasmore) {
                    resultDatas = this.state.resultData.concat(resultDatas)
                    this.state.hasmore = false
                }
                resultDatas.map(v => {
                    if (paramStr.length) {
                        v.bWeixin = this.repfunc(v.bWeixin, paramStr)
                        v.title = this.repfunc(v.title, paramStr)
                        v.bQq = this.repfunc(v.bQq, paramStr)
                        v.bZfb = this.repfunc(v.bZfb, paramStr)
                        v.bOther = this.repfunc(v.bOther, paramStr)
                        v.bName = this.repfunc(v.bName, paramStr)
                        v.bPhone = this.repfunc(v.bPhone, paramStr)
                    }
                })
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
            let resultData = this.state.resultData.concat([])
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
        let total = this.state.total || 0
        if (ismore === 2) {
            queryMore = <div className='backlist-more' onClick={() => this.getMore()}>点击显示更多内容</div>
        } else if (!ismore) {
            queryMore = <div className='backlist-more'>暂无更多数据</div>
        }
        let resultList = <div>
            <div className='querylistTitle'>
                未搜索到<span className='querylistTitleSpan'>"{this.state.query.queryStr}"</span>,可点击下方按钮返回首页，搜索页或进行曝光
            </div>
            <div className='querylistButton'>
                <div className='querylist-btn' onClick={() => {this.goDestination('add')}} >
                    我要曝光
                </div>
                <div className='querylist-btn' onClick={() => {this.goDestination('query')}} >
                    查询曝光
                </div>
                <div className='querylist-btn' onClick={() => {this.goDestination('list')}} >
                    返回首页
                </div>
            </div>
        </div>
        if (resultData.length) {
            resultList = <div>
                <div className='bl-search-box ql-qlist'>
                    <div className='bl-search'>
                        <Icon type="search" size='lg' />
                        <div className='bl-search-ipt-box'>
                            <form onSubmit={(e) => this.querySearch()}>
                                <input className='bl-search-ipt' placeholder='输入关键字可进行查询' value={this.state.query.queryStr} onChange={this.serachChange}/>
                            </form>
                        </div>
                        <Icon type="cross-circle-o" size='md' className={['iconHide ', this.state.query && this.state.query.queryStr.length && ' queryTextShow' || '']} onClick={this.clearSearch}/>
                    </div>
                    <div className='bl-search-text' onClick={this.querySearch}>搜索</div>
                </div>
                <div className='backlisttable'>
                    <Itemlistq data={resultData} checkr={this.checkr} type='top'/>
                </div>
                { queryMore }
            </div>
        }
        // 内容块
        // <Itemlist data={resultData} checkr={this.checkr} />
		return (
			<div className='backlist'>
                {resultList}
                <div className='width90'>
                    < Gzhcode />
                </div>
			</div>
		)
	}
}

export default connect((userInfo) => userInfo, {getUserInfo})(Querylist)