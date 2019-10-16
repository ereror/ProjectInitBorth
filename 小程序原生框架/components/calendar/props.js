'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var moment = require('../../libs/moment/moment.js');

module.exports = Behavior({
  properties: {
    value: {
      type: [String, Array],
      value: ['2018/9/2', '2018/10/3'],
      observer: function observer(val) {
        if (typeof val === 'string') {
          var _val$split$map = val.split('/').map(function (x) {
            return Number(x);
          }),
              _val$split$map2 = _slicedToArray(_val$split$map, 3),
              year = _val$split$map2[0],
              month = _val$split$map2[1],
              day = _val$split$map2[2];

          console.log(day);
          for (var i = 0; i < this.data.monthsArray.length; i++) {
            if (year === this.data.monthsArray[i].year && month === this.data.monthsArray[i].month) {
              this.setData({
                monthSwiperIndex: i
              });
              console.log(val);
              var dIndex = this.momentTransToItem(moment(val)).dayIndex;
              var mIndex = this.momentTransToItem(moment(val)).monthIndex;
              this.selectSingle(mIndex, dIndex);
              break;
            }
          }
        } else {}
      }
    },
    datePage: {
      type: [String, Number],
      observer: function observer(val) {
        console.log(val);

        var _val$split$map3 = val.split('/').map(function (x) {
          return Number(x);
        }),
            _val$split$map4 = _slicedToArray(_val$split$map3, 2),
            year = _val$split$map4[0],
            month = _val$split$map4[1];

        console.log(year, month);
        for (var i = 0; i < this.data.monthsArray.length; i++) {
          if (year === this.data.monthsArray[i].year && month === this.data.monthsArray[i].month) {
            this.setData({
              monthSwiperIndex: i
            });
            break;
          }
        }
      }
    },
    height: { // done
      type: [String, Number],
      value: 340
    },
    themeColor: { // done
      type: String
    },
    selectRangeMode: { // done
      type: Boolean,
      value: true
    },
    dateRange: { // done
      type: Array,
      value: [6, 6]
    },
    disablePastDays: { //done
      type: Boolean,
      value: true
    },
    disableForeDays: { // done
      type: Boolean,
      value: false
    },
    startShow: { // done
      type: [String, Array],
      value: 'today'
    },
    maxRange: { // done
      type: [Number, String],
      value: 30
    },
    canSelectToday: { //done
      type: Boolean,
      value: true
    },
    startRangeColor: { // done
      type: String,
      value: '#3399FF'
    },
    rangeColor: { // done
      type: String,
      value: 'pink'
    },
    endRangeColor: { // done
      type: String,
      value: 'red'
    },
    headerHeight: {
      type: [Number, String],
      value: 50
    },
    monthTitleStyle: { // done
      type: String,
      value: 'border-bottom:solid 1px #ccc'
    }
  }
});