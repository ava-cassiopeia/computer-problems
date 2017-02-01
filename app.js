var computerParts, phrases, endingPunctuation;

(function() {
    // load data
    ajax("phrases.json", function(response) {
        phrases = JSON.parse(response);
    });

    ajax("computer-parts.json", function(response) {
        computerParts = JSON.parse(response);
    });

    ajax("ending-punctuation.json", function(response) {
        endingPunctuation = JSON.parse(response);
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
    var punctIndex = getRandomRange(0, endingPunctuation.list.length);

    var firstPart = computerParts.list[firstPartIndex];
    var secondPart = computerParts.list[secondPartIndex];
    var phrase = phrases.list[phraseIndex];
    var punctuation = endingPunctuation.list[punctIndex];

    phrase = firstPart.plural ? (phrase.plural ? phrase.plural : phrase.singular) : phrase.singular;

    var fullPhrase = firstPart.name + " " + phrase + " " + secondPart.name + punctuation;
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