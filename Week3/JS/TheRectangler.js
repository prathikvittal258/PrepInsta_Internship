document.getElementById('calculate').addEventListener('click', function() {
    // Get input values
    let length = parseFloat(document.getElementById('length').value);
    let width = parseFloat(document.getElementById('width').value);

    // Calculate perimeter
    let perimeter = 2 * (length + width);
    displayResult('perimeterResult', `The perimeter is ${perimeter}`);

    // Calculate area
    let area = length * width;
    displayResult('areaResult', `The area is ${area}`);
});

function displayResult(id, message) {
    let resultElement = document.getElementById(id);
    resultElement.innerHTML = `<div class="result"><p>${message}</p></div>`;
}
