# Dr. D. Y. Patil College Website Portal (PR5: single-page application) 
  
"Dr. D. Y. Patil College of Engineering, Akurdi" built with HTML5, CSS3 and JavaScript (no frameworks). 
It combines the work of the five practicals: HTML structure (PR1), responsive CSS (PR2), 
client-side validation and localStorage (PR3), JSON data loaded with fetch / async-await (PR4) 
and single-page navigation (PR5). 
  
## 1. Features 
- One HTML document (`index.html`); the pages change without reloading the browser. 
- Components: Header, Navigation (with Departments dropdown), Content area, Footer. 
- Client-side routing with the URL hash: `#/`, `#/departments`, `#/departments/<id>`, `#/faculty`, 
`#/admissions`, `#/contact`. Back / Forward, bookmarks and reload work. Unknown address: "Page not 
found". 
- Dynamic data: departments, courses, faculty and notices are loaded from JSON files, with loading and 
error states and a "Try again" button. 
- Student enquiry form with client-side validation; enquiries are saved in localStorage. 
- Responsive layout (desktop, tablet, mobile), keyboard and screen-reader support (skip link, aria-
current, live announcements, focus moved to the content after navigation). 
  
## 2. How to run 
`fetch()` needs a web server (opening `index.html` by double-click does not work). 
1. Open a terminal in the project folder. 
2. Run `python -m http.server 8000` (or use the VS Code "Live Server" extension). 
3. Open `http://localhost:8000/` in Chrome. 
  
Test addresses: `?demo=slow` (2 second delay) and `?demo=error` (missing files), e.g. 
`http://localhost:8000/?demo=slow#/faculty`. 
  
## 3. Folder structure 
``` 
index.html            the only HTML page (shell) 
css/style.css         all styles 
data/                 departments.json, faculty.json, notices.json 
images/dyp.jpg 
js/data.js            fetch, async/await, cache, loading and error states 
js/components.js      Header, Navigation, Footer 
js/enquiry.js         form validation + localStorage 
js/router.js          routing 
js/app.js             start-up 
js/views/             home, departments, faculty, admissions, contact, notfound 
``` 
  
## 4. How it works 
1. `index.html` contains empty `header`, `nav`, `main#app` and `footer` elements and loads the scripts in 
order. 
2. `app.js` draws the header, navigation and footer once, then starts the router. 
3. `router.js` listens to `hashchange`, finds the route in the `routes` table and calls its view function 
with a new container inside `main#app`. 
4. A view writes its static markup, then calls `populate()` (data.js) which loads the JSON, draws the 
data and shows loading / error messages. 
5. After the navigation the router updates the title, the current link, the focus and a screen-reader 
message. 
  
## 5. Adding a new page 
1. Create `js/views/mypage.js` with `function mypageView(root, ctx) { ... }` and add it to `index.html`. 
2. Add `{ path: 'mypage', title: 'My page', view: mypageView }` to `routes` in `router.js`. 
3. Add `{ path: 'mypage', label: 'My page' }` to `NAV_ITEMS` in `components.js`. 
  
## 6. Data files
