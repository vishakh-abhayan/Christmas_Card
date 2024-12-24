function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, ""));
}

document.addEventListener("DOMContentLoaded", function () {
  // Handle input validation on keypress
  document.getElementById("fromName").addEventListener("input", function (e) {
    this.value = this.value.replace(/\s+/g, "");
  });

  document.getElementById("toName").addEventListener("input", function (e) {
    this.value = this.value.replace(/\s+/g, "");
  });

  var fromName = getParameterByName("from");
  var toName = getParameterByName("to");
  var modal = document.getElementById("modal");
  const shareModal = document.getElementById("shareModal");

  if (fromName && toName) {
    document.getElementById("from").innerText = fromName;
    document.getElementById("to").innerText = toName;
    setTimeout(() => {
      window.location.href = window.location.origin;
    }, 15000);
  } else {
    modal.style.display = "block";
  }

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };

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
    shareModal.style.display = "block";
    setTimeout(() => {
      shareModal.classList.add("active");
    }, 10);
  };

  const shareButtons = document.querySelectorAll(".share-button");
  const closeButton = document.querySelector(".share-close");

  document.getElementById("copyButton").addEventListener("click", function (e) {
    e.preventDefault();
    const form = document.getElementById("wishForm");
    form.dispatchEvent(new Event("submit"));
  });

  function closeShareModal() {
    shareModal.classList.remove("active");
    setTimeout(() => {
      shareModal.style.display = "none";
    }, 300);
  }

  closeButton.addEventListener("click", closeShareModal);
  shareModal.addEventListener("click", function (e) {
    if (e.target === shareModal) {
      closeShareModal();
    }
  });

  function formatShareMessage(url, toName) {
    return [
      `🎄 Merry Christmas ${toName}! 🎅`,
      "I've sent you a special Christmas surprise! ✨",
      "Click here to open your card:",
      url,
      "",
      "Want to spread joy? Create your own Christmas card:",
      "https://merry.prodhut.fun",
      "🎄 Celebrate the magic of Christmas! 🎅",
    ].join("\n");
  }

  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const platform = this.dataset.platform;
      const url = document.getElementById("generatedUrl").value;
      const toName = document.getElementById("toName").value;
      const shareMessage = formatShareMessage(url, toName);

      const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
        telegram: `https://t.me/share/url?url=""&text=${encodeURIComponent(
          shareMessage
        )}`,
      };

      if (platform === "copy") {
        navigator.clipboard.writeText(shareMessage);
        const originalText = this.querySelector("span").textContent;
        this.querySelector("span").textContent = "Copied!";
        setTimeout(() => {
          this.querySelector("span").textContent = originalText;
        }, 2000);
      } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], "_blank");
      }
    });
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
});

// Update the click handler to handle Safari mobile issues
document.getElementById("copyButton").addEventListener("click", function (e) {
  e.preventDefault();
  const form = document.getElementById("wishForm");
  form.dispatchEvent(new Event("submit"));

  // Handle Safari mobile specific redirects
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    const url = document.getElementById("generatedUrl").value;
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  }
});

// Add Safari detection and handling for share buttons
shareButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const platform = this.dataset.platform;
    const url = document.getElementById("generatedUrl").value;

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      if (platform === "whatsapp") {
        window.location.href = shareUrls[platform];
      } else {
        window.open(shareUrls[platform], "_blank");
      }
    } else {
      window.open(shareUrls[platform], "_blank");
    }
  });
});
