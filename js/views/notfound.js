/* ========================================================================== 
   views/notfound.js - shown for an address the router does not know (e.g. #/xyz) 
   and when a view crashes while it is being drawn. 
   ========================================================================== */ 
'use strict'; 
  
function notFoundView(root, ctx) { 
  root.appendChild(el('h1', '', 'Page not found')); 
  const text = el('p', '', 'The page "#/' + (ctx.requested || '') + '" does not exist in this portal.'); 
  root.appendChild(text);                                   // textContent: the address can not inject 
HTML 
  const p = el('p'); 
  const home = el('a', 'btn-primary', 'Go to the Home page'); 
  home.href = routeHref(''); 
  p.appendChild(home); 
  root.appendChild(p); 
} 
  
function crashView(root, error) { 
  root.textContent = ''; 
  const box = el('div', 'data-status error'); 
  box.setAttribute('role', 'alert'); 
  box.appendChild(el('p', 'status-title', 'Sorry, this page could not be shown.')); 
  box.appendChild(el('p', '', error.message)); 
  const home = el('a', 'btn-primary', 'Go to the Home page'); 
  home.href = routeHref(''); 
  box.appendChild(home); 
  root.appendChild(box); 
}
