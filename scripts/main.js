// initialize constants
let poemsTitle = [
    {'poem_abbrev': 'abc', 'poem_title': 'Alphabetical Praise of Women'}, 
    {'poem_abbrev': 'adameve', 'poem_title': 'The Life of Adam and Eve'}, 
    {'poem_abbrev': 'alisaunder', 'poem_title': 'Kyng Alisaunder'}, 
    {'poem_abbrev': 'amiloun', 'poem_title': 'Amis and Amiloun'}, 
    {'poem_abbrev': 'arthur', 'poem_title': 'Of Arthour & of Merlin'}, 
    {'poem_abbrev': 'assumpt', 'poem_title': 'The Assumption of the Blessed Virgin'}, 
    {'poem_abbrev': 'bernard', 'poem_title': 'The Sayings of St Bernard', 'selected': true}, 
    {'poem_abbrev': 'beues', 'poem_title': 'Sir Beues of Hamtoun'}, 
    {'poem_abbrev': 'bodysoul', 'poem_title': 'þe Desputisoun Bitven þe Bodi & þe Soule'}, 
    {'poem_abbrev': 'clerkvirg', 'poem_title': 'The Clerk who would see the Virgin'}, 
    {'poem_abbrev': 'degare', 'poem_title': 'Sir Degare'}, 
    {'poem_abbrev': 'floris', 'poem_title': 'Floris and Blancheflour'}, 
    {'poem_abbrev': 'foes', 'poem_title': 'The Four Foes of Mankind'}, 
    {'poem_abbrev': 'freine', 'poem_title': 'Lay le Freine'}, 
    {'poem_abbrev': 'gregory', 'poem_title': 'The Legend of Pope Gregory'}, 
    {'poem_abbrev': 'guy_cp', 'poem_title': 'Guy of Warwick (couplets)'}, 
    {'poem_abbrev': 'guy_st', 'poem_title': 'Guy of Warwick (stanzas)'}, 
    {'poem_abbrev': 'harrow', 'poem_title': 'The Harrowing of Hell'}, 
    {'poem_abbrev': 'horn', 'poem_title': 'Horn Childe & Maiden Rimnild'}, 
    {'poem_abbrev': 'katerine', 'poem_title': 'Seynt Katerine'}, 
    {'poem_abbrev': 'magdalen', 'poem_title': 'The Life of St Mary Magdalene'}, 
    {'poem_abbrev': 'mergrete', 'poem_title': 'Seynt Mergrete'}, 
    {'poem_abbrev': 'nativity', 'poem_title': 'The Nativity and Early Life of Mary'}, 
    {'poem_abbrev': 'orfeo', 'poem_title': 'Sir Orfeo'}, 
    {'poem_abbrev': 'otuel', 'poem_title': 'Otuel a Kniȝt'}, 
    {'poem_abbrev': 'pater', 'poem_title': 'The Paternoster'}, 
    {'poem_abbrev': 'patrick', 'poem_title': "St Patrick's Purgatory"}, 
    {'poem_abbrev': 'penny', 'poem_title': 'A Peniworþ of Witt'}, 
    {'poem_abbrev': 'philos', 'poem_title': 'The Sayings of the Four Philosophers'}, 
    {'poem_abbrev': 'psalm', 'poem_title': 'Dauid þe King'}, 
    {'poem_abbrev': 'reinbrun', 'poem_title': 'Reinbroun'}, 
    {'poem_abbrev': 'richard', 'poem_title': 'King Richard'}, 
    {'poem_abbrev': 'roland', 'poem_title': 'Roland and Vernagu'}, 
    {'poem_abbrev': 'sages', 'poem_title': 'The Seven Sages of Rome'}, 
    {'poem_abbrev': 'saute', 'poem_title': "How Our Lady's Sauter was First Found"}, 
    {'poem_abbrev': 'simonie', 'poem_title': 'þe Simonie'}, 
    {'poem_abbrev': 'sins', 'poem_title': 'On the Seven Deadly Sins'}, 
    {'poem_abbrev': 'smc', 'poem_title': 'The Anonymous Short English Metrical Chronicle'}, 
    {'poem_abbrev': 'speculum', 'poem_title': 'Speculum Gy de Warewyke'}, 
    {'poem_abbrev': 'tars', 'poem_title': 'The King of Tars'}, 
    {'poem_abbrev': 'thrush', 'poem_title': 'The Thrush and the Nightingale'}, 
    {'poem_abbrev': 'tristrem', 'poem_title': 'Sir Tristrem'}, 
    {'poem_abbrev': 'wenche', 'poem_title': 'þe Wenche þat Loved þe King'},
    ]
const poemsTitleTest = [
    {'poem_abbrev': 'bernard', 'poem_title': 'The Sayings of St Bernard', 'selected': true}, 
]

// initialize empty arrays for data
let properNounsData = []
let lexiconData = []
let testData = []
let textData = {}
let definitionsData = []

function setup () {
	// Charger les données (Attention: opération asynchrone !)
    loadData();
};

function loadData() {
	// Attention, il s'agit d'une opération asynchrone !
	// Une fois les données chargées, la promise sera résolue (.then) et
    // le callback `onDataLoaded` sera appelé en passant les données en paramètre
    filesArray = [
        d3.dsv(',', 'data/lexicon_med_matches.csv'),
        d3.dsv(',', 'data/proper_nouns.csv'),
        d3.dsv(',', 'data/med_definitions.csv'),
        d3.dsv(',', 'data/med_etymologies.csv'),
    ]

    //poemsTitle = poemsTitleTest

    poemsTitle.forEach(poem => {
        poemAbbrev = poem.poem_abbrev
        filesArray.push(d3.text(`data/texts_v2/${poemAbbrev}.txt`))
    });
    
    Promise.all(filesArray).then(function(files){
        onDataLoaded(files)
    })
};

function onDataLoaded(data) {
	// Stocker ces données dans une variable déclarée dans le scope de ce
    // script. Permettant ainsi d'utiliser ces données dans d'autres fonctions
    lexiconData = data[0]
    properNounsData = data[1]
    definitionsData = data[2]
    etymologiesData = data[3]
    

    console.log(etymologiesData)

    for (let i = 0; i < poemsTitle.length; i++) {
        poemAbbrev = poemsTitle[i].poem_abbrev
        textData[poemAbbrev] = data[i+4]
    }

    populatePoemList()
    showSelectedPoem()
    setTooltipPosition()
    scrollToTop()
    

    // remove loading screen
    document.getElementById('loader').style.display = "none";
    document.getElementById('fullPage').style.opacity = 1
    document.getElementById('fullPage').style.transition = 'opacity 1s'
}

// populate poem list
function populatePoemList() {
    poemList = document.getElementById('poemSelection').options
    poemsTitle.sort(compare)
    poemsTitle.forEach(poem => {
        poemList.add(
            new Option(poem.poem_title, poem.poem_abbrev, poem.selected)
        )
    })
}

// sort poem array by title (instead of sorting by abbrev)
function compare(a, b) {
    if ( a.poem_title < b.poem_title ){
        return -1;
    }
    if ( a.poem_title > b.poem_title ){
        return 1;
    }
    return 0;
}

// highlight words of selected etymology
function highlightEtymology() {
    const selectedEtymology = document.getElementById('etymologySelection').value
    const wordsList = document.getElementsByClassName('word')

    console.log(selectedEtymology)

    if (selectedEtymology == 'none') {
        for (var i = 0; i < wordsList.length; i++) {
            wordsList[i].style.color = 'black';
        }
    } else {
        etymologyWordsList = document.getElementsByClassName(selectedEtymology)
        for (var i = 0; i < wordsList.length; i++) {
            wordsList[i].style.color = 'black';
        }
        for (var i = 0; i < etymologyWordsList.length; i++) {
            etymologyWordsList[i].style.color = 'orangered';
        }
    }
}

// show data when clicking on a word
function showWordData() {
    let wordsList = document.getElementsByClassName('word')
    

    for (let i = 0; i < wordsList.length; i++) {
        wordsList[i].addEventListener('click', function() {
            let word = wordsList[i]
            let wordText = word.innerHTML
            wordText = wordText.toLowerCase()

            // remove previous infobox
            console.log('must remove')
            removeInfobox()
            
            if (!word.hasAttribute('id')) {
                // remove highlighting of previous selected word
                let prevSelectedWord = document.getElementById('selectedWord')
    
                if (prevSelectedWord) {
                    prevSelectedWord.removeAttribute('id')
                }

                // highlight selected word
                word.setAttribute('id', 'selectedWord')

                // show the proper noun infobox if the word is a proper noun
                console.log('here')
                isProperNoun = showProperNounInfobox(word, wordText)
                console.log(isProperNoun)

                let wordInLexicon = false
                // show the word infobox check if the word has a match in the database
                for (let j = 0; j < lexiconData.length; j++) {
                    let lexiconWord = lexiconData[j].lexicon_word

                    if (wordText == lexiconWord) {
                        let lexiconMatch = lexiconData[j]
                        showWordInfobox(word, lexiconMatch)
                        wordInLexicon = true
                    }
                }

                if (wordInLexicon == false && isProperNoun == false) {
                    word.removeAttribute('id')
                }
            } else {
                word.removeAttribute('id')
            }
        })   
    }
}

