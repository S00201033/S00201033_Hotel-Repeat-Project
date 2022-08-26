console.log('hello');

const contactForm = document.querySelector('contact-form');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('hello');

})
document.addEventListener("DOMContentLoaded", function(event) { 
    alert('Hey')
  });

  //get the form by its id
const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
})