
/*
    moudule()

    module
        .ele
        .changeHeightBy(value)
        .getHeight()
        .append(ele)
        .appendLoadingEleToTheEnd(ele)
    //
*/


_['renderedList/fixedContainer'] = function initFixedContainer (reverse) {

    const module = {}

    let container0EleHeight = reverse? 6000 : 6000
    let moveTo_transitionOn = false

    
    let container10Ele = document.createElement('div')
    container10Ele.className = 'render_container10'
    container10Ele.style = "width: 100%; overflow: hidden;"
    
    

    let container0Ele = document.createElement('div')
    container0Ele.className = 'render_container0'
    container0Ele.style = "margin-bottom: 10px; width: 100%; will-change: transform;"
    container0Ele.style.height = container0EleHeight + 'px'
        

    container10Ele.appendChild(container0Ele)
        
    module.ele = container10Ele

    module.changeHeightBy = (val) => {
        container0EleHeight += val
        container0Ele.style.height = container0EleHeight + 'px'
    }

    module.getHeight = () => {
        return container0EleHeight
    }

    module.append = (ele) => {
        container0Ele.append(ele)
    }


    module.appendLoadingEleToTheEnd = (ele) => {
        container0Ele.insertAdjacentElement(reverse? 'beforebegin' : 'afterend', ele)
    }

    module.appendLoadingEleToTheStart = (ele, height) => {
        if(reverse) return
        
        container0Ele.appendChild(ele)
        
        const spaceEle = document.createElement('div')
        spaceEle.style.height = height
        container0Ele.insertAdjacentElement('afterend', spaceEle)

        return function remove () {
            ele.remove()
            spaceEle.remove()
        }
    }

    module.moveTo = (value, {transition} = {}) => {
        if(value === 0)
            transform = ""
        else
            transform = `translateY(${value}px)`
        //

        container0Ele.style.transform = transform

        if(transition && !moveTo_transitionOn) { 
            moveTo_transitionOn = true
            container0Ele.style.transition = '0.5s transform'
        }
        else 
        if(!transition && moveTo_transitionOn){
            moveTo_transitionOn = false
            container0Ele.style.transition = ''
        }
            
        
    }

    module.addEventListener = (type, fun, options) => {
        container0Ele.addEventListener(type, fun, options)
    }

    
    module.removeEventListener = (type, fun) => {
        container0Ele.removeEventListener(type, fun)
    }


    return module
}