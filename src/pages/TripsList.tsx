import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserSelector } from "../store/hooks.ts";
import axios from "axios";
import { Card, Row, Col, List, Skeleton } from "antd";

const { Meta } = Card;

import Trip from "../types/trip.ts";

const TripsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const user = useUserSelector((state) => state.user);

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

    fetchTrips(); // Call the async function
  }, []);

  return (
    <>
      <Row className="flex flex-col md:flex-row">
        <Col className="w-full md:w-1/2 overflow-scroll p-2 h-[40rem]">
          {isLoading ? (
            <Skeleton loading={isLoading} active />
          ) : (
            <List
              itemLayout="vertical"
              dataSource={trips}
              renderItem={(trip) => (
                <NavLink to={`/trips/${trip.tripId}`} key={trip.tripId}>
                  <List.Item>
                    <Card className="flex rounded-2xl">
                      {/* Add cover image here if available */}
                      <Meta
                        title={`${trip.Car.make} ${trip.Car.model}`}
                        description={`From: ${new Date(
                          trip.from
                        ).toLocaleDateString()} To: ${new Date(
                          trip.to
                        ).toLocaleDateString()}`}
                      />
                    </Card>
                  </List.Item>
                </NavLink>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default TripsList;
