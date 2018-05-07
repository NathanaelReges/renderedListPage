/*
    module(reverse, {fixedContainer, movingContainer, scrollerControl})
    
    module
        .mesure()
        .expand('start'|'end', height|null)
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

    module.expand = (position = 'start', height = limitStep) => {
        if(position != 'start' && position != 'end'){
            return
        } 


        const positionStart = position == 'start'
        const direction = reverse ?
            positionStart ? 'bot' : 'top' :
            positionStart ? 'top' : 'bot'
        //
        
        expandInternal(direction, height)

        if(!reverse) {    
            changeScrollLimit(height)
        } 
    }




    module.lock = function (){
        if(limitLocked || isGoingToLock) return
        isGoingToLock = true
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { //Wait until the item at the end is rendered
                if(!isGoingToLock) return
                isGoingToLock = false
                limitLocked = true


                const blankSpace = reverse?
                    movingContainer.getTransformTop() :
                    fixedContainer.getHeight() - movingContainer.getTransformTopPlusHeight()
                //


                changeScrollLimit('lock')
                
                if(reverse) {    
                    expandInternal('top', -blankSpace)
                }
                else {
                    expandInternal('bot', -blankSpace)
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

        
        if(reverse) {    
            expandInternal('top', limitStep)
        }
        else {
            expandInternal('bot', limitStep)
        }  

        changeScrollLimit('unlock')
    }

    return module




    function expandInternal (direction, value){
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
        if (typeof value == 'number') {
            limitValue += value
        }
        
        else 
        
        if (value === 'lock') {
            if (reverse) {
                limitValue = 0
            }
            else {
                limitValue = scrollerControl.getMaxScroll() + 10
            }
        }
        
        else

        if (value === 'unlock') {
            if (reverse) {
                limitValue = limitDistance
            }
            else {
                const maxScroll = scrollerControl.getMaxScroll()
                limitValue = maxScroll - limitDistance
            }
        }

                
        movingContainer.setScrollLimit(limitValue)
    } 
}

    
    
    