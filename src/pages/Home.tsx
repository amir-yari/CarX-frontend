import { useNavigate } from "react-router-dom";

import {
  Image,
  Form,
  DatePicker,
  Button,
  GetProps,
  Layout,
  Select,
  SelectProps,
} from "antd";

import { motion, useScroll, useTransform } from "framer-motion";

import logoLinks from "../assets/logoLinks.json";
import image from "../assets/image.jpg";

import {
  useFilterDispatch,
  useFilterSelector,
  useUserSelector,
} from "../store/hooks";
import { filterActions } from "../store/filter-slice";

import { formatDate, getTodayDate, getTomorrowDate } from "../util/formatDate";

const { Footer } = Layout;
const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const options: SelectProps["options"] = [];

options.push({
  value: "CurrentLocation",
  label: "Current Location",
});

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

export default function Home() {
  const navigate = useNavigate();
  const filter = useFilterSelector((state) => state.filter);
  const filterDispatch = useFilterDispatch();
  const userLocation = useUserSelector((state) => state.user.location);

  const { scrollY } = useScroll();

  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const opacityCity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );

  // const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
  // const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

  const handleFinish = (allValues: any) => {
    let { location } = allValues;
    const { dateRange } = allValues;
    location = [];

    const currentLocation: boolean = (location as Array<string>).includes(
      "CurrentLocation"
    );

    let isCurrentLocation;

    if (currentLocation && userLocation) {
      location = undefined;
      isCurrentLocation = true;
    }
    if (!currentLocation) {
      const length = (location as Array<string>).length;
      const city: string = (location as Array<string>)[length - 1];

      location = city;
      isCurrentLocation = false;
    }

    filterDispatch(
      filterActions.setFilters({
        ...filter,
        location: location ? location : filter.location,
        isCurrentLocation: isCurrentLocation ? true : false,
        startDate: dateRange ? dateRange[0].$d.toISOString() : filter.startDate,
        endDate: dateRange ? dateRange[1].$d.toISOString() : filter.endDate,
      })
    );

    navigate("/cars");
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <motion.div
        style={{
          opacity: opacityCity,
          y: yCity,
        }}
      >
        <Image
          preview={false}
          src={image}
          alt="logo"
          style={{
            objectFit: "cover",
            height: "100vh",
            width: "100vw",
          }}
        />
      </motion.div>
      <motion.div
        id="welcome-header-content"
        style={{
          // scale: scaleText,
          // y: yText,
          color: "white",
          position: "absolute",
          left: "20%",
          right: "20%",
          top: "5%",
          textAlign: "center",
        }}
      >
        <h1 className="text-9xl text-white tracking-normal">Find your drive</h1>
        <Form
          id="filter-form"
          name="filter"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
        >
          <Form.Item name="location" id="location" className="p-4">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Location"
              options={options}
            />
          </Form.Item>

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
                  ? [formatDate(filter.startDate), formatDate(filter.endDate)]
                  : [getTodayDate(), getTomorrowDate()]
              }
              disabledTime={disabledRangeTime}
            />
          </Form.Item>
          <Form.Item>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <Button
                className="inline-block px-4 bg-white text-black border border-black rounded-md mt-4"
                type="primary"
                htmlType="submit"
                id="submitButton"
              >
                Explore Cars
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </motion.div>

      <motion.div>
        <Image
          preview={false}
          src={logoLinks["logo-white-png"]}
          alt="logo"
          style={{
            objectFit: "cover",
            height: "100vh",
            width: "100vw",
          }}
        />
      </motion.div>
      <Footer className="text-center w-full">
        CarX ©{new Date().getFullYear()} Created by Amir & Hassan
      </Footer>
    </div>
  );
}
