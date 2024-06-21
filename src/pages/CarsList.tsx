import { useEffect } from "react";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

export default function CarsList() {
  const dispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    dispatch(fetchCarData());
  }, [dispatch]);

  console.log(cars);
  return <div>CarsList</div>;
}
