/*
    module(scrollerEle)

    module
        .getHeight()
        .getMaxScroll()
        .getScrollValue()
        .scrollBy(value)
        .scrollTo(value)
        .addScrollListener(fun)
        .isScrolledToTheEnd()
    //
*/


_['renderedList/scrollerControl'] = function getScrollerControl (reverse) {

    const module = {}
    const scrollerEle = document.documentElement
    
    let height = 0



    module.getHeight = ()=>{
        if(!height){
            height = scrollerEle.offsetHeight
        }

        return height
    }

    module.getMaxScroll = ()=>{
        return scrollerEle.scrollHeight - module.getHeight()
    }

    module.getScrollValue = ()=>{
        return scrollerEle.scrollTop
    }

    module.scrollBy = (value) => {
        scrollerEle.scrollBy(0, value)
    }

    module.scrollTo = (value)=>{
        if(value === 'start'){
            value = reverse? scrollerEle.scrollHeight + 100 : 0
        }

        scrollerEle.scrollTo(0, value)
    }

    module.addScrollListener = (fun) => {
        document.addEventListener('scroll', fun, {passive: true})
    } 
    
    module.isScrolledToTheEnd = () => {
        return scrollerEle.scrollTop === module.getMaxScroll()
    }



    return module
}




