/*
    module(arrayOfItems, reverse, scrollerEleHeight, fixedContainerHeight)

    module
        
        .mesure()
        .scrollListener
        .moveBy()
        .forceCheck()
        .ele
        .unshiftIndexes()
        .setIndexLimit()
        .setScrollLimit()
        .getTransformTop()
        .getTransformTopPlusHeight()
    //

    module.listeners
        .reachedFirstItem()
        .reachedLastItem()
        .reachedScrollLimit()
        .reachedIndexLimit()
    //
*/


_['renderedList/movingContainer'] = function initMovingContainer (arrayOfItems, reverse, fixedContainerHeight) {
    
    const amountOfAppendedItems = reverse? 15: 11, //always odd numbers
    maxGoDownOrUpBy = (amountOfAppendedItems - 1)/2,
    dontReverse = !reverse


    let middleItemBottomY = 0,
    middleItemTopY = 0,
    transformTop = 0,
    transformBot = 0, 
    indexOfHighestItem = reverse? amountOfAppendedItems - 1 :arrayOfItems.length - 1,
    indexOfMiddleItem =  indexOfHighestItem - (amountOfAppendedItems - 1)/2,
    indexOfLowestItem =  indexOfHighestItem - (amountOfAppendedItems - 1),
    goingDown = true,
    itemMargin = 0,
    indexLimit = undefined,
    scrollLimit = 0

   
    



    const container1Ele = document.createElement('div')
    container1Ele.className = 'renderedlist_moving1'
    container1Ele.style = "height: 0; overflow: visible; width: 100%"

    const container2Ele = document.createElement('div')
    container2Ele.className = 'render_moving2'
    container2Ele.style = "will-change: transform; position: fixed; padding: 0px; width: 100%" //padding to fix colapsing children margin
    container1Ele.appendChild(container2Ele)
    

    for(let i = indexOfHighestItem; i >= indexOfLowestItem; i--){
        container2Ele.append(arrayOfItems[i])
    }


    if(reverse){
        moveToBottom()
    }





    const module = {}
    
    module.ele = container1Ele

    module.mesure = (scrollerEleHeight) => {
        const middleItem = arrayOfItems[indexOfMiddleItem]
        itemMargin = parseInt(window.getComputedStyle(middleItem).marginTop)
        middleItemTopY = transformBot + container2Ele.offsetTop + middleItem.offsetTop - scrollerEleHeight/2
        middleItemBottomY = middleItemTopY + middleItem.offsetHeight + itemMargin

        if(dontReverse)
            module.listeners.reachedLastItem()
        //
    }

    module.scrollListener = checkScroll


    module.moveBy = (val) => {                
        middleItemBottomY += val
        middleItemTopY += val

        if(goingDown){    
            transformTop += val
            container2Ele.style.transform = `translateY(${transformTop}px)`
        }
        else{
            transformBot += val
            container1Ele.style.transform = `translateY(${transformBot}px)`
        }           
    }

    module.forceCheck = () => {
        checkScroll()  
    }

    module.unshiftedIndexes = (length) => {
        indexOfHighestItem += length 
        indexOfLowestItem += length 
        indexOfMiddleItem += length  
    }

    module.setIndexLimit = (value) => {
        indexLimit = value
    }
    
    module.setScrollLimit = (value) => {
        scrollLimit = value
    }

    module.getTransformTop = () => {
        if(goingDown) {
            return transformTop
        }
        else {
            return transformBot - container2Ele.offsetHeight
        }
    }

    module.getTransformTopPlusHeight = () => {
        if(goingDown) {
            return transformTop + container2Ele.offsetHeight
        }
        else {
            return transformBot
        }
    }
    

    return module







    function moveToBottom () {
        container2Ele.style.bottom = 0
        transformBot = fixedContainerHeight
        container1Ele.style.transform = `translateY(${transformBot}px)`
        container1Ele.style.willChange = 'transform'
        goingDown = false
    }



    function checkScroll (e) {
        const myScrolly = scrollY
        
        let checkAgain = false,
            goDownBy = 0,
            goUpBy = 0
        //

        

        while(myScrolly > middleItemBottomY) {
            if(indexOfLowestItem - goDownBy <= 0){ 
                module.listeners.reachedFirstItem()
                break;
            }

            let _newMiddleItemHeight = arrayOfItems[indexOfMiddleItem - goDownBy - 1].offsetHeight + itemMargin
            middleItemTopY = middleItemBottomY
            middleItemBottomY += _newMiddleItemHeight
            
            goDownBy++
            
            if(goDownBy >= maxGoDownOrUpBy) {
                checkAgain = true
                break;
            }
        }



        while(myScrolly < middleItemTopY){
            if(indexOfHighestItem + goUpBy >= arrayOfItems.length -1) {
                module.listeners.reachedLastItem()                   
                break;
            }

            let _newMiddleItemHeight = arrayOfItems[indexOfMiddleItem + goUpBy + 1].offsetHeight + itemMargin
            middleItemBottomY = middleItemTopY
            middleItemTopY -= _newMiddleItemHeight
            
            goUpBy++
            
            if(goUpBy >= maxGoDownOrUpBy){
                checkAgain = true
                break;
            }
        } 




        if(goDownBy){
            let docFrag = document.createDocumentFragment()
            
            let _lastItemToBeRemoved = arrayOfItems[indexOfHighestItem - goDownBy + 1]
            
            if(!goingDown){
                goingDown = true
                transformTop = transformBot + container2Ele.offsetTop + _lastItemToBeRemoved.offsetTop + _lastItemToBeRemoved.offsetHeight
                container1Ele.style.transform = ''  
                container1Ele.style.willChange = ''
                container2Ele.style.bottom = 'unset';
            }
            else{
                transformTop = transformTop + _lastItemToBeRemoved.offsetTop + _lastItemToBeRemoved.offsetHeight 
            }
            

            for(let index = 1; index <= goDownBy; index++){
                docFrag.appendChild(arrayOfItems[indexOfLowestItem - index]) 
                arrayOfItems[indexOfHighestItem - index + 1].remove()
            }

            container2Ele.appendChild(docFrag)
            container2Ele.style.transform = `translateY(${transformTop}px)`

            indexOfHighestItem -= goDownBy
            indexOfLowestItem -= goDownBy
            indexOfMiddleItem -= goDownBy
            
            //Paints the middle item in red
            ////{arrayOfItems[indexOfMiddleItem + 1].style.background = '';arrayOfItems[indexOfMiddleItem].style.background = 'red'}


            goDownBy = 0

           
            if(dontReverse){
                if(indexOfLowestItem < indexLimit){
                    module.listeners.reachedIndexLimit()
                }
                
                if(myScrolly > scrollLimit){
                    module.listeners.reachedScrollLimit() 
                }
            }
        }



        if(goUpBy){
            let docFrag = document.createDocumentFragment()
            
            let _lastItemToBeRemoved = arrayOfItems[indexOfLowestItem + goUpBy - 1]
            
            if(goingDown){
                goingDown = false
                transformBot = transformTop + _lastItemToBeRemoved.offsetTop - itemMargin
                container1Ele.style.willChange = 'transform'
                container2Ele.style.transform = ''
                container2Ele.style.bottom = '0';
            }
            else{
                transformBot = transformBot + container2Ele.offsetTop + _lastItemToBeRemoved.offsetTop - itemMargin
            }            

            for(let index = 1; index <= goUpBy; index++){
                docFrag.prepend(arrayOfItems[indexOfHighestItem + index])
                arrayOfItems[indexOfLowestItem + index - 1].remove()
            }

            container2Ele.prepend(docFrag)
            container1Ele.style.transform = `translateY(${transformBot}px)`

            indexOfHighestItem += goUpBy
            indexOfLowestItem += goUpBy
            indexOfMiddleItem += goUpBy

    
            //Paints the middle item in red
            ////{arrayOfItems[indexOfMiddleItem - 1].style.background = ''; arrayOfItems[indexOfMiddleItem].style.background = 'red'}
            

            goUpBy = 0

            
            if(reverse){
                if(indexOfHighestItem > indexLimit){
                    module.listeners.reachedIndexLimit()
                }
                
                if(myScrolly < scrollLimit){
                    module.listeners.reachedScrollLimit()
                }
            }
        }

        if(checkAgain){
            checkScroll()
        }
    }



}


