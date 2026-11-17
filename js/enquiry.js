
function getEnquiries() {
    return JSON.parse(localStorage.getItem("enquiries") || "[]");
}

function saveEnquiries(enquiries) {
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
}

// Submit Enquiry Form
function initEnquiryForm() {
    const form = document.getElementById("enquiryForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const enquiry = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            department: document.getElementById("department").value,
            message: document.getElementById("message").value.trim(),
            date: new Date().toLocaleString()
        };

        const enquiries = getEnquiries();

        enquiries.push(enquiry);
        saveEnquiries(enquiries);

        document.getElementById("formStatus").textContent =
            "Enquiry submitted successfully!";

        document.getElementById("formStatus").className = "success";

        form.reset();

        displayEnquiries();
    });
}

// Display Saved Enquiries
function displayEnquiries() {
    const container = document.getElementById("savedEnquiries");

    if (!container) return;

    const enquiries = getEnquiries();

    if (enquiries.length === 0) {
        container.innerHTML = "<p>No enquiries saved yet.</p>";
        return;
    }

    container.innerHTML = enquiries.map((item, index) => `
        <div class="card enquiry-card">
            <h3>${escapeHTML(item.name || "")}</h3>

            <p><b>Email:</b> ${escapeHTML(item.email || "")}</p>
            <p><b>Mobile:</b> ${escapeHTML(item.mobile || "")}</p>
            <p><b>Department:</b> ${escapeHTML(item.department || "")}</p>
            <p><b>Message:</b> ${escapeHTML(item.message || "")}</p>
            <p><b>Date:</b> ${escapeHTML(item.date || "")}</p>

            <button type="button" class="delete-btn"
                data-index="${index}">
                Delete
            </button>
        </div>
    `).join("");

    container.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function() {
            const index = Number(this.dataset.index);

            if (confirm("Do you want to delete this enquiry?")) {
                deleteEnquiry(index);
            }
        });
    });
}

// Delete Selected Enquiry
function deleteEnquiry(index) {
    const enquiries = getEnquiries();

    if (!Number.isInteger(index) || index < 0 || index >= enquiries.length) {
        alert("Enquiry not found!");
        return;
    }

    enquiries.splice(index, 1);

    saveEnquiries(enquiries);

    displayEnquiries();
}
