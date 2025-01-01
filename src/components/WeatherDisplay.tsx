import React from "react";
import "../styles/WeatherDisplay.css";

interface WeatherData {
  [fcstTime: string]: { category: string; fcstValue: string }[];
}

interface Props {
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<Props> = ({ weatherData }) => {
  const categoryLabels: Record<string, string> = {
    TMP: "기온",
    SKY: "하늘 상태",
    PTY: "강수 형태",
    REH: "습도",
    PCP: "강수량",
  };

  const formatCategoryValue = (category: string, value: string): string => {
    if (category === "SKY") {
      const skyMap: Record<string, string> = {
        "1": "맑음",
        "3": "구름 많음",
        "4": "흐림",
      };
      return skyMap[value] || value;
    }

    if (category === "PTY") {
      const ptyMap: Record<string, string> = {
        "0": "없음",
        "1": "비",
        "2": "비/눈",
        "3": "눈",
        "4": "소나기",
      };
      return ptyMap[value] || value;
    }

    return value;
  };

  return (
    <div className="weather-container">
      {Object.entries(weatherData).map(([time, details]) => (
        <div key={time} className="weather-block">
          <h3>{time.slice(0, 2)}:00</h3>
          <ul>
            {details
              .filter(({ category }) => categoryLabels[category])
              .map(({ category, fcstValue }) => (
                <li key={category}>
                  {categoryLabels[category]}: {formatCategoryValue(category, fcstValue)}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
