/* ========================================================================== 
   views/departments.js - the Departments view (routes #/departments and #/departments/<id>) 
   Data: data/departments.json 
   ========================================================================== */ 
'use strict'; 
  
function createDeptCard(dept) { 
  const card = el('article', 'dept-card'); 
  card.id = 'dept-' + dept.id; 
  card.appendChild(el('span', 'badge', dept.code)); 
  card.appendChild(el('h3', '', dept.name)); 
  card.appendChild(el('p', 'meta', 'Head: ' + dept.head)); 
  card.appendChild(el('p', 'meta', 'Established ' + dept.established + ' · Intake ' + dept.intake)); 
  return card; 
} 
  
function createRow(values) { 
  const tr = el('tr'); 
  values.forEach(function (value) { tr.appendChild(el('td', '', String(value))); }); 
  return tr; 
} 
  
function createHeadRow(names) { 
  const head = el('thead'); 
  const row = el('tr'); 
  names.forEach(function (name) { 
    const th = el('th', '', name); 
    th.scope = 'col'; 
    row.appendChild(th); 
  }); 
  head.appendChild(row); 
  return head; 
} 
  
function createDeptTable(departments) { 
  const table = el('table'); 
  table.appendChild(el('caption', '', 'Departments of the College')); 
  table.appendChild(createHeadRow(['Sr. No.', 'Code', 'Department', 'Head of Department', 'Established', 
'Intake'])); 
  
  const body = el('tbody'); 
  departments.forEach(function (dept, index) { 
    body.appendChild(createRow([index + 1, dept.code, dept.name, dept.head, dept.established, 
dept.intake])); 
  }); 
  table.appendChild(body); 
  
  // the total is calculated from the data, not typed in 
  const total = departments.reduce(function (sum, dept) { return sum + dept.intake; }, 0); 
  const foot = el('tfoot'); 
  const footRow = el('tr'); 
  const label = el('td', '', 'Total Sanctioned Intake'); 
  label.colSpan = 5; 
  footRow.appendChild(label); 
  footRow.appendChild(el('td', '', String(total))); 
  foot.appendChild(footRow); 
  table.appendChild(foot); 
  return table; 
} 
  
function createCourseCard(dept) { 
  const card = el('article', 'course-card'); 
  card.dataset.dept = dept.id; 
  card.appendChild(el('h3', '', dept.name)); 
  const list = el('ul', 'course-list'); 
  dept.courses.forEach(function (course) { 
    const li = el('li'); 
    const name = el('span', '', course.title); 
    name.appendChild(el('small', '', course.code)); 
    li.appendChild(name); 
    li.appendChild(el('span', 'credits', course.credits + ' Cr')); 
    list.appendChild(li); 
  }); 
  card.appendChild(list); 
  return card; 
} 
  
function createCourseTable(departments) { 
  const table = el('table'); 
  table.appendChild(el('caption', '', 'Selected courses offered in Semester V')); 
  table.appendChild(createHeadRow(['Department', 'Course Code', 'Course Title', 'Type', 'Credits'])); 
  
  departments.forEach(function (dept) { 
    const body = el('tbody'); 
    dept.courses.forEach(function (course, index) { 
      const tr = el('tr'); 
      if (index === 0) { 
        const th = el('th', '', dept.name); 
        th.scope = 'rowgroup'; 
        th.rowSpan = dept.courses.length; 
        tr.appendChild(th); 
      } 
      [course.code, course.title, course.type, course.credits].forEach(function (value) { 
        tr.appendChild(el('td', '', String(value))); 
      }); 
      body.appendChild(tr); 
    }); 
    table.appendChild(body); 
  }); 
  return table; 
} 
  
// filter box: one option per department that has courses 
function setUpFilter(root, withCourses) { 
  const bar = root.querySelector('#filter-bar'); 
  const select = root.querySelector('#dept-filter'); 
  const status = root.querySelector('#filter-status'); 
  const cards = root.querySelectorAll('.course-card'); 
  
  select.textContent = ''; 
  const all = el('option', '', 'All departments'); 
  all.value = 'all'; 
  select.appendChild(all); 
  withCourses.forEach(function (dept) { 
    const option = el('option', '', dept.name); 
    option.value = dept.id; 
    select.appendChild(option); 
  }); 
  
  function applyFilter() { 
    let visible = 0; 
    cards.forEach(function (card) { 
      const show = select.value === 'all' || card.dataset.dept === select.value; 
      card.hidden = !show; 
      if (show) visible++; 
    }); 
    status.textContent = 'Showing ' + visible + ' of ' + cards.length + ' departments'; 
  } 
  
  select.onchange = applyFilter; 
  applyFilter(); 
  bar.hidden = false; 
} 
  
function renderDepartments(root, departments, ctx) { 
  const grid = root.querySelector('#dept-grid'); 
  grid.textContent = ''; 
  departments.forEach(function (dept) { grid.appendChild(createDeptCard(dept)); }); 
  
  const deptTable = root.querySelector('#dept-table'); 
  deptTable.textContent = ''; 
  deptTable.appendChild(createDeptTable(departments)); 
  
  const withCourses = departments.filter(function (dept) { return dept.courses.length > 0; }); 
  const courseGrid = root.querySelector('#course-grid'); 
  courseGrid.textContent = ''; 
  withCourses.forEach(function (dept) { courseGrid.appendChild(createCourseCard(dept)); }); 
  
  const courseTable = root.querySelector('#course-table'); 
  courseTable.textContent = ''; 
  courseTable.appendChild(createCourseTable(withCourses)); 
  
  root.querySelectorAll('details').forEach(function (d) { d.hidden = false; }); 
  setUpFilter(root, withCourses); 
  
  // route #/departments/comp: highlight and show the card (only if the user is still on this page) 
  if (ctx.param && ctx.isCurrent()) { 
    const target = root.querySelector('[id="dept-' + ctx.param + '"]'); 
    if (target) { 
      target.classList.add('targeted'); 
      target.scrollIntoView(); 
    } 
  } 
} 
  
function departmentsView(root, ctx) { 
  root.innerHTML = ` 
    <h1>Departments &amp; Course Offerings</h1> 
    <div class="data-status" id="data-status" hidden></div> 
  
    <section id="department-list"> 
      <h2>Department List</h2> 
      <div class="dept-grid" id="dept-grid"></div> 
      <details hidden> 
        <summary>View department table</summary> 
        <div class="table-wrap" id="dept-table"></div> 
      </details> 
    </section> 
  
    <section id="course-offerings"> 
      <h2>Course Offerings (Semester V)</h2> 
      <div class="filter-bar" id="filter-bar" hidden> 
        <label for="dept-filter">Show courses for:</label> 
        <select id="dept-filter"></select> 
        <span id="filter-status" role="status"></span> 
      </div> 
      <div class="course-grid" id="course-grid"></div> 
      <details hidden> 
        <summary>View course offerings table</summary> 
        <div class="table-wrap" id="course-table"></div> 
      </details> 
    </section>`; 
  
  populate(root.querySelector('#data-status'), ['departments'], 'Loading departments...', function 
(departments) { 
    renderDepartments(root, departments, ctx); 
  }); 
}
