document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("main section");
  const statusBox = document.getElementById("status");

  function showSection(id) {
    sections.forEach((section) => {
      section.style.display = section.id === id ? "block" : "none";
    });
  }

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      window.location.href = href;
    });
  });

  // ✅ Chatbot interaction
  const askBtn = document.getElementById("askBtn");
  const questionInput = document.getElementById("questionInput");
  const chatBox = document.getElementById("chat-box");

  if (askBtn) {
    askBtn.addEventListener("click", async () => {
      const prompt = questionInput.value.trim();
      if (!prompt) return;

      chatBox.innerHTML += `<div class="user-msg">Q: ${prompt}</div>`;
      questionInput.value = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        chatBox.innerHTML += `<div class="bot-msg">A: ${data.answer}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
      } catch (err) {
        chatBox.innerHTML += `<div class="error-msg">Error: ${err.message}</div>`;
      }
    });
  }

  // OCR
  const imageForm = document.getElementById("imageForm");
  if (imageForm) {
    imageForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = document.getElementById("imageFile").files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/image-text", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        document.getElementById("imageTextOutput").innerText =
        `Extracted Text:\n${data.extractedText}\n\nAI Explanation:\n${data.explanation}`;
      } catch (err) {
        document.getElementById("imageTextOutput").innerText = "Error: " + err.message;
      }
    });
  }

  // Speech Recognition
  const speechForm = document.getElementById("speechForm");
if (speechForm) {
  speechForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("audioFile").files[0];
    if (!file) {
      alert("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      const data = await res.json();
      document.getElementById("speechTextOutput").innerText = data.transcription;
    } catch (err) {
      document.getElementById("speechTextOutput").innerText = "Error: " + err.message;
    }
  });
}


  // Load history
  const loadHistory = async () => {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      const historyList = document.getElementById("historyList");
      console.log(data);
      historyList.innerHTML = data.map(
        item => `<li><strong>Q:</strong> ${item.input} <br><strong>A:</strong> ${item.output}</li>`
      ).join("");
    } catch (err) {
      document.getElementById("historyList").innerText = "Error loading history.";
    }
  };

  const historySection = document.getElementById("historyList");
  if (historySection) {
    loadHistory();
  }

  // Default section
  showSection("home");
});
