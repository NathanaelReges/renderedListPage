_['renderedList/init.js'] = function initRenderedList (arrayOfItems, {reverse} = {}) {
    
    const initFixedContainer = _['renderedList/fixedContainer']
    const initArrayControl = _['renderedList/arrayControl']
    const initScrollerControl  = _['renderedList/scrollerControl']
    const initMovingContainer = _['renderedList/movingContainer']
    const initScrollLimit = _['renderedList/scrollLimit']
    const initAddItems = _['renderedList/addItems']
    const initIndexLimit = _['renderedList/indexLimit']
    const initPullUpdate = _['renderedList/pullUpdate']

    const modules = {}





    const fixedContainer = initFixedContainer(reverse)

    modules.fixedContainer = fixedContainer




   const scrollerControl = initScrollerControl(reverse)

   modules.scrollerControl = scrollerControl







    const arrayControl = initArrayControl(arrayOfItems, reverse)

    arrayControl.listeners = {
        unshiftedIndexes (length) {
            movingContainer.unshiftedIndexes(length)
        },
        shiftedIndexes (length) {
            if(indexLimit)
                indexLimit.shiftedIndexes(length)
            //
        }
    }
   
   modules.arrayControl = arrayControl









    const movingContainer = initMovingContainer(arrayControl.array, reverse, fixedContainer.getHeight())

    movingContainer.listeners = {
        reachedFirstItem () {
            if(!reverse) scrollLimit.lock()
        },
        reachedLastItem () {
            if (reverse) 
                scrollLimit.lock()
            //
            else {
                if (pullUpdate)
                    pullUpdate.start()
                //
            }  
        },
        reachedScrollLimit () {
            scrollLimit.expand('end')
        },
        reachedIndexLimit () {
            if(indexLimit)
                indexLimit.start()
            //
        },
        reachedScrollTop () {
            
            //
        }
    }

    fixedContainer.append(movingContainer.ele)

    scrollerControl.addScrollListener(movingContainer.scrollListener)

    modules.movingContainer = movingContainer
    











    
    const scrollLimit = initScrollLimit(reverse, modules)

    modules.scrollLimit = scrollLimit




    


    const addItems = initAddItems(reverse, modules)

    modules.addItems = addItems


    

    let indexLimit = undefined //Will be set

    let pullUpdate = undefined //Will be set





    
    const module = {}

    module.appended = ({insideAnimationFrame} = {}) => {
        
        if(insideAnimationFrame) {
            scroll()
            requestAnimationFrame(mesure)
        }
        else {
            requestAnimationFrame(()=>{
                scroll()
                requestAnimationFrame(mesure)
            })
        }
        

        function mesure () {
            scrollLimit.mesure()
            movingContainer.mesure(scrollerControl.getHeight())
        }

        function scroll () {
            if(reverse){
                scrollerControl.scrollTo('start')
            }
        }
    }

    module.addItemsToStart = (array) => {
        requestAnimationFrame(() => {
            addItems.start(array)
        })    
    }

    module.addItemsToEnd = (array) => {
        requestAnimationFrame(() => {
            addItems.end(array)
        })
    }

    module.setInfiniteLoading = (requestFormerItems) =>{
        indexLimit = initIndexLimit(requestFormerItems, reverse, modules)

        indexLimit.listeners = {
            onEnd (){
                indexLimit = undefined
                modules.indexLimit = undefined
            }
        }

        modules.indexLimit = indexLimit
    }


    module.setPullUpdate = (requestNewItems) =>{
        pullUpdate = initPullUpdate(requestNewItems, reverse, modules)
        modules.pullUpdate = pullUpdate
    }

    
    module.ele = fixedContainer.ele

    return module
    
}


