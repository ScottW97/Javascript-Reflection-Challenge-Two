const imageDiv = document.getElementById("image-container"); // Constant image container variable
const emailImages = []; // Preparing the array
let emailInput = document.getElementById("email-input"); // Custom email input variable

// Taking the image from the Unsplash link
function getImage() {
  fetch("https://unsplash.it/900/600").then(response => {
    // Fetching the Unsplash link
    imageDiv.innerHTML = `<img src="${response.url}">`; // Embedding the photo url inside the div
    imageLink = `${response.url}`; // Setting the url as a variable so it can be stored
  });
}

//Presenting the saved image in HTML
function showLink() {
  let temp = "<div id='stored'>"; // Showing the div of the email heading and picture list
  for (let i = 0; i < emailImages.length; i++) {
    //For when the amount of images is greater than zero, iterate one
    temp +=
      "<h3>" +
      emailImages[i].name +
      " currently has " +
      emailImages[i].pictures.length +
      " images saved:</h3><ul>"; // Header for the list of pictures below an email
    for (let j = 0; j < emailImages[i].pictures.length; j++) {
      // Iteration for each new link within an email
      let jreal = j + 1; // Adding new image link with +1 count
      temp +=
        "<li><a href='" +
        emailImages[i].pictures[j] +
        '\' target="_blank">Picture ' +
        jreal +
        "</a></li>"; // Showing the new picture in the HTML
    }
    temp += "</ul><br>";
  }
  temp += "</div>";
  document.getElementById("saved-images").innerHTML = temp; // Assigning to the 'stored' div HTML to the 'saved-images' div
}

// Saving the image to be shown in the showLink function
function addImage() {
  // Adding an image to the array, when the input email doesn't exist
  let emailExists = false; // Condition for no emails listed
  for (let x = 0; x < emailImages.length; x++) {
    // For when the emailImages array has no images
    if (emailInput.value === emailImages[x].name) {
      // Condition for the first image information
      emailImages[x].count++; // Iterating an email
      emailImages[x].pictures.push(imageLink); // Adding the first email onto the empty array
      emailExists = true; // Establishes
      break;
    }
  }

  if (!emailExists) {
    // Adding an image to the array, when the input email exists, ! meaning true
    const obj = {
      name: emailInput.value, // Email to be assigned to the heading
      count: 1, // An iteration of one
      pictures: [imageLink] // Referencing the url
    };
    emailImages.push(obj); // Adding a new email
  }
}

// Calling the link on the page load
getImage();

// Input function
function validateEmail(inputText) {
  // Referencing the email input

  const emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email filtering code

  // Saving the image when the email is submitted
  if (inputText.value.match(emailFilter)) {
    addImage();
    getImage();
  } else {
    // Invalid email message
    alert("You have entered an invalid email address!");
  }
  showLink();
}
