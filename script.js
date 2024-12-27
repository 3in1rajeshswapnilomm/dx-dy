function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculateResult() {
    let display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}

function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support voice input.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('display').value = transcript;
        calculateResult();  // Automatically calculate the result after voice input
    };

    recognition.onerror = function(event) {
        console.error('Voice input error:', event.error);
    };

    recognition.onend = function() {
        console.log('Voice input ended.');
    };

    recognition.start();
}
