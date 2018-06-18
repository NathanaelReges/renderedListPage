_['app.js'] = (function () {

    const getFeedPage = _['page/chat/getFeedPage.js']
    const getChatPage = _['page/chat/getChatPage.js']
    
    
    const initialPage = 'feed'
    
    let currentPage = undefined,
    currentPageStr = undefined;



    //prevent ScrollRestoration routine
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    //





    requestAnimationFrame(changePageTo.bind(undefined, initialPage))






    const module = {}

    module.changePageTo = changePageTo

    return module




    function changePageTo (pageStr) {
        if(currentPageStr == pageStr) return

        


        if(currentPage) {
            document.documentElement.scrollTo(0,0)
            currentPage.ele.remove()
            currentPage.removed()
        }
        
        

        if(pageStr === 'chat'){
            currentPage = getChatPage()
        }
        else
        if(pageStr === 'feed'){
            currentPage = getFeedPage()
        }
        

        document.body.appendChild(currentPage.ele)

    
        
        currentPage.appended()
        


        currentPageStr = pageStr
    }

})()