import { Link } from "react-router-dom";

import { Image, Form, Input, DatePicker } from "antd";

import { motion, useScroll, useTransform } from "framer-motion";

import logoLinks from "../assets/logoLinks.json";
import image from "../assets/image.jpg";

import { useFilterDispatch, useFilterSelector } from "../store/hooks";
import { filterActions } from "../store/filter-slice";

const { RangePicker } = DatePicker;

export default function Home() {
  const filter = useFilterSelector((state) => state.filter);
  const filterDispatch = useFilterDispatch();

  const { scrollY } = useScroll();

  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const opacityCity = useTransform(
    scrollY,
    [0, 200, 300, 500],
    [1, 0.5, 0.5, 0]
  );

  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

  const handleFinish = (allValues: any) => {
    const { location, dateRange, priceRange } = allValues;

    filterDispatch(
      filterActions.setFilters({
        ...filter,
        location: location || "",
        startDate: dateRange ? dateRange[0]?.format("YYYY-MM-DD") : "",
        endDate: dateRange ? dateRange[1]?.format("YYYY-MM-DD") : "",
        minPrice: priceRange ? priceRange[0] : 0,
        maxPrice: priceRange ? priceRange[1] : 200,
      })
    );
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
          scale: scaleText,
          y: yText,
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
          <Form.Item
            name="location"
            id="location"
            className="p-4"
            initialValue={filter.location}
          >
            <Input
              id="locationInput"
              placeholder={filter.location ? filter.location : "City Location"}
            />
          </Form.Item>

          <Form.Item name="dateRange" id="dateRange" className="p-4">
            <RangePicker
              showTime
              showHour
              showMinute
              id="dateRangePicker"
              style={{ width: "100%" }}
              placeholder={
                filter.startDate
                  ? [filter.startDate, filter.endDate]
                  : ["Start Date", "End Date"]
              }
            />
          </Form.Item>
        </Form>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Link
            to="/cars"
            className="inline-block px-4 py-2 bg-white text-black border border-black rounded-md mt-4"
          >
            Explore Cars
          </Link>
        </motion.div>
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
    </div>
  );
}
