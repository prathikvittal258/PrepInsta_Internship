document.getElementById('fortuneForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const children = document.getElementById('children').value;
    const partner = document.getElementById('partner').value;
    const location = document.getElementById('location').value;
    const job = document.getElementById('job').value;
    tellFortune(children, partner, location, job);
});

document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('fortunes').innerHTML = '';
});

function tellFortune(children, partner, location, job) {
    const fortune = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    const fortuneDiv = document.createElement('div');
    fortuneDiv.className = 'fortune';
    fortuneDiv.textContent = fortune;
    document.getElementById('fortunes').appendChild(fortuneDiv);
}

// Call the function three times with different values for initial display
tellFortune(2, 'Alex', 'New York', 'Software Developer');
tellFortune(3, 'Taylor', 'London', 'Artist');
tellFortune(1, 'Jordan', 'Tokyo', 'Chef');
