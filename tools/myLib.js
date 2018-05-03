_['tools/myLib'] = {

    tryCall: function (fun) {
        if(fun instanceof Function){
            fun()
        }  
    },
    dBA: function (ele) {
        document.body.append(ele)
    },
    newDiv: function (html) {
        var div = document.createElement('div')
        div.innerHTML = html
        return div
    },
    newEle: function (html) {
        var div = document.createElement('div')
        div.innerHTML = html
        return div.firstElementChild
    },
    keyAct: function (key, fun) {
        window.addEventListener('keydown', function (e) {
            if(e.key == key)
                fun()
        })
    },

    makeEleGlow: function (ele) { //we choosed this
        ele.addEventListener('touchstart', ()=> {
            ele.classList.add('glow') 
        }, {passive: true})
        
        ele.addEventListener('touchend', ()=> {
            ele.classList.remove('glow')
        }, {passive: true})
    },

    createAllValid: function createAllValid () {

        let module = {}
        let numberOfRules = 0
        let numberOfValids = 0
        let allValid = false
    
    
    
        module.addRule = (ruleFun) => {
            
            if(ruleFun == 'emptyString'){
                ruleFun = string => {

                    const stringCopy = string
                    return !!stringCopy.trim()

                }
            }

            numberOfRules++
            var state = false
    
            return (value) => {
                
                let newState = ruleFun(value)
                
                if(state == newState) return
    
                state = newState
                
                if(state) {
                    numberOfValids++
                }
                else {
                    numberOfValids--
                } 
                
                testAll()
            }
        }
                   
        


        function testAll () { 
    
            var newAllValid = numberOfRules == numberOfValids
    
            if(allValid == newAllValid) return
    
            allValid = newAllValid
    
            module.listeners.onStateUpdate(allValid)
        }
             
        return module
    },




    /*
        module.
        
        //listeners

            calback
                //this function is called when the changes the input txt

            scrollToBottom 
                //if you don't want that content under the input element gets hidden
                    when the browser atomaticaly scrolls when user types put o of view
                    use this function
            
        //listeners
        
        
            forceTest()
                //tests the height
                

    */
    responsiveInputEl: function  responsiveInputEl ({el, minHeight, maxHeight}) {

        const module = {}
        let lastHeight = 0
        

        el.addEventListener('keydown', test)



        module.forceTest = test

        module.reset = () => {
            el.style.height = "";
        }

        return module


    
        function test () {

            requestAnimationFrame(() => {
                
                let elScrolled = false

                // Checks if the user is typing at the last line
                // if so you might wanna keep the hole page
                // scrolled to the bottom, module.scrollToBottom 
                // is called so you can do that.
                if(module.scrollToBottom){
                    if(el.scrollTop != 0) 
                        elScrolled = true
                }

                
                //Force scrollHeight to appear
                el.style.height = "10px" 


                //Add margim so the height doesn't change and scrollTop goes to 0
                //Thats the reason why it need to keep the last Height
                el.style.marginBottom = lastHeight - 10 + 'px' 
                   

                //scrollHeight = height of the content
                let newHeight = el.scrollHeight
                if(minHeight && newHeight < minHeight) newHeight = minHeight
                if(maxHeight && newHeight > maxHeight) newHeight = maxHeight


                el.style.height = newHeight + "px";
                el.style.marginBottom = ''
                
                lastHeight = newHeight


                if(elScrolled){
                    module.scrollToBottom()
                }
                
                if(module.callBack){
                    module.callBack()
                }

            })

        }

    },

    mutateAndFade: async function (ele, fun) {     
        /*  Pass the element you want to mutateand a mutate function.
            
            The mutate function will be called with a clone of your element
                and then you do all the mutation that you want to do.
            //

            The module will fade between the two.
        */

        const eleClone = ele.cloneNode(true)

        eleClone.style = 
            `width: ${ele.offsetWidth}px; 
            height: ${ele.offsetHeight}px;
            position: absolute;
            left: ${ele.offsetLeft}px;
            top: ${ele.offsetTop}px;
            opacity: 0;
            willChange: opacity;
            transition: opacity 0.2s;`
        //

        fun(eleClone)
        
        ele.insertAdjacentElement('afterend', eleClone)



        await new Promise(requestAnimationFrame)

        eleClone.style.opacity = '1'
        


        await new Promise(resolve => eleClone.addEventListener('transitionend', resolve, {once: true}))

        eleClone.style = ''
        ele.remove()
    },

    responsiveSendButton: function (butEle, inputEle, ofClass) {
        const module = {}
        let isValid = false
        
        
        inputEle.addEventListener('input', () => {
            requestAnimationFrame(test)
        })

        
        module.reset = ()=>{
            butEle.classList.add(ofClass)
            isValid = false
        }

        return module


        function test () {
            
            const string = inputEle.value

            const nowIsValid = !!string.trim()

            if(nowIsValid != isValid){
    
                changeButton(nowIsValid)
                
                isValid = nowIsValid
            }

        }

        
        function changeButton (state) {
            butEle.classList.toggle(ofClass)
        }


    }

}


