const search = document.querySelector(".search");
const image = document.querySelector(".weather-img");
const temperature = document.querySelector(".temp");
const discription = document.querySelector(".dis");
const humidity = document.querySelector(".humidity-info");
const wind = document.querySelector(".wind-info");
const clouds = document.querySelector(".clouds-info");
const map = document.querySelector(".location-info");

let getWeather = async (loc) => {
    try {
        let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=fa4508b45dfc0de9db34767d193ddde7&units=metric`;
        let weatherObj = await fetch(weatherAPI);
        let response = await weatherObj.json();

        if (response.cod !== 200) 
            throw new Error(response.message);

        return response;
    } 
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
};

search.addEventListener("click", () => {
    let loca = document.querySelector(".data").value;

    async function callWeather() {
        let response = await getWeather(loca);
        document.querySelector('.detail').classList.remove('hidden');

        if (!response) {
            document.querySelector('.error').classList.remove('hidden');
            document.querySelector('.ans').classList.add('hidden');
        } else {
            switch (response.weather[0].main) {
                case 'Clear':
                    image.src = './src/images/clear.png';
                    break;
                case 'Rain':
                    image.src = './src/images/rain.png';
                    break;
                case 'Snow':
                    image.src = './src/images/snow.png';
                    break;
                case 'Clouds':
                    image.src = './src/images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = './src/images/mist.png';
                    break;
                default:
                    image.src = './src/images/clouds.png';
            }
            
            temperature.textContent = `${response.main.temp} °C`;
            discription.textContent = response.weather[0].description;
            humidity.textContent = `${response.main.humidity}%`;
            wind.textContent = `${response.wind.speed} m/s`;
            clouds.textContent = `${response.clouds.all}%`;
            map.textContent = `${response.name}, ${response.sys.country}`;

            document.querySelector('.ans').classList.remove('hidden');
            document.querySelector('.error').classList.add('hidden');
        }
    }

    callWeather();
});
