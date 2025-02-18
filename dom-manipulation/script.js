document.addEventListener("DOMContentLoaded", () => {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Inspirational" },
    // More quotes can be added here
  ];

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;

    // Save last viewed quote to session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
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
      showRandomQuote();
    });

    formContainer.appendChild(form);
  }

  function createExportButton() {
    const exportButton = document.createElement("button");
    exportButton.textContent = "Export Quotes";
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
    document.body.appendChild(exportButton);
  }

  function createImportButton() {
    const importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = ".json";
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        showRandomQuote();
      };
      reader.readAsText(file);
    });
    document.body.appendChild(importInput);
  }

  createAddQuoteForm();
  createExportButton();
  createImportButton();
  showRandomQuote();

  // Load last viewed quote from session storage (if available)
  const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastViewedQuote) {
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = `"${lastViewedQuote.text}" - <em>${lastViewedQuote.category}</em>`;
  }
});
