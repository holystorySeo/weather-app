import { useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const addFavorite = (location: string) => {
    setFavorites((prev) => {
      if (prev.includes(location)) {
        console.log(`${location}은(는) 이미 즐겨찾기에 등록되어 있습니다.`);
        return prev;
      }
      const updated = [...prev, location];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (location: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav !== location);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, addFavorite, removeFavorite };
};
