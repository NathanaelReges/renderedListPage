
/*
    moudule(reverse)

    module
        .ele
        .changeHeightBy(value)
        .getHeight()
        .append(ele)
        .appendLoadingEleToTheEnd(ele)
        .appendLoadingEleToTheStart(ele, height)
        .moveTo(value, {transition})
        .addEventListener(type, fun, options)
        .removeEventListener(type, fun)
    //
*/


_['renderedList/fixedContainer'] = function initFixedContainer (reverse) {

    const module = {}

    let container2EleHeight = reverse? 6000 : 6000
    let moveTo_transitionOn = false

    
    let container1Ele = document.createElement('div')
    container1Ele.className = 'renderedlist_fixed0'
    container1Ele.style = "width: 100%; overflow: hidden;"
    //This container exists only for hiding the pullUpdate loading element
    

    let container2Ele = document.createElement('div')
    container2Ele.className = 'renderedlist_fixed1'
    container2Ele.style = "margin-bottom: 10px; width: 100%; will-change: transform;"
    container2Ele.style.height = container2EleHeight + 'px'
        

    container1Ele.appendChild(container2Ele)
        
    module.ele = container1Ele

    module.changeHeightBy = (val) => {
        container2EleHeight += val
        container2Ele.style.height = container2EleHeight + 'px'
    }

    module.getHeight = () => {
        return container2EleHeight
    }

    module.append = (ele) => {
        container2Ele.append(ele)
    }


    module.appendLoadingEleToTheEnd = (ele) => {
        container2Ele.insertAdjacentElement(reverse? 'beforebegin' : 'afterend', ele)
    }

    module.appendLoadingEleToTheStart = (ele, height) => {
        if(reverse) return
        
        container2Ele.appendChild(ele)
        
        const spaceEle = document.createElement('div')
        spaceEle.style.height = height
        container2Ele.insertAdjacentElement('afterend', spaceEle)

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

        container2Ele.style.transform = transform

        if(transition && !moveTo_transitionOn) { 
            moveTo_transitionOn = true
            container2Ele.style.transition = '0.5s transform'
        }
        else 
        if(!transition && moveTo_transitionOn){
            moveTo_transitionOn = false
            container2Ele.style.transition = ''
        }
            
        
    }

    module.addEventListener = (type, fun, options) => {
        container2Ele.addEventListener(type, fun, options)
    }

    
    module.removeEventListener = (type, fun) => {
        container2Ele.removeEventListener(type, fun)
    }


    return module
}