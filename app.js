import { getExpiration } from './helpers/date.js';
const htmlBody = document.querySelector('#body');

const liveSearch = () => {
  let cards = document.querySelectorAll('.card');
  let searchQuery = document.getElementById('searchbox').value;
  cards.forEach((item) => {
    item.textContent.toLowerCase().includes(searchQuery.toLowerCase())
      ? item.classList.remove('is-hidden')
      : item.classList.add('is-hidden');
  });
};

const showInputComponent = (index) => {
  const inputElement = document.querySelectorAll('.card__input')[index];
  inputElement.hidden = inputElement.hidden ? false : true;
  inputElement.select();
  inputElement.setSelectionRange(0, inputElement.value.length);
};

const addClickListener = () => {
  const copyButtonElements = document.querySelectorAll('.card__header__button');
  copyButtonElements.forEach((button, index) =>
    button.addEventListener('click', () => {
      showInputComponent(index);
    })
  );
};

const addCardComponent = (
  {
    image = '',
    shopee = '',
    tokopedia = '',
    url = '',
    title,
    body,
    tag,
    published_date,
  },
  section
) => {
  const isExpired = getExpiration(published_date);
  const cardElement = isExpired
    ? ''
    : `
        <div class="card">
          ${
            section === 'Products'
              ? `<img
          src="${image}"
          alt="${title}"
          class="card__image"
          loading="lazy"
        /> <div class="card__actions">
        <a href="${shopee}" target="_blank" rel="sponsored" class="card__actions__button">Shopee</a>
        <a href="${tokopedia}" target="_blank" rel="sponsored" class="card__actions__button" hidden>Tokopedia</a>
      </div>`
              : ''
          }
          <div class="card__header">
            <a href="${url || shopee}" target="_blank"
        rel="sponsored" class="card__header__title"><h2>${title}</h2></a>
            <button class="card__header__button" >
              <svg class="card__header__button__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            </button>
          </div>
          <input class="card__input" type="text" name="link" id="link" value="${
            url || shopee
          }" hidden>

          <p class="card__body">
            ${body}
          </p>
          <ul class="card__tag">
            ${tag
              ?.map((item) => `<li class="card__tag__item">${item}</li>`)
              .join('')}
          </ul>
        </div>
      `;

  return cardElement;
};

const addSectionComponent = (item) => {
  let cardElement = '';
  item.urls?.forEach((url) => {
    cardElement += addCardComponent(url, item.title);
  });

  const sectionElement = `
    <section class="section">
      <h1 class="section-title">${item.title.toUpperCase()}</h1>
      <div>
        ${cardElement}
      </div>
    </section>

      `;
  htmlBody.innerHTML += sectionElement;
};

fetch('./data/urls.json')
  .then((response) => response.json())
  .then((data) => {
    for (let key in data) {
      addSectionComponent(data[key]);
    }
  })
  .then(() => addClickListener())
  .then(() => {
    // A little delay
    let typingTimer;
    let typeInterval = 500; // Half a second
    let searchInput = document.getElementById('searchbox');

    searchInput.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(liveSearch, typeInterval);
    });
    searchInput.addEventListener('search', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(liveSearch, typeInterval);
    });
  })
  .catch((error) => console.log(error));

console.log('%c Background by Dwinawan ', 'background: #222; color: #bada55');