// show word infobox
function showWordInfobox(word, lexiconMatch) {
    const linesTextList = document.getElementsByClassName('line-text')
    lineTextWidth = linesTextList[0].offsetWidth
    console.log(lineTextWidth)

    let medWord = lexiconMatch.med_word
    let medID = lexiconMatch.med_id
    
    let definitionHTML = getEntryDefinition(medID)
    let appearanceHTML = getEntryYears(lexiconMatch)
    let etymologyHTML = getEntryEtymology(lexiconMatch, medID)
    let fullEntryHTML = `<a href="https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED${medID}" target="_blank">See the full entry on the MED &#x2197;</a>`

    let infoboxRows = `
        <tr class='infoboxRow firstRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>MED entry</td><td class='infoboxValue'>${medWord}</td></tr>
        <tr class='infoboxRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>Definition(s)</td><td class='infoboxValue'>${definitionHTML}</td></tr>
        <tr class='infoboxRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>Etymology</td><td class='infoboxValue'>${etymologyHTML}</td></tr>
        <tr class='infoboxRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>Appearance</td><td class='infoboxValue'>${appearanceHTML}</td></tr>
        <tr class='infoboxRow lastRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>Full entry</td><td class='infoboxValue'>${fullEntryHTML}</td></tr>
    `
    word.parentNode.parentNode.insertAdjacentHTML('afterend', infoboxRows)
}

// get number of senses and definitions of an entry
function getEntryDefinition(medID) {
    let entryDefinition = definitionsData.filter(function(d) {return d.med_id == medID})[0]
    let nbrSenses = entryDefinition.nbr_senses
    let entryURL = `<a href="https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED${medID}" target="_blank">MED</a>`
    let definitionHTML = ''
    
    if (nbrSenses > 1) {
        definitionHTML = '<ol>'

        for (let i = 1; i <= nbrSenses; i++) {
            let defID = `def_${i}`
            let definition = entryDefinition[defID]
            definitionHTML += '<li>' + definition + '</li>'
            
            if (i == 3) {
                if (nbrSenses > i) {
                    let remainingSenses = nbrSenses - i
                    definitionHTML += `<li class="list-no-nbr">See ${remainingSenses} other senses on the ${entryURL} &#x2197;</li>`
                }
                break;
            }
        }
        definitionHTML += '</ol>'
    } else {
        definitionHTML = entryDefinition['def_1']
    }

    return definitionHTML
}

// get the etymologies of an entry
function getEntryEtymology(lexiconMatch, medID) {
    let etymologyList = []
    let etymologyHTML = ''
    let entryURL = `<a href="https://quod.lib.umich.edu/m/middle-english-dictionary/dictionary/MED${medID}" target="_blank">MED</a>`
    
    for (let i = 0; i < etymologiesData.length; i++) {
        let languageAbbrev = etymologiesData[i].language_abbrev
        let languageName = etymologiesData[i].language_name

        if (lexiconMatch[languageAbbrev] == 1) {
            etymologyList.push(languageName)
        }

        nbrEtymology = etymologyList.length

        if (nbrEtymology == 0) {
            etymologyHTML = 'Unknown etymology'
        } else if(nbrEtymology == 1) {
            etymologyHTML = etymologyList[0]
        } else if (nbrEtymology > 1) {
            etymologyHTML = '<ul>'
            for (let j = 0; j < etymologyList.length; j++) {
                etymologyHTML += '<li>' + etymologyList[j] + '</li>'
                if (j == 2) {
                    if (nbrEtymology > (j + 1)) {
                        let remainingEtymology = nbrEtymology - (j + 1)
                        etymologyHTML += `<li class="list-no-nbr">See ${remainingEtymology} other etymologies on the ${entryURL} &#x2197;</li>`
                    }
                    break;
                }
            }
            etymologyHTML += '</ul>'
        }
    }

    return etymologyHTML
}

