const strategies = {
  // errorMsg参数，提升了适用性
  isNoEmpty: function(value, errorMsg) { //不为空
    if (value === '' || value === undefined || value === false || JSON.stringify(value) === '[]' || JSON.stringify(value) === '{}') {
      // 返回字符串true  错误信息
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) { //限制最小长度
    if (value.length < length) {
      return errorMsg;
    }
  },
  maxLength: function(value, length, errorMsg) { //限制最小长度
    if (value.length > length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|([0-9]{3,4}-)?[0-9]{7,8})$/.test(value)) { //电话号码校验
      return errorMsg;
    }
  },
  money: function(value, errorMsg) {
    if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) { //金额校验
      return errorMsg;
    }
  }
};
class Validate {
  constructor() {
    this.cache = []
  }

}
Validate.prototype.add = function(value, rule, errorMsg) {

  this.cache.push(function() {
    // 规则


    let method, arr;
    //判断为已有的策略还是新增的
    if (typeof rule === 'string') {
      arr = rule.split(':');
      let strategy = arr.shift();
      method = strategies[strategy];

    } else {
      arr = [];
      method = rule;
    }
    arr.unshift(value);
    arr.push(errorMsg);
    return method.apply(null, arr);

  });
};

Validate.prototype.start = function() {
  for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    let msg = validatorFunc();
    if (msg) {
      return msg;
    }
  }
};
Validate.prototype.test = (e, fileds) => {
  let values = e.detail.value;
  let result = true;
  //遍历每个字段
  Object.keys(fileds).map((item) => {

    let value = values[item];
    let filed = fileds[item];
    //遍历字段的规则
    Object.keys(filed).map((item) => {
      console.log(strategies[item](value, filed[item]));
      if (!strategies[item](value, filed[item])) {
        console.log("不能为空");
        result = false;
      }
    })
  });
  return result;

};


export default Validate