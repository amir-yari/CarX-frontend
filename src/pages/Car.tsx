import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Image,
  Typography,
  Descriptions,
  Divider,
  Button,
  Form,
  DatePicker,
  Carousel,
  Col,
  Row,
  Space,
  Spin,
  Avatar,
} from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";

import {
  useCarSelector,
  useFilterSelector,
  useCarDispatch,
  useUserSelector,
  useModalDispatch,
} from "../store/hooks.ts";
import { fetchCarDataById } from "../store/car-actions.ts";
import { openModal } from "../store/modal-slice.ts";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "15rem",
  color: "black",
  lineHeight: "15rem",
  textAlign: "center",
};

const Car = () => {
  const [isLoading, setIsLoading] = useState(true);
  const filter = useFilterSelector((state) => state.filter);
  const { carId } = useParams();
  const carDispatch = useCarDispatch();

  useEffect(() => {
    if (isLoading) {
      carDispatch(fetchCarDataById(carId!, setIsLoading));
    }
  }, [carDispatch, carId, isLoading]);

  const cars = useCarSelector((state) => state.car.items);
  const selectedCar = cars.find((car) => car.carId === carId);

  const userIsLoggedIn = useUserSelector((state) => state.user.isLoggedIn);
  const modalDispatch = useModalDispatch();

  const handleCheckout = () => {
    !userIsLoggedIn && modalDispatch(openModal("login"));
  };

  if (isLoading) {
    return (
      <Space className="flex justify-center p-96">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Space>
    );
  }

  if (!selectedCar) {
    return <p>Car not found</p>;
  }

  const carImages = [
    selectedCar.headerImage,
    ...(selectedCar.galleryImages || []),
  ];

  return (
    <div className="px-4 md:px-20 py-4">
      <Image.PreviewGroup items={carImages}>
        <Image
          src={selectedCar.headerImage}
          alt={`Image of ${selectedCar.price} ${selectedCar.model}`}
          style={{
            objectFit: "cover",
            maxHeight: "24rem",
            width: "100vw",
            borderRadius: "1rem",
          }}
        />
      </Image.PreviewGroup>

      <Row className="flex flex-col md:flex-row">
        <Col span={24} md={16}>
          <Title className="text-center md:text-left">{`${selectedCar.make} ${selectedCar.model}`}</Title>
          <Descriptions
            contentStyle={{ paddingTop: "0.25rem" }}
            colon={false}
            title="Hosted By"
            items={[
              {
                label: <Avatar icon={<UserOutlined />} />,
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
        </Col>
        <Col span={24} md={8}>
          <Row justify="center">
            <Title level={2} className="text-center">
              {`$${selectedCar.price} total`}
            </Title>
          </Row>
          <Divider />
          <Row justify="center">
            <Form
              id="filter-form"
              name="filter"
              initialValues={{ remember: true }}
            >
              <Form.Item name="dateRange" id="dateRange">
                <RangePicker
                  id="dateRangePicker"
                  placeholder={[filter.startDate, filter.endDate]}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="mt-2 w-full"
                  type="primary"
                  htmlType="submit"
                  id="submitButton"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Form.Item>
            </Form>
          </Row>
          <Divider />
          <Row justify="center">
            <div className="w-full md:w-40 h-60 bg-white">
              <Carousel fade arrows={true} infinite={false}>
                <div>
                  <Title
                    level={2}
                    style={contentStyle}
                    className="bg-purple-900 text-center"
                  >
                    1
                  </Title>
                </div>
                <div>
                  <Title
                    level={2}
                    style={contentStyle}
                    className="bg-red-700 text-center"
                  >
                    2
                  </Title>
                </div>
              </Carousel>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Car;
