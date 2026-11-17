
function renderHeader() {
    document.getElementById("header").innerHTML = `
        <div class="header-content">

            <img src="images/college-logo.png"
                 alt="D Y Patil College Logo"
                 class="college-logo">

            <div class="college-title">
                <h1>Dr. D. Y. Patil College of Engineering</h1>
                <p>Akurdi, Pune | Excellence in Education and Innovation</p>
            </div>

        </div>
    `;
}


function renderNavigation() {
    document.getElementById("navigation").innerHTML = `
        <ul>
            <li><a href="#/home" data-route="home">Home</a></li>
            <li><a href="#/departments" data-route="departments">Departments</a></li>
            <li><a href="#/faculty" data-route="faculty">Faculty</a></li>
            <li><a href="#/admissions" data-route="admissions">Admissions</a></li>
            <li><a href="#/contact" data-route="contact">Contact</a></li>
        </ul>
    `;
}

function renderFooter() {
    document.getElementById("footer").innerHTML = `
        <p>Dr. D. Y. Patil College of Engineering, Akurdi</p>
        <p>© 2026 All Rights Reserved</p>
    `;
}