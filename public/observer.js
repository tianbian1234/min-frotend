// 建立观察者模式
var observer = (function(){
    // 建立内部私有的变量，以防被篡改
    var __messages = {}
    return {
        // 建立注册消息的接口
        regist: function(type, fn){
            // 如果消息不存在，先建立一条消息
            if(typeof __messages[type] === 'undefined'){
                __messages[type] = [fn]
            }else{
                // 如果消息存在将动作推入改消息对应的执行队列中
                __messages[type].push(fn)
            }
        },
        // 接收消息 
        fire: function(type, args){
            // 如果该消息没有被注册则返回
            if(!__messages[type]) return;
            // 定义接收消息
            var events = {
                type: type,
                args: args || {}
            }
            // 缓存消息的长度
            var len = __messages[type].length;
            for (var i = 0; i < len; i++) {
                // 依次注册消息的队列
                __messages[type][i].call(this, events)
            }
        },
        // 删除消息
        remove: function(type, fn) {
            // 如果消息队列存在
            if (__messages[type] instanceof Array) {
                // 从最后一个消息队列遍历
                var i = __messages[type].length - 1;
                for (; i >= 0; i--) {
                    __messages[type][i] === fn && __messages[type].splice(i, 1)
                }
            }
        }
    }
})();

observer.regist('test', function(e) {
    console.log(e.type, e.args.msg);
  })
  var add = function(e) {
    console.log(e.type, e.args.msg);
  }
  observer.regist('add', add)
  observer.fire('test', {
    msg: ''
  })
  observer.fire('add', {
    msg: ''
  })
  observer.remove('add', add)
  observer.fire('add', {
    msg: ''
  })