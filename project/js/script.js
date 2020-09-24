/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.querySelector('.promo__adv').remove();

document.querySelector('.promo__genre').textContent = 'драма';

document.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';


let inputEl = document.querySelector('.adding__input');
let movieList = document.querySelector('.promo__interactive-list');


movieDB.movies.sort();
createMovieList(movieDB.movies, movieList);

document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    let newFilmTitle = inputEl.value;
    if (newFilmTitle !== "") {
        if (newFilmTitle.length > 21) {
            newFilmTitle = newFilmTitle.slice(0, 21) + "...";
            console.log(newFilmTitle)
        }
        if (document.querySelector("[type='checkbox']").checked) {
            console.log("Это хороший фильм!")
        }
        movieDB.movies.push(newFilmTitle);
        createMovieList(movieDB.movies, movieList);
        inputEl.value = "";
    }
});


function createMovieList(movieList, parent) {
    parent.innerHTML = "";
    movieDB.movies.sort();
    movieList.forEach((function (elem, i) {
        parent.innerHTML += `<li class="promo__interactive-item">${i + 1}) ${elem} <div class="delete"></div></li>`;
    }));
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', function (elem) {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
        })
    })
}


