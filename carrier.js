emailjs.init("l0fYXLDfSsNXOzsgd"); // Replace with your EmailJS user ID

let uploadedResumeUrl = ""; // Store the Cloudinary resume URL

document.getElementById("resume").addEventListener("change", function () {
  const file = this.files[0]; // Get the selected file
  const maxSize = 500 * 1024; // 50KB in bytes

  if (file && file.size > maxSize) {
    document.getElementById("error-message").style.display = "block";
    this.value = ""; // Clear the input
    uploadedResumeUrl = ""; // Reset uploaded URL
    document.getElementById("submit-btn").disabled = true; // Disable submit
  } else {
    document.getElementById("error-message").style.display = "none";

    // Upload file to Cloudinary
    const cloudinaryWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dpsf7ynmr", // Replace with your Cloudinary Cloud Name
        uploadPreset: "KARRYAM", // Replace with your Cloudinary Upload Preset
        sources: ["local"],
        multiple: false,
        resourceType: "auto",
      },
      (error, result) => {
        if (result.event === "success") {
          uploadedResumeUrl = result.info.secure_url; // Store Cloudinary URL
          console.log(uploadedResumeUrl);
          alert("Resume uploaded successfully!");
          document.getElementById("submit-btn").disabled = false; // Enable submit
        }
      }
    );

    cloudinaryWidget.open(); // Open Cloudinary widget
  }
});

// Form submission event
document
  .getElementById("career-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    if (!uploadedResumeUrl) {
      alert("Please upload a resume before submitting.");
      return;
    }

// Collect the form data in an object
const formData = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  position: document.getElementById('position').value,
  message: document.getElementById('message').value,
  resume: uploadedResumeUrl, // Assuming uploadedResumeUrl holds the Cloudinary URL
};


console.log(formData);
    // Send email using EmailJS
    emailjs
      .send("service_iqj7ado", "template_wglcwhb", formData) // Pass the form element selector as a string
      .then((response) => {
        alert("Application submitted successfully!");
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        alert("Failed to send application.");
        console.log("Error sending email", error);
      });
  });
