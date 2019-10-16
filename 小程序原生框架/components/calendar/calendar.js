'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _props = require('./props.js');

var _props2 = _interopRequireDefault(_props);

var _date = require('../../libs/date.js');

var _date2 = _interopRequireDefault(_date);

var _objectToStyle = require('../../libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require('../../libs/moment/moment.js');

exports.default = Component({
  behaviors: [_props2.default],
  data: {
    selectItem: {},
    dayMap: {},
    monthsArray: [],
    oldItem: undefined,
    scrollTop: 0,
    oldRangeLeftItem: undefined,
    oldRangeRightItem: undefined,
    heightCount: 50,
    monthSwiperIndex: 0,
    myItem: undefined
  },
  attached: function attached() {
    console.log('attached');
  },
  ready: function ready() {
    this.reAttached();

    console.log(this.data.dayMap);
  },

  methods: {
    reAttached: function reAttached() {
      this.data.monthsArray.splice(0, this.data.monthsArray.length);
      var startMonthAnchor = void 0;
      var endMonthAnchor = void 0;
      if (isNaN(Number(this.data.dateRange[0]))) {
        // 字符串
        startMonthAnchor = this.data.dateRange[0] + '/01';
        endMonthAnchor = this.data.dateRange[1] + '/01';
      } else {
        startMonthAnchor = moment().subtract(this.data.dateRange[0], 'months').format('YYYY/MM') + '/01';
        endMonthAnchor = moment().add(this.data.dateRange[1], 'months').format('YYYY/MM') + '/01';
      }

      console.log(startMonthAnchor, endMonthAnchor);

      for (var i = 0; ; i++) {
        var year = moment(startMonthAnchor).year();
        var month = moment(startMonthAnchor).month() + 1;
        var day = moment(startMonthAnchor).date();

        var startMonthDater = new _date2.default(year, month, day).monthDays; // Dater使用的是正常月份
        var monthArray = this.getMonthArray(startMonthDater, i);
        monthArray.monthIndex = i;
        this.data.monthsArray.push(monthArray);
        if (moment(startMonthAnchor).isSame(endMonthAnchor, 'month')) {
          // 相同
          break;
        }
        startMonthAnchor = moment(startMonthAnchor).add(1, 'month');
      }

      if (this.data.value) {
        if (typeof this.data.value === 'string') {
          var dIndex = this.momentTransToItem(moment(this.data.value)).dayIndex;
          var mIndex = this.momentTransToItem(moment(this.data.value)).monthIndex;
          this.selectSingle(mIndex, dIndex);
        } else {
          var _dIndex = this.momentTransToItem(moment(this.data.value[0])).dayIndex;
          var _mIndex = this.momentTransToItem(moment(this.data.value[0])).monthIndex;
          this.selectRange(_mIndex, _dIndex, true);
          _mIndex = this.momentTransToItem(moment(this.data.value[1])).monthIndex;
          _dIndex = this.momentTransToItem(moment(this.data.value[1])).dayIndex;
          this.selectRange(_mIndex, _dIndex);
        }
      }
      this.setData({
        monthsArray: this.data.monthsArray,
        monthTitleStyle: (0, _objectToStyle2.default)(this.data.monthTitleStyle),
        calendarWrapStyle: (0, _objectToStyle2.default)(this.calendarWrapStyleObj())
      });
      // }, 3000);
    },
    changeHandler: function changeHandler(e) {
      var index = e.detail.current;
      // console.log()
      this.triggerEvent('monthchange', this.data.monthsArray[index].year + '/' + (this.data.monthsArray[index].month >= 10 ? '' : '0') + this.data.monthsArray[index].month);
    },
    calendarWrapStyleObj: function calendarWrapStyleObj() {
      var style = {};
      style.height = this.data.height + 'px';
      return style;
    },
    itemTransToMoment: function itemTransToMoment(item) {
      if (item.day) {
        return moment(item.year + '/' + item.month + '/' + item.day);
      } else {
        return moment(item.year + '/' + item.month);
      }
    },
    momentTransToItem: function momentTransToItem(moment) {
      for (var i = 0; i < this.data.monthsArray.length; i++) {
        for (var j = 0; j < this.data.monthsArray[i].data.length; j++) {
          if (this.data.monthsArray[i].data[j].isThisMonth && moment.isSame(this.itemTransToMoment(this.data.monthsArray[i].data[j]))) {
            return this.data.monthsArray[i].data[j];
          }
        }
      }
    },
    inRangeSelect: function inRangeSelect(rightItem, startI, endI, select) {
      for (var i = startI; i <= endI; i++) {
        for (var j = 0; j < this.data.monthsArray[startI].data.length; j++) {
          if (this.data.monthsArray[i].data[j].isThisMonth && this.itemTransToMoment(this.data.monthsArray[i].data[j]).isAfter(this.itemTransToMoment(this.data.oldRangeLeftItem), 'day') && this.itemTransToMoment(this.data.monthsArray[i].data[j]).isBefore(this.itemTransToMoment(rightItem), 'day')) {
            if (select) {
              this.data.monthsArray[i].data[j].isInRange = true;
            } else {
              this.data.monthsArray[i].data[j].isInRange = false;
            }
          }
          if (this.itemTransToMoment(this.data.monthsArray[i].data[j]).isSame(this.itemTransToMoment(rightItem), 'day')) {
            break;
          }
        }
      }
    },
    selectRange: function selectRange(mIndex, dIndex, trans) {
      var selectItem = this.data.monthsArray[mIndex].data[dIndex];
      var selectMoment = this.itemTransToMoment(selectItem);
      if (selectItem.isPastDay && this.data.disablePastDays) {
        this.triggerEvent('failed');
        return;
      }
      if (selectItem.isForeDay && this.data.disableForeDays) {
        this.triggerEvent('failed');
        return;
      }
      if (selectItem.isToday && !this.data.canSelectToday) {
        this.triggerEvent('failed');
        return;
      }
      if (!this.data.oldRangeLeftItem && !this.data.oldRangeRightItem) {
        // 两边都没有
        selectItem.isRangeLeft = true; // 变颜色
        this.data.oldRangeLeftItem = selectItem; // 老东西
        this.triggerEvent('selectedstart', selectItem.value);
      } else if (this.data.oldRangeLeftItem, !this.data.oldRangeRightItem) {
        //左有右没有
        // maxRange选取
        if (this.data.maxRange) {
          if (this.itemTransToMoment(this.data.oldRangeLeftItem).add(this.data.maxRange, 'day').isBefore(selectMoment, 'day')) {
            this.triggerEvent('failed');
            return;
          }
        }
        if (this.itemTransToMoment(this.data.oldRangeLeftItem).isAfter(selectMoment, 'day')) {
          // 如果选择在之前
          // this.data.oldRangeLeftItem = this.
          this.data.oldRangeLeftItem.isRangeLeft = false;
          selectItem.isRangeLeft = true; // 变颜色
          this.data.oldRangeLeftItem = selectItem;
          this.triggerEvent('selectedstart', selectItem.value);
        } else if (this.itemTransToMoment(this.data.oldRangeLeftItem).isBefore(selectMoment, 'day')) {
          // 如果选择在之后

          selectItem.isRangeRight = true; // 变颜色
          this.data.oldRangeRightItem = selectItem; // 老东西
          var startI = this.data.oldRangeLeftItem.monthIndex;
          var endI = selectItem.monthIndex;
          this.inRangeSelect(selectItem, startI, endI, true);
          this.triggerEvent('selectedend', selectItem.value);
        } else {
          selectItem.isRangeLeft = false; // 变颜色
          this.data.oldRangeLeftItem = undefined;
        }
      } else {
        //如果都有
        var _startI = this.data.oldRangeLeftItem.monthIndex;
        var _endI = this.data.oldRangeRightItem.monthIndex;
        this.inRangeSelect(this.data.oldRangeRightItem, _startI, _endI, false);
        this.data.oldRangeLeftItem.isRangeLeft = false;
        this.data.oldRangeRightItem.isRangeRight = false;
        this.data.oldRangeRightItem = undefined;
        selectItem.isRangeLeft = true; // 变颜色
        this.data.oldRangeLeftItem = selectItem; // 老东西
        this.triggerEvent('selectedstart', selectItem.value);
      }
      if (trans) {
        this.setData({
          monthSwiperIndex: mIndex
        });
      }
    },
    selectSingle: function selectSingle(mIndex, dIndex) {
      var selectItem = this.data.monthsArray[mIndex].data[dIndex];

      if (selectItem.isPastDay && this.data.disablePastDays) {
        this.triggerEvent('failed');
        return;
      }
      if (selectItem.isForeDay && this.data.disableForeDays) {
        this.triggerEvent('failed');
        return;
      }
      if (selectItem.isToday && !this.data.canSelectToday) {
        this.triggerEvent('failed');
        return;
      }

      if (this.data.oldItem) {
        this.data.oldItem.isClicked = false;
      }
      this.data.monthsArray[mIndex].data[dIndex].isClicked = true;

      this.data.oldItem = this.data.monthsArray[mIndex].data[dIndex];

      this.data.selectItem = this.data.oldItem;
      this.setData({
        monthSwiperIndex: mIndex,
        myItem: this.data.selectItem,
        oldItem: this.data.oldItem
      });
      this.triggerEvent('change', selectItem.value);
    },
    touchStartHandler: function touchStartHandler(e) {

      console.time('a');
      var mIndex = e.currentTarget.dataset.monthIndex;
      var dIndex = e.currentTarget.dataset.dayIndex;
      var selectItem = this.data.monthsArray[mIndex].data[dIndex];
      if (selectItem.isThisMonth === false) {
        return;
      }
      if (this.data.selectRangeMode) {
        this.selectRange(mIndex, dIndex);
      } else {
        this.selectSingle(mIndex, dIndex);
      }
      // this.setData({
      //   monthsArray: this.data.monthsArray
      // })
      console.timeEnd('a');
    },
    getMonthArray: function getMonthArray(date, monthIndex) {
      var monthArray = {};
      var lineCount = 0;
      var count = 0;
      monthArray.data = [];
      monthArray.year = date.year;
      monthArray.month = date.month;
      for (var i = 0; i < date.preMonthDays.length; i++) {
        var obj = {};
        obj.day = date.preMonthDays[i];
        if (date.month === 1) {
          obj.month = 12;
          obj.year = date.year - 1;
        } else {
          obj.month = date.month - 1;
          obj.year = date.year;
        }
        obj.value = obj.year + '/' + (obj.month < 10 ? '0' : '') + obj.month + '/' + (obj.day < 10 ? '0' : '') + obj.day;

        obj.isThisMonth = false;
        obj.isClicked = false;
        obj.isRangeLeft = false;
        obj.isRangeRight = false;
        obj.isInRange = false;
        obj.monthIndex = monthIndex;
        obj.dayIndex = count;
        this.data.dayMap[obj.value] = obj;
        if ([0, 6].indexOf(moment(obj.value).weekday()) !== -1) {
          obj.isHoliday = true;
        }
        monthArray.data.push(obj);
        count++;
      }
      for (var _i = 0; _i < date.thisMonthDays.length; _i++) {
        var _obj = {};
        _obj.day = date.thisMonthDays[_i];
        _obj.month = date.month;
        _obj.year = date.year;
        _obj.isThisMonth = true;
        _obj.isClicked = false;
        _obj.isRangeLeft = false;
        _obj.isRangeRight = false;
        _obj.isInRange = false;
        _obj.monthIndex = monthIndex;
        _obj.dayIndex = count;
        _obj.value = _obj.year + '/' + (_obj.month < 10 ? '0' : '') + _obj.month + '/' + (_obj.day < 10 ? '0' : '') + _obj.day;
        if ([0, 6].indexOf(moment(_obj.value).weekday()) !== -1) {
          _obj.isHoliday = true;
        }
        if (moment(_obj.year + '/' + _obj.month + '/' + _obj.day).isBefore(moment(), 'day')) {
          _obj.isPastDay = true;
          _obj.isForeDay = true;
          _obj.isToday = false;
        } else if (moment(_obj.year + '/' + _obj.month + '/' + _obj.day).isAfter(moment(), 'day')) {
          _obj.isPastDay = false;
          _obj.isForeDay = true;
          _obj.isToday = false;
        } else {
          _obj.isPastDay = false;
          _obj.isForeDay = false;
          _obj.isToday = true;
        }
        monthArray.data.push(_obj);
        count++;
        this.data.dayMap[_obj.value] = _obj;
      }
      // if (date.nextMonthDays.length >= 7) {
      //   date.nextMonthDays.splice(date.nextMonthDays.length - 7, 7)
      //   lineCount++
      // }

      for (var _i2 = 0; _i2 < date.nextMonthDays.length; _i2++) {
        var _obj2 = {};
        _obj2.day = date.nextMonthDays[_i2];

        if (date.month === 12) {
          _obj2.month = 1;
          _obj2.year = date.year + 1;
        } else {
          _obj2.month = date.month + 1;
          _obj2.year = date.year;
        }
        _obj2.isThisMonth = false;
        _obj2.isClicked = false;
        _obj2.isRangeLeft = false;
        _obj2.isRangeRight = false;
        _obj2.isInRange = false;
        _obj2.monthIndex = monthIndex;
        _obj2.dayIndex = count;
        _obj2.value = _obj2.year + '/' + (_obj2.month < 10 ? '0' : '') + _obj2.month + '/' + (_obj2.day < 10 ? '0' : '') + _obj2.day;
        if ([0, 6].indexOf(moment(_obj2.value).weekday()) !== -1) {
          _obj2.isHoliday = true;
        }
        monthArray.data.push(_obj2);
        count++;
        this.data.dayMap[_obj2.value] = _obj2;
      }
      monthArray.positionY = this.data.heightCount;

      monthArray.value = date.year + '/' + (date.month > 10 ? '' : '0') + date.month;

      if (lineCount === 0) {
        monthArray.monthHeight = 350;
      } else if (lineCount === 1) {
        monthArray.monthHeight = 300;
      } else {
        monthArray.monthHeight = 250;
      }
      this.data.heightCount += monthArray.monthHeight;
      return monthArray;
    }
  }
});