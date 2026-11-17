/* ========================================================================== 
   views/admissions.js - the Admissions view (route #/admissions) 
   Static content only. 
   ========================================================================== */ 
'use strict'; 
  
function admissionsView(root) { 
  root.innerHTML = ` 
    <h1>Admissions 2027-28</h1> 
  
    <section id="eligibility"> 
      <h2>Eligibility</h2> 
      <ul> 
        <li>Passed 12th standard (HSC) with Physics and Mathematics as compulsory subjects.</li> 
        <li>Chemistry, Biotechnology, Technical Vocational subject or Computer Science as the third 
subject.</li> 
        <li>Valid score in MHT-CET or JEE (Main).</li> 
      </ul> 
    </section> 
  
    <section id="process"> 
      <h2>Admission Process</h2> 
      <ol> 
        <li>Appear for MHT-CET or JEE (Main).</li> 
        <li>Register on the state admission portal and fill the option form.</li> 
        <li>Upload the required documents for verification.</li> 
        <li>Check the merit list and the seat allotment result.</li> 
        <li>Report to the college, pay the fees and confirm the admission.</li> 
      </ol> 
    </section> 
  
    <section id="important-dates"> 
      <h2>Important Dates</h2> 
      <div class="table-wrap"> 
        <table> 
          <caption>Admission schedule (tentative)</caption> 
          <thead> 
            <tr><th scope="col">Activity</th><th scope="col">Date</th></tr> 
          </thead> 
          <tbody> 
            <tr><td>Online registration begins</td><td><time datetime="2027-06-01">1 June 
2027</time></td></tr> 
            <tr><td>Last date for document upload</td><td><time datetime="2027-06-20">20 June 
2027</time></td></tr> 
            <tr><td>Publication of merit list</td><td><time datetime="2027-06-28">28 June 
2027</time></td></tr> 
            <tr><td>Commencement of classes</td><td><time datetime="2027-08-02">2 August 
2027</time></td></tr> 
          </tbody> 
        </table> 
      </div> 
    </section> 
  
    <aside> 
      <p>Have a question about admissions or scholarships? 
      <a href="#/contact">Send us an enquiry</a>.</p> 
    </aside>`; 
}
