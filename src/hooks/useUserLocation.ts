import { useState, useEffect } from "react";
import axios from "axios";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
              params: {
                format: "json",
                lat: latitude,
                lon: longitude,
              },
            });
            const data = response.data;
            if (data.address && data.address.city) {
              setUserLocation(data.address.city);
            } else {
              setUserLocation("알 수 없는 위치");
            }
          } catch (error) {
            setUserLocation("위치 정보를 가져오는 중 오류 발생");
          }
        },
        () => {
          setUserLocation("현재 위치를 확인할 수 없습니다");
        }
      );
    } else {
      setUserLocation("Geolocation이 지원되지 않습니다");
    }
  }, []);

  return userLocation;
};
