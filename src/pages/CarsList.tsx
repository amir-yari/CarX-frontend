import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import {
  useCarDispatch,
  useCarSelector,
  useFilterSelector,
  useUserSelector,
} from "../store/hooks.ts";
import { fetchCarData } from "../store/car-actions.ts";

import { Card, Row, Col, List, Skeleton } from "antd";

import Filter from "../components/Filter.tsx";
import Car from "../types/car.ts";
import { Map } from "../components/carMap";
import useDebounce from "../hooks/useDebounce";

const { Meta } = Card;

const CarsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const carDispatch = useCarDispatch();
  const cars = useCarSelector((state) => state.car.items);
  const filter = useFilterSelector((state) => state.filter);

  const currentLocation: boolean = filter.isCurrentLocation;
  const userLocation = useUserSelector((state) => state.user.location);

  if (currentLocation && userLocation) {
    var lat = userLocation.latitude;
    var lng = userLocation.longitude;
  }

  if (filter.location !== "") {
    lat = undefined;
    lng = undefined;
  }

  const debouncedLocation = useDebounce(filter.location, 1000);

  useEffect(() => {
    carDispatch(
      fetchCarData(
        setIsLoading,
        filter.startDate || undefined,
        filter.endDate || undefined,
        debouncedLocation || undefined,
        lat || undefined,
        lng || undefined
      )
    );
  }, [carDispatch, filter.startDate, filter.endDate, debouncedLocation]);

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
      <Row className="flex flex-col md:flex-row">
        <Col className="w-full md:w-1/2 overflow-scroll p-2 h-[40rem]">
          {isLoading ? (
            <Skeleton loading={isLoading} active></Skeleton>
          ) : (
            <List
              itemLayout="vertical"
              dataSource={filteredCars}
              renderItem={(car) => (
                <NavLink to={`/cars/${car.carId}`}>
                  <List.Item key={car.carId}>
                    <Card
                      className="flex rounded-2xl"
                      cover={
                        <img
                          alt="example"
                          src={car.headerImage}
                          style={{ borderRadius: "1rem", height: "11rem" }}
                        />
                      }
                    >
                      <Meta
                        title={`${car.make} ${car.model} ${car.year}`}
                        description={`$${car.price}`}
                      />
                    </Card>
                  </List.Item>
                </NavLink>
              )}
            />
          )}
        </Col>
        <Col className="w-full md:w-1/2 p-2">
          <div className="rounded-xl">
            <Map />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CarsList;
