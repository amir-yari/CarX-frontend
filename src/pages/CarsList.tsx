import { useEffect, useState } from "react";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card } from "antd";

export default function CarsList() {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchCarData());
      setIsFetched(true);
    }
  }, [dispatch, isFetched]);

  const { Meta } = Card;

  return cars.map((car) => (
    <Card
      key={car.id}
      style={{ width: 300 }}
      cover={<img alt="example" src={car["image-path"][0]} />}
    >
      <Meta title={car.make} description={car.model} />
    </Card>
  ));
}
