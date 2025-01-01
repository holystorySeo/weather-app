export const processHourlyWeather = (hourlyWeather: any[]): { time: string; temp: number; rain: number }[] => {
  if (!hourlyWeather || !Array.isArray(hourlyWeather)) {
    console.error("Invalid hourlyWeather:", hourlyWeather);
    return [];
  }
  return hourlyWeather
    .filter((item) => item.category === "TMP" || item.category === "POP") // 필터링 (예: 기온 및 강수 확률)
    .map((item) => ({
      time: item.fcstTime.slice(0, 2) + ":00", // "0900" -> "09:00"
      temp: item.category === "TMP" ? Number(item.fcstValue) : 0,
      rain: item.category === "POP" ? Number(item.fcstValue) : 0, // 강수 확률
    }));
};
