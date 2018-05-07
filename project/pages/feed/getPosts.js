_['pages/feed/getPosts.js'] = function getPosts () {
    
    const newEle = _['myLib.js'].newEle
    const myIcos = _['img/myIcos.js']
    const getIcoEle = _['img/myIcos.js'].getEle
    const postsData = _['data/getPostsData.js']()
    

    let postsStyle = newEle(`<style>
    
        .feed-post {
            background-color: white;
            margin: 30px 7px 0px 7px;
            padding: 7px 7px 0px 7px;
            border-radius: 5px;
            position: relative;
        }

            .feed-post * {
                pointer-events: none;
            }

            .feed-post_img {
                width: 50px;
                height: 50px;
                border-radius: 25px;
                position: absolute;
                top: -20px;
            }

            .feed-post_name {
                margin-left: 55px;
                font-weight: bold;
            }

            .feed-post_time {
                margin-left: 5px;
                color: grey;
            }

            .feed-post_content {
                margin: 8px 0px 0px 0px;
            }

            .feed-post_botbar {
                display: flex;
                justify-content: space-evenly;
                margin-top: 3px;
            }
            
                .feed-post_like, .feed-post_comment{
                    color: grey;
                    padding: 10px 0;
                    pointer-events: all;
                    width: 30px;
                    overflow: visible;
                    white-space: nowrap;
                }
                
                .feed-post_like_liked{
                    color: ${myIcos.color};
                }

                .feed-post_like *, .feed-post_comment * {
                    pointer-events: none;
                    vertical-align: bottom;
                }

                .feed-post_botbar svg{
                    margin-right: 8px;
                    height: 1.25rem;
                    width: 1.25rem;
                }
            
            /**/

        /**/

        .feed-posts .scroller {
            top: 50px;
        }

    </style>`)
    
    const renderPost = (item) => { ///its here because of the css and html at top pattern
        
        let feed_post = document.createElement('div')
        feed_post.className = 'feed-post'
        feed_post.dataset.act = 'openPost'
        feed_post.dataset.id = item.id
                    
            let img = document.createElement('img')
            img.className = 'feed-post_img'
            img.src = item.imgSrc
    

            let post_name = document.createElement('span')
            post_name.className = 'feed-post_name'
            post_name.innerText = item.name
    

            let post_time = document.createElement('span')
            post_time.className = 'feed-post_time'
            post_time.innerText = item.time
            

            let post_content = document.createElement('p')
            post_content.className = 'feed-post_content'
            post_content.innerText = item.content
    
            
            let post_botbar = document.createElement('div')
            post_botbar.className = 'feed-post_botbar'
    
                let post_like = document.createElement('span')
                post_like.className = 'feed-post_like' + (item.liked? ' feed-post_like_liked' : '')
                post_like.dataset.act = 'feed_like'
                post_like.dataset.id = item.id
                

                    let post_like_number = document.createElement('span')
                    post_like_number.className = 'feed-post_like_number' 
                    post_like_number.innerText = item.like
                    
                    const likeIcoEle =  getIcoEle(item.liked? 'likePurple' : 'like')
                    
                post_like.appendChild(likeIcoEle)
                post_like.appendChild(post_like_number)
                

                let post_comment = document.createElement('span')
                post_comment.className = 'feed-post_comment'
                post_comment.dataset.act = 'feed_comment'
                post_comment.dataset.id = item.id
                    
                    let post_comment_number = document.createElement('span')
                    post_comment_number.className = 'feed-post_comment_number' 
                    post_comment_number.innerText = item.comment

                post_comment.appendChild(getIcoEle('comment'))
                post_comment.appendChild(post_comment_number)
                        
            post_botbar.append(post_like, post_comment)
        
        feed_post.append(img, post_name, post_time, post_content, post_botbar)
            
        return feed_post
    }


    
    










    let arrayOfPostEles = postsData.map(renderPost)

    return {arrayOfPostEles, postsStyle}

}

