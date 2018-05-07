_['page/chat/getChatPage.js'] = function () {
    
    const newEle = _['myLib.js'].newEle
    const makeEleGlow = _['myLib.js'].makeEleGlow
    const getMessages = _['pages/chat/getMessages.js']
    const initRenderedList = _['renderedList/init.js']
    const app = _['app.js']



    const pageEle = newEle(`<div id="chatPage">

        <style>

            .headd, .foott {
                height: 50px;
                padding-top: 10px;
                font-size: 1.5rem;
                background-color: black;
                color: white;
                text-align: center;
            }
        
            .foott {
                position: relative;
            }

            .feed_button_box {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        
            .feed_button {
                font-size: 1rem;
                font-weight: 600;
                color: black;
                background: white;
                border-radius: 10px;
                margin-right: 10px;
                padding: 1px 8px;
            }

        </style>

        <div class="headd">
            Your Header
        </div>

        <div class="foott">
            Your Footer
            <div class="feed_button_box">
                <div class="feed_button">
                    FEED
                </div>
            </div>
        </div>

    </div>`)

    const headEle = pageEle.querySelector('.headd')
    const feedButEle = pageEle.querySelector('.feed_button_box')







    const {arrayOfMessageEles, messagesStyle} = getMessages()

    pageEle.appendChild(messagesStyle)

    const renderedList = initRenderedListForMe(arrayOfMessageEles)

    headEle.insertAdjacentElement('afterend', renderedList.ele)










    feedButEle.addEventListener('click', () => {
        app.changePageTo('feed')
    })

    makeEleGlow(feedButEle)










    const module = {}

    module.appended = () => {
        renderedList.appended()
    }

    module.removed = () => {
        renderedList.removed()
    }

    module.ele = pageEle

    return module






    function initRenderedListForMe (posts) {
        const renderedList = initRenderedList(posts, {reverse: true})

        let counter1 = 0
        renderedList.setPullUpdate(()=>{
            return new Promise(resolve =>{
                if(counter1>2) {
                    resolve(false)
                    return
                }
                counter1++

                setTimeout(()=>{
                    const array = posts.slice(20, 25)

                    const mapedArray = array.map((ele) => {
                        const cloneEle = ele.cloneNode(true)
                        return cloneEle
                    })

                    resolve(mapedArray)
                }, 200)
            })
        })

        let counter2 = 0
        renderedList.setInfiniteLoading(()=>{
            return new Promise(resolve =>{
                if(counter2>4) {
                    resolve(false)
                    return
                }
                counter2++

                setTimeout(()=>{
                    const array = posts.slice(20, 25)

                    const mapedArray = array.map((ele) => {
                        const cloneEle = ele.cloneNode(true)
                        return cloneEle
                    })

                    resolve(mapedArray)
                }, 2000)
            })
        })


    



        const newMessages = getNewMessages()
        
        addNewMessages(newMessages)

        
        
    
        function addNewMessages (newMessagesArg) {
            const newMessages = newMessagesArg.slice(0)
            
            go()
            
            function go () {
                setTimeout(()=>{
                    if(newMessages.length  == 0) return

                    const newMessage = newMessages.shift()
                    renderedList.addItemsToStart([newMessage])
                    go()
                }, 2000)
            }
        }


        function getNewMessages () {
            const newMessages = posts.slice(0, 2).map(ele => ele.cloneNode(true))
            newMessages.reverse()
    
            newMessages[0].children[0].innerText = 'Nathanael Reges'
            newMessages[0].children[1].innerText = 'This is a new message.'
            newMessages[1].children[0].innerText = 'This is a new message.'
            
            return newMessages
        }



        return renderedList
    }

}