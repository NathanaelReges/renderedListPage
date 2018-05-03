_['renderedList/pullUpdate'] = function initPullUpdate (requestNewItems, reverse, {movingContainer, fixedContainer, scrollerControl, addItems}) {

    
    let touching = false
    let updating = false
    let transitioning = false



    let pullUpdateStarted = false
    const limit = 50
    const eleHeight = 25
    let startY = 0
    let lastMov = 0
    let textIsSolte = false
    let removeLoadingEle = undefined
    
    const ele = document.createElement('div')
    ele.style = `willChange: transform; text-align: center; height: ${eleHeight};
        width: 100vw; padding-top: 4px; position: fixed; font-weight: 300; letter-spacing: 1.2px; font-size: 1.1rem;`
    ele.style.transform = `translateY(-${eleHeight}px)`
    ele.innerText = 'puxe'





    const module = {}

    module.start = function () {
        if(pullUpdateStarted) return
        if(scrollerControl.getScrollValue() !== 0) return

        pullUpdateStarted = true
        fixedContainer.addEventListener('touchmove', firstMove, {passive: true, once: true})   
    }
        
    return module





    function firstMove (e) {
        startY = e.touches[0].clientY
        fixedContainer.addEventListener('touchmove', secondMove, {passive: true, once: true})
    }


    function secondMove (e) {
        if(e.touches[0].clientY < startY) {
            finish()
            return
        } 

        removeLoadingEle = fixedContainer.appendLoadingEleToTheStart(ele, eleHeight)
        
        fixedContainer.addEventListener('touchmove', normalMove, {passive: false})
        fixedContainer.addEventListener('touchend', touchEnd, {passive: true, once: true})
    }


    function normalMove (e) { 
        let mov = (e.touches[0].clientY - startY) / 3
        
        if(mov<0) mov = 0
        

        fixedContainer.moveTo(mov)
        
        if(mov > limit && !textIsSolte){
            textIsSolte = true
            ele.innerText = 'solte'
        }

        if(mov <= limit && textIsSolte) {
            textIsSolte = false
            ele.innerText = 'puxe'
        }

        if(mov < lastMov) {
            e.preventDefault()
        }

        lastMov = mov
    }


    async function touchEnd () {
        const wantsToUpdate = lastMov > limit
        let requestUpdatePromise = undefined
        const waitTransition = undefined
        
        fixedContainer.removeEventListener('touchmove', normalMove)        

        if(!wantsToUpdate){
            fixedContainer.moveTo(0, {transition: true})

            await getWaitTransitionPromise()

            removeLoadingEle()

            finish()

            if(isAtTheTop())
                module.start()
            //

            return
        }

        
        requestUpdatePromise = requestNewItems()
        
        fixedContainer.moveTo(eleHeight, {transition: true})
        ele.innerText = 'Atualizando'


        await getWaitTransitionPromise()



        const response = await requestUpdatePromise

        /*if(!telaIsIn) {
            await talaIsInPromise
            await new Promise(resolve => setTimeout(resolve, 300))
        }*/

        if(response){
            await new Promise(requestAnimationFrame)

            addItems.start(response)
            removeLoadingEle()
            fixedContainer.moveTo(0)   
            scrollerControl.scrollBy(-eleHeight)
            movingContainer.forceCheck()
            finish()
        }
        else {
            ele.innerText = "Atualizado"

            await new Promise(resolve => setTimeout(resolve, 500))
            await new Promise(requestAnimationFrame)
            
            removeLoadingEle()
            fixedContainer.moveTo(0)   

            if(isAtTheTop()){
                finish()
                module.start()
            }
            else{
                scrollerControl.scrollBy(-eleHeight)
                finish()
            }
        }

        function getWaitTransitionPromise () {
            return new Promise(resolve => {
                setTimeout(resolve, 500) 
                //Not using transition end because the user can 
                //change the page and transion end would never fire
            })
        }

   
    }

    function finish () {
        pullUpdateStarted = false
        textIsSolte = false
        ele.innerText = 'puxe'
        lastMov = 0
    }

    function isAtTheTop () {
        return scrollerControl.getScrollValue() === 0
    }


}



