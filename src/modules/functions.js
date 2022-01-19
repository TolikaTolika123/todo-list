import { add } from "date-fns";
const projects = document.querySelector('.projects');

const main = document.querySelector('.main')
const addProjects = document.querySelector('.sidebar__add')

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
    let li = document.createElement('li');
    li.classList.add('projects__item');
    let span = document.createElement('span')
    span.classList.add('projects__text')
    span.innerText = this.project.title;
    li.appendChild(span)
    li.addEventListener('click', () => {
      main.innerHTML = `<div class="main__inner">
    <h3 class="main__title">${this.project.title}</h3>
    <ul class="main__list">
      <li class="main__list-item">
        <button class="main__add">
          <span class="icon">
            <svg width="13" height="13" fill="red"><path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"  fill-rule="evenodd"></path></svg>
          </span>
          Add task
        </button>
      </li>
    </ul>
  </div>`
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


export { addProjects }