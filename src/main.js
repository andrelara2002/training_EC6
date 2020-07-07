import { Usuario as ClasseUsuario, idade as IdadeUsuario } from "./functions";
import api from './api'

class App {
    constructor() {
        this.repositories = [];
        this.formElement = document.getElementById('repo-form');
        this.listElement = document.getElementById('repo-list');
        this.inputElement = document.querySelector('input');
        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingElement = document.createElement('span')
            loadingElement.appendChild(document.createTextNode('Carregando...'))
            loadingElement.setAttribute('id', 'loading')

            this.formElement.appendChild(loadingElement)
        }
        else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository() {
        event.preventDefault();

        const repoInput = this.inputElement.value;

        if (repoInput.length === 0) {
            return;
        }

        this.setLoading()

        try {
           
            const response = await api.get(`/users/${repoInput}`)

            const { avatar_url, login, bio, html_url } = response.data

            console.log(response)

            this.repositories.push({
                name: login,
                description: bio,
                avatar_url: avatar_url,
                html_url: html_url
            });
            console.log(this.repositories)
            this.render();

            this.inputElement.value = '';
        } 
        
        catch (err) {
            alert('algo deu errado')
        }

        

        this.setLoading(false)
        
    }

    render() {
        this.listElement.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', repo.avatar_url)

            let titleEl = document.createElement('strong')
            titleEl.appendChild(document.createTextNode(repo.name))

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description))

            let linkEl = document.createElement('a')
            linkEl.setAttribute('href', repo.html_url)
            linkEl.setAttribute('target', '_blank')
            linkEl.appendChild(document.createTextNode('Clique aqui'))

            let itemEl = document.createElement('li');
            itemEl.appendChild(imgEl)
            itemEl.appendChild(titleEl)
            itemEl.appendChild(descriptionEl)
            itemEl.appendChild(linkEl)

            this.listElement.appendChild(itemEl)
        })
    }
}
new App()