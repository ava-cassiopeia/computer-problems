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
    var xmlhttp = new XMLHttpRequest();

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
    var outputElement = document.getElementById("output");

    var firstPartIndex = getRandomRange(0, computerParts.list.length);
    var secondPartIndex = getRandomRange(0, computerParts.list.length);
    var phraseIndex = getRandomRange(0, phrases.list.length);

    var firstPart = computerParts.list[firstPartIndex];
    var secondPart = computerParts.list[secondPartIndex];
    var phrase = phrases.list[phraseIndex];

    var fullPhrase = firstPart + " " + phrase + " " + secondPart + ".";
    fullPhrase = jsUcFirst(fullPhrase);

    outputElement.innerHTML = fullPhrase;
    outputElement.focus();

    animateComputer();
}

function animateComputer() {
    var targetElement = document.querySelector(".computer-wrapper");

    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            targetElement.className = "computer-wrapper animate";

            setTimeout(function() {
                targetElement.className = "computer-wrapper";
            }, 1000);
        });
    });
}