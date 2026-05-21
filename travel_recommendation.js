function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('results-container');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Task 7: Accept keyword variations like 'beach', 'temple', or 'country'
            if (input === 'beach' || input === 'beaches') {
                displayResults(data.beaches);
            } else if (input === 'temple' || input === 'temples') {
                displayResults(data.temples);
            } else if (input === 'country' || input === 'countries') {
                // For countries, we display cities within the countries
                const allCities = data.countries.flatMap(country => country.cities);
                displayResults(allCities);
            } else {
                resultDiv.innerHTML = 'Keyword not found. Please try "beach", "temple", or "country".';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

// Task 8: Function to display at least two recommendations
function displayResults(results) {
    const resultDiv = document.getElementById('results-container');
    results.forEach(item => {
        resultDiv.innerHTML += `
            <div class="result-card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button>Visit</button>
            </div>
        `;
    });
}

document.getElementById('btnSearch').addEventListener('click', searchCondition);
document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('conditionInput').value = '';
    document.getElementById('results-container').innerHTML = '';
});