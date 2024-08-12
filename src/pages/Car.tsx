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
  GetProps,
  List,
  Drawer,
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

import Summary from "../components/Summary.tsx";

const { Title } = Typography;
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const disabledRangeTime: RangePickerProps["disabledTime"] = () => {
  return {
    disabledHours: () => [],
    disabledMinutes: () => {
      const minutes = [];
      for (let i = 0; i < 60; i++) {
        if (i % 30 !== 0) {
          minutes.push(i);
        }
      }
      return minutes;
    },
  };
};

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

  const handleContinue = () => {
    if (!userIsLoggedIn) {
      modalDispatch(openModal("login"));
    } else {
      showDrawer();
    }
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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

  console.log(selectedCar);

  return (
    <>
      <div className="px-4 md:px-20 py-4">
        <Image.PreviewGroup items={carImages}>
          <Image
            src={selectedCar.headerImage}
            alt={`Image of ${selectedCar.make} ${selectedCar.model}`}
            style={{
              objectFit: "cover",
              maxHeight: "24rem",
              width: "100vw",
              borderRadius: "1rem",
            }}
          />
        </Image.PreviewGroup>

        <Row className="pt-4 flex flex-col md:flex-row">
          <Col span={24} md={16}>
            <Title className="text-center md:text-left">{`${selectedCar.make} ${selectedCar.model}`}</Title>
            <Descriptions
              contentStyle={{ paddingTop: "2rem" }}
              colon={false}
              title="Hosted By"
              items={[
                {
                  label: (
                    <Avatar
                      size={100}
                      icon={<UserOutlined />}
                      src={selectedCar.Host?.profileImage}
                    />
                  ),
                  children: (
                    <Title level={3}>
                      {`${selectedCar.Host?.firstName} ${selectedCar.Host?.lastName}`}
                    </Title>
                  ),
                },
              ]}
            />
            <Descriptions
              title="Description"
              items={[
                {
                  children: selectedCar.description,
                },
              ]}
            />
            <Descriptions title="Reviews">
              <Descriptions.Item>
                <List
                  className="w-full"
                  itemLayout="vertical"
                  size="small"
                  pagination={{ pageSize: 4, align: "center" }}
                  dataSource={selectedCar.Reviews}
                  renderItem={(review) => (
                    <List.Item key={review.reviewId}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={review.User.profileImage} size={60} />
                        }
                        title={review.User.firstName}
                        description={review.comment}
                      />
                      {review.hostReply && (
                        <p>{`Host reply: ${review.hostReply}`}</p>
                      )}
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
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
                <Form.Item name="dateRange" id="dateRange" className="p-4">
                  <RangePicker
                    showTime={{
                      hideDisabledOptions: true,
                    }}
                    showHour
                    showMinute
                    id="dateRangePicker"
                    style={{ width: "100%" }}
                    placeholder={
                      filter.startDate
                        ? [filter.startDate, filter.endDate]
                        : ["Start Date", "End Date"]
                    }
                    disabledTime={disabledRangeTime}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="mt-2 w-full"
                    type="primary"
                    htmlType="submit"
                    id="submitButton"
                    onClick={handleContinue}
                  >
                    Continue
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
      <Drawer title="Booking Summary" onClose={onClose} open={open}>
        <Summary car={selectedCar} />
      </Drawer>
    </>
  );
};

export default Car;
