_['tools/myTime'] = (function init_myTime () {

    let __timeLine = []
    
    let goBack = function () {
        if(__timeLine.length){

            __timeLine.pop()()

        }
    }

    window.addEventListener('keydown', function myTime_KeydownHandler (e) {
        if(e.key == 'r'){
            goBack()
        }
    })
    
    const obj = {}

    obj.addFun = function myTimeAddFun (fun) {
        __timeLine.push(fun)
    }

    obj.goBack = goBack
    
    return obj

})()