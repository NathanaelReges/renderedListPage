_['tools/mySlide'] = (function init_mySlide () {
    
    const responseFrame = _['tools/myFrame'].response
    const nextFrame = _['tools/myFrame'].next

        
    let blockScroll = function blockScroll () {
        if(blockScroll.tick) {
            blockScroll.div.remove()
            blockScroll.tick = false
        }
        else {
            if(!blockScroll.div) {
                var div = document.createElement('div') 
                div.className = "blockScroll"
                blockScroll.div = div
            }
            blockScroll.tick = true
            document.body.append(blockScroll.div)
        }
    }

    let mySlide = function mySlide (nextEle, lastEle,  dir, opts) {
        blockScroll()     
        
        var n1, n2, l1, l2
        switch(dir){
            case 'left':
                n1 = "transform: translateX(100vw)"
                l1 = ""
                n2 = ""
                l2 = "transform: translateX(-100vw);"
            break;
            case 'right':
                n1 = "transform: translateX(-100vw);"
                l1 = ""
                n2 = ""
                l2 = "transform: translateX(100vw);"
            break;
            case 'downin':
                n1 = "transform: translateY(-100%);"
                l1 = ""
                n2 = ""
                l2 = ""
            break;
            case 'upout':
                n1 = ""
                l1 = ""
                n2 = ""
                l2 = "transform: translateY(-100%);"
            break;
        }

        nextEle.classList.add('transition')
        lastEle.classList.add('transition')
        nextEle.style = n1
        lastEle.style = l1
        var positionToInsertTheNextEle = dir == 'upout'? 'beforebegin' : 'afterend'
        lastEle.insertAdjacentElement(positionToInsertTheNextEle, nextEle)
        
        
        responseFrame(function mySlide_animateee () {
            nextEle.style = n2
            lastEle.style = l2
        }, 'write')

            
        var transitionedElement = dir == 'upout'? lastEle : nextEle

        transitionedElement.addEventListener('transitionend', function mySlide_transitionend () {
            
            const finish = function mySlide_finish () {            
                blockScroll()
                nextEle.style = ""
                lastEle.remove() 
                lastEle.style = ""
            }


            if(opts.callBack){
                opts.callBack()
                nextFrame(finish)
            }
            else {
                finish() 
            }

        }, {once: true})
    }

    return mySlide
 
})()