// Function to get URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Update card with names from URL parameters
// document.addEventListener("DOMContentLoaded", function () {
//   var fromName = getParameterByName("from");
//   var toName = getParameterByName("to");

//   // Update the card with names
//   if (fromName && toName) {
//     document.getElementById("from").innerText = fromName;
//     document.getElementById("to").innerText = toName;
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  var fromName = getParameterByName("from");
  var toName = getParameterByName("to");
  var modal = document.getElementById("modal");

  if (!fromName || !toName) {
    modal.style.display = "block";
  } else {
    document.getElementById("from").innerText = fromName;
    document.getElementById("to").innerText = toName;
  }

  // Close modal logic
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

  // Form submission to generate URL
  document.getElementById("wishForm").onsubmit = function (event) {
    event.preventDefault();
    var from = document.getElementById("fromName").value;
    var to = document.getElementById("toName").value;
    var generatedUrl =
      window.location.href +
      "?from=" +
      encodeURIComponent(from) +
      "&to=" +
      encodeURIComponent(to);
    document.getElementById("generatedUrl").value = generatedUrl;
  };

  // Copy URL button
  document.getElementById("copyButton").onclick = function () {
    var copyText = document.getElementById("generatedUrl");
    copyText.select();
    document.execCommand("copy");
  };
});

document
  .querySelector(".birthdayCard")
  .addEventListener("mouseenter", function () {
    document.querySelector(".confetti").style.display = "block";
  });

document
  .querySelector(".birthdayCard")
  .addEventListener("mouseleave", function () {
    document.querySelector(".confetti").style.display = "none";
  });
