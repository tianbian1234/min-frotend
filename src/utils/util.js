// 便利数组并执行响应的函数，并不返回任何东西
const forEach = (array, fn) => {
    let i;
    for (i=0;i<array.length;i++)
        fn(array[i], i)
}
// 便利对象并对每个子键值对执行响应的函数，不返回任何东西
const forEachObject = (obj, fn) => {
    for (var property in obj) {
        if(obj.hasOwnProperty(property)){
            fn(property, obj[property])
        }
    }
}
// 条件判断是否支持当前哈数
const unless = (predicate, fn) => {
    if(!predicate)
        fn()
}

const times = (times, fn) => {
    for(var i=0; i< times; i++){
        fn(i);
    }
}

const ajax = {
    post: (url, obj) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', url);
            xhr.onload = (e) => {
                resolve(xhr.response)
            };
            xhr.onerror = (e) => {
                reject(e);
            }

            if(obj){
                let form = new FormData();
                for(let p in obj){
                    form.append(p, obj[p]);
                }

                obj = form;
            }else{
                obj = null;
            }

            xhr.send(obj)
        })
    },
    get: (url) => {
        return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.responseType = 'json';
			xhr.onload = (e) => {
				resolve(xhr.response);
			};
			xhr.onerror = (e) => {
				reject(e);
			}
			xhr.send(null);
		})
    }
}

export { forEach, forEachObject, unless, times, ajax};