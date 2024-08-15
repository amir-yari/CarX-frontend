import { Link } from "react-router-dom";

import Car from "../types/car";

import { useFilterSelector } from "../store/hooks";

import useCalculatePeriod from "../hooks/useCalculatePeriod";
import useFormatDate from "../hooks/useFormatDate";

import { Button, Descriptions, Divider, Typography, Image } from "antd";

const { Title, Text } = Typography;

const Summary = ({ car }: { car: Car }) => {
  const filter = useFilterSelector((state) => state.filter);

  const period =
    filter.startDate && filter.endDate
      ? useCalculatePeriod(filter.startDate, filter.endDate)
      : undefined;

  const startDate = filter.startDate
    ? useFormatDate(filter.startDate)
    : undefined;

  const endDate = filter.endDate ? useFormatDate(filter.endDate) : undefined;

  return (
    <div>
      <Image
        preview={false}
        src={car.headerImage}
        alt={`Image of ${car.make} ${car.model}`}
        style={{
          borderRadius: "1rem",
        }}
      />
      <Title level={3}>{`${car.make} ${car.model}`}</Title>
      <Descriptions column={1}>
        <Descriptions.Item label="Host">
          {`${car.Host?.firstName} ${car.Host?.lastName}`}
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          {startDate || "Not Selected"}
        </Descriptions.Item>

        <Descriptions.Item label="End Date">
          {endDate || "Not Selected"}
        </Descriptions.Item>

        <Descriptions.Item label="Total Price">
          <Text>
            {car.price && period ? `$${car.price * period}` : "No Price"}
          </Text>
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" className="ml-28 px-6">
        <Link to={"/checkout"}>Go to Checkout</Link>
      </Button>
    </div>
  );
};

export default Summary;
