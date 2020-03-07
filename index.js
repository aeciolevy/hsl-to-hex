const toRGB = require('hsl-to-rgb-for-reals')

function max (val, n) {
  return (val > n) ? n : val
}

function min (val, n) {
  return (val < n) ? n : val
}

function cycle (val) {
  // for safety
  val = max(val, 1e7)
  val = min(val, -1e7)
  // cycle value:
  while (val < 0) { val += 360 }
  while (val > 359) { val -= 360 }
  return val
}

function hsl (hue, saturation, luminosity) {
  // resolves degrees to 0 - 359 range
  hue = cycle(hue)

  // enforce constraints
  saturation = min(max(saturation, 100), 0)
  luminosity = min(max(luminosity, 100), 0)

  saturation /= 100
  luminosity /= 100

  // let hsl-to-rgb-for-reals do the hard work
  const rgb = toRGB(hue, saturation, luminosity)
  // convert each value in the returned RGB array
  // to a 2 character hex value, join the array into
  // a string, prefixed with a hash
  return '#' + rgb.map((n) => (256 + n).toString(16).substr(-2)).join('')
}

module.exports = hsl
