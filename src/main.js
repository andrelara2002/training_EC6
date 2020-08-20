import api from './api'

class App {
    constructor() {
        this.repository = []
        this.listElement = document.querySelector('ul');
        this.inputElement = document.querySelector('input');
        this.formElement = document.getElementById('repo-form')
        this.registerHandlers();
        this.headerImg = document.getElementById('header-img')
    }
    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event);
        this.headerImg.onsubmit = event => this.goToHome
    }

    async addRepository() {
        event.preventDefault();
        const repoInput = this.inputElement.value;

        if (repoInput.length === 0){
            return;
        }

        try {
            const response = await api.get(`/users/${repoInput}`)

            const { avatar_url, login, bio, html_url } = response.data;

            this.repository.push({
                name: login,
                description: bio,
                avatar_url: avatar_url,
                link: html_url
            })
            console.log(this.repository)
            this.render();
            this.inputElement.value = ''
        }
        catch(err){
            alert(err)
        }
        
    }

    render() {
        this.listElement.innerHTML = '';

        this.repository.forEach(repo => {
            const listChildElement = document.createElement('li')

            const imgElement = document.createElement('img')
            imgElement.setAttribute('src', repo.avatar_url)

            const titleElement = document.createElement('strong')
            titleElement.appendChild(document.createTextNode(repo.name))

            const descriptionElement = document.createElement('p')
            descriptionElement.appendChild(document.createTextNode(repo.description))

            const linkElement = document.createElement('a')
            linkElement.setAttribute('href', repo.link)
            linkElement.appendChild(document.createTextNode('Acessar'))

            listChildElement.appendChild(imgElement)
            listChildElement.appendChild(titleElement)
            listChildElement.appendChild(descriptionElement)
            listChildElement.appendChild(linkElement)

            this.listElement.appendChild(listChildElement);
        })
    }
}   

new App();