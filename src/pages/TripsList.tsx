import { useEffect, useState } from "react";

import axios from "axios";

import { Card, Row, Col, List, Skeleton } from "antd";

import Trip from "../types/trip.ts";

import { formatDate } from "../util/formatDate.ts";

const { Meta } = Card;

const TripsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`/api/v1/trips`);
        setTrips(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      <Row className="flex flex-col md:flex-row">
        <Col span={24} className="w-full overflow-scroll p-2 px-28 h-[46rem]">
          {isLoading ? (
            <Skeleton loading={isLoading} active />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={trips}
              renderItem={(trip) => (
                <List.Item>
                  <Card
                    className="flex rounded-2xl"
                    cover={
                      <img
                        alt="Car"
                        src={trip.Car.headerImage}
                        style={{ borderRadius: "1rem", height: "16rem" }}
                      />
                    }
                  >
                    <Meta
                      title={`${trip.Car.make} ${trip.Car.model}`}
                      description={`
                        From: ${formatDate(trip.from)} 
                        To: ${formatDate(trip.to)}
                        Payment ID: ${trip.paymentId}
                        Trip ID: ${trip.tripId}
                      `}
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default TripsList;
