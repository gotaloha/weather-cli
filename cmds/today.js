const ora = require('ora');
const getWeather = require('../utils/weather');
const chalk = require('chalk');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    const location = args.location || args.l;
    const weather = await getWeather(location);

    spinner.stop();

    let minTemp = Math.round((weather.data.consolidated_weather[0].min_temp * 9 / 5) + 32),
        maxTemp = Math.round((weather.data.consolidated_weather[0].max_temp * 9 / 5) + 32),
        currentTemp = Math.round((weather.data.consolidated_weather[0].the_temp * 9 / 5) + 32),
        temp = minTemp + "°F - (" + currentTemp + "°F) - " + maxTemp + "°F",
        conditions = weather.data.consolidated_weather[0].weather_state_name,
        wind = Math.round(weather.data.consolidated_weather[0].wind_speed) + " mph from the " + weather.data.consolidated_weather[0].wind_direction_compass;

    console.log(chalk`
{green.bold  #####################################}
{white.bold            Current Weather}
{green.bold  #####################################}
  Conditions : {hex('#888888') ${conditions}}
  Wind       : {hex('#888888') ${wind}}
  Temperature: {hex('#888888') ${temp}}
`);
  } catch (err) {
    spinner.stop();

    console.error(err);
  }
}
