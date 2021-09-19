const cardsElement = document.querySelector('.cards');

const showInput = (index) => {
  const inputElement = document.querySelectorAll('.card__input')[index];
  inputElement.hidden = inputElement.hidden ? false : true;
  inputElement.select();
  inputElement.setSelectionRange(0, inputElement.value.length);
};

fetch('./data/links.json')
  .then((response) => response.json())
  .then((data) => {
    data?.links.map((link) => {
      const cardElement = `
         <div class="card">
          <div class="card__header">
            <a href="${link?.url}" rel="external" class="card__header__title">${link?.title}</a>
            <button class="card__header__button" >
              <svg class="card__header__button__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </button>
          </div>
          <input class="card__input" type="text" name="link" id="link" value="${link?.url}" hidden>
          <p class="card__body">
            ${link?.body}
          </p>
        </div>
      `;
      cardsElement.innerHTML += cardElement;
    });
  })
  .then(() => {
    const copyButtonElements = document.querySelectorAll(
      '.card__header__button'
    );
    copyButtonElements.forEach((button, index) =>
      button.addEventListener('click', () => {
        showInput(index);
      })
    );
  })
  .catch((error) => console.log(error));
