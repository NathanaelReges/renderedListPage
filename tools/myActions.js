_['tools/myActions']= (function init_myActions () {

    var __actions = {}

    window.addEventListener('click', function myActionsClickHandler (e) {
        var t = e.target
        var d = t.dataset
        
        if(d.act){
            
            if(typeof __actions[d.act] != "function" ){
                throw('myActions - No action registered for this key: ' + d.act)
            }
            
            __actions[d.act](d,t)
        }
            
    })

    var obj = {}

    obj.add = function myActionsAdd (objOrStr, fun) {   
        if(typeof objOrStr == "string") {
            __actions[objOrStr] = fun
            return
        }
        var obj = objOrStr
        var arr = Object.keys(obj)
        arr.forEach(function (str) {
            __actions[str] = obj[str]
        })
    }
    
    obj.remove = function myActionsRemove (objOrStr) {
        if(typeof objOrStr == "string") {
            __actions[objOrStr] = null
            return
        }
        var arr = Object.keys(objOrStr)
        arr.forEach(function (str) {
            __actions[str] = null
        })
    }

    obj.call = function myActionsCall (str) {
        if(__actions[str])
            __actions[str]()
    }

    return obj

})()