export const classDecorator = (target) => {
    target.a = true;
}

export const classDecoratorWithParams = (params = true) => (target) => {
    target.a = params
}

export const classDecoratorAddPrototype = (log) => (target) => {
    target.prototype.getData = function(){
        console.log("222222传回数据到页面")
    }
    
    target.prototype.logger = function() {
        console.log("ddfffgghhjj", target.name);
    }

    target.prototype.componentDidMount = function(){
        console.log("33333获取数据吧！");
        this.getData()
    }
}

export const mixins = (...list) => (target) => {
    // target.prototype = {...target.prototype, ...list};
    Object.assign(target.prototype, ...list)
}