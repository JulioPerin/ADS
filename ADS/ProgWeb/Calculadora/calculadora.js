let UltimoCliqueOperador = true;

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const displayValue = display.value;
    if (displayValue === '' && '+-*/='.includes(value)) {
        // Se o campo de exibição estiver vazio e o valor for um operador, não faça nada
        return;
    }
    if (UltimoCliqueOperador && '+-*/'.includes(value)) {
        // Se o último clique foi um operador e o valor atual também é um operador, substitua o último operador
        display.value = displayValue.substring(0, displayValue.length - 1) + value;
    } else {
        display.value += value;
    }
    UltimoCliqueOperador = '+-*/'.includes(value);
}

function clearDisplay() {
    document.getElementById('display').value = '';
    UltimoCliqueOperador = false;
}

function calculateResult() {
    const displayValue = document.getElementById('display').value;

    // Valida que o campo de exibição não esteja vazio
    if (displayValue === '') { 
        return;
    }

    // Valida que o último caractere não seja um operador
    const lastChar = displayValue.charAt(displayValue.length - 1);
    if ('+-*/'.includes(lastChar)) {
        return;
    }

    try {
        const result = eval(displayValue);
        document.getElementById('display').value = result;
        UltimoCliqueOperador = false;
    } catch (error) {
        document.getElementById('display').value = 'Erro'; 
        setTimeout(function() {
            document.getElementById('display').value = '';
        }, 1000);
    }
}