import React from "react";
import "../styles/WeatherBackground.css";

interface Props {
  weather: string; // 날씨 상태 (clear, rain, snow, cloudy, overcast 등)
}

const WeatherBackground: React.FC<Props> = ({ weather }) => {
  return (
    <div className="weather-background">
      {weather === "rain" && <RainAnimation />}
      {weather === "clear" && <ClearAnimation />}
      {weather === "snow" && <SnowAnimation />}
      {weather === "cloudy" && <CloudyAnimation />}
      {weather === "overcast" && <OvercastAnimation />}
    </div>
  );
};

const RainAnimation: React.FC = () => (
  <svg className="rain-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    {[...Array(10)].map((_, i) => (
      <line
        key={i}
        x1={Math.random() * 200}
        y1={Math.random() * 200}
        x2={Math.random() * 200}
        y2={Math.random() * 250}
        stroke="blue"
        strokeWidth="2"
        strokeDasharray="4"
      >
        <animate attributeName="y1" from="0" to="200" dur="1s" repeatCount="indefinite" />
        <animate attributeName="y2" from="50" to="250" dur="1s" repeatCount="indefinite" />
      </line>
    ))}
  </svg>
);

const ClearAnimation: React.FC = () => (
  <svg className="clear-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50" fill="yellow">
      <animate attributeName="r" from="40" to="60" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const SnowAnimation: React.FC = () => (
  <svg className="snow-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    {[...Array(10)].map((_, i) => (
      <circle key={i} cx={Math.random() * 200} cy={Math.random() * 200} r="3" fill="white">
        <animate attributeName="cy" from="0" to="200" dur="2s" repeatCount="indefinite" />
        <animate attributeName="cx" values="0;200;0" dur="5s" repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

const CloudyAnimation: React.FC = () => (
  <svg className="cloudy-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    {[...Array(8)].map((_, i) => {
      const randomX = Math.random() * 200;
      const randomY = Math.random() * 100;
      const randomScale = 0.5 + Math.random() * 0.5;
      return (
        <g key={i} transform={`translate(${randomX}, ${randomY}) scale(${randomScale})`}>
          <ellipse cx="0" cy="0" rx="15" ry="10" fill="#b0c4de" />
          <ellipse cx="10" cy="0" rx="15" ry="10" fill="#b0c4de" />
          <ellipse cx="-10" cy="0" rx="15" ry="10" fill="#b0c4de" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${randomX},${randomY};${randomX},${randomY + 5};${randomX},${randomY}`}
            dur={`${2 + Math.random()}s`}
            repeatCount="indefinite"
          />
        </g>
      );
    })}
  </svg>
);

const OvercastAnimation: React.FC = () => (
  <svg className="overcast-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    {[...Array(5)].map((_, i) => {
      const randomX = Math.random() * 200;
      const randomY = Math.random() * 50; // 더 낮게 구름 위치 설정
      const randomScale = 1 + Math.random() * 0.5; // 더 큰 구름 크기
      return (
        <g key={i} transform={`translate(${randomX}, ${randomY}) scale(${randomScale})`}>
          <ellipse cx="0" cy="0" rx="30" ry="20" fill="#a9a9a9" />
          <ellipse cx="20" cy="0" rx="30" ry="20" fill="#a9a9a9" />
          <ellipse cx="-20" cy="0" rx="30" ry="20" fill="#a9a9a9" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${randomX},${randomY};${randomX},${randomY + 10};${randomX},${randomY}`}
            dur={`${4 + Math.random()}s`} // 느린 애니메이션
            repeatCount="indefinite"
          />
        </g>
      );
    })}
  </svg>
);

export default WeatherBackground;
