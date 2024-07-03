import { Form, Input, DatePicker, Select, Slider, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useState } from "react";

import { useFilterDispatch, useFilterSelector } from "../store/hooks";
import { filterActions } from "../store/filter-slice";

const { RangePicker } = DatePicker;

const Filter = () => {
  const filterDispatch = useFilterDispatch();
  const filter = useFilterSelector((state) => state.filter);

  const [priceRange, setPriceRange] = useState<number[]>([100, 500]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleFinish = (values: any) => {
    const { location, dateRange } = values;

    filterDispatch(
      filterActions.setFilters({
        location: location || "",
        startDate: dateRange ? dateRange[0].format("YYYY-MM-DD") : "",
        endDate: dateRange ? dateRange[1].format("YYYY-MM-DD") : "",
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })
    );
  };

  console.log(filter);

  return (
    <Form
      name="filter"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
    >
      <Form.Item name="location">
        <Input placeholder="City Location" />
      </Form.Item>
      <Form.Item name="dateRange">
        <RangePicker />
      </Form.Item>
      <Form.Item name="priceRange">
        <Select
          placeholder="Price"
          dropdownRender={() => (
            <div className="px-4 py-2">
              <div className="flex items-center">
                <p className="mr-4">$Min</p>
                <Slider
                  onChangeComplete={handlePriceChange}
                  defaultValue={[100, 500]}
                  min={100}
                  max={500}
                  className="flex-1"
                  range={{ draggableTrack: true }}
                />
                <p className="ml-4">$Max</p>
              </div>
            </div>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <SearchOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Filter;
