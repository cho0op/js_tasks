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

movieDB.movies.sort();


let listItems = document.querySelectorAll('.promo__interactive-item');
listItems.forEach(function (item, itemNumber) {
    item.textContent = `${itemNumber + 1}) ` + movieDB.movies[itemNumber];
});


document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault();
    let inputField = document.querySelector(".adding__input");
    let newFilmTitle = inputField.value;
    if (newFilmTitle !== "") {
        if(newFilmTitle.length>5){
            newFilmTitle.slice(0, 5);
            console.log(newFilmTitle)
        }
        let filmsList = document.querySelectorAll('.promo__interactive-item');
        let newFilmItem = document.createElement('li');
        newFilmItem.classList.add(filmsList[0].classList[0]);
        newFilmItem.innerText = `${filmsList.length + 1}) ${newFilmTitle}`;
        document.querySelector('.promo__interactive-list').append(newFilmItem);
        movieDB.movies.push(newFilmTitle);
        inputField.value = "";
    }

});


