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
              <svg class="card__header__button__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
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
