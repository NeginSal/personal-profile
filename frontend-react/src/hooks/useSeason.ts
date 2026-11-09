import { useEffect, useState } from "react";
import { getSeason, type Season } from "../season";

export function useSeason() {
  const [season, setSeason] = useState<Season>(() => getSeason());

  useEffect(() => {
    document.documentElement.dataset.season = season;
  }, [season]);

  return { season, setSeason };
}
