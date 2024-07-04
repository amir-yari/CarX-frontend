import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Filter from "../components/Filter.tsx";

const CarsList = () => {
  const [isFetched, setIsFetched] = useState(false);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    if (!isFetched) {
      carDispatch(fetchCarData());
      setIsFetched(true);
    }
  }, [carDispatch]);

  const { Meta } = Card;

  return (
    <div className="grid grid-cols-2">
      <div className="w-full col-span-1 relative h-screen">
        <div className="p-4">
          <Filter />
        </div>
        <div className="overflow-y-auto absolute h-2/3 w-full">
          {!isFetched ? (
            <Space>
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Space>
          ) : (
            cars.map((car) => (
              <NavLink to={`/cars/${car.id}`} key={car.id}>
                <div className="m-4">
                  <Card
                    style={{ height: "100%" }}
                    cover={
                      <img
                        alt="example"
                        src={car["image-path"][0]}
                        className="w-full object-cover"
                      />
                    }
                  >
                    <Meta title={car.make} description={car.model} />
                  </Card>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsList;
