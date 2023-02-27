if (!localStorage.getItem('films')) {
  const filmsDBStart = ['The Gentlemen','Avatar: The Way of Water', 'Tulsa King', 'American Made'];
  const filmsDBStorage = JSON.stringify(filmsDBStart);
  localStorage.setItem('films', filmsDBStorage);
}

let filmsDB = JSON.parse(localStorage.getItem('films'));

const filmList = document.querySelector('.film-list');

const sortArr = (arr) => {
  arr.sort();
};

function createFilmList() {
  filmList.innerHTML = "";
  sortArr(filmsDB);

  filmsDB.forEach((film, i) => {
    filmList.innerHTML += `
      <li class="film-item">
          ${i + 1}. ${film}
          <div class="film-delete btn">delete</div>
      </li>
    `;
  });

  document.querySelectorAll('.film-delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();
      filmsDB.splice(i, 1);

      createFilmList();

      let films = JSON.stringify(filmsDB);
      localStorage.setItem('films', films);

      findInput.value = "";
    });
  });
}

function addFilm() {
  if (addFilmInput.value != "") {
    filmsDB.push(addFilmInput.value);

    createFilmList();

    addFilmInput.value = "";

    let films = JSON.stringify(filmsDB);
    localStorage.setItem('films', films);
  }
}

createFilmList();

const addFilmInput = document.querySelector('.film-add'),
  addFilmBtn = document.querySelector('.film-add-btn')

addFilmInput.addEventListener('input', () => {
  addFilmBtn.addEventListener('click', () => {
    addFilm();
  });
});

addFilmInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addFilm();
  }
});

const findInput = document.querySelector('.film-find');
findInput.addEventListener('input', () => {
  let value = findInput.value.trim().toUpperCase();

  const films = document.querySelectorAll('.film-item');

  if (value) {
    films.forEach(film => {
      if (film.innerText.toUpperCase().search(value) == -1) {
        film.classList.add('hide');
      } else {
        film.classList.remove('hide');
      }
    });
  } else {
    films.forEach(film => {
      film.classList.remove('hide');
    });
  }
});