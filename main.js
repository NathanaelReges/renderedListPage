
//prevent ScrollRestoration routine
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
//


const getPosts = _['getPosts']
const initRenderedList = _['renderedList/init.js']


const {posts, postStyle} = getPosts()

document.body.appendChild(postStyle)










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




requestAnimationFrame(()=>{
    document.body.replaceChild(renderedList.ele, document.body.querySelector('.replacer'))
    renderedList.appended({insideAnimationFrame: true})
})






/*setTimeout(()=>{

    console.log('foi')
    const array = posts.slice(5, 9)

    const map = array.map((ele) => {
        const cloneEle = ele.cloneNode(true)
        cloneEle.querySelector('.feed-post_content').innerText = 'NEwwwPOst'
        return cloneEle
    })

    renderedList.addItemsToStart(map)

    /*setTimeout(()=>{

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