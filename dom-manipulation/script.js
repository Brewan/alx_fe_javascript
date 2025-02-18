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

    const form = `
      <form id="quote-form">
        <input type="text" id="quote-text" placeholder="Enter quote" required>
        <input type="text" id="quote-category" placeholder="Enter category" required>
        <button type="submit">Add Quote</button>
      </form>
    `;
    formContainer.innerHTML = form;

    document.getElementById("quote-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const textInput = document.getElementById("quote-text");
      const categoryInput = document.getElementById("quote-category");
      const newQuote = { text: textInput.value, category: categoryInput.value };
      quotes.push(newQuote);
      textInput.value = "";
      categoryInput.value = "";
      showRandomQuote();
    });
  }

  createAddQuoteForm();
  showRandomQuote();
});
