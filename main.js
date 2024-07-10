
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
    blogs.forEach(blog => {
        if(blog.likes_count > 0){
            let blogCard = `
            <div class="context" style="background-color: rgb(192 237 179 / 55%);">
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
        } else {
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
        }
    })
}

getProjects()
