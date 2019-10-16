import React, { PureComponent } from 'react'

function ItemContentList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  )
  return (
    <ul>{listItems}</ul>
  )
}



const colorMark = [' young-passion-gradient', ' lady-lips-gradient', ' juicy-peach-gradient', ' heavy-rain-gradient']
const yuyu = ' black-content-box-title-markicon-zd-new '
const blwite = ' black-content-box-title-markicon-zd-new-white '

export default class Itemlist extends PureComponent {
	constructor(props){
		super(props)
		console.log(props.data)
		this.state = {
			resultdata: [],
			type: 'content'
		}
	}
	handleClick(num){
		this.props.checkr(num)
	}
    componentDidMount () {
    }
	componentWillReceiveProps(nextProps) {
		this.setState({
			resultdata: nextProps.data,
			type: nextProps.type
		})
	}
	render(){
		let resultdata = this.state.resultdata
		let resultHtml = null
		let type = this.state.type
		if (resultdata.length) {
		 	const listItems = resultdata.map((v, i) =>
                <li className='backlistItem' onClick={() => this.handleClick(v.id)} keys={i}>
                    <div className='black-content-box'>
                        <div className='black-content-box-title'>
                            <span className={['black-content-box-title-markicon-zd ', type !== 'top' && v.isHot * 1 && yuyu, type !== 'top' && !(v.isHot * 1) && blwite]}>{type === 'top' ? '置顶' : (v.isHot * 1 ? '最新': '')}</span>
                            <span className='black-content-box-title-content'>{v.title}</span>
                        </div>
                        <div className='black-content-box-name'>
                            <div style={{backgroundImage: 'url(' + v.headImgUrl + ')', backgroundSize: 'cover'}} className='black-content-box-name-img'></div>
                            <div className='black-content-box-name-user'>举报者</div>
                        </div>
                        <div className='black-content-box-option'>
                            <div className='black-content-box-option-box'>
                                <div className='black-content-box-option-icon iconfont icon-buoumaotubiao18'>
                                </div>
                                <div className='black-content-box-option-count'>
                                    {v.dzNum}
                                </div>
                            </div>
                            <div className='black-content-box-option-box'>
                                <div className='black-content-box-option-icon iconfont icon-cai'>
                                </div>
                                <div className='black-content-box-option-count'>
                                    {v.caiNum}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
		 	)
		 	resultHtml = <ul> { listItems } </ul>
		}
		return (
			<div>
				{ resultHtml }
			</div>
		)
	}
}


