//car data

import { useState, useEffect } from 'react';

export type CarData = {
  brand: string;
  linkurl: string;
  detaildata: [string, number][];
};

export const useCarData = (): CarData[] => {
  const [data, setData] = useState<CarData[]>([]);

  useEffect(() => {
    fetch('/all_car_price_data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load car data:', err));
  }, []);

  return data;
};
