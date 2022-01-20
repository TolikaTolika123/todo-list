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

function addToMain(project) {
  main.innerHTML = '';
  const mainInner = document.createElement('div');
  mainInner.classList.add('main__inner');
  const mainTitle = document.createElement('h3');
  mainTitle.classList.add('main__title');
  mainTitle.innerText = project.title;
  const mainList = document.createElement('ul');
  mainList.classList.add('main__list');

  for (let i = 0; i < project.items.length; i++) {
    const mainListItem = document.createElement('li');
    mainListItem.classList.add('main__list-item');

    const listItemTitle = document.createElement('p');
    listItemTitle.innerText = project.items[i].title;
    mainListItem.appendChild(listItemTitle)

    const listItemDescription = document.createElement('p');
    listItemDescription.innerText = project.items[i].description;
    mainListItem.appendChild(listItemDescription)

    mainList.appendChild(mainListItem)
  }

  mainList.innerHTML += `<li class="main__list-item">
  <button class="main__add" data-project="${project.title}">
    <span class="icon">
      <svg width="13" height="13" fill="red"><path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"  fill-rule="evenodd"></path></svg>
    </span>
    Add task
  </button>
</li>`

  mainInner.appendChild(mainTitle)
  mainInner.appendChild(mainList)
  main.appendChild(mainInner)

  const addBtn = document.querySelector('.main__add');
  addBtn.addEventListener('click', e => {
    addNewItem(project, e)
  })
}

function addNewItem(project, e) {
  e.path[1].innerHTML = `<form class="main__item-create">
  <div>
    <input type="text" class="main__item-title" placeholder="e.g., Family lunch on Sunday at 11am">
    <textarea class="main__item-description" placeholder="Description"></textarea>
  </div>
  <button class="main__item-add" disabled>Add tast</button>
  <button class="main__item-cancel">Cancel</button>
</form>`

  const input = document.querySelector(".main__item-title");
  const textarea = document.querySelector('.main__item-description')
  const add = document.querySelector(".main__item-add");
  input.addEventListener("input", () => {
    input.value === "" ? (add.disabled = true) : (add.disabled = false);
  });

  add.addEventListener('click', () => {
    project.items.push({
      title: input.value,
      description: textarea.value
    })
    console.log(project)
    addToMain(project)
  })
  
}

addProjects.addEventListener('click', () => {
  let title = prompt('Add project title')
  const newProject = new Project(title);
  const print = new ProjectPrint(newProject)

  print.html()
})


export { addProjects }