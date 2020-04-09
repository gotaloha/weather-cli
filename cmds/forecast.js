// module.exports = (args) => {
//   console.log('tomorrow is rainy');
// }

const ora = require('ora');
const moment = require('moment');
const getWeather = require('../utils/weather');
const chalk = require('chalk');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    const location = args.location || args.l;
    const weather = await getWeather(location);

    spinner.stop();

    let minTemp, maxTemp, currentTemp, temp, conditions, wind, date, currentTime;

    for (i = 0; i < weather.data.consolidated_weather.length; i++) {
      minTemp = Math.round((weather.data.consolidated_weather[i].min_temp * 9 / 5) + 32);
      maxTemp = Math.round((weather.data.consolidated_weather[i].max_temp * 9 / 5) + 32);
      currentTemp = Math.round((weather.data.consolidated_weather[i].the_temp * 9 / 5) + 32);
      temp = minTemp + "°F - (" + currentTemp + "°F) - " + maxTemp + "°F";
      conditions = weather.data.consolidated_weather[i].weather_state_name;
      wind = Math.round(weather.data.consolidated_weather[i].wind_speed) + " mph from the " + weather.data.consolidated_weather[i].wind_direction_compass;
      date = weather.data.consolidated_weather[i].applicable_date;

      currentTime = moment(date).format('dddd');

    console.log(chalk`{green.bold  #####################################}
{white.bold   ${currentTime}}
{green.bold  #####################################}
  Conditions:  {hex('#ffff00') ${conditions}}
  Wind:        {hex('#ffff00') ${wind}}
  Temperature: {hex('#ffff00') ${temp}}
`);
    }
  } catch (err) {
    spinner.stop();

    console.error(err);
  }
}
