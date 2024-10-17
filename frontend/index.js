import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const targetLanguage = document.getElementById('targetLanguage');
const outputText = document.getElementById('outputText');
const speakButton = document.getElementById('speakButton');
const history = document.getElementById('history');
const clearHistoryButton = document.getElementById('clearHistoryButton');

let translationTimeout;

async function translateText() {
    const text = inputText.value;
    const lang = targetLanguage.value;

    if (text.trim() === '') {
        outputText.textContent = '';
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
        const data = await response.json();
        const translation = data.responseData.translatedText;
        outputText.textContent = translation;

        // Add translation to history
        const id = Date.now().toString();
        await backend.addTranslation(id, {
            original: text,
            translated: translation,
            targetLanguage: lang
        });

        updateHistory();
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'Translation error occurred.';
    }
}

function debounceTranslation() {
    clearTimeout(translationTimeout);
    translationTimeout = setTimeout(translateText, 300);
}

function speakTranslation() {
    const text = outputText.textContent;
    const lang = targetLanguage.value;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech is not supported in your browser.');
    }
}

async function updateHistory() {
    const translations = await backend.getTranslations();
    history.innerHTML = '<h2>Translation History</h2>';
    translations.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'history-entry';
        div.innerHTML = `
            <p><strong>Original:</strong> ${entry.original}</p>
            <p><strong>Translated (${entry.targetLanguage}):</strong> ${entry.translated}</p>
        `;
        history.appendChild(div);
    });

    // Update clear history button visibility
    const historySize = await backend.getHistorySize();
    clearHistoryButton.style.display = historySize > 0 ? 'block' : 'none';
}

async function clearHistory() {
    await backend.clearHistory();
    updateHistory();
}

inputText.addEventListener('input', debounceTranslation);
targetLanguage.addEventListener('change', translateText);
speakButton.addEventListener('click', speakTranslation);
clearHistoryButton.addEventListener('click', clearHistory);

// Initial history update
updateHistory();
