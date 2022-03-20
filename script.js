/* ************************************
 ** Movie constructor
 ************************************** */

class Movie {
  constructor(title, director, year, minutes, haveSeen = true) {
    this.title = title;
    this.director = director;
    this.year = year;
    this.minutes = minutes;
    this.haveSeen = haveSeen;
    this.id = title;
    this.info = () => {
      let seenStatus;
      if (this.haveSeen) {
        seenStatus = 'seen it';
      } else seenStatus = 'not seen it yet';
      return `This is ${this.title} (${year}) by ${this.director}, it's ${this.minutes} minutes long, and I have ${seenStatus}.`;
    };
    this.remove = () => {
      library.splice(library.indexOf(this), 1);
    };
  }
}

/* ************************************
 ** DOM elements
 ************************************** */

const library = [];
const container = document.getElementById('container');
const modal = document.getElementById('modal');
const movieTitle = document.getElementById('title');
const movieDirector = document.getElementById('director');
const movieYear = document.getElementById('year');
const duration = document.getElementById('duration');
const statusSeen = document.getElementById('seen');
const statusNotSeen = document.getElementById('not-seen');
const btnSubmitMovie = document.getElementById('btn-submit');

/* ************************************
 ** Functions
 ************************************** */

const checkSeen = () => statusNotSeen.checked ? false : true;

const createMovie = () => {
  if (movieTitle.value && movieDirector.value) {
  const addition = new Movie(
    movieTitle.value,
    movieDirector.value,
    movieYear.value,
    duration.value,
    checkSeen()
  );
  return addition;
}
};

const renderMovie = (movie) => {
  const id = movie.title.replaceAll(/\s/g, '-');
  container.insertAdjacentHTML(
    'afterbegin',
    `<div class="col-md-6 col-lg-3 card bg-dark bg-gradient border-warning" id="${movie.id}">
      <div class="card-header pt-4">
        <h5 class="card-title">${movie.title}</h5>
        <h6 class="card-subtitle mb-2">${movie.director}</h6>
        <h6 class="card-subtitle mb-2">${movie.year}</h6>
      </div>
      <div class="card-body">
        <p id='text-${id}' class="card-text">${movie.info()}</p>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-success mx-1" id="btn-seen-${id}"></button>
          <button type="button" class="btn btn-danger mx-1" id='btn-danger-${id}'>Delete</button>
        </div>
      </div>
    </div>`
  );

  const btnRemove = document.getElementById(`btn-danger-${id}`);
  const btnSeen = document.getElementById(`btn-seen-${id}`);
  const movieDescription = document.getElementById(`text-${id}`);

  if (checkSeen()) {
    btnSeen.innerText = 'Seen';
  } else {
    btnSeen.innerText = 'Not seen';
  }

  btnSeen.addEventListener('click', () => {
    movie.haveSeen = !movie.haveSeen;
    if (btnSeen.innerText === 'Seen') {
      btnSeen.innerText = 'Not seen';
    } else {
      btnSeen.innerText = 'Seen';
    }
    movieDescription.innerText = movie.info();
  });

  btnRemove.addEventListener('click', () => {
    movie.remove();
    document.getElementById(`${movie.title}`).remove();
  });
};

const submitMovie = () => {
  library.push(createMovie());
  renderMovie(library[library.length - 1]);
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = '';
    input.checked = false;
  });
};

const renderLibrary = () => {
  for (i = 0; i < library.length; i++) {
    renderMovie(library[i]);
  }
};

/* ************************************
 ** Default library setup
 ************************************** */

const enterTheVoid = new Movie('Enter the Void', 'Gaspar Noé', 2009, 161);
const oldboy = new Movie('Oldboy', 'Park Chan-wook', 2003, 120);

library.push(enterTheVoid, oldboy);

renderLibrary();

/* ************************************
 ** Event listeners
 ************************************** */

btnSubmitMovie.addEventListener('click', submitMovie);
