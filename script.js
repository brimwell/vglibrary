/*Create Core Array and Constructor */

const myLibrary = [];

function VGame(title, developer, year, hrs, image) {
    this.title = title;
    this.developer = developer;
    this.year = year;
    this.hrs = hrs;
    this.image = image;
    this.played = false;
    this.info = function() {
        return `${name} was developed by ${developer} and released in ${year}. It takes ${hrs} hours to complete.`;
    };
}

function addGameToLibrary(game) {
    myLibrary.push(game);
}

const lastOfUs = new VGame('Last of Us Part I', 'Naughty Dog', 2022, 24, 'images/lastofus.webp');
const stickIt = new VGame('Stick It To The Man', 'Zoink!', 2013, 5.5, 'images/stickit.webp');
const hotlineMiami = new VGame('Hotline Miami', 'Dennaton Games', 2012, 15.5, 'images/hotline.webp');
const re5 = new VGame('Resident Evil 5', 'Capcom', 2009, 34.5, 'images/re5.webp');
const callistoProtocol = new VGame('The Callisto Protocol', 'Striking Distance Studios', 2022, 15.5, 'images/callisto.webp');

addGameToLibrary(lastOfUs);
addGameToLibrary(stickIt);
addGameToLibrary(hotlineMiami);
addGameToLibrary(re5);
addGameToLibrary(callistoProtocol);

/* Posting Library onto WebPage */
let library = document.querySelector('.library');

function publishLibrary(arr) {
    library.textContent = '';
    let i = 0;
    arr.forEach(game => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('gameCard');    
        newDiv.id = i;
        i++;

        const newImg = document.createElement('img');
        if (game.image === undefined) {
            newImg.src = 'images/placeholder.webp';
        } else {
            newImg.src = game.image;
        }
        newImg.alt = game.title;
        
        const title = document.createElement('p');
        title.className = 'title';
        title.textContent = game.title;

        const developer = document.createElement('p');
        developer.className = 'developer';
        developer.textContent = game.developer;

        const year = document.createElement('p');
        year.className = 'year';
        year.textContent = game.year;

        const hrs = document.createElement('p');
        hrs.className = 'hrs';
        hrs.textContent = 'Hours to fully complete:';

        const hour = document.createElement('p');
        hour.className = 'hour';
        hour.textContent = game.hrs;

        const playedBtn = document.createElement('button');
        playedBtn.className = 'wasPlayed';
        playedBtn.textContent = 'Played?';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.textContent = 'Remove Game';

        const buttonRow = document.createElement('div');
        buttonRow.className = 'buttonrow';
        buttonRow.appendChild(playedBtn);
        buttonRow.appendChild(removeBtn);

        newDiv.appendChild(newImg);
        newDiv.appendChild(title);
        newDiv.appendChild(developer);
        newDiv.appendChild(year);
        newDiv.appendChild(hrs);
        newDiv.appendChild(hour);
        newDiv.appendChild(buttonRow);

        library.appendChild(newDiv);
    });

    let removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(function(button) {
        button.addEventListener('click', function() {
            let indicator = this.parentElement.id;
            this.parentElement.remove();
            myLibrary.splice(indicator, 1);
        });
    })

    let playedBtns = document.querySelectorAll('.wasPlayed');
    playedBtns.forEach(function(button) {
        button.addEventListener('click', function() {
            let i = this.parentElement.parentElement.id;
            this.parentElement.parentElement.classList.toggle('played');
            if (myLibrary[i].played === false) {
                myLibrary[i].played = true;
            } else {
                myLibrary[i].played = false;
            }
        })
    })
}

publishLibrary(myLibrary);


/* ADD A GAME BUTTON */
const addBtn = document.querySelector('#addGame');
const modal = document.querySelector('.newGameForm');

addBtn.addEventListener('click', addGameModal);

function addGameModal() {
    modal.classList.toggle('hidden');
    newName.value = '';
    newDev.value = '';
    newYear.value = '';
    newHrs.value = '';
}

/* Pulling form data and creating new library 'game' */
let submitBtn = document.querySelector('#submit');
let newName = document.querySelector('#title');
let newDev = document.querySelector('#developer');
let newYear = document.querySelector('#year');
let newHrs = document.querySelector('#hrs');

 submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (newName.value === '' || newDev.value === '' || newYear.value === '' ||
        newHrs.value === '') {
            alert('You need to fill out all fields before we can add this game.');
        } else {
    let newGame = new VGame(newName.value, newDev.value, newYear.value, newHrs.value);
    addGameToLibrary(newGame);
    publishLibrary(myLibrary);

    modal.classList.toggle('hidden');
        };
 })

 /* Modal Cancel Button */
 let cancelBtn = document.querySelector('#cancel');

 cancelBtn.addEventListener('click', function() {
    modal.classList.toggle('hidden');
 })

/* Played */