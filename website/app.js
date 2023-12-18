/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '548d91dc7eebe8d1345c958f29a86f46&units=imperial';
const userInfo = document.getElementById('userInfo');
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Action once generate button is pressed
generateBtn.addEventListener('click', onGenerateClick);

function onGenerateClick(e) {
    e.preventDefault();

    // Get the user-entered values
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    // If the zipcode is entered, retrieve the current info and remove the invalid class tag
    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');

        getData(baseUrl, zipCode, apiKey)
            .then(data => {
                const newDate = getCurrentDate();
                return postData('/add', { temp: toCelsius(data.main.temp), date: newDate, content: content });
            })
            .then(displayData)
            .catch(handleError);

        userInfo.reset();
    } else {
        generateBtn.classList.add('invalid');
    }
}

/* onGenerateClick() Helper Functions */
function handleError(error) {
    console.log(error);
    alert('You have entered an invalid zip code. Please try again.');
}

function getCurrentDate() {
    const currentDate = new Date();
    return currentDate.toDateString();
}

function toCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'Value is below Absolute Zero';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}

// GET function for weather data
const getData = async (baseUrl, zipCode, apiKey) => {
    try {
        const response = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching weather data:', error);
        throw error;
    }
};

// POST function for weather data
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error posting data:', error);
        throw error;
    }
};

// rendering the data on the webpage
const displayData = async () => {
    try {
        const allData = await fetchData('/all');
        console.log(allData);

        const { date, temp, content } = allData;
        if (date && temp && content) {
            updateElement('date', date);
            updateElement('temp', `${temp} degree C`);
            updateElement('content', content);
        }
    } catch (error) {
        console.log('Error updating UI:', error);
    }
};

/* displayData() helper functions */
const fetchData = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
};

const updateElement = (elementId, value) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = value;
    }
};

