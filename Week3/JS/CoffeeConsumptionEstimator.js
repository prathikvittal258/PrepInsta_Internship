function calculateCoffee() {
    var age = parseInt(document.getElementById('age').value);
    var cupsPerDay = parseFloat(document.getElementById('cupsPerDay').value);
    
    var maxAge = 90; // Maximum age assumption
    var totalCups = Math.round((maxAge - age) * 365 * cupsPerDay);
    
    var resultElement = document.getElementById('result');
    resultElement.textContent = `You will need ${totalCups} cups of coffee to keep you awake until the age of ${maxAge}.`;
}