// get the years of apparition of an entry in Middle English
function getEntryYears(lexiconMatch) {
    let earliestYearFrom = lexiconMatch.earliest_year_from
    let earliestYearTo = lexiconMatch.earliest_year_to
    let appearanceHTML = ''

    if (earliestYearFrom == 0) {
        appearanceHTML = 'Year unknown'
    } else if (earliestYearFrom == earliestYearTo) {
        appearanceHTML = earliestYearFrom
    } else {
        appearanceHTML = earliestYearFrom + '-' + earliestYearTo
    }

    return appearanceHTML
}

// remove previous infobox and remove highlight of selected word
function removeInfobox() {
    let previousInfoboxRows = document.getElementsByClassName('infoboxRow')
    if (previousInfoboxRows) {
        while (document.getElementsByClassName('infoboxRow').length > 0) {
            previousInfoboxRows[0].remove()
        }
    }
}

// show the infobox for a proper noun
function showProperNounInfobox(word, wordText) {
    const linesTextList = document.getElementsByClassName('line-text')
    let lineTextWidth = linesTextList[0].offsetWidth
    let isProperNoun = false

    for (let j = 0; j < properNounsData.length; j++) {
        let lexiconWord = properNounsData[j].lexicon_word
        
        // show the proper noun infobox if the word is a proper noun
        if (wordText == lexiconWord) {
            isProperNoun = true
            let infoboxRow = `
                <tr class='infoboxRow firstRow lastRow' style='width:${lineTextWidth}px'><td colspan='2' class='infoboxHeader'>Type</td><td class='infoboxValue'>Proper noun</td></tr>
            `
            word.parentNode.parentNode.insertAdjacentHTML('afterend', infoboxRow)
        }
    }
    return isProperNoun
}

// set the position of tooltip to the right of "Note" (depends on the width of tooltip)
function setTooltipPosition() {
    lineNotesList = document.getElementsByClassName('line-note')

    for (let i = 0; i < lineNotesList.length; i++) {
        let lineNote = lineNotesList[i]
        let lineNoteWidth = lineNote.offsetWidth

        lineNote.addEventListener('mouseover', function() {
            tooltip = lineNote.firstElementChild
            
            if (tooltip) {
                let tooltipWidth = tooltip.offsetWidth
                let width = tooltipWidth - lineNoteWidth
                console.log(tooltipWidth, lineNoteWidth, width)
                tooltip.style['margin-bottom'] = '200px'
            }
        })
    }
}

function scrollToTop() {
    //Get the button
    var topButton = document.getElementById("topButton");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
}

// show selected poem text on the page
function showSelectedPoem() {
    const selectedPoem = document.getElementById('poemSelection').value
    const textLocation = document.getElementById('textContent')
    const etymologySelection = document.getElementById('etymologySelection')
    const poemLength = document.getElementById('poemLength')
    const linesTextList = document.getElementsByClassName('line-text')
    const linesNbrList = document.getElementsByClassName('line-nbr')
    const linesNoteList = document.getElementsByClassName('line-note')
    const borderText = document.getElementById('borderText')
    
    // show text of the poem
    textLocation.innerHTML = textData[selectedPoem]

    // show number of words and lines in the poem
    nbrWordsHTML = "Number of words: " + document.querySelectorAll('.word').length + ".<br>"
    nbrLinesHTML = "Number of lines: " + linesTextList.length
    poemLength.innerHTML = nbrWordsHTML + nbrLinesHTML

    // generate text of selected poem
    showWordData()

    // reset etymology highliter to 'none' when changing to another poem
    etymologySelection.value = 'none'

    // define width of elements in page depending on width of text lines
    // const must be defined after generation of text as these id are generated with the text
    const tableText = document.getElementById('table-text')
    console.log(tableText)

    rowWidth = linesTextList[0].offsetWidth + linesNbrList[0].offsetWidth + linesNoteList[0].offsetWidth
    console.log(rowWidth)
    tableText.setAttribute('style', `max-width:${rowWidth}px`)
    borderText.setAttribute('style', `max-width:${rowWidth}px`)
    //textContent.setAttribute('style', `width:${rowWidth}px`)
}

setup()
