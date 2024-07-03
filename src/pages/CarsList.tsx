import { useEffect, useState } from "react";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card } from "antd";

import Filter from "../components/Filter.tsx";

export default function CarsList() {
  const [isFetched, setIsFetched] = useState(false);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    if (!isFetched) {
      carDispatch(fetchCarData());
      setIsFetched(true);
    }
  }, [carDispatch, isFetched]);

  const { Meta } = Card;

  return (
    <div className="grid grid-cols-2">
      <div className="w-full p-4 col-start-1 col-end-2">
        <Filter />
      </div>
      <div className="w-full col-start-1 col-end-2">
        {cars.map((car) => (
          <Card
            key={car.id}
            style={{ width: "100%" }}
            cover={<img alt="example" src={car["image-path"][0]} />}
          >
            <Meta title={car.make} description={car.model} />
          </Card>
        ))}
      </div>
    </div>
  );
}
