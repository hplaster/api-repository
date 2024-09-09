const repositories = document.querySelector('.container')

function getAPIgithub() {
    fetch('https://api.github.com/users/hplaster/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            let data = await res.json()
            //console.log(data)
            data.map(item => {
                let card = document.createElement('div')

                card.innerHTML = `
                    <div class="card">
                        <div>
                            <a href="repository.html"><h4 class="title" onclick="postRepositoryName(this)">${item.name}</h4></a>
                            <span class="date-create">${ Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at)) }</span>
                        </div>
                        <div>
                            <a href="${item.html_url}" target="_blank">${item.html_url}</a>
                            <span class="language">${item.language}</span>
                        </div>
                    </div>
                `
                repositories.appendChild(card)
            })
        })
}

getAPIgithub()

function postRepositoryName(element) {
    let repository_name = element.textContent
    //console.log(repository_name)
    sessionStorage.setItem("repository_name", repository_name);
}
