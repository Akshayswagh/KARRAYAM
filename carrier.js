// Initialize Cloudinary Upload Widget
// const cloudinaryWidget = cloudinary.createUploadWidget(
//   {
//     cloudName: "your-cloud-name", // Replace with your Cloudinary Cloud Name
//     uploadPreset: "your-upload-preset", // Replace with your Cloudinary Upload Preset
//     sources: ["local", "url", "camera"],
//     multiple: false,
//     resourceType: "auto", // Supports file types (pdf, doc, etc.)
//   },
//   (error, result) => {
//     if (result.event === "success") {
//       // Get the uploaded file URL from Cloudinary
//       const resumeUrl = result.info.secure_url;
//       document.getElementById("resume").value = resumeUrl; // Set the URL as the value of the resume field
//       alert("Resume uploaded successfully!");
//     }
//   }
// );

// Open the widget when the "Upload Resume" button is clicked
// document.getElementById("uploadBtn").addEventListener("click", () => {
//   cloudinaryWidget.open();
// });


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Form submission event
emailjs.init("AiOcuewhVkKZiNGO9"); // Replace with your EmailJS user ID


document
  .getElementById("career-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Collect form data
    const formData = new FormData(event.target);
    const formDetails = {
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      message: formData.get("message"),
    //   resume: formData.get("resume"), // The URL of the uploaded resume
    };

    // Send email using EmailJS
    emailjs
      .sendForm("service_iqj7ado", "template_wglcwhb", event.target)
      .then((response) => {
        alert("Application submitted successfully!");
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        alert("Failed to send application.");
        console.log("Error sending email", error);
      });
  });
