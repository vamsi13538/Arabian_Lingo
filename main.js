// Initializing variables
const translateButton = document.querySelector('.translateButton');
const translateButtonNum = document.querySelector('.translateButtonNum');
const arTranslateSectionInput = document.querySelector('#arTranslateSectionInput');
const enTranslateSectionInput = document.querySelector('#enTranslateSectionInput');
const arLangL = document.querySelector('.arLangL');
const enLangL = document.querySelector('.enLangL');
const enLangR = document.querySelector('.enLangR');
const arLangR = document.querySelector('.arLangR');
const textCharacters = document.querySelector('.textCharacters');
const enCopyIcon = document.querySelector('#enCopyIcon');
const copyFeedback = document.querySelector('.copyFeedback');
const textTab = document.querySelector('.textTab');
const numeralTab = document.querySelector('.numeralTab');
const arAndEnNuContainer = document.querySelector('.arAndEnNuContainer');
const arNukeyBoard = document.querySelector('#arNukeyBoard');
const numeralTabAnchor = document.querySelector('.numeralTab a');
const textTabAnchor = document.querySelector('.textTab a');
const arNumerals = document.querySelectorAll('.enNuContainer li');

// Functionallity to toggle visibility of arabic numerals keypad
$('#arNukeyBoard').on('click', function(){
    $('.arAndEnNuContainer').toggle();
})
// Functionallity to toggle visibility of text inside input area
const textClearIcon = document.querySelector('#textClearIcon');
arTranslateSectionInput.addEventListener('input', clearTextIconVisibility);

function clearTextIconVisibility(){
    const arTranslateSectionInputValue = arTranslateSectionInput.value;
    const splittedString = arTranslateSectionInputValue.length;
    if(arTranslateSectionInputValue === ''){
        textClearIcon.style.display = 'none';
        enTranslateSectionInput.value = '';
        enTranslateSectionInput.placeholder = 'Translation';
        textCharacters.textContent = 0;
    }else{
        textClearIcon.style.display = 'block';
        textCharacters.textContent = `${splittedString}`;
    }
}

// Functionallity to clear text inside input area
textClearIcon.addEventListener('click', clearText);

function clearText(){
    arTranslateSectionInput.value = '';
    enTranslateSectionInput.value = '';
    enTranslateSectionInput.placeholder = 'Translation';
    textClearIcon.style.display = 'none';
    textCharacters.textContent = 0;
}

let sourceLanguageAr = 'AR';
let targetLanguageEn = 'EN';
// Event listener for changing source to ar and target to en
arLangL.addEventListener('click', ()=> {
    arTranslateSectionInput.value = '';
    enTranslateSectionInput.value = '';
    textClearIcon.style.display = 'none';
    enTranslateSectionInput.placeholder = 'Translation';
    sourceLanguageAr = arLangL.dataset.value;
    targetLanguageEn = enLangR.dataset.value;
    enLangL.style.border = 'none';
    arLangR.style.border = 'none';
    arLangL.style.borderBottom = '2px solid green';
    enLangR.style.borderBottom = '2px solid green';
    arTranslateSectionInput.style.textAlign = 'right';
    textClearIcon.style.left = '2%';
    console.log(`Source Lang: ${sourceLanguageAr} | Target Lang: ${targetLanguageEn}`);
    textCharacters.textContent = 0;
})

// Event listener for changing source to en and target to ar
enLangL.addEventListener('click', ()=> {
    arTranslateSectionInput.value = '';
    enTranslateSectionInput.value = '';
    textClearIcon.style.display = 'none';
    enTranslateSectionInput.placeholder = 'Translation';
    sourceLanguageAr = enLangL.dataset.value;
    targetLanguageEn = arLangR.dataset.value;
    arLangL.style.border = 'none';
    enLangR.style.border = 'none';
    enLangL.style.borderBottom = '2px solid green';
    arLangR.style.borderBottom = '2px solid green';
    arTranslateSectionInput.style.textAlign = 'left';
    textClearIcon.style.left = '95%';
    console.log(`Source Lang: ${sourceLanguageAr} | Target Lang: ${targetLanguageEn}`);
    textCharacters.textContent = 0;
})

