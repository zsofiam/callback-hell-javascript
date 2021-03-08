/* eredeti:
deployBomb();

function deployBomb() {
    clear();
    printText('The bomb goes off in...');
    printText('3...');
    printText('2...');
    printText('1...');
    printText('Boom!');

    console.log('The bomb exploded.');
} */


/* megoldás:
deployBomb();

function deployBomb() {
    // Now it is really easy to see each step
    printText('The bomb goes off in...');
    setTimeout(threeSecLeft, 1000);
}

function threeSecLeft() {
    printText('3...');
    setTimeout(twoSecLeft, 1000);
}

function twoSecLeft() {
    printText('2...');
    setTimeout(oneSecLeft, 1000);
}

function oneSecLeft() {
    printText('1...');
    setTimeout(boom, 1000);
}

function boom() {
    printText('Boom!');
    console.log('The bomb exploded.');
} */

/* rekurzív megoldás:

deployBomb();

function deployBomb() {
    printText('The bomb goes off in...');
    setTimeout(() => tickBomb(3), 1000);
}

function tickBomb(timeLeft) {
    if (timeLeft <= 0) {
        printText('Boom!');
        console.log('The bomb exploded.');
    } else {
        printText(`${timeLeft}...`);
        setTimeout(() => tickBomb(timeLeft - 1), 1000);
    }
} */

// opcionális megoldás :
deployBomb();

function deployBomb() {
    // we set the order of the steps here, every function in
    // .then() is called after the previous one is finished
    initBomb()
        .then(threeSecLeft)
        .then(twoSecLeft)
        .then(oneSecLeft)
        .then(boom);
}

function initBomb() {
    printText('The bomb goes off in...');
    // now we are ready with setting up the bomb, so
    // we return a new `Promise` that is already resolved
    // to be able to use `.then()`
    return Promise.resolve();
}

function threeSecLeft() {
    // we want to print '3...' after 1 second
    // on other projects this `promiseToPrintText` could be
    // an asynchronous function call like `fetch()` to get some data
    return promiseToPrintText('3...');
}

function twoSecLeft() {
    return promiseToPrintText('2...');
}

function oneSecLeft() {
    return promiseToPrintText('1...');
}

function boom() {
    // in this case we create a different callback function
    // as we want to write to the console as well
    return promiseToPrintText('Boom!', (msg) => {
        printText(msg);
        console.log('The bomb exploded.');
    });
}

/*
This function will call the given `callbackFunction` after 1 sec delay
with the `msg` parameter. Default parameter function is `printText`.
 */
function promiseToPrintText(msg, callbackFunction = printText) {
    // this new Promise is automatically resolved after 1 sec
    // and the message is added to the textarea
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                callbackFunction(msg);
                resolve(msg);
            },
            1000);
    });
}