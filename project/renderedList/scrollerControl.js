/*
    module(scrollerEle)

    module
        .getHeight()
        .getMaxScroll()
        .getScrollValue()
        .scrollBy(value)
        .scrollTo(value)
        .addScrollListener(fun)
        .disconnect()
        .isScrolledToTheEnd()
    //
*/


_['renderedList/scrollerControl'] = function getScrollerControl (reverse) {

    let scrollerEle = document.documentElement

    

    let height = 0,
        scrollListener = undefined
    //



    const module = {}
    
    module.getHeight = ()=>{
        if(!height){
            height = scrollerEle.offsetHeight
        }

        return height
    }

    module.getMaxScroll = () => {
        return scrollerEle.scrollHeight - module.getHeight()
    }

    module.getScrollValue = () => {
        return scrollerEle.scrollTop
    }

    module.scrollBy = (value) => {
        scrollerEle.scrollBy(0, value)
    }

    module.scrollTo = (value) => {
        if(value === 'start'){
            value = reverse? scrollerEle.scrollHeight + 100 : 0
        }

        scrollerEle.scrollTo(0, value)
    }

    module.addScrollListener = (fun) => {
        scrollListener = fun 
        document.addEventListener('scroll', fun, {passive: true})
    }
    
    module.disconnect = (fun) => {
        //Disconnect the listener and the root element
        //to assure no unexpect behavior 
        document.removeEventListener('scroll', scrollListener)
        scrollerEle = document.createElement('div')
    }
    
    module.isScrolledToTheEnd = () => {
        return scrollerEle.scrollTop === module.getMaxScroll()
    }



    return module
}