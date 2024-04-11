const search = document.querySelector('.search');
const iconSearch = document.querySelector('.icon--search');

const form = document.querySelector('.feedback__form');

form.addEventListener('input', (e) => {
  const elem = e.target.closest('.feedback__input')
  if(elem.value !== "") {
    elem.classList.add('active')
  } else {
    elem.classList.remove('active')
  }
})

search.addEventListener('input', () => {
  if(search.value !== "") {
    search.classList.add('active')
    iconSearch.style.fill = 'var(--color-primary)'
  } else {
    search.classList.remove('active')
    iconSearch.style.fill = 'var(--color-grey)'
  }
})
