import React, { useCallback, useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useFavorites } from "../hooks/useFavorites";
import { useUserLocation } from "../hooks/useUserLocation";
import SearchBar from "../components/SearchBar";
import FavoriteLocations from "../components/FavoriteLocations";
import CurrentWeather from "../components/CurrentWeather";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherBackground from "../components/WeatherBackground";

let lastLocation: string | null = null; // 마지막으로 호출된 위치를 추적

const Home: React.FC = () => {
  const [location, setLocation] = useState(""); // 현재 위치 또는 검색된 위치
  const [searchLocation, setSearchLocation] = useState<string | null>(null); // 검색된 위치 상태
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태
  const [weatherCondition, setWeatherCondition] = useState("clear"); // 날씨 상태를 상태로 관리
  const userLocation = useUserLocation(); // 현재 위치 가져오기
  const { weather, hourlyWeather, loading, error, fetchWeatherByLocation } = useWeather(location); // error 상태 포함
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 추가

  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

  // 날씨 상태를 계산하여 상태 업데이트
  useEffect(() => {
    if (weather) {
      const condition = weather.find(
        (item: { category: string }) => item.category === "SKY" || item.category === "PTY"
      )?.fcstValue;

      if (condition) {
        // SKY 값과 PTY 값을 해석해서 weatherCondition에 반영
        if (condition === "1") {
          setWeatherCondition("clear");
        } else if (condition === "3") {
          setWeatherCondition("cloudy");
        } else if (condition === "4") {
          setWeatherCondition("overcast");
        } else if (["2", "3"].includes(condition)) {
          setWeatherCondition("rain");
        } else {
          setWeatherCondition("clear");
        }
      }
    }
  }, [weather]);

  // 5분마다 날씨 데이터 갱신
  useEffect(() => {
    const updateWeather = async () => {
      if (!location || location === lastLocation) return;

      try {
        await fetchWeatherByLocation(location);
        lastLocation = location;
      } catch (err) {
        console.error("Failed to update weather:", err);
      }
    };

    updateWeather(); // 초기 호출

    const interval = setInterval(updateWeather, 300000);
    return () => clearInterval(interval);
  }, [fetchWeatherByLocation, location]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleSearch = (newLocation: string) => {
    if (location !== newLocation) {
      setLocation(newLocation);
      setSearchLocation(newLocation);
    }
  };

  const handleSelectFavorite = useCallback(
    (favoriteLocation: string) => {
      if (location !== favoriteLocation) {
        setLocation(favoriteLocation);
        setSearchLocation(favoriteLocation);
      }
    },
    [location]
  );

  const handleResetToCurrentLocation = () => {
    if (userLocation && location !== userLocation) {
      setLocation(userLocation);
      setSearchLocation(null);
      setSearchInput("");
    }
  };

  return (
    <div className="app">
      {!loading && <WeatherBackground weather={weatherCondition} />}

      <div className="main-content">
        <SearchBar value={searchInput} onChange={setSearchInput} onSearch={handleSearch} />

        <div className="button-container">
          <button onClick={() => addFavorite(location)}>즐겨찾기에 추가</button>
          <button onClick={handleResetToCurrentLocation}>현재 위치로 돌아가기</button>
        </div>

        <div className="location-container">
          <h2>현재 위치: {userLocation}</h2>
          <h2>검색된 위치: {searchLocation}</h2>
        </div>

        <div className="loading-container">{loading && <p>날씨 데이터를 불러오는 중...</p>}</div>

        {weather || error ? (
          <CurrentWeather weather={weather} locationName={searchLocation || userLocation || "서울"} error={error} />
        ) : (
          <p>❓ 데이터를 불러오는 중입니다.</p>
        )}
        {hourlyWeather && <WeatherDisplay weatherData={hourlyWeather} />}
      </div>
      {/* 사이드바 */}
      <aside className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <FavoriteLocations favorites={favorites} onSelect={handleSelectFavorite} onRemove={removeFavorite} />
      </aside>

      {/* 토글 버튼 */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "닫기" : "메뉴"}
      </button>
    </div>
  );
};

export default Home;
