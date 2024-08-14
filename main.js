
let loginBtn = document.querySelector('#login-btn')
let logoutBtn = document.querySelector('#logout-btn')

let token = localStorage.getItem('token')

if (token){
    loginBtn.remove()
}else{
    logoutBtn.remove()
}

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = 'file:///C:/Users/gorgick/PycharmProjects/drf_project_frontend/login.html'
})


let projectsUrl = 'http://127.0.0.1:8000/blog/'

let getProjects = () => {
    fetch(projectsUrl)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        buildProjects(data)
    })
}

let buildProjects = (blogs) => {
    let blogsWrapper = document.querySelector('.container')
    blogsWrapper.innerHTML = ''
    blogs.forEach(function(blog) {
        let blogCard = `
            <div class="context">
                <img class='image' src="https://placehold.co/200x150" alt="">
                <div>
                    <h3>${blog.author_name}</h3>
                    <h4>${blog.title}</h4>
                    <p>${blog.article}</p>
                </div>
                <strong class='vote' data-vote="True" data-blog="${blog.id}">&#10084;</strong>
                <strong class="vote-amount">${blog.likes_count}</strong>
            </div>
        `
        blogsWrapper.innerHTML += blogCard
        blog.comments.forEach(function(comment) {
            let commentCard = `
            <div class="comments">
                <h3>${comment.owner_name}</h3>
                <p>${comment.text}</p>
            </div>
            `
            blogsWrapper.innerHTML += commentCard
        })
    })
    addVoteEvents()
}

let addVoteEvents = () => {
    let voteBtns = document.querySelectorAll('.vote')
    voteBtns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            let token = localStorage.getItem('token')
            let vote = e.target.dataset.vote
            let blog = e.target.dataset.blog

            fetch(`http://127.0.0.1:8000/blog-like/${blog}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({'mark': vote})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getProjects()
            })
        })
    })
}

getProjects()
