//make list of all active elements in array "el"
let el = Array.prototype.slice.call(document.querySelectorAll('div[tabindex]'));
el = el.concat(Array.prototype.slice.call(document.querySelectorAll('button')));
el[4].focus();
let listOfAvailableStrategy = [0, 1, 2, 3, 4, 5, 6, 7];
let chosenStrategy = undefined;
chosenStrategyArr = [];

// =================== keyboard navigation
document.addEventListener('keydown', (event) => {
    if (document.activeElement.tabIndex === -1) {
        el[4].focus();
    }
    document.activeElement.classList.remove('selected');
    if (typeof window[event.key] === 'function') {
        window[event.key](document.activeElement.tabIndex);
    }
});

function ArrowUp(index) {

    if (index >= 4) {
        el[index - 4].focus(); // minus 4 because tabindex starts from 1 not from zero
    }
}

function ArrowRight(index) {

    if (index <= 10) {
        el[index].focus();
    }
}

function ArrowDown(index) {

    if (index < 7) {
        el[index + 2].focus();
    } else {
        el[10].focus();
    }
}

function ArrowLeft(index) {

    if (index > 1) {
        el[index - 2].focus();
    }
}

function Enter(index) {
    if (index < 10) {
        playerMove(index);
    } else if (index === 10) {
        Escape();
    } else {
        document.location.reload();
    }
}

function Escape() {
    document.location.href = document.location.href.replace('index.html', 'thanks.html');
}

// =================== end of keyboard navigation
// =================== AI
// set winning conditions
const winingConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerMove(index) {
    document.activeElement.classList.add('cross');
    check() ? win('Player') : aiMove();
}

function check() {
    let winner = false;
    winingConditions.forEach(elem => {
        if (el[elem[0]].classList.value === 'cross' && el[elem[1]].classList.value === 'cross' && el[elem[2]].classList.value === 'cross') {
            winner = true;
        }
        if (el[elem[0]].classList.value === 'zero' && el[elem[1]].classList.value === 'zero' && el[elem[2]].classList.value === 'zero') {
            winner = true;
        }
    })
    return winner;
}

function chooseStrategy() {
    winingConditions.forEach((elem, index) => {
        if (el[elem[0]].classList.value === 'cross' || el[elem[1]].classList.value === 'cross' || el[elem[2]].classList.value === 'cross') {
            listOfAvailableStrategy = listOfAvailableStrategy.filter(value => {
                return value !== index;
            })
        }
    })
    if (chosenStrategy !== undefined && listOfAvailableStrategy.includes(chosenStrategy)) {
        return chosenStrategy;
    } else if (listOfAvailableStrategy.length > 0) {
        chosenStrategy = listOfAvailableStrategy[Math.floor(Math.random() * listOfAvailableStrategy.length)];
        return chosenStrategy;
    } else {
            win('No one');
            return false;
    }
}

function aiMove() {
    if (!chooseStrategy()) {
        return
    }
    let index = Math.floor(Math.random() * winingConditions[chosenStrategy].length);
    let value = winingConditions[chosenStrategy][index];
    if (el[value].classList.value === 'zero') {
        if (index !== 0) {
            index = 0;
            value = winingConditions[chosenStrategy][index];
            if (el[value].classList.value === 'zero') {
                index = 1;
                value = winingConditions[chosenStrategy][index];
                if (el[value].classList.value === 'zero') {
                    index = 2;
                    value = winingConditions[chosenStrategy][index];
                }
            }
        }
    }
    el[value].classList.add('zero');
    if (check()) {
        win('Ai');
    }
}

// =================== end of AI

function win(who) {
    console.log(who);
    /*
    let result = confirm(`${who} is win!
Play one more time?`);
    if (result) {
        document.location.reload();
    } else {
        Escape();
    }*/
}