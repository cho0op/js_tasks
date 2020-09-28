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
        if (num < 10){
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

    setTimer('.timer', deadline)
});










