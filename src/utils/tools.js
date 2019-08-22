// 检测数据是不是除了symbol外的原始数据
const isStatic = (value) => {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    )
}
// 检测数据是不是原始数据
const isPrimitive = (value) => {
    return isStatic(value) || typeof value === 'symbol'
}
// 判断数据是不是引用类型的数据

const isObject = (value) => {
    let type = typeof value;
    return value !== null && ( type == 'object' || type == 'function' )
}

// getRawType：获取数据类型，返回结果为 Number、String、Object、Array等
const getRawType = (value) => {
    return Object.prototype.toString.call(value).slice(8, -1)
}

// isPlainObject：判断数据是不是Object类型的数据
const isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[Object Object]'
}
// isArray：判断数据是不是数组类型的数据
const isArray = (arr) => {
    return Object.prototype.toString.call(arr) === '[Object Array]'
}




