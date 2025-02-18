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
      quoteContainer.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    }
  
    function createAddQuoteForm() {
      const form = document.createElement("form");
  
      const textInput = document.createElement("input");
      textInput.setAttribute("type", "text");
      textInput.setAttribute("placeholder", "Enter quote");
      textInput.required = true;
      form.appendChild(textInput);
  
      const categoryInput = document.createElement("input");
      categoryInput.setAttribute("type", "text");
      categoryInput.setAttribute("placeholder", "Enter category");
      categoryInput.required = true;
      form.appendChild(categoryInput);
  
      const addButton = document.createElement("button");
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
  
      document.body.appendChild(form);
    }
  
    createAddQuoteForm();
    showRandomQuote();
  });
  