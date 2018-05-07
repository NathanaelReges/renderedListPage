_['page/chat/getFeedPage.js'] = function () {

    const newEle = _['myLib.js'].newEle
    const makeEleGlow = _['myLib.js'].makeEleGlow
    const getPosts = _['pages/feed/getPosts.js']
    const initRenderedList = _['renderedList/init.js']
    const app = _['app.js']






    const pageEle = newEle(`<div id="feedPage">

        <style>

            .headd, .foott {
                height: 50px;
                padding-top: 10px;
                font-size: 1.5rem;
                background-color: black;
                color: white;
                text-align: center;
            }

            .headd {
                position: relative;
            }

            .chat_button_box {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        
            .chat_button {
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
            <div class="chat_button_box">
                <div class="chat_button">
                    CHAT
                </div>
            </div>
        </div>

        <div class="foott">
            Your Footer
        </div>

    </div>`)


    const headEle = pageEle.querySelector('.headd')
    const chatButEle = pageEle.querySelector('.chat_button_box')





    const {arrayOfPostEles, postsStyle} = getPosts()

    pageEle.appendChild(postsStyle)

    const renderedList = initRenderedListForMe(arrayOfPostEles)
    

    headEle.insertAdjacentElement('afterend', renderedList.ele)




    

    chatButEle.addEventListener('click', () => {
        app.changePageTo('chat')
    })

    makeEleGlow(chatButEle)








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
        const renderedList = initRenderedList(posts, {reverse: false})

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
                }, 300)
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


        
        //Test addItemsToStart and addItemsToEnd
        /*
        setTimeout(()=>{

            console.log('foi')
            const array = posts.slice(5, 9)

            const map = array.map((ele) => {
                const cloneEle = ele.cloneNode(true)
                cloneEle.querySelector('.feed-post_content').innerText = 'NEwwwPOst'
                return cloneEle
            })

            renderedList.addItemsToStart(map)

            setTimeout(()=>{

                console.log('foi')
                const array = posts.slice(5, 9)
            
                const map = array.map((ele) => {
                    const cloneEle = ele.cloneNode(true)
                    cloneEle.querySelector('.feed-post_content').innerText = 'NEwwwPOst'
                    return cloneEle
                })
            
                renderedList.addItemsToEnd(map)
                
            }, 2000)
            
        }, 1000)*/


        return renderedList
    }

}