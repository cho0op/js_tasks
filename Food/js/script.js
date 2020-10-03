document.addEventListener("DOMContentLoaded", () => {
        const tabsContent = document.querySelectorAll('.tabcontent'),
            tabsItems = document.querySelectorAll('.tabheader__item '),
            tabsParent = document.querySelector('.tabheader__items');

        function hideTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });
            tabsItems.forEach(item => {
                item.classList.remove('tabheader__item_active');
            })
        }

        function showTabsContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsItems[i].classList.add('tabheader__item_active')
        }

        tabsParent.addEventListener('click', event => {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabsItems.forEach((item, i) => {
                    if (item === target) {
                        hideTabsContent();
                        showTabsContent(i);
                    }
                })
            }
        });
        hideTabsContent();
        showTabsContent();

        //TIMER

        let deadline = '2020-12-31';

        function addZero(num) {
            if (num < 10) {
                return `0${num}`;
            }
            return num;
        }

        function getRemainingTime(deadline) {
            const currentTime = new Date();
            const totalDifference = Date.parse(deadline) - Date.parse(currentTime),
                days = Math.floor((totalDifference / (1000 * 60 * 60 * 24))),
                hours = Math.floor((totalDifference / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((totalDifference / (1000 * 60)) % 60),
                seconds = Math.floor((totalDifference / (1000)) % 60);
            return {
                'timestamp': totalDifference,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            };
        }

        function setTimer(selector, deadline) {
            const timerEl = document.querySelector(selector),
                daysEl = timerEl.querySelector('#days'),
                hoursEl = timerEl.querySelector('#hours'),
                minutesEl = timerEl.querySelector('#minutes'),
                secondsEl = timerEl.querySelector('#seconds'),
                timerId = setInterval(updateTimer, 1000);

            updateTimer();

            function updateTimer() {
                const time = getRemainingTime(deadline);
                if (time.timestamp <= 0) {
                    clearInterval(timerId);
                    daysEl.innerHTML = 0;
                    hoursEl.innerHTML = 0;
                    minutesEl.innerHTML = 0;
                    secondsEl.innerHTML = 0;
                    return;
                }

                daysEl.innerHTML = addZero(time.days);
                hoursEl.innerHTML = addZero(time.hours);
                minutesEl.innerHTML = addZero(time.minutes);
                secondsEl.innerHTML = addZero(time.seconds);

            }
        }

        setTimer('.timer', deadline);

        //modal
        const modalEl = document.querySelector('.modal'),
            modalBtnOpenEls = document.querySelectorAll('[data-modal]'),
            modalBtnCloseEl = document.querySelector('[data-close]');

        // modalTimerId = setInterval(openModal, 2000);

        function closeModal() {
            modalEl.classList.add('hide');
            modalEl.classList.remove('show');
            document.body.style.overflow = 'visible';
            clearInterval(modalTimerId)
        }

        function openModal() {
            modalEl.classList.add('show');
            modalEl.classList.remove('hide');
            document.body.style.overflow = 'auto';
        }

        function scrollModalEvent() {
            if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + window.pageYOffset) {
                openModal();
                window.removeEventListener('scroll', scrollModalEvent);
                clearInterval(modalTimerId);
            }
        }

        modalBtnOpenEls.forEach(btn => {
            btn.addEventListener('click', () => {
                openModal();
            });
        });

        window.addEventListener('scroll', scrollModalEvent);

        modalBtnCloseEl.addEventListener('click', closeModal);
        modalEl.addEventListener('click', event => {
            if (event.target === modalEl) {
                closeModal();
            }
        });
        document.addEventListener('keydown', event => {
            if (event.code === 'Escape' && modalEl.classList.contains('show')) {
                closeModal();
            }
        });

        function User(name, id) {
            this.name = name;
            this.id = id;

            this.hi = function () {
                console.log(`${this.name} says HI!`)
            }
        }

        const ivan = new User('ivan', 1);
        console.log(ivan);
        User.prototype.exit = function () {
            console.log(`${this.name} says BY!`)
        };
        const obj = {
            name: "kek",
            sayHi: () => {
                console.log(this);
                console.log(`${this.name} says hi`)
            }
        };


        //MENU

        class MenuCard {
            constructor(src, alt, title, description, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.description = description;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.classes = classes
            }

            render() {
                const newElement = document.createElement('div');

                if (this.classes.length === 0) {
                    newElement.classList.add("menu__item") //to add menu_item by default
                } else {
                    this.classes.forEach(function (className) {
                        newElement.classList.add(className);
                    });
                }

                newElement.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
                this.parent.append(newElement)
            }

        }

        new MenuCard(
            'img/tabs/post.jpg',
            'post',
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            430,
            '.menu__field .container',
            'menu__item').render();
        new MenuCard(
            'img/tabs/elite.jpg',
            'elite',
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            550,
            '.menu__field .container',
            'menu__item').render();
        new MenuCard(
            'img/tabs/vegy.jpg',
            'vegy',
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!\n',
            229,
            '.menu__field .container',
            'menu__item').render();
    }
);










