/* ========================================================================== 
   views/contact.js - the Contact view (route #/contact) 
   The form markup is a template; initEnquiryForm() (enquiry.js) adds the 
   client-side validation and the localStorage handling. 
   ========================================================================== */ 
'use strict'; 
  
function contactView(root) { 
  root.innerHTML = ` 
    <h1>Contact Us</h1> 
  
    <section id="enquiry"> 
      <h2>Student Enquiry Form</h2> 
      <p>Fields marked with <span class="required-mark">*</span> are required.</p> 
  
      <form action="#" method="post" id="enquiry-form"> 
  
        <fieldset> 
          <legend>Personal Details</legend> 
  
          <p> 
            <label for="fullname">Full Name <span class="required-mark">*</span></label> 
            <input type="text" id="fullname" name="fullname" 
                   placeholder="e.g. Amit Sharma" 
                   required minlength="3" maxlength="50" 
                   pattern="[A-Za-z ]{3,50}" 
                   title="Use 3 to 50 letters and spaces only" 
                   autocomplete="name"> 
          </p> 
  
          <p> 
            <label for="email">Email Address <span class="required-mark">*</span></label> 
            <input type="email" id="email" name="email" 
                   placeholder="name@example.com" 
                   required autocomplete="email"> 
          </p> 
  
          <p> 
            <label for="mobile">Mobile Number <span class="required-mark">*</span></label> 
            <input type="tel" id="mobile" name="mobile" 
                   placeholder="10-digit mobile number" 
                   required maxlength="10" 
                   pattern="[6-9][0-9]{9}" 
                   title="Enter a 10-digit mobile number starting with 6, 7, 8 or 9" 
                   autocomplete="tel-national"> 
          </p> 
  
          <p> 
            <label for="percentage">12th (HSC) Percentage <span class="required-mark">*</span></label> 
            <input type="number" id="percentage" name="percentage" 
                   placeholder="0 to 100" 
                   required min="0" max="100" step="0.01"> 
          </p> 
        </fieldset> 
  
        <fieldset> 
          <legend>Enquiry Details</legend> 
  
          <p> 
            <label for="programme">Programme of Interest <span class="required-mark">*</span></label> 
            <select id="programme" name="programme" required> 
              <option value="">-- Select a programme --</option> 
              <option value="aids">Artificial Intelligence and Data Science</option> 
              <option value="comp">Computer Engineering</option> 
              <option value="it">Information Technology</option> 
              <option value="entc">Electronics and Telecommunication</option> 
              <option value="mech">Mechanical Engineering</option> 
              <option value="civil">Civil Engineering</option> 
            </select> 
          </p> 
  
          <p class="choice-row"> 
            <span class="label-text">Enquiry Type <span class="required-mark">*</span></span> 
            <span class="choices"> 
              <label class="inline"><input type="radio" name="enquiry-type" value="admission" required> 
Admission</label> 
              <label class="inline"><input type="radio" name="enquiry-type" value="fees" required> 
Fees</label> 
              <label class="inline"><input type="radio" name="enquiry-type" value="scholarship" required> 
Scholarship</label> 
              <label class="inline"><input type="radio" name="enquiry-type" value="other" required> 
Other</label> 
            </span> 
          </p> 
  
          <p> 
            <label for="message">Your Message <span class="required-mark">*</span></label> 
            <textarea id="message" name="message" rows="5" cols="40" 
                      placeholder="Type your question here (10 to 300 characters)" 
                      required minlength="10" maxlength="300"></textarea> 
          </p> 
  
          <p class="consent-row"> 
            <label class="inline"> 
              <input type="checkbox" id="consent" name="consent" value="yes" required> 
              I agree to be contacted by the college regarding this enquiry. <span class="required-
mark">*</span> 
            </label> 
          </p> 
        </fieldset> 
  
        <p class="button-row"> 
          <button type="submit">Submit Enquiry</button> 
          <button type="reset">Reset</button> 
        </p> 
      </form> 
  
      <div id="form-status" class="form-status" role="status" aria-live="polite" hidden></div> 
    </section> 
  
    <section id="saved-enquiries" hidden> 
      <h2>Saved Enquiries</h2> 
      <p id="saved-count"></p> 
      <div id="saved-list" class="saved-list"></div> 
      <p><button type="button" id="clear-all" class="btn-danger">Clear all saved enquiries</button></p> 
      <p class="meta">Enquiries are stored only in this browser (localStorage). They are not sent to any 
server.</p> 
    </section> 
  
    <section id="address"> 
      <h2>College Address</h2> 
      <address> 
        <strong>Smart College of Engineering &amp; Technology</strong><br> 
        Campus Road, Akurdi, Pune, Maharashtra 411035<br> 
        Phone: <a href="tel:+912055550100">+91 20 5555 0100</a><br> 
        Email: <a href="mailto:info@smartcollege.example">info@smartcollege.example</a><br> 
        Office hours: Monday to Saturday, 9:30 AM to 5:30 PM 
      </address> 
    </section>`; 
  
  initEnquiryForm(root); 
}
