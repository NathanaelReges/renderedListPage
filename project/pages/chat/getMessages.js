_['pages/chat/getMessages.js'] = function getChat () {
    
    const newEle = _['myLib.js'].newEle
    const chatData = _['data/getMessagesData.js']()
    



    let messagesStyle = newEle(`<style>

        .post-chat_comment {
            background-color: white;
            margin: 20px 7px 0px 7px;

            padding: 7px;

            max-width: 85%;

            overflow-wrap: break-word;
        }

            .post-chat_comment_name{
                font-weight: 600;
            }
            
            .post-chat_comment_content{
                margin-top: 3px;
            }


        /**/

        .post-chat_comment_sent {
            background: darkgray;
            padding: 7px;
            margin: 0px 7px;
            max-width: 85%;

            display: inline-block;
            margin-left: auto;
            
            overflow-wrap: break-word;
        }
        
            .post-chat_comment_sent_box {
                margin-top: 20px;
                
                width: 100%;
                display: flex;
            }

        /**/

        .item {
            border-radius: 5px;
        }

    </style>`)



    
    const renderMessage = function renderComment (item)  {

        if(!item.sent){
                
            var contentEle = document.createElement('div')
            contentEle.className = 'post-chat_comment_content'
            contentEle.innerText = item.content
            
            var nameEle = document.createElement('div')
            nameEle.className = 'post-chat_comment_name'
            nameEle.innerText = item.name

            var div = document.createElement('div')
            div.className = `post-chat_comment item`
            div.append(nameEle)
            div.append(contentEle)
            
            return div
        
        }

        else{
        
            var contentEle = document.createElement('div')
            contentEle.className = 'post-chat_comment_content'
            contentEle.innerText = item.content
            

            var commentEle = document.createElement('div')
            commentEle.className = `item post-chat_comment_sent`

            commentEle.append(contentEle)

            var commentBoxEle = document.createElement('div')
            commentBoxEle.className = `post-chat_comment_sent_box`
            commentBoxEle.append(commentEle)
            
            return commentBoxEle
        }

    }


    
    




    let arrayOfMessageEles = chatData.map(renderMessage)

    return {arrayOfMessageEles, messagesStyle}

}

