import { addToMain, toggleActive, deleteProject } from './functions'

const projects = document.querySelector('.projects');

class Project {
  constructor(title) {
    this.title = title;
    this.items = [];
  }
}

class ProjectPrint {
  constructor(project) {
    this.project = project;
  }

  html() {
    const li = document.createElement('li');
    li.classList.add('projects__item');

    const span = document.createElement('span')
    span.classList.add('projects__text')
    span.innerText = this.project.title;
    li.appendChild(span)

    li.innerHTML += `<button class="projects__item-delete">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
    </button>`;

    const count = document.createElement('span');
    count.classList.add('count');
    li.appendChild(count)



    const deleteItem = li.querySelector('.projects__item-delete')

    deleteItem.addEventListener('click', () => {
      deleteProject(this.project)
    })

    li.addEventListener('click', () => {
      addToMain(this.project)
      toggleActive(this.project)

    })
    projects.appendChild(li)
  }

  
}



export { Project, ProjectPrint }