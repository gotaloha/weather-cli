const menus = {
  main: `
    weather [command]

    today .............. show weather for today
    forecast ........... show weather forecast
    version ............ show package version
    help ............... show help menu for a command`,

  today: `
    weather today`,

  forecast: `
  weather forecast`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
