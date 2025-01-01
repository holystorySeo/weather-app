import React from "react";

interface SearchBarProps {
  value: string; // 검색 입력값
  onChange: (value: string) => void; // 입력 변경 핸들러
  onSearch: (location: string) => void; // 검색 실행 핸들러
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.trim() !== "") {
      onSearch(value.trim());
    }
  };

  const handleSearchClick = () => {
    if (value.trim() !== "") {
      onSearch(value.trim());
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="위치를 검색하세요"
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
};

export default SearchBar;
