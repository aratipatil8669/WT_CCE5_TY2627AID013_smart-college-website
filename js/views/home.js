/* ========================================================================== 
   views/home.js - the Home view (route #/) 
   Static text is written as a template; the notices come from data/notices.json. 
   Every lookup is made inside `root` (this view only), so a late answer from 
   the network can never write into another view. 
   ========================================================================== */ 
'use strict'; 
  
function renderNotices(root, notices) { 
  const list = root.querySelector('#notice-list'); 
  list.textContent = ''; 
  
  // newest notice first (copy the array first so the original order is not changed) 
  const sorted = notices.slice().sort(function (a, b) { 
    return new Date(b.date) - new Date(a.date); 
  }); 
  
  const fragment = document.createDocumentFragment();     // one insertion into the page instead of many 
  sorted.forEach(function (notice) { 
    const card = el('article'); 
    card.dataset.id = notice.id; 
    card.appendChild(el('h3', '', notice.title)); 
  
    const meta = el('p', 'notice-meta'); 
    meta.appendChild(el('span', 'badge', notice.category)); 
    if (notice.important) { 
      meta.appendChild(el('span', 'badge badge-important', 'Important')); 
    } 
    meta.appendChild(document.createTextNode(' Posted on ')); 
    const time = el('time', '', formatDate(notice.date)); 
    time.dateTime = notice.date; 
    meta.appendChild(time); 
    card.appendChild(meta); 
  
    card.appendChild(el('p', '', notice.summary)); 
  
    if (notice.link) { 
      const more = el('p'); 
      const a = el('a', '', notice.link.text); 
      a.href = notice.link.href;                           // e.g. "#/admissions": handled by the router 
      more.appendChild(a); 
      card.appendChild(more); 
    } 
    fragment.appendChild(card); 
  }); 
  list.appendChild(fragment); 
  
  root.querySelector('#notice-count').textContent = sorted.length + ' notices, newest first'; 
} 
  
function homeView(root) { 
  root.innerHTML = ` 
    <section id="about"> 
      <h1>Welcome to Our Campus</h1> 
      <p class="view-tagline">Learn. Innovate. Lead.</p> 
      <p> 
        Smart College of Engineering &amp; Technology is an autonomous institute offering 
        undergraduate programmes in Artificial Intelligence and Data Science, Computer 
        Engineering, Information Technology, Electronics and Telecommunication, 
        Mechanical and Civil Engineering. This portal gives students, parents and 
        visitors quick access to departments, courses, faculty, admissions and notices. 
      </p> 
    </section> 
  
    <section id="vision-mission"> 
      <h2>Vision and Mission</h2> 
      <article id="vision"> 
        <h3>Our Vision</h3> 
        <p>To be a centre of excellence in technical education that produces skilled, 
           ethical and innovative engineers who contribute to society and industry.</p> 
      </article> 
      <article id="mission"> 
        <h3>Our Mission</h3> 
        <ul> 
          <li>Deliver outcome-based education supported by hands-on laboratory learning.</li> 
          <li>Encourage research, innovation and entrepreneurship among students.</li> 
          <li>Build strong industry partnerships for internships and placements.</li> 
          <li>Promote professional ethics, teamwork and lifelong learning.</li> 
        </ul> 
      </article> 
    </section> 
  
    <section id="announcements"> 
      <h2>Announcements &amp; Notices</h2> 
      <div class="data-status" id="notice-status" hidden></div> 
      <p class="meta" id="notice-count" aria-live="polite"></p> 
      <div id="notice-list"></div> 
    </section> 
  
    <aside> 
      <h2>Quick Links</h2> 
      <ul> 
        <li><a href="#/departments">View course offerings</a></li> 
        <li><a href="#/faculty">Meet our faculty</a></li> 
        <li><a href="#/contact">Send an enquiry</a></li> 
      </ul> 
    </aside>`; 
  
  populate(root.querySelector('#notice-status'), ['notices'], 'Loading notices...', function (notices) { 
    renderNotices(root, notices); 
  }); 
}
