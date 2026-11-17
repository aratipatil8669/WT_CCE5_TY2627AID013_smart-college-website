
function renderRoute() {
    let path = location.hash.replace("#/", "");

    if (path === "") {
        path = "home";
    }

    const routes = {
        home: homePage,
        departments: departmentsPage,
        faculty: facultyPage,
        admissions: admissionsPage,
        contact: contactPage
    };

    const app = document.getElementById("app");

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.route === path
        );
    });

    if (routes[path]) {
        routes[path]();
        document.title = path.charAt(0).toUpperCase()
            + path.slice(1) + " | DY Patil College";
    } else {
        app.innerHTML = `
            <h2>404 - Page Not Found</h2>
            <a href="#/home">Go to Home</a>
        `;
    }
}

function startRouter() {
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
}
