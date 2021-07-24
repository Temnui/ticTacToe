//make list of all active elements in array "el"
let el = Array.prototype.slice.call(document.querySelectorAll('div[tabindex]'));
el = el.concat(Array.prototype.slice.call(document.querySelectorAll('button')));
el[4].focus();
let listOfAvailableStrategy = [0,1,2,3,4,5,6,7]

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

    playerMove(index);
}
function Escape() {

}

// =================== end of keyboard navigation
// =================== AI
// set winning conditions
const winingConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
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
    })
    return winner;
}

function chooseStrategy () {
    winingConditions.forEach((elem, index) => {
        if (el[elem[0]].classList.value === 'cross' || el[elem[1]].classList.value === 'cross' || el[elem[2]].classList.value === 'cross') {
            listOfAvailableStrategy = listOfAvailableStrategy.filter(value => {
                return value !== index;
            })
            if (listOfAvailableStrategy.length < 1) {
                win('No one');
            }
        }
    })
}

function aiMove() {
    chooseStrategy();
    if (el[4].classList.value !== 'cross' && Math.random() > 0.5) {
        el[4].classList.add('zero');
    } else {

    }
    if (check()) {
        win('Ai');
    }
}
// =================== end of AI

function win(who) {
    console.log(who);
    /*
    let result = confirm(`${who} is win!
Play one more time, or enough for today`);
    if (result) {
        document.location.reload();
    } else {
        document.location.href = document.location.href.replace('index.html', 'thanks.html');
    }*/
}