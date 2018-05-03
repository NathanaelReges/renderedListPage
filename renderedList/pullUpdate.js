_['renderedList/pullUpdate'] = function initPullUpdate (requestNewItems, reverse, {movingContainer, fixedContainer, scrollerControl, addItems}) {


    const limit = 50
    const eleHeight = 25
    let startY = 0
    let lastMov = 0
    let textIsPull = false
    let removeLoadingEle = undefined
    let firstMove = true
    let wichPhase = 0
    
    const ele = document.createElement('div')
    ele.style = `willChange: transform; text-align: center; height: ${eleHeight};
        width: 100vw; padding-top: 4px; position: fixed; font-weight: 300; letter-spacing: 1.2px; font-size: 1.1rem;`
    ele.style.transform = `translateY(-${eleHeight}px)`
    ele.innerText = 'pull'





    const module = {}

    
    module.start = function () {
        if(wichPhase != 0) return
        
        if(scrollerControl.getScrollValue() > 200) return 

        fixedContainer.addEventListener('touchstart', touchStartListener, {passive: true})
        fixedContainer.addEventListener('touchmove', touchMoveListener, {passive: false})
        fixedContainer.addEventListener('touchend', touchEndListener, {passive: true})

        removeLoadingEle = fixedContainer.appendLoadingEleToTheStart(ele, eleHeight)

        wichPhase = 1
    }
        
    return module







    function touchStartListener (e) {
        if(wichPhase != 1) return

        const scrollValue =  scrollerControl.getScrollValue()
        
        if(scrollValue > 200) {
            finish()
            return
        } 

        if(scrollValue !== 0) return
        
        startY = e.touches[0].clientY
        wichPhase = 2
    }



    function touchMoveListener (e) { 
        if(wichPhase != 2) return
        
        const eClientY = e.touches[0].clientY
        
        if (firstMove) {
            const scrolledDown = eClientY <= startY
            
            if (scrolledDown) {
                reset()
                return
            }

            firstMove = false
        }
        


        let mov = (eClientY - startY) / 3
        
        if(mov<0) mov = 0
        
        fixedContainer.moveTo(mov)
        
        if(mov > limit && textIsPull){
            textIsPull = false
            ele.innerText = 'release'
        }
        if(mov <= limit && !textIsPull) {
            textIsPull = true
            ele.innerText = 'pull'
        }

        e.preventDefault()

        lastMov = mov
    }


    async function touchEndListener () {
        if(wichPhase != 2) return
        wichPhase = 3

        const wantsToUpdate = lastMov > limit
        let requestUpdatePromise = undefined
        const waitTransition = undefined

        if(!wantsToUpdate){
            fixedContainer.moveTo(0, {transition: true})
            await getWaitTransitionPromise()
            reset()
            return
        }

        
        
        requestUpdatePromise = requestNewItems()
        
        fixedContainer.moveTo(eleHeight, {transition: true})
        ele.innerText = 'Updating'


        await getWaitTransitionPromise()

        const response = await requestUpdatePromise

        /*if(!telaIsIn) {
            await talaIsInPromise
            await new Promise(resolve => setTimeout(resolve, 300))
        }*/

        if(response){
            await new Promise(requestAnimationFrame)

            addItems.start(response)
            fixedContainer.moveTo(0)   
            scrollerControl.scrollBy(-eleHeight)
            movingContainer.forceCheck()

            reset()
        }
        else {
            ele.innerText = "Updated"

            await new Promise(resolve => setTimeout(resolve, 500))
            await new Promise(requestAnimationFrame)
                
            fixedContainer.moveTo(0)   

            if(!isAtTheTop()){
                scrollerControl.scrollBy(-eleHeight)
            }

            reset()
        }

        function getWaitTransitionPromise () {
            return new Promise(resolve => {
                setTimeout(resolve, 500) 
                //Not using transition end because the user can 
                //change the page and transion end would never fire
            })
        }

   
    }




    function reset () {
        if (!textIsPull){
            ele.innerText = 'pull'
            textIsPull
        }
        firstMove = true
        lastMov = 0
        wichPhase = 1
    }

    function finish () {
        reset()
        wichPhase = 0
        removeLoadingEle()
        removeLoadingEle = undefined
        fixedContainer.removeEventListener('touchmove', touchMoveListener)
        fixedContainer.removeEventListener('touchend', touchEndListener)
        fixedContainer.removeEventListener('touchstart', touchStartListener)
    }

    function isAtTheTop () {
        return scrollerControl.getScrollValue() === 0
    }
}



