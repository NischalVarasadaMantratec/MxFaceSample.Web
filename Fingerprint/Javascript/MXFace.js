// MXFace.js

document.addEventListener("DOMContentLoaded", function () {
  // Enroll Button Click Event
  document.getElementById("btnEnroll").addEventListener("click", function () {
    enrollFingerprint();
  });

  // Search Button Click Event
  document.getElementById("btnMatch").addEventListener("click", function () {
    searchFingerprint();
  });

  // Match Button Click Event
  document.getElementById("btnMatch").addEventListener("click", function () {
    matchFingerprints();
  });

  // Function to enroll fingerprint
  function enrollFingerprint() {
    const group = document.getElementById("txtGroup").value;
    const code = document.getElementById("enrollRequestExternalId").value;
    const fingerprint = localStorage.getItem("capture1"); // Assuming capture1 is used for enrollment

    fetch("/api/fingerprint/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: group,
        externalId: code,
        fingerprint: fingerprint,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("enrollResponseCode").textContent = data.code;
        document.getElementById("enrollResponseMessage").textContent =
          data.message;
      })
      .catch((error) => {
        console.error("Error enrolling fingerprint:", error);
      });
  }

  // Function to search for a fingerprint
  function searchFingerprint() {
    const group = document.getElementById("txtGroup").value;
    const fingerprint = localStorage.getItem("capture1"); // Assuming capture1 is used for search

    fetch("/api/fingerprint/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: group,
        fingerprint: fingerprint,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const matchResult = data.matchResult;
        if (matchResult && matchResult.length > 0) {
          document.getElementById("txtImageInfo").value =
            matchResult[0].matchingScore;
          document.getElementById("txtSearchResponse").value =
            matchResult[0].imageData;
          document.getElementById("txtSearchDetails").textContent =
            matchResult[0].details;
          document.getElementById("searchResponseContainer").style.display =
            "block";
        } else {
          document.getElementById("txtImageInfo").value =
            "No match results found!";
          document.getElementById("searchResponseContainer").style.display =
            "none";
        }
      })
      .catch((error) => {
        console.error("Error searching fingerprint:", error);
      });
  }

  // Function to match fingerprints
  function matchFingerprints() {
    const fingerprint1 = localStorage.getItem("capture1");
    const fingerprint2 = localStorage.getItem("capture2");

    fetch("/api/fingerprint/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fingerprint1: fingerprint1,
        fingerprint2: fingerprint2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("txtStatus").value = data.matched
          ? "Match Found"
          : "No Match Found";
      })
      .catch((error) => {
        console.error("Error matching fingerprints:", error);
      });
  }
});
