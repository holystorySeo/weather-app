import axios from "axios";

const KOREA_WEATHER_API_KEY =
  process.env.REACT_APP_KOREA_WEATHER_API_KEY ??
  (() => {
    throw new Error("환경 변수 REACT_APP_KOREA_WEATHER_API_KEY가 설정되지 않았습니다.");
  })();
const KOREA_WEATHER_BASE_URL =
  process.env.REACT_APP_KOREA_WEATHER_BASE_URL ??
  (() => {
    throw new Error("환경 변수 REACT_APP_KOREA_WEATHER_BASE_URL가 설정되지 않았습니다.");
  })();
const GOOGLE_GEOCODING_API_KEY =
  process.env.REACT_APP_GOOGLE_GEOCODING_API_KEY ??
  (() => {
    throw new Error("환경 변수 REACT_APP_GOOGLE_GEOCODING_API_KEY가 설정되지 않았습니다.");
  })();
const GOOGLE_GEOCODING_BASE_URL =
  process.env.REACT_APP_GOOGLE_GEOCODING_BASE_URL ??
  (() => {
    throw new Error("환경 변수 REACT_APP_GOOGLE_GEOCODING_BASE_URL가 설정되지 않았습니다.");
  })();

const RE = 6371.00877; // 지구 반경 (km)
const GRID = 5.0; // 격자 간격 (km)
const SLAT1 = 30.0; // 투영 위도1 (degree)
const SLAT2 = 60.0; // 투영 위도2 (degree)
const OLON = 126.0; // 기준점 경도 (degree)
const OLAT = 38.0; // 기준점 위도 (degree)
const XO = 43; // 기준점 X좌표 (GRID)
const YO = 136; // 기준점 Y좌표 (GRID)

const DEGRAD = Math.PI / 180.0;

const latLonToGrid = (lat: number, lon: number) => {
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (sf ** sn * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / ro ** sn;

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / ra ** sn;
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx: x, ny: y };
};

const getBaseDate = (): string => {
  const now = new Date();

  // 기준 시각을 계산
  const baseTime = getBaseTime();

  // 기준 시각이 "2300"이면 전일로 변경
  if (baseTime === "2300") {
    now.setDate(now.getDate() - 1);
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${date}`;
};

const getBaseTime = (): string => {
  const now = new Date();
  const baseTimes = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"]; // 발표 기준 시간

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  let closestBaseTime = baseTimes[baseTimes.length - 1]; // 기본값: 전일의 마지막 발표 시간

  for (let i = 0; i < baseTimes.length; i++) {
    const baseHour = parseInt(baseTimes[i].slice(0, 2), 10);
    const baseMinute = parseInt(baseTimes[i].slice(2), 10);

    // 발표 기준 시간의 10분 이후부터 현재 기준 시간으로 간주
    if (
      (currentHour > baseHour || (currentHour === baseHour && currentMinute >= baseMinute + 10)) &&
      (i === baseTimes.length - 1 || currentHour < parseInt(baseTimes[i + 1].slice(0, 2), 10))
    ) {
      closestBaseTime = baseTimes[i];
      break;
    }
  }

  // 새벽 2시 이전에는 전일 23:00 데이터 사용
  if (currentHour < 2 || (currentHour === 2 && currentMinute < 10)) {
    closestBaseTime = "2300"; // 전일 마지막 발표 시간
  }

  return closestBaseTime;
};

const getCoordinates = async (location: string) => {
  const response = await axios.get(GOOGLE_GEOCODING_BASE_URL, {
    params: { address: location, key: GOOGLE_GEOCODING_API_KEY },
  });
  const { lat, lng } = response.data.results[0].geometry.location;
  return latLonToGrid(lat, lng);
};

export const fetchWeather = async (location: string): Promise<{ currentWeather: any; hourlyWeather: any }> => {
  try {
    const { nx, ny } = await getCoordinates(location);

    const response = await axios.get(`${KOREA_WEATHER_BASE_URL}/getVilageFcst`, {
      params: {
        ServiceKey: KOREA_WEATHER_API_KEY,
        numOfRows: 100,
        pageNo: 1,
        dataType: "JSON",
        base_date: getBaseDate(),
        base_time: getBaseTime(),
        nx,
        ny,
      },
    });

    const items = response.data.response.body.items.item;
    const currentWeather = items.filter((item: { baseTime: string }) => item.baseTime === getBaseTime());
    const hourlyWeather = items;

    return { currentWeather, hourlyWeather };
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || "데이터를 가져오는 중 오류가 발생했습니다.");
  } else {
    throw new Error("오류가 발생");
  }
};
