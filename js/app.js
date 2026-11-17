
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

async function homePage() {
    const app = document.getElementById("app");

    try {
        const data = await getData("notices");

        app.innerHTML = `
            <section class="hero">
                <h2>Welcome to DY Patil College of Engineering</h2>
                <p>Excellence in Education, Innovation and Research.</p>
                <br>
                <a href="#/departments" style="color:white">
                    Explore Departments →
                </a>
            </section>

            <section class="section">
                <h2>About Our College</h2>
                <p>
                    Dr. D. Y. Patil College of Engineering, Akurdi,
                    provides quality technical education and encourages
                    innovation, research and practical learning.
                </p>
            </section>

            <section class="section">
                <h2>Latest Notices</h2>
                <div class="card-container">
                    ${data.notices.map(item => `
                        <div class="card">
                            <h3>${escapeHTML(item.title)}</h3>
                            <p>${escapeHTML(item.description)}</p>
                            <small>${escapeHTML(item.date)}</small>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    } catch (error) {
        app.innerHTML = `<p class="error">${escapeHTML(error.message)}</p>`;
    }
}

async function departmentsPage() {
    const app = document.getElementById("app");

    try {
        const data = await getData("departments");

        app.innerHTML = `
            <section class="section">
                <h2>Our Departments</h2>

                <div class="filter-box">
                    <label for="departmentFilter">Filter Department:</label>

                    <select id="departmentFilter">
                        <option value="all">All Departments</option>
                        ${data.departments.map(dept => `
                            <option value="${escapeHTML(dept.name)}">
                                ${escapeHTML(dept.name)}
                            </option>
                        `).join("")}
                    </select>
                </div>

                <div class="card-container" id="departmentList">
                    ${data.departments.map(dept => `
                        <div class="card department-card"
                             data-name="${escapeHTML(dept.name)}">
                            <h3>${escapeHTML(dept.name)}</h3>
                            <p>${escapeHTML(dept.description)}</p>
                            <p><b>Intake:</b> ${escapeHTML(dept.intake)}</p>
                            <p><b>Courses:</b>
                                ${dept.courses.map(escapeHTML).join(", ")}
                            </p>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;

        document.getElementById("departmentFilter")
            .addEventListener("change", function() {
                const selected = this.value;

                document.querySelectorAll(".department-card")
                    .forEach(card => {
                        card.style.display =
                            selected === "all" ||
                            card.dataset.name === selected
                                ? "block"
                                : "none";
                    });
            });

    } catch (error) {
        app.innerHTML = `<p class="error">${escapeHTML(error.message)}</p>`;
    }
}

async function facultyPage() {
    const app = document.getElementById("app");

    try {
        const data = await getData("faculty");

        app.innerHTML = `
            <h2>Our Faculty</h2>
            <div class="card-container">
                ${data.faculty.map(person => `
                    <div class="card">
                        <h3>${escapeHTML(person.name)}</h3>
                        <p><b>Department:</b> ${escapeHTML(person.department)}</p>
                        <p><b>Designation:</b> ${escapeHTML(person.designation)}</p>
                        <p><b>Qualification:</b> ${escapeHTML(person.qualification)}</p>
                    </div>
                `).join("")}
            </div>
        `;
    } catch (error) {
        app.innerHTML = `<p class="error">${escapeHTML(error.message)}</p>`;
    }
}

function admissionsPage() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h2>Admissions</h2>

        <section class="card">
            <h3>Admission Process</h3>
            <ol>
                <li>Check eligibility criteria.</li>
                <li>Register for the admission process.</li>
                <li>Submit required documents.</li>
                <li>Complete document verification.</li>
                <li>Confirm admission by paying fees.</li>
            </ol>
        </section>

        <section class="card">
            <h3>Required Documents</h3>
            <ul>
                <li>10th Marksheet</li>
                <li>12th Marksheet</li>
                <li>CET / JEE Scorecard</li>
                <li>Leaving Certificate</li>
                <li>Identity Proof</li>
            </ul>
        </section>

        <p class="notice">
            Contact the college admission office for official
            eligibility, dates and admission details.
        </p>
    `;
}

function contactPage() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <section class="section">
            <h2>Student Enquiry Form</h2>

            <form id="enquiryForm">

                <label>Full Name</label>
                <input type="text" id="name" required
                    pattern="[A-Za-z ]{3,50}"
                    placeholder="Enter your name">

                <label>Email Address</label>
                <input type="email" id="email" required
                    placeholder="Enter your email">

                <label>Mobile Number</label>
                <input type="tel" id="mobile" required
                    pattern="[6-9][0-9]{9}"
                    placeholder="Enter 10 digit mobile number">

                <label>Select Department</label>
                <select id="department" required>
                    <option value="">Select Department</option>
                    <option>AI and Data Science</option>
                    <option>Computer Engineering</option>
                    <option>Mechanical Engineering</option>
                    <option>Electronics Engineering</option>
                </select>

                <label>Message</label>
                <textarea id="message" required minlength="10"
                    placeholder="Enter your enquiry"></textarea>

                <div class="form-buttons">
                    <button type="submit">Submit Enquiry</button>
                    <button type="reset">Reset</button>
                </div>

                <p id="formStatus"></p>
            </form>

            <section class="section">
                <h2>Saved Enquiry Details</h2>
                <div id="savedEnquiries"></div>
            </section>

            <section class="section">
                <h2>Contact Information</h2>
                <p><b>College:</b> Dr. D. Y. Patil College of Engineering</p>
                <p><b>Location:</b> Akurdi, Pune, Maharashtra</p>
            </section>
        </section>
    `;

    initEnquiryForm();
    displayEnquiries();
}

renderHeader();
renderNavigation();
renderFooter();
startRouter();
