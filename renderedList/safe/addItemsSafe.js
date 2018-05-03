/*

*/



_['renderedList/addItems'] = function addItems (reverse, {arrayControl, scrollLimit, scrollerControl}) {
        
    const module = {}

    if(reverse){

        module.above = function addPostsAbove (arrayOfNewPosts) {
            arrayControl.add('push', arrayOfNewPosts)
            scrollLimit.unlock()
        }

        module.under = function addPostsUnder (arrayOfNewPosts) {
            const scrollValue = scrollerControl.getScrollValue()
            const maxScroll = scrollerControl.getMaxScroll()
            const scrollAtTheBottom = scrollValue == maxScroll

            const height = calculate(arrayOfNewPosts)

            arrayControl.add('unshift', arrayOfNewPosts)
            scrollLimit.expandBot(height)


            ///if the user is at the bottom of the page, add the items and scroll down to show then
            ///else just amake space for then.
            if(scrollAtTheBottom){ 
                scrollerControl.scrollTop = scrollY + height + 1000 
                requestAnimationFrame(()=>{
                    
                    checkScroll() //Check now to show the items in this frame.
                })
            }
        }

    }

    else{

        module.above = function addPostsAbove (arrayOfNewPosts) {
            const height = calculate(arrayOfNewPosts)
            arrayControl.add('push', arrayOfNewPosts)
            scrollLimit.expandTop(height)
        }

        module.under = function addPostsUnder (arrayOfNewPosts) {
            arrayControl.add('unshift', arrayOfNewPosts)
            scrollLimit.unlock()
        }
    }
    

    return module





    function calculate (arrayOfNewPosts) {
        let wrapper = document.createElement('div')
        wrapper.style.width = "100%"
        wrapper.style.visibility = "hidden"
        wrapper.style.position = "fixed"

        for(let i = 0; i < arrayOfNewPosts.length; i++){
            wrapper.append(arrayOfNewPosts[i]) 
        }

        container0Ele.appendChild(wrapper)
        const height = wrapper.offsetHeight
    
        wrapper.remove()
    
        return height
    }

}


