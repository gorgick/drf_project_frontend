
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
    blogs.forEach(blog => {
            let blogCard = `
            <div class="context">
                <img class='image' src="https://placehold.co/200x150" alt="">
                <div>
                    <h3>${blog.author_name}</h3>
                    <h4>${blog.title}</h4>
                    <p>${blog.article}</p>
                </div>
                <strong class='vote'>&#10084;</strong>
                <strong class="vote-amount">${blog.likes_count}</strong>
            </div>
        `
            blogsWrapper.innerHTML += blogCard
    })
    addVoteEvents()
}

let addVoteEvents = () => {
    let voteBtns = document.querySelectorAll('.vote')
    voteBtns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIwNzAyMjM1LCJpYXQiOjE3MjA3MDA0MzUsImp0aSI6ImUyMmVlMGQ5YmY3NDRlNWY5OGUzZmRhMTk2YWFjOWQ0IiwidXNlcl9pZCI6MX0.fBOeW4-flHvczNWkZ1NDGZ5IP4-WteRtRFX7roEm0-U'
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
