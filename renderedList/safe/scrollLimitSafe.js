/*
    module(reverse, {fixedContainer, movingContainer, scrollerControl})
    
    module
        .mesure()
        .expandTop(height|null)
        .expandBot(height|null)
        .lock()
        .unlock()
    //

*/




_['renderedList/scrollLimit'] = function scrollLimit (reverse, {fixedContainer, movingContainer, scrollerControl})  {
    
    let limitLocked = false,
    limitValue = undefined,
    isGoingToLock = false
    
    const limitStep = 2000,
    limitDistance = 1500
    



    const module = {}

    module.mesure = () => {
        changeScrollLimit('unlock')
    }

    module.expandTop = function (height = limitStep) {
        if(!reverse) {
            changeScrollLimit(height)
        }

        expand('top', height)
    }

    module.expandBot = function (height = limitStep) {
        if(!reverse) {
            changeScrollLimit(height)
        }

        expandBot('bot', height)
    }

    module.lock = function (){
        if(limitLocked) return

        isGoingToLock = true
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if(!isGoingToLock) return

                lockingLimit = false
                limitLocked = true

                const blankSpace = fixedContainer.getHeight() - movingContainer.getEntireHeight()

                changeScrollLimit('lock')
                
                if(reverse) {    
                    expand('top', -blankSpace)
                }
                else {
                    expandBot('bot', -blankSpace)
                }   
            })
        }) 
        
    }

    module.unlock = function (){
        if(isGoingToLock) {
            isGoingToLock = false
            return
        }
        
        if(!limitLocked) return
        
        limitLocked = false


        changeScrollLimit('unlock')
        
        //expandIfNecessary()

        if(reverse) {
            module.expandTop()
        }
        else{
            module.expandBot()

        }
    }



    return module





/*
    function expandIfNecessary (direction, value){
        const scrollY = scrollerControl.getScrollValue()

        if(reverse) {
            if(scrollY < limitValue){
                module.expandTop()
            }
        }
        else{
            if(scrollY > limitValue){
                module.expandBot()
            }
        }
    }
*/


    function expand (direction, value){
        if(direction === 'top'){
            fixedContainer.changeHeightBy(value)
            movingContainer.moveBy(value)
            scrollerControl.scrollBy(value)
        }
        else if(direction === 'bot'){
            fixedContainer.changeHeightBy(value)
        }
    }




    function changeScrollLimit (value){
        if(typeof value == 'number'){
            limitValue += by
        }
        
        else if(typeof value === 'lock') {
            if(reverse) {
                limitValue = 0
            }
            else{
                limitValue = fixedContainer.getHeight()
            }
        }

        else if(typeof value === 'unlock') {
            if(reverse) {
                limitValue = limitDistance
            }
            else{
                const maxScroll = scrollerControl.getMaxScroll()
                limitValue = maxScroll - limitDistance            
            }
        }

        movingContainer.setScrollLimit(value)
    } 
}

    
    
    