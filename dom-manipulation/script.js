document.addEventListener("DOMContentLoaded", () => {
  const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Inspirational" },
    // More quotes can be added here
  ];

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
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
      textInput.value = "";
      categoryInput.value = "";
      showRandomQuote();
    });

    formContainer.appendChild(form);
  }

  createAddQuoteForm();
  showRandomQuote();
});
