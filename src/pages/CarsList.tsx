import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useCarDispatch, useCarSelector } from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";
import { useFilterSelector } from "../store/hooks";

import { Card, Row, Col, List, Skeleton } from "antd";

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
    carDispatch(
      fetchCarData(
        setIsLoading,
        filter.startDate || undefined,
        filter.endDate || undefined,
        filter.location || undefined
      )
    );
  }, [carDispatch, filter.startDate, filter.endDate, filter.location]);

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

      const matchesMinPrice = filter.minPrice
        ? car.price >= filter.minPrice
        : true;
      const matchesMaxPrice = filter.maxPrice
        ? car.price <= filter.maxPrice
        : true;

      return (
        matchesType &&
        matchesMake &&
        matchesFuelType &&
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
      <Row className="h-screen md:flex  md:flex-row">
        <Col span={14} className="overflow-scroll h-screen p-2">
          {isLoading ? (
            <Skeleton loading={isLoading} active></Skeleton>
          ) : (
            <List
              itemLayout="vertical"
              size="small"
              dataSource={filteredCars}
              renderItem={(car) => (
                <NavLink to={`/cars/${car.carId}`}>
                  <List.Item key={car.carId}>
                    {" "}
                    <Card cover={<img alt="example" src={car.headerImage} />}>
                      <Meta title={car.make} description={car.model} />
                    </Card>
                  </List.Item>
                </NavLink>
              )}
            />
          )}
        </Col>
        <Col span={10}>{/* Content for the second column */}</Col>
      </Row>
    </>
  );
};

export default CarsList;
