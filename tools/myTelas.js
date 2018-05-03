/*

*/


_['tools/myTelas'] = (function init_myTelas () {

    /*Futuramente separar os eventos em goin1 e goin2 e tbm goout1 e goout2 */

    
    const responseFrame = _['tools/myFrame'].response
    const nextFrame = _['tools/myFrame'].next
    const lastFrame = _['tools/myFrame'].last
    const myActions = _['tools/myActions'] 
    const mySlide = _['tools/mySlide'] 
    
    var prototype = {}
    let sliding = false
    
    let scrollFun = function myTelas_scrollFun (scrlObj) {
        scrlObj.scroller.scrollTop = scrlObj.scrlVal
        scrlObj.scrlVal = undefined
    }

    let appendFunction = function myTelas_appendFunction (appendOrPrepend) {
        return function myTelas_appendFunction (tela) {
            var parent =  this
            tela._parent = parent
            parent._sun.push(tela)
            
            parent._ele[appendOrPrepend](tela._ele)
            
            if(parent._isIn) {
                tela._goIn()
                if(!sliding){
                    sliding = true
                    nextFrame(()=>{
                        tela._afterLoadedGoIn()
                        sliding = false
                    }, 'write')
                }
            }
        }
    }

    prototype.append = appendFunction('append')

    prototype.prepend = appendFunction('prepend')

    prototype.remove = function myTelasRemove () {
        var tela = this, parent = this._parent

        tela._parent = undefined
        const sunIndex = parent._sun.indexOf(tela)
        parent._sun.splice(sunIndex, 1)
        
        
        if(!tela._isIn){
            tela._ele.remove()
            return
        }

        nextFrame(tela._goOut.bind(tela), 'read')
        nextFrame(function myTelas_remove () {
            tela._ele.remove()
        }, 'write')
    }

    prototype.replace = function myTelasReplace (nextTela, dir) {
        var lastTela = this, parent = this._parent

        //If the actual tela isn't appended to any other tela return
        if(parent == undefined) return
        
        //Update the parents and suns
        nextTela._parent = parent
        lastTela._parent = undefined

        const lastSunIndex = parent._sun.indexOf(lastTela)
        parent._sun[lastSunIndex] = nextTela

        //If the tela isn't in the screen
        //call replaceChild instead of mySlide
        if(!lastTela._isIn) {
            parent._ele.replaceChild(nextTela._ele, lastTela._ele)
            return 
        }

        
        //If the tela is not sliding in
        if(!dir) {
            lastTela._goOut()
            
            nextFrame(function (){
                parent._ele.replaceChild(nextTela._ele, lastTela._ele)
                nextTela._goIn()
                if(!sliding){
                    sliding = true
                    nextTela._afterLoadedGoIn()
                    sliding = false
                }
            })
        
            return 
        }


        const callBack = function mySlideCallBack (){
            sliding = false
            lastTela._goOut()
            nextTela._afterLoadedGoIn()
            
        }

        mySlide(nextTela._ele, lastTela._ele, dir, {callBack})
        sliding = true
        nextTela._goIn()
            
    }

    prototype._afterLoadedGoIn = function myTelas_goIn () {
        var tela = this
        
        if(tela._acts) myActions.add(tela._acts)

        if(tela._fun.in) lastFrame(tela._fun.in)
        
        if(tela._sun.length) tela._sun.forEach(x=>x._afterLoadedGoIn())
    }

    prototype._goIn = function myTelas_goIn () {
        var tela = this
        
        tela._isIn = true

        if(tela._scroll.scrlVal) responseFrame(scrollFun.bind(undefined, tela._scroll))

        if(tela._fun.inForLoading) nextFrame(tela._fun.inForLoading)
        
        if(tela._sun.length) tela._sun.forEach(x=>x._goIn())
    }
    
    prototype._goOut = function myTelas_goOut () {
        var tela = this

        //Is in the screen flag
        tela._isIn = false

        //Saving the scroll value
        if(tela._scroll.scroller){
            tela._scroll.scrlVal =  tela._scroll.scroller.scrollTop
        }

        //Removing Actions
        if(tela._acts) myActions.remove(tela._acts)

        //Call outForReading evnt
        if(tela._fun.outForReading) nextFrame(tela._fun.outForReading, 'read')

        //Call out evnt
        if(tela._fun.out) lastFrame(tela._fun.out)
        
        //If there's a child call goOut
        if(tela._sun.length) tela._sun.forEach(x=>x._goOut())
    }

    prototype.addActions = function (actions) {
        this._acts = actions
    }
    
    prototype.addListeners = function (listeners) {
        this._fun = listeners
    }

    prototype.setScroller = function (scrollerEle, {firstScroll}) {
        this._scroll = {scroller}
        if(firstScroll){
          this._scroll.scrlVal = firstScroll  
        }
    }
    
    const bodyTela = Object.create(prototype)
    bodyTela._ele = document.body
    bodyTela._isIn = true
    bodyTela._sun = []

    const obj = {}

    obj.new = function myTelas_new (ele) {
        var obj = Object.create(prototype)
    
        var scroller = ele.querySelector('.scroller') || (ele.classList.contains('scroller') ? ele : undefined)
        
        obj._ele = ele
        obj._acts = {}
        obj._fun = {}
        obj._scroll = scroller? {scroller} : {}

        obj._isIn = false
        obj._sun = []
        obj._parent = undefined

        return obj
    },

    obj.bodyTela = bodyTela

    return obj


})()


/*

    module = newTela(ele)


    module.
        addActions()
        addListeners()
            inForLoading,
            in,
            ouForReading(),
            out
        //    
        setScroller()

        append(otherTela)
        prepend(otherTela)
        remove()
        replace(otherTela, direction)
    //        

        saves scroller



*/