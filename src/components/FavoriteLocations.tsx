import React from "react";

interface Props {
  favorites: string[];
  onSelect: (location: string) => void; // 선택된 즐겨찾기 위치 전달
  onRemove: (location: string) => void; // 즐겨찾기 제거
}

const FavoriteLocations: React.FC<Props> = ({ favorites, onSelect, onRemove }) => {
  return (
    <div className="favorite-locations">
      <h2>즐겨찾기</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index} className="favorite-item" onClick={() => onSelect(fav)} style={{ cursor: "pointer" }}>
            <span className="favorite-location">{fav}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 이벤트 차단
                onRemove(fav);
              }}
              className="remove-button"
              aria-label={`Remove ${fav}`}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteLocations;
