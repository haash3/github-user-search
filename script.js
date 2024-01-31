const APIURL = 'https://api.github.com/users/';
const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

 async function getUser(username) {
    try {
        const {data} = await axios(APIURL + username)
        createUserCard(data)
    } catch (err) {
        if(err.response.status == 404 ){
            createErrorCard('No User Found')
        }
        
    }
     
}

function createUserCard(user){
    const cardHTML = `<div class="card">
    <div>
      <img
        src="${user.avatar_url}"
        alt="${user.name}"
        class="avatar"
      />
    </div>
    <div class="user-info">
      <div class="user-name">${user.name}</div>
      <p>${user.bio} </p>
    <ul>
      <li>${user.followers}<strong>Followers</strong></li>
      <li>${user.following}<strong>Following</strong></li>
      <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>

    <div id="repos">
      <a href="${user.html_url}" class="repos">View Profile</a>
    </div>
    </div>
  </div>`

  main.innerHTML = cardHTML;
}

function createErrorCard(msg){
    const cardHtml =   `
    <div class="error-card">
        <h3>${msg}</h3>
        </div>
    `
    main.innerHTML = cardHtml
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})

