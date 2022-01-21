import {addToMain} from './functions'

const addProjects = document.querySelector('.sidebar__add')
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
    li.addEventListener('click', () => {
      addToMain(this.project)
    })
    projects.appendChild(li)
  }

}

addProjects.addEventListener('click', () => {
  let title = prompt('Add project title')
  const newProject = new Project(title);
  const print = new ProjectPrint(newProject)

  print.html()
})

export {Project, ProjectPrint}