/* ========================================================================== 
   views/faculty.js - the Faculty view (route #/faculty) 
   Data: data/faculty.json and data/departments.json (loaded at the same time) 
   ========================================================================== */ 
'use strict'; 
  
function initials(name) { 
  return name.split(' ').filter(function (word) { return /^[A-Z]/.test(word) && !word.endsWith('.'); }) 
    .slice(0, 2).map(function (word) { return word[0]; }).join(''); 
} 
  
function addPair(dl, term, valueNode) { 
  dl.appendChild(el('dt', '', term)); 
  const dd = el('dd'); 
  dd.appendChild(valueNode); 
  dl.appendChild(dd); 
} 
  
function createFacultyCard(person, number, departments) { 
  const dept = departments.find(function (d) { return d.id === person.departmentId; }); 
  const card = el('article', 'faculty-card'); 
  
  const head = el('div', 'faculty-head'); 
  const avatar = el('span', 'avatar', initials(person.name)); 
  avatar.setAttribute('aria-hidden', 'true'); 
  head.appendChild(avatar); 
  head.appendChild(el('h3', '', person.name)); 
  card.appendChild(head); 
  
  const summary = el('dl'); 
  addPair(summary, 'Designation', document.createTextNode(person.designation + (dept ? ', ' + dept.code : 
''))); 
  card.appendChild(summary); 
  
  const details = el('div', 'faculty-details'); 
  details.id = 'faculty-details-' + number; 
  const dl = el('dl'); 
  addPair(dl, 'Department', document.createTextNode(dept ? dept.name : person.departmentId)); 
  addPair(dl, 'Qualification', document.createTextNode(person.qualification)); 
  addPair(dl, 'Expertise', document.createTextNode(person.expertise.join(', '))); 
  const mail = el('a', '', person.email); 
  mail.href = 'mailto:' + person.email; 
  addPair(dl, 'Email', mail); 
  details.appendChild(dl); 
  card.appendChild(details); 
  
  const button = el('button', 'toggle-btn', 'Show details'); 
  button.type = 'button'; 
  button.setAttribute('aria-expanded', 'false'); 
  button.setAttribute('aria-controls', details.id); 
  card.appendChild(button); 
  return card; 
} 
  
// expand and collapse (PR3 behaviour); the listeners belong to this view's elements only 
function initFacultyToggles(root) { 
  const list = root.querySelector('.faculty-list'); 
  const actions = root.querySelector('#faculty-actions'); 
  const status = root.querySelector('#faculty-status'); 
  const cards = list.querySelectorAll('.faculty-card'); 
  
  function setExpanded(card, expanded) { 
    const button = card.querySelector('.toggle-btn'); 
    card.querySelector('.faculty-details').hidden = !expanded; 
    button.setAttribute('aria-expanded', String(expanded)); 
    button.textContent = expanded ? 'Hide details' : 'Show details'; 
    card.classList.toggle('expanded', expanded); 
  } 
  
  function updateStatus() { 
    const open = list.querySelectorAll('.faculty-card.expanded').length; 
    status.textContent = open + ' of ' + cards.length + ' profiles expanded'; 
  } 
  
  cards.forEach(function (card) { setExpanded(card, false); }); 
  actions.hidden = false; 
  updateStatus(); 
  
  list.addEventListener('click', function (event) {          // one listener for all buttons 
    const button = event.target.closest('.toggle-btn'); 
    if (!button) return; 
    const card = button.closest('.faculty-card'); 
    setExpanded(card, button.getAttribute('aria-expanded') !== 'true'); 
    updateStatus(); 
  }); 
  root.querySelector('#expand-all').addEventListener('click', function () { 
    cards.forEach(function (card) { setExpanded(card, true); }); 
    updateStatus(); 
  }); 
  root.querySelector('#collapse-all').addEventListener('click', function () { 
    cards.forEach(function (card) { setExpanded(card, false); }); 
    updateStatus(); 
  }); 
} 
  
function renderFaculty(root, faculty, departments) { 
  const list = root.querySelector('.faculty-list'); 
  list.textContent = ''; 
  const fragment = document.createDocumentFragment(); 
  faculty.forEach(function (person, index) { 
    fragment.appendChild(createFacultyCard(person, index + 1, departments)); 
  }); 
  list.appendChild(fragment); 
  initFacultyToggles(root); 
} 
  
function facultyView(root) { 
  root.innerHTML = ` 
    <h1>Our Faculty</h1> 
    <p>Our teachers combine strong academic backgrounds with industry and research experience.</p> 
    <div class="data-status" id="data-status" hidden></div> 
  
    <section id="faculty-list"> 
      <h2>Faculty Profiles</h2> 
      <div class="faculty-actions" id="faculty-actions" hidden> 
        <button type="button" id="expand-all">Expand all</button> 
        <button type="button" id="collapse-all">Collapse all</button> 
        <span id="faculty-status" role="status"></span> 
      </div> 
      <div class="faculty-list"></div> 
    </section>`; 
  
  populate(root.querySelector('#data-status'), ['faculty', 'departments'], 'Loading faculty profiles...', 
    function (faculty, departments) { renderFaculty(root, faculty, departments); }); 
}
