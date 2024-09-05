// Función para convertir un número de una base dada (hasta base 16) a decimal
function convertToDecimal(number, base) {
    let decimalNumber = 0;  // Inicializa el resultado en decimal
    let digits = number.split('').reverse();  // Divide el número en dígitos y lo invierte para procesar desde el dígito menos significativo

    // Itera sobre cada dígito del número
    for (let i = 0; i < digits.length; i++) {
        // Convierte el carácter del dígito en un valor numérico usando base 16 como máximo
        let digit = parseInt(digits[i], 16);

        // Verifica si el dígito es válido para la base dada
        // Si el dígito es mayor o igual a la base, lanza un error
        if (digit >= base) {
            throw new Error("Dígito inválido para la base dada.");
        }

        // Calcula el valor del dígito en su posición actual y lo suma al resultado decimal
        decimalNumber += digit * Math.pow(base, i);
    }

    // Devuelve el número en decimal
    return decimalNumber;
}

// Función para convertir un número decimal a una base dada (hasta base 16)
function convertFromDecimal(decimalNumber, base) {
    if (decimalNumber === 0) return '0';  // Caso especial para el número 0

    let result = '';  // Inicializa el resultado como una cadena vacía
    let digits = '0123456789ABCDEF';  // Caracteres para representar dígitos hasta la base 16

    // Mientras el número decimal sea mayor que 0
    while (decimalNumber > 0) {
        // Obtiene el residuo de la división del número decimal por la base
        let remainder = decimalNumber % base;

        // Prepend el carácter correspondiente al residuo al resultado
        result = digits[remainder] + result;

        // Actualiza el número decimal dividiéndolo por la base y redondeando hacia abajo
        decimalNumber = Math.floor(decimalNumber / base);
    }

    // Devuelve el número convertido en la nueva base
    return result;
}

// Función para realizar la conversión completa y mostrar el resultado
function convert() {
    // Obtiene el valor del número desde el formulario y lo convierte a mayúsculas para bases mayores a 10
    const number = document.getElementById('number').value.toUpperCase();
    const fromBase = parseInt(document.getElementById('fromBase').value);  // Base de origen
    const toBase = parseInt(document.getElementById('toBase').value);  // Base de destino

    try {
        // Convierte el número de la base de origen a decimal
        let decimalNumber = convertToDecimal(number, fromBase);

        // Convierte el número decimal a la base de destino
        let result = convertFromDecimal(decimalNumber, toBase);

        // Muestra el resultado en el elemento HTML con id 'result'
        document.getElementById('result').innerText = result;
    } catch (error) {
        // Muestra el mensaje de error en caso de que ocurra un problema durante la conversión
        document.getElementById('result').innerText = error.message;
    }
}
