import { useParams } from "react-router-dom";

import { Image } from "antd";
import {
  Typography,
  Descriptions,
  Divider,
  Button,
  Form,
  DatePicker,
} from "antd";
import { UserOutlined, LikeOutlined } from "@ant-design/icons";

import { useCarSelector } from "../store/hooks.ts";
import { useFilterSelector } from "../store/hooks";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Car = () => {
  const filter = useFilterSelector((state) => state.filter);

  const { carId } = useParams();

  const cars = useCarSelector((state) => state.car.items);
  const selectedCar = cars.find((car) => String(car.id) === carId);

  if (!selectedCar) {
    return <p>Car not found</p>;
  }

  return (
    <div className="grid grid-cols-3 grid-rows-2  pl-36 pr-36 py-4">
      <div className="col-span-3 row-span-1">
        <Image.PreviewGroup>
          <Image
            style={{ width: "100vw", height: "50vh", objectFit: "cover" }}
            src={selectedCar["image-path"][0]}
            alt="carImage"
          />
        </Image.PreviewGroup>
      </div>
      <div className="col-span-2 row-span-1 mt-3">
        <Title>{`${selectedCar.make} ${selectedCar.model}`}</Title>
        <Descriptions
          title="Hosted By"
          items={[
            {
              label: <UserOutlined />,
              children: "Hassan Kose",
            },
          ]}
        />
        <Descriptions
          title="Description"
          items={[
            {
              children:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            },
          ]}
        />
      </div>
      <div className="col-span-1 row-span-1 items-center mt-3 flex flex-col ">
        <Title
          level={2}
          className="text-center"
        >{`$${selectedCar.price} total`}</Title>
        <Divider></Divider>
        <Form id="filter-form" name="filter" initialValues={{ remember: true }}>
          <Form.Item name="dateRange" id="dateRange">
            <RangePicker
              id="dateRangePicker"
              placeholder={[filter.startDate, filter.endDate]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="mt-2 w-full"
              type="primary"
              htmlType="submit"
              id="submitButton"
            >
              Checkout
            </Button>
          </Form.Item>
        </Form>
        <Divider></Divider>
        <Title level={3} className="text-center">
          <LikeOutlined />
          {` Free Cancellation`}
        </Title>
      </div>
    </div>
  );
};

export default Car;
