import { BASE_URL } from "./info.js";

fetch(`${BASE_URL}/books`)
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(data => {
        console.log(data);

        const bookList = document.querySelector("#book-list");
        const fragment = document.createDocumentFragment();

        data.results.forEach(book => {
            const article = document.createElement("article");

            // Get author names
            const authorNames = book.authors.map(author => author.name).join(", ");

            // Build article content
            article.innerHTML = `
                <img loading="lazy" src="${book.formats['image/jpeg']}" alt="cover of ${book.title}">
                <div>
                    <header>
                        <h2>${book.title.split(";")[0]}</h2>
                        <h3>${authorNames}</h3>
                    </header>
                    <p>${Array.isArray(book.summaries) && book.summaries.length > 0
                        ? book.summaries[0].slice(0, 160) + "..."
                        : "No summary available"}
                    </p>
                    <a href="${book.formats['text/html']}" target="_blank">Read book</a>
                </div>
            `;

            fragment.appendChild(article);
        });

        bookList.appendChild(fragment);
    })
    .catch(error => console.log(error));