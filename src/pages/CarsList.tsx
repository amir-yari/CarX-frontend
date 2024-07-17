import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Filter from "../components/Filter.tsx";

const { Meta } = Card;

const CarsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  useEffect(() => {
    if (isLoading) {
      carDispatch(fetchCarData(setIsLoading));
    }
  }, [carDispatch, isLoading]);

  return (
    <div className="grid grid-cols-2">
      <div className="w-full col-span-1 relative h-screen">
        <div className="p-4">
          <Filter />
        </div>
        <div className="overflow-y-auto absolute h-2/3 w-full">
          {isLoading ? (
            <Space className="flex justify-center">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Space>
          ) : (
            cars.map((car) => (
              <NavLink to={`/cars/${car.carId}`} key={car.carId}>
                <div className="m-4">
                  <Card
                    style={{ height: "100%" }}
                    cover={
                      <img
                        alt="example"
                        src={car.headerImage}
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
