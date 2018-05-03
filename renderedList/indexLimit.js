/*

    module(requestFormerItems, reverse,  {arrayControl, fixedContainer})

    module
        .start()
        .shiftedIndexes(length)
    //

    module.listeners
        .onEnd()
    //
*/




_['renderedList/indexLimit'] = function indexLimit (requestFormerItems, reverse,  {arrayControl, fixedContainer, movingContainer, addItems}) {

    const limitDistance = 10
    
    let limit

    
        


    const ele = document.createElement('div')
    ele.style = "will-change: transform; text-align: center; width: 100vw; font-weight: 300; letter-spacing: 1.2px; font-size: 1.1rem;"
    if(reverse){
        ele.style.marginTop = '12px'
    }
    else{
        ele.style.marginBottom = '12px'
    }
    ele.innerText = "Loading..."
    

    changeIndexLimit('unlock')


    const module = {}

    module.start = async function () {  
        
        fixedContainer.appendLoadingEleToTheEnd(ele)
        
        changeIndexLimit('lock')

        const formerItems = await requestFormerItems()


        /*if(!telaIsIn) {
            await talaIsInPromise
            await new Promise(resolve => setTimeout(resolve, 300))
        }*/


        if (formerItems) {
            await new Promise(requestAnimationFrame)

            addItems.end(formerItems)

            changeIndexLimit('unlock')

            requestAnimationFrame(() => {//Request a frame so we don't get a chain of calls
                movingContainer.forceCheck()
            })
        }
        else {
            module.listeners.onEnd()
        }
                
        ele.remove()
    }

    module.shiftedIndexes = (length) => {
        if(!reverse) return
        
        changeIndexLimit(length)
    }



    return module
    
    
    
    function changeIndexLimit (value){
        if (typeof value == 'number') {
            limitValue += value
        }
        
        else 
        
        if (value === 'lock') {
            if (reverse) {
                limitValue = arrayControl.getLastIndex() + 10
            }
            else {
                limitValue = -10
            }
        }

        else 
        
        if (value === 'unlock') {
            if (reverse) {
                limitValue = arrayControl.getLastIndex() - limitDistance 
            }
            else {
                limitValue = limitDistance
            }
        }

        movingContainer.setIndexLimit(limitValue)
    }
}




