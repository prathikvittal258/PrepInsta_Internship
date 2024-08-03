function calculatePetAge() {
    var petAge = parseInt(document.getElementById('petAge').value);
    var conversionRate = parseInt(document.getElementById('conversionRate').value);

    var petYears = petAge * conversionRate;

    var resultText = `Your pet is ${petYears} years old in pet years!`;

    document.getElementById('result').textContent = resultText;
}
