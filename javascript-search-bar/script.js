const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[data-user-card-container]');
const searchInput = document.querySelector('[data-search]');

let users = [];

const punctuationRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
const spaceRegex = /\s+/g;

searchInput.addEventListener('input', (e) => {
  const value = e.target.value;
  users.forEach((user) => {
    const isVisible = user.name.includes(value) || user.email.includes(value);
    user.element.classList.toggle('hide', !isVisible);
  });
});

// Add fake user data
fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector('[data-header]');
      const body = card.querySelector('[data-body]');
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name.toLowerCase(), email: user.email.toLowerCase(), element: card };
    });
  });
