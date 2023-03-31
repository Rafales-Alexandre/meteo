export const getTemperaturePercentage = (temperature = 14) => {
  let limitedTemperature = temperature;
  let min = -20;
  let max = 40;

  limitedTemperature = Math.max(min, limitedTemperature);

  limitedTemperature = Math.min(max, limitedTemperature);

  limitedTemperature = limitedTemperature - min;

  return (limitedTemperature * 100) / (max - min);
};

export const getTemperatureHue = (percent) => {
  let min = 0;
  let max = 230;
  return max - (percent * (max - min)) / 100;
};
