import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";
import { useFilterSelector } from "../store/hooks";

import { Card, Space, Spin, Row, Col, List } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Filter from "../components/Filter.tsx";
import Car from "../types/car.ts";

const { Meta } = Card;

const CarsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);

  const filter = useFilterSelector((state) => state.filter);

  useEffect(() => {
    if (isLoading) {
      carDispatch(fetchCarData(setIsLoading));
    }
  }, [carDispatch, isLoading]);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesType = filter.type
        ? car.type.toLowerCase() === filter.type.toLowerCase()
        : true;

      const matchesMake =
        filter.make.length > 0
          ? filter.make
              .map((make) => make.toLowerCase())
              .includes(car.make.toLowerCase())
          : true;

      const matchesFuelType = filter.fuelType
        ? car.fuelType.toLowerCase() === filter.fuelType.toLowerCase()
        : true;

      const matchesLocation = filter.location
        ? car.city.toLowerCase() === filter.location.toLowerCase()
        : true;

      const matchesMinPrice = filter.minPrice
        ? car.price >= filter.minPrice
        : true;
      const matchesMaxPrice = filter.maxPrice
        ? car.price <= filter.maxPrice
        : true;

      // const matchesStartDate = filter.startDate
      //   ? new Date(car.date) >= new Date(filter.startDate)
      //   : true;
      // const matchesEndDate = filter.endDate
      //   ? new Date(car.date) <= new Date(filter.endDate)
      //   : true;

      return (
        matchesType &&
        matchesMake &&
        matchesFuelType &&
        matchesLocation &&
        // matchesStartDate &&
        // matchesEndDate &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    setFilteredCars(filtered);
  }, [filter, cars]);

  return (
    <>
      <Row>
        <Filter />
      </Row>
      <Row className="h-screen">
        <Col span={14} className="overflow-scroll h-screen p-2">
          {isLoading ? (
            <Space className="flex justify-center pt-12">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
            </Space>
          ) : (
            <List
              itemLayout="vertical"
              size="small"
              dataSource={filteredCars}
              renderItem={(car) => (
                <NavLink to={`/cars/${car.carId}`}>
                  <List.Item key={car.carId}>
                    <Card cover={<img alt="example" src={car.headerImage} />}>
                      <Meta title={car.make} description={car.model} />
                    </Card>
                  </List.Item>
                </NavLink>
              )}
            />
          )}
        </Col>
        <Col span={10}></Col>
      </Row>
    </>
  );
};

export default CarsList;
