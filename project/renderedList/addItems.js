/*
    module(reverse, {arrayControl, scrollLimit, scrollerControl, movingContainer})
        .start()
        .end()

*/



_['renderedList/addItems'] = function addItems (reverse, {arrayControl, scrollLimit, scrollerControl, movingContainer}) {
        
    const module = {}

    module.start = (arrayOfNewItems) => {
        if(!Array.isArray(arrayOfNewItems)) return
        
        const isScrolledToTheEnd = scrollerControl.isScrolledToTheEnd()
        
        arrayControl.addTo('start', arrayOfNewItems)

        const height = calculate(arrayOfNewItems)

        scrollLimit.expand('start', height)

        
        
        ///if the user is at the bottom of the page, add the items and scroll down to show then
        if(reverse && isScrolledToTheEnd){ 
            scrollerControl.scrollBy(height)   
        }

        if(reverse){
            movingContainer.forceCheck() //For the items to appear in this frame it is necessary to check right now.
        }
    }

    module.end = (arrayOfNewItems) => {
        if(!Array.isArray(arrayOfNewItems)) return
        
        arrayControl.addTo('end', arrayOfNewItems)
        scrollLimit.unlock()
    }


    return module


    function calculate (arrayOfNewItems) {
        let wrapper = document.createElement('div')
        wrapper.style.width = "100%"
        wrapper.style.visibility = "hidden"
        wrapper.style.position = "fixed"

        for(let i = 0; i < arrayOfNewItems.length; i++){
            wrapper.append(arrayOfNewItems[i]) 
        }

        document.body.appendChild(wrapper)
        const height = wrapper.offsetHeight
    
        wrapper.remove()
    
        return height
    }

}