// Functionallity to copy text to clipboard;
enCopyIcon.addEventListener('click', copyTextToClipBoard);

function copyTextToClipBoard(){
    if (enTranslateSectionInput.value.trim() === '') {
        copyFeedback.textContent = 'Translate text to copy!';
        copyFeedback.style.display = 'block';
        setTimeout(() => {
            copyFeedback.style.display = 'none';
        }, 1500);
    }else{
        enTranslateSectionInput.select();
        // For mobile devices
        // enTranslateSectionInput.setSelectRange(0, 99999);
        // Copy the text through new api method navigator.clipboard.writeText
        navigator.clipboard.writeText(enTranslateSectionInput.value)
        .then(() => {
            copyFeedback.textContent = 'Text Copied to clipboard!';
        copyFeedback.style.display = 'block';
        setTimeout(() => {
            copyFeedback.style.display = 'none';
        }, 1500);
        })
        .catch((err) => {
            console.log('Could not copy text: ',err);
            copyFeedback.textContent = 'Copy failed! Please try again...';
        copyFeedback.style.display = 'block';
        setTimeout(() => {
            copyFeedback.style.display = 'none';
        }, 1500);
        })
    }
}

// Functionallity for text to text translation initially
// document.addEventListener('DOMContentLoaded', ()=> {
    translateButton.addEventListener('click', ()=> {
        translateText(sourceLanguageAr, targetLanguageEn);
    });
// })


// Functionallity to transalte text to text on clicking of text tab
textTab.addEventListener('click', ()=> {
    translateButton.style.display = 'block';
    translateButtonNum.style.display = 'none';
    numeralTab.style.border = '1px solid black';
    numeralTab.style.borderRadius = '0.4rem';
    numeralTab.style.backgroundColor = 'white';
    numeralTabAnchor.style.color = 'black';
    textTab.style.border = '1px solid black';
    textTab.style.borderBottom = '3px solid skyblue';
    textTab.style.backgroundColor = '#2c3e50';
    textTabAnchor.style.color = 'white';
    // Functinallity to translate text
    translateButton.addEventListener('click', ()=> {
        translateText(sourceLanguageAr, targetLanguageEn);
    });
})

