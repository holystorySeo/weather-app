# Weather App 🌦️

React 기반으로 제작된 날씨 애플리케이션입니다. 사용자가 현재 위치 또는 검색한 위치의 실시간 날씨 정보를 확인하고, 즐겨찾기에 추가할 수 있습니다. 다양한 날씨 상태(맑음, 흐림, 비, 눈 등)에 따라 애니메이션 배경이 동적으로 변경됩니다.

## 🌐 배포 링크

[Weather App](https://weather-app-ten-rho-38.vercel.app/)

👉 위 링크를 클릭하여 애플리케이션을 직접 사용해보세요!

## 주요 기능

- **실시간 날씨 정보**: 현재 위치 또는 검색된 위치의 날씨 데이터를 표시.
- **날씨 애니메이션**: 날씨 상태(`clear`, `rain`, `snow`, `cloudy`, `overcast`)에 따라 변경되는 배경 애니메이션.
- **즐겨찾기 관리**: 자주 확인하는 위치를 즐겨찾기로 추가/삭제 가능.
- **반응형 디자인**: 모바일 및 데스크톱 환경에서 최적화된 UI 제공.

---

## 기술 스택

- **프론트엔드**: React, TypeScript
- **스타일링**: CSS, SVG 애니메이션
- **상태 관리**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **API**: OpenWeather API 또는 기타 날씨 데이터 제공 API
- **아이콘/애니메이션**: SVG 기반의 커스텀 애니메이션

---

## 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

.env 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```bash
REACT_APP_KOREA_WEATHER_API_KEY=0wuv1HGx8zUiZTn23a5MEEyqYOWohXM5BnAv0HtFLOo0dqxyDULmiCIJeppmZFGFg6jqLDHnCHqLiyMcZNB9Hg==
REACT_APP_KOREA_WEATHER_BASE_URL=http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0
REACT_APP_GOOGLE_GEOCODING_API_KEY=AIzaSyBJmAB4GU7mucBpAZFbzKQBmKPaGFKjQ3U
REACT_APP_GOOGLE_GEOCODING_BASE_URL=https://maps.googleapis.com/maps/api/geocode/json
```

### 4. 개발 서버 실행

```bash
npm start
```

---

## 프로젝트 구조

```plaintext
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── components
│   │   ├── CurrentWeather.tsx
│   │   ├── FavoriteLocations.tsx
│   │   ├── SearchBar.tsx
│   │   ├── WeatherBackground.tsx
│   │   └── WeatherDisplay.tsx
│   ├── hooks
│   │   ├── useFavorites.ts
│   │   ├── useUserLocation.ts
│   │   └── useWeather.ts
│   ├── index.tsx
│   ├── pages
│   │   └── Home.tsx
│   ├── styles
│   │   ├── WeatherBackground.css
│   │   └── WeatherDisplay.css
│   └── utils
│       ├── api.ts
│       └── weatherUtils.tsx
```

---

## 사용 예제 📖

### 1. 현재 위치의 날씨 확인

앱 실행 시, 브라우저의 위치 권한을 허용하면 현재 위치의 날씨가 자동으로 표시됩니다.  
사용자의 위치를 기반으로 실시간 날씨 정보를 확인할 수 있습니다.

---

### 2. 위치 검색

1. 상단의 검색창에 도시 이름을 입력하세요.
2. 검색 버튼을 클릭하면 입력한 위치의 날씨를 확인할 수 있습니다.  
   **예시**: "Seoul"을 입력하면 서울의 현재 날씨와 시간별 예보가 표시됩니다.

---

### 3. 즐겨찾기 관리

- **추가**:  
  "즐겨찾기에 추가" 버튼을 클릭하면 현재 위치 또는 검색된 위치가 즐겨찾기에 저장됩니다.  
  저장된 위치는 나중에 빠르게 날씨를 확인할 수 있습니다.
- **삭제**:  
  즐겨찾기 목록에서 특정 위치를 선택한 후, "삭제" 버튼을 클릭하여 목록에서 제거할 수 있습니다.

---

### 날씨 상태별 배경 애니메이션 🎨

- **`clear` (맑음)**:  
  노란색 태양이 화면 중앙에서 부드럽게 진동하는 애니메이션.

- **`rain` (비)**:  
  파란색 선이 화면 위에서 아래로 떨어지는 비 애니메이션.

- **`snow` (눈)**:  
  하얀색 눈송이가 천천히 떨어지는 애니메이션.

- **`cloudy` (구름 많음)**:  
  작고 흩어진 구름이 화면 위에서 움직이는 애니메이션.

- **`overcast` (흐림)**:  
  화면 전체를 덮는 큰 구름이 천천히 이동하는 애니메이션.

---

위의 기능을 통해 실시간 날씨를 확인하고, 애니메이션을 통해 시각적으로 날씨 상태를 경험할 수 있습니다! 😊
