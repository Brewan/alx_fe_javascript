document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Placeholder API for simulation

  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Inspirational" },
    // More quotes can be added here
  ];

  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = ["all", ...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join("");
    const lastSelectedCategory = localStorage.getItem("lastSelectedCategory") || "all";
    categoryFilter.value = lastSelectedCategory;
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("lastSelectedCategory", selectedCategory);
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    quoteDisplay(filteredQuotes);
  }

  function quoteDisplay(filteredQuotes) {
    const quoteContainer = document.getElementById("quote-container");
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteContainer.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
  }

  function showRandomQuote() {
    filterQuotes();  // Show a random quote based on the selected category
  }

  function createAddQuoteForm() {
    const formContainer = document.getElementById("form-container");

    const form = document.createElement("form");
    form.id = "quote-form";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "quote-text";
    textInput.placeholder = "Enter quote";
    textInput.required = true;
    form.appendChild(textInput);

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.id = "quote-category";
    categoryInput.placeholder = "Enter category";
    categoryInput.required = true;
    form.appendChild(categoryInput);

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Quote";
    form.appendChild(addButton);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newQuote = { text: textInput.value, category: categoryInput.value };
      quotes.push(newQuote);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      textInput.value = "";
      categoryInput.value = "";
      populateCategories();  // Update categories
      filterQuotes();
      syncWithServer();  // Sync data with the server after adding a quote
    });

    formContainer.appendChild(form);
  }

  function createExportButton() {
    const exportButton = document.getElementById("export-button");
    exportButton.addEventListener("click", () => {
      const data = JSON.stringify(quotes);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "quotes.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function createImportButton() {
    const importInput = document.getElementById("import-input");
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();  // Update categories
        filterQuotes();
        syncWithServer();  // Sync data with the server after importing quotes
      };
      reader.readAsText(file);
    });
  }

  function fetchQuotesFromServer() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(serverQuotes => serverQuotes.map(post => ({ text: post.title, category: "Server" })))
      .catch(error => console.error("Error fetching quotes from server:", error));
  }

  function syncWithServer() {
    fetchQuotesFromServer()
      .then(serverQuotes => {
        // Simple conflict resolution: Server data takes precedence
        quotes = serverQuotes;
        localStorage.setItem("quotes", JSON.stringify(quotes));
        populateCategories();
        filterQuotes();
        // Notify user of the update
        alert("Data synced with server. Server data takes precedence in case of conflicts.");
      });
  }

  function startPeriodicSync() {
    setInterval(syncWithServer, 60000); // Sync with server every 60 seconds
  }

  populateCategories();
  createAddQuoteForm();
  createExportButton();
  createImportButton();
  showRandomQuote();
  startPeriodicSync();
});
