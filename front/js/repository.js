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
                //console.log(item)

                // INFORMAÇÕES DO AUTOR DO COMMIT
                //console.log(item.committer.avatar_url) //Avatar do autor do commit
                //console.log(item.commit.committer.name) //Nome do autor do commit
                //console.log(item.commit.committer.email) //E-mail do autor do commit
                //console.log(item.committer.html_url) //URL Perfil do autor do commit

                //console.log(item.commit.message) //Mensagem do commit

                //FORMATANDO DATA PARA VISUALIZAÇÃO
                var date = new Date(item.commit.author.date)
                const options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric'
                };
                var dataFormatada = date.toLocaleString('pt-BR', options);
                //console.log( dataFormatada )

                //console.log(item.commit.comment_count) //Quantidade de comentários do commit


                let card_commit = document.createElement('div')

                card_commit.innerHTML = `
                    <div class="commit-card">
                        <div>
                            <a href="${item.committer.html_url}" target="_blank" id="author-commit">
                                <img src="${item.committer.avatar_url}" alt="">
                                <div class="title-author">
                                    <h4>Autor do commit: ${item.commit.committer.name}</h4>
                                    <h4>E-mail: ${item.commit.committer.email}</h4>
                                </div>
                            </a>
                            <div class="comments-commit">
                                <p class="datetime-commit">${dataFormatada}</p>
                                <h3>Comentários:</h3>
                                <span class="comments-number">${item.commit.comment_count}</span>
                            </div>
                        </div>

                        <div>
                            <p><b>Mensagem do Commit:</b> ${item.commit.message}</p>
                        </div>
                    </div> `

                commits.appendChild(card_commit)
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