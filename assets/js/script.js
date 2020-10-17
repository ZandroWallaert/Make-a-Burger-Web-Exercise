/**
 * Created by jillvandendriessche on 12/14/15.
 */

// toppings array for dynamic future implementation (db)
var toppings = ['salad', 'beef', 'cheddar', 'emmentaler', 'cucumber', 'tomato']; // sort

var addTopping = function (e) {
    e.preventDefault();
    $('.toppings').append('<img class="' + $(this).attr('class') + '" src="images/' + $(this).attr('class') + '.svg" alt="' + $(this).attr('class') + '" title="' + $(this).attr('class') + '" />');
};

var removeTopping = function () {
    $(this).remove();
};

var showNext = function (e) {
    e.preventDefault();
    $(this).closest('fieldset').hide().next().show();
};

var saveData = function (e) {
    console.log('saving')
    e.preventDefault();
    // Get hamburger setup by checking images
    var hamburger = {name: $('#burgername').val(), type: $('[name=buntype]:checked').val()};
    var toppingsSelector = $('.toppings');

    toppings.forEach(function (element, index) { // does not require a native foreach, jquery foreach is fine too (and will work x-browser)
        var found = $(toppingsSelector).find('.' + element).length;
        hamburger[element] = found;
        console.log(found, element);
    });

    var person = {name: $('#name').val(),
        email: $('#email').val(),
        address: $('#address').val(),
        hamburger: hamburger};

    console.log(person);
    saveToLocalStorage(person);
    $(this).find('fieldset').hide();
    $(this).find('fieldset:last-child').show();
};

// Local storage to be ignored fror 2016 - 2017 students
var saveToLocalStorage = function (o) {
    if (typeof Storage !== 'undefined') {
        var storedBurgers = JSON.parse(localStorage.getItem('burgers')) || []; // Naturally students don't need to maintain shorthand notation
        storedBurgers.push(o);
        localStorage.setItem('burgers', JSON.stringify(storedBurgers));
        retrieveFromStorage();
    }
};
var retrieveFromStorage = function () {
    if (typeof Storage !== 'undefined') {
        var storedBurgers = JSON.parse(localStorage.getItem('burgers'));
        if (storedBurgers !== null) {
            $('aside ul').html('');
            storedBurgers.forEach(function (element, index) {
                $('aside ul').append('<li class="' + element.hamburger.type + '">' + element.hamburger.name + '</li>')
            });
            $('aside').show();
        }
    }
};
var generateLinks = function () {
    toppings.sort();
    toppings.forEach(function (element, index) {
        $('.buttons').append('<a href="#" class="' + element + '">' + element + '</a> ')
    });
};

$(document).ready(function () {
    retrieveFromStorage();
    generateLinks();
    $('.settings a:not(.next)').on('click', addTopping);
    $('.toppings').on('click', 'img', removeTopping); // extra punten bij removal
    $('form').on('submit', saveData);
    $('a.next').on('click', showNext);
});
