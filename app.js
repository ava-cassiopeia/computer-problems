let computerParts, phrases;

(function() {
    // load data
    ajax("phrases.json", function(response) {
        phrases = JSON.parse(response);
    });

    ajax("computer-parts.json", function(response) {
        computerParts = JSON.parse(response);
    });
})();

function ajax(url, callback) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
               callback(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function jsUcFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generatePhrase() {
    let outputElement = document.getElementById("output");

    let firstPartIndex = getRandomRange(0, computerParts.list.length);
    let secondPartIndex = getRandomRange(0, computerParts.list.length);
    let phraseIndex = getRandomRange(0, phrases.list.length);

    let firstPart = computerParts.list[firstPartIndex];
    let secondPart = computerParts.list[secondPartIndex];
    let phrase = phrases.list[phraseIndex];

    let fullPhrase = firstPart + " " + phrase + " " + secondPart + ".";
    fullPhrase = jsUcFirst(fullPhrase);

    outputElement.innerHTML = fullPhrase;
    outputElement.focus();
}