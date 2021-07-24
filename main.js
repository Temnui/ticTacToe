//make list of all active elements in array "el"
let el = Array.prototype.slice.call(document.querySelectorAll('div[tabindex]'));
el = el.concat(Array.prototype.slice.call(document.querySelectorAll('button')));
console.log(el);
el[4].focus();

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
    console.log('ArrowUp');
    if (index >= 4) {
        el[index - 4].focus(); // minus 4 because tabindex starts from 1 not from zero
    }
}
function ArrowRight(index) {
    console.log('ArrowRight');
    if (index <= 10) {
        el[index].focus();
    }
}
function ArrowDown(index) {
    console.log('ArrowDown');
    if (index < 7) {
        el[index + 2].focus();
    } else {
        el[10].focus();
    }
}
function ArrowLeft(index) {
    console.log('ArrowLeft');
    if (index > 1) {
        el[index - 2].focus();
    }
}
function Enter(index) {
    console.log(`Enter, index is: ${index}`);
}
function Escape() {
    console.log('Escape');
}

// =================== end of keyboard navigation
// =================== AI
// set winning conditions

// =================== end of AI