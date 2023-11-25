import data from '../data.json' assert { type: 'json' };

const commentList = document.querySelector('.comments');

const setCurrentUser = () => {
    return data.currentUser.username;
}

const comment = (content, createdAt, id, replies, score, user, currentUser) => {
    let replyList = '';
    if (replies.length !== 0) {
        replies.forEach(reply => {
            if (reply.user.username === currentUser) {
                replyList += `
                <div class="comment-reply" id="${reply.id}">
                    <div class="comment__score">
                        <button class="comment__score-plus"><img src="./images/icon-plus.svg" alt=""></button>
                        <span class="comment__score-points">${reply.score}</span>
                        <button class="comment__score-minus"><img src="./images/icon-minus.svg" alt=""></button>
                    </div>
                    <div class="comment__buttons">
                        <button class="comment__buttons-delete"><img src="./images/icon-delete.svg" alt="">Delete</button>
                        <button class="comment__buttons-edit"><img src="./images/icon-edit.svg" alt="">Edit</button>
                    </div>
                    <div class="comment__comment">
                        <div class="comment__comment-info">
                            <img src="${reply.user.image.webp}" alt="avatar" class="comment__comment-avatar">
                            <span class="comment__comment-user">${reply.user.username}</span>
                            <span class="comment__comment-you">you</span>
                            <span class="comment__comment-timestamp">${reply.createdAt}</span>
                        </div>
                        <div class="comment__comment-content">
                        <span class="comment_comment-replying">@${reply.replyingTo}</span>
                            ${reply.content}
                        </div>
                    </div>
                </div>
                
                `
            } else {
                replyList += `
                <div class="comment-reply" id="${reply.id}">
                    <div class="comment__score">
                        <button class="comment__score-plus"><img src="./images/icon-plus.svg" alt=""></button>
                        <span class="comment__score-points">${reply.score}</span>
                        <button class="comment__score-minus"><img src="./images/icon-minus.svg" alt=""></button>
                    </div>
                    <div class="comment__buttons">
                        <button class="comment__buttons-reply"><img src="./images/icon-reply.svg" alt="">Reply</button>
                    </div>
                    <div class="comment__comment">
                        <div class="comment__comment-info">
                            <img src="${reply.user.image.webp}" alt="avatar" class="comment__comment-avatar">
                            <span class="comment__comment-user">${reply.user.username}</span>
                            <span class="comment__comment-timestamp">${reply.createdAt}</span>
                        </div>
                        <div class="comment__comment-content">
                            <span class="comment_comment-replying">@${reply.replyingTo}</span>
                            ${reply.content}
                        </div>
                    </div>
                </div>

                `
            }
        })
    }

    let commentString;

    if (user.username === currentUser) {
        commentString = `
        <article class="comment" id="${id}">
            <div class="comment__score">
                <button class="comment__score-plus"><img src="./images/icon-plus.svg" alt=""></button>
                <span class="comment__score-points">${score}</span>
                <button class="comment__score-minus"><img src="./images/icon-minus.svg" alt=""></button>
            </div>
            <div class="comment__buttons">
                <button class="comment__buttons-delete"><img src="./images/icon-delete.svg" alt="">Delete</button>
                <button class="comment__buttons-edit"><img src="./images/icon-edit.svg" alt="">Edit</button>
            </div>
            <div class="comment__comment">
                <div class="comment__comment-info">
                    <img src="${user.image.webp}" alt="avatar" class="comment__comment-avatar">
                    <span class="comment__comment-user">${user.username}</span>
                    <span class="comment__comment-you">you</span>
                    <span class="comment__comment-timestamp">${createdAt}</span>
                </div>
                <div class="comment__comment-content">
                    ${content}
                </div>
            </div>
        </article>
        <article class="comment__replies">${replyList}</article>
      `
    } else {
        commentString = `
    <article class="comment" id="${id}">
        <div class="comment__score">
            <button class="comment__score-plus"><img src="./images/icon-plus.svg" alt=""></button>
            <span class="comment__score-points">${score}</span>
            <button class="comment__score-minus"><img src="./images/icon-minus.svg" alt=""></button>
        </div>
        <div class="comment__buttons">
            <button class="comment__buttons-reply"><img src="./images/icon-reply.svg" alt="">Reply</button>
        </div>
        <div class="comment__comment">
            <div class="comment__comment-info">
                <img src="${user.image.webp}" alt="avatar" class="comment__comment-avatar">
                <span class="comment__comment-user">${user.username}</span>
                <span class="comment__comment-timestamp">${createdAt}</span>
            </div>
            <div class="comment__comment-content">
                ${content}
            </div>
        </div>
    </article>
    <article class="comment__replies">${replyList}</article>
  `
    }
    
    return commentString;
}

const loadComments = () => {
    const currentUser = setCurrentUser();
    data.comments.forEach(com => {
        commentList.innerHTML += comment(com.content, com.createdAt, com.id, com.replies, com.score, com.user, currentUser);
    })
}

loadComments();