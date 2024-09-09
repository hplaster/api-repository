const repository_name = sessionStorage.getItem("repository_name");
//console.log("Nome armazenado:", repository_name);
document.getElementsByTagName("h1")[0].innerText = repository_name

const commits = document.querySelector('.commit-box')

function getCommits() {
    fetch(`https://api.github.com/repos/hplaster/${repository_name}/commits`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            let data = await res.json()
            
            //console.log(data)
            data.map(item => {
                console.log(item)

                //Formatando data
                var date = new Date(item.commit.author.date)
                const options = { year: 'numeric', month: 'numeric', day: 'numeric',
                                  hour: 'numeric', minute: 'numeric', second: 'numeric' };
                var dataFormatada = date.toLocaleString('pt-BR', options);
                //console.log( dataFormatada )



/*                let card_commit = document.createElement('div')

                card_commit.innerHTML = `
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
                commits.appendChild(card_commit)*/
            })
        })
}

// FORMATANDO HORA EM NODE.JS
/*const moment = require('moment'); // Assumindo que você está usando Node.js
const dataString = "2024-09-09T00:09:37Z";
const dataMoment = moment(dataString);

const dataFormatada = dataMoment.format('DD/MM/YYYY HH:mm:ss');
console.log(dataFormatada); // Saída: 09/09/2024 00:09:37 */

getCommits()