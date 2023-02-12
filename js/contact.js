//service_a67ezzs
const form = document.querySelector("#contactForm");
const submit = form.querySelector(".submit");

function sendEmail() {
  emailjs.init("smXrTUT7qtrtDtUhx");
  let templateParams = {
    name: document.getElementById("contactName").value,
    phone: document.getElementById("contactPhone").value,
    email: document.getElementById("contactEmail").value,
    message: document.getElementById("contactMsg").value,
  };
  console.log(templateParams);
  emailjs.send("service_a67ezzs", "template_g0rfbw9", templateParams).then(
    function () {
      console.log("SUCCESS!");
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  sendEmail();
});
