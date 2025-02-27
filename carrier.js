const submitButton = document.querySelector(".submit-Btn");

(function() {
  emailjs.init("ZCjlwK0qSqTS_l0HH"); // Replace with your EmailJS User ID
})();

document.getElementById("career-form").addEventListener("submit", async function(event) {
  event.preventDefault();
  // Disable button and change text
  // Change the inner text
submitButton.innerText = "Submitting...";

  let formData = new FormData(this);
  let file = document.getElementById("resume").files[0];

  if (file.size > 500 * 1024) {
    alert("File size must be 5MB or less.");
    return;
  }

  // Step 1: Upload file to Cloudinary
  let cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", file);
  cloudinaryFormData.append("upload_preset", "karrayam"); // Replace with your Cloudinary Upload Preset

  try {
    let uploadResponse = await fetch("https://api.cloudinary.com/v1_1/dpsf7ynmr/image/upload", {
      method: "POST",
      body: cloudinaryFormData
    });

    let uploadData = await uploadResponse.json();
    let resumeUrl = uploadData.secure_url; // Get the uploaded file URL


    let optimizedUrl = resumeUrl.replace("/upload/", "/upload/f_auto,q_auto/");
console.log("Optimized Resume URL:", optimizedUrl);


    // Step 2: Send Email via EmailJS
    let templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      message: formData.get("message"),
      resume_link: optimizedUrl // Pass Cloudinary file link
    };

    emailjs.send("service_iqj7ado", "template_wglcwhb", templateParams)
      .then(response => {
        // console.log("✅ Email sent successfully!", response);
        alert("✅ Application sent successfully!");
        const form = document.getElementById("career-form");
        form.reset(); // Reset the form

        submitButton.disabled = false;

        submitButton.innerText = "Send Message"; // Reset button text
      })

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    alert("Failed to upload resume.");
    submitButton.disabled = false;
    submitButton.innerText = "Send Message"; // Reset button text
  }
});





// templ-      template_wglcwhb
// service-   service_iqj7ado
// public key -   ZCjlwK0qSqTS_l0HH


// cloud name -      dpsf7ynmr
// upload peset -    karrayam


// gptsoftware1@gmail.com   used for clodinary and 
// asonar gmail for emialjs
