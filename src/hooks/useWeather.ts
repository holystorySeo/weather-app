import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/api";

const formatWeatherData = (data: any[]) => {
  const groupedData: Record<string, any[]> = {};

  data.forEach((item) => {
    const { fcstTime, category, fcstValue } = item;

    if (!groupedData[fcstTime]) {
      groupedData[fcstTime] = [];
    }

    groupedData[fcstTime].push({ category, fcstValue });
  });

  return groupedData;
};

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<any>(null);
  const [hourlyWeather, setHourlyWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByLocation = async (newLocation: string) => {
    try {
      setLoading(true);
      setError(null);
      const { currentWeather, hourlyWeather } = await fetchWeather(newLocation);
      setWeather(currentWeather);
      setHourlyWeather(formatWeatherData(hourlyWeather));
    } catch (err) {
      if (err instanceof Error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다: " + err.message);
      } else {
        setError("예기치 않은 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location) return;
    fetchWeatherByLocation(location); // 초기 데이터 가져오기
  }, [location]);

  return { weather, hourlyWeather, loading, error, fetchWeatherByLocation };
};
