import React from "react";
import "../styles/WeatherDisplay.css";

interface Props {
  weather: { category: string; fcstValue: string }[] | null;
  locationName: string;
  error?: string | null;
}

const CurrentWeather: React.FC<Props> = ({ weather, locationName, error }) => {
  if (error) {
    return (
      <div>
        <p className="weather-header">{locationName}의 현재 날씨</p>
        <div className="current-weather error">
          <p>⛔ {error}</p>
        </div>
      </div>
    );
  }

  if (!weather || weather.length === 0) {
    return (
      <div>
        <p className="weather-header">{locationName}의 현재 날씨</p>
        <div className="current-weather">
          <p>❓ 날씨 데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const formattedWeather: Record<string, string> = {};
  weather.forEach(({ category, fcstValue }) => {
    if (category === "SKY") {
      const skyMap: Record<string, string> = {
        "1": "맑음",
        "3": "구름 많음",
        "4": "흐림",
      };
      formattedWeather[category] = skyMap[fcstValue] || fcstValue;
    } else if (category === "PTY") {
      const ptyMap: Record<string, string> = {
        "0": "없음",
        "1": "비",
        "2": "비/눈",
        "3": "눈",
        "4": "소나기",
      };
      formattedWeather[category] = ptyMap[fcstValue] || fcstValue;
    } else {
      formattedWeather[category] = fcstValue;
    }
  });

  const calculateFeelsLike = (temp: number, windSpeed: number): number => {
    return Math.round(
      13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)
    );
  };

  return (
    <div>
      <p className="weather-header">{locationName}의 현재 날씨</p>
      <div className="current-weather">
        <div className="weather-summary">
          <p>🌡️ 온도: {formattedWeather["TMP"] || "N/A"}°C</p>
        </div>
        <div className="weather-summary">
          <p>
            🧥 체감 온도:{" "}
            {formattedWeather["TMP"] && formattedWeather["WSD"]
              ? calculateFeelsLike(Number(formattedWeather["TMP"]), Number(formattedWeather["WSD"]))
              : "N/A"}
            °C
          </p>
        </div>
        <div className="weather-summary">
          <p>☁️ 하늘 상태: {formattedWeather["SKY"] || "N/A"}</p>
        </div>
        <div className="weather-summary">
          <p>💧 습도: {formattedWeather["REH"] || "N/A"}%</p>
        </div>
        <div className="weather-summary">
          <p>💨 풍속: {formattedWeather["WSD"] || "N/A"} m/s</p>
        </div>
        <div className="weather-summary">
          <p>🌧️ 강수량: {formattedWeather["RN1"] || "강수 없음"}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