function translateText(arabic, english){
    const arTranslateSectionInputValue = arTranslateSectionInput.value;
    if(arTranslateSectionInputValue === ''){
        alert('Please enter text to translate!');
        return;
    }else{
        apiKey = '83292469-b321-4cd3-9ddb-fd047ff6b60b:fx';
        const apiUrl = 'https://api-free.deepl.com/v2/translate';
        const sourceText = arTranslateSectionInputValue;
        const parameters = new URLSearchParams({
            auth_key: apiKey,
            text: sourceText,
            source_lang: arabic,
            target_lang: english,
        });

        enTranslateSectionInput.placeholder = 'Translating...';

        fetch(`${apiUrl}?${parameters.toString()}`)
        .then((res) => res.json())
        .then((data) => {
            const lang = data.translations[0].detected_source_language;
            const text = data.translations[0].text;
            // Consoling out the results
            console.log('Language code: '+lang);
            console.log('Translated text: '+text);
            // Adding result text to english translated area
            enTranslateSectionInput.value = text;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

// Functionality to handle custom en num... ar num...
function translateNumeralsEnToAr() {
    const arTranslateSectionInputValue = arTranslateSectionInput.value;
    if(arTranslateSectionInputValue === ''){
        alert('Please enter numbers to translate!');
        return;
    } else {
        const numeralMap = {
            '0': '٠',
            '1': '١',
            '2': '٢',
            '3': '٣',
            '4': '٤',
            '5': '٥',
            '6': '٦',
            '7': '٧',
            '8': '٨',
            '9': '٩'
        };
    
        const numeralRegex = /[0-9]/g;
        const translatedText = arTranslateSectionInputValue.replace(numeralRegex, match => numeralMap[match] || match);
        enTranslateSectionInput.value = translatedText;
    }
}

// Functionality to handle custom ar num... en num...
function translateNumeralsArToEn() {
const arTranslateSectionInputValue = arTranslateSectionInput.value;

    if (arTranslateSectionInputValue === '') {
        alert('Please enter numbers to translate!');
        return;
    } else {
        const numeralMap = {
            '٠': '0',
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9'
        };

        const numeralRegex = /[٠-٩]/g;
        const translatedText = arTranslateSectionInputValue.replace(numeralRegex, match => numeralMap[match] || match);
        enTranslateSectionInput.value = translatedText;
    }
}

// Functionallity to translate numerals to numberals on selecting numerals tab
numeralTab.addEventListener('click', () => {
    translateButton.style.display = 'none';
    translateButtonNum.style.display = 'block';
    textTab.style.border = '1px solid black';
    textTab.style.borderRadius = '0.4rem';
    textTab.style.backgroundColor = 'white';
    textTabAnchor.style.color = 'black';
    numeralTab.style.border = '1px solid black';
    numeralTab.style.borderBottom = '3px solid skyblue';
    numeralTab.style.backgroundColor = '#2c3e50';
    numeralTabAnchor.style.color = 'white';
    // Remove text translation button event listener and add numeral translation
    // translateButton.removeEventListener('click', translateTextDefault);
    // Functionallity to add arabic numeral in input box
    function addArabicNumeralListeners(){
        arNumerals.forEach((numeral) => {
            numeral.addEventListener('click', arabicNumeralInput);
        })
    }

    function arabicNumeralInput(event){
        const numeral = event.target;
        arTranslateSectionInput.value += numeral.dataset.value;
        textClearIcon.style.display = 'block';
        const arTranslateSectionInputValue = arTranslateSectionInput.value;
        const splittedString = arTranslateSectionInputValue.length;
        textCharacters.textContent = `${splittedString}`;
    }

    addArabicNumeralListeners();

    // Functinallity to add arabic numeral/english number on click of language
    function addEnglishNumeralListeners(){
            arNumerals.forEach((numeral) => {
                numeral.addEventListener('click', englishNumeralInput);
            })
    }

    function englishNumeralInput(event){
        const numeral = event.target;
        arTranslateSectionInput.value += numeral.textContent;
        textClearIcon.style.display = 'block';
        const arTranslateSectionInputValue = arTranslateSectionInput.value;
        const splittedString = arTranslateSectionInputValue.length;
        textCharacters.textContent = `${splittedString}`;
    }

    // Remove all numeral event listeners
    function removeNumeralListeners(){
        arNumerals.forEach((numeral) => {
            numeral.removeEventListener('click', arabicNumeralInput);
            numeral.removeEventListener('click', englishNumeralInput);
        })
    }

    // Initially adding arabicNumerals
    addArabicNumeralListeners();

    // Functionallity to switch to english numbers on clicking english language
    enLangL.addEventListener('click', ()=> {
        removeNumeralListeners();
        addEnglishNumeralListeners();
        textCharacters.textContent = 0;
    })

     // Functionallity to switch to arabic numerals on clicking english language
    arLangL.addEventListener('click', ()=> {
        removeNumeralListeners();
        addArabicNumeralListeners();
        textCharacters.textContent = 0;
    })

    translateButtonNum.addEventListener('click', ()=> {
        if (sourceLanguageAr === 'AR' && targetLanguageEn === 'EN') {
            translateNumeralsArToEn();
        } else if (sourceLanguageAr === 'EN' && targetLanguageEn === 'AR') {
            translateNumeralsEnToAr();
        } else {
            alert('Please select valid source and target languages!');
        }
    });
});

