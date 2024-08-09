import {
  Form,
  Input,
  DatePicker,
  Select,
  Slider,
  Button,
  Row,
  Modal,
  GetProps,
} from "antd";

import { openModal, closeModal } from "../store/modal-slice";
import { useModalDispatch, useModalSelector } from "../store/hooks";
import { useFilterDispatch, useFilterSelector } from "../store/hooks";
import { filterActions } from "../store/filter-slice";

import FilterModal from "./FilterModal";

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

const Filter = () => {
  const modalDispatch = useModalDispatch();
  const modal = useModalSelector((state) => state.modal);

  const handleShowModal = (content: string) => {
    modalDispatch(openModal(content));
  };

  const handleCancel = () => {
    modalDispatch(closeModal());
  };

  const filter = useFilterSelector((state) => state.filter);
  const filterDispatch = useFilterDispatch();

  const handleChange = (allValues: any) => {
    const { location, dateRange, priceRange } = allValues;

    filterDispatch(
      filterActions.setFilters({
        ...filter,
        location: location || filter.location,
        startDate: dateRange ? dateRange[0].$d.toISOString() : filter.startDate,
        endDate: dateRange ? dateRange[1].$d.toISOString() : filter.endDate,
        minPrice: priceRange ? priceRange[0] : filter.minPrice,
        maxPrice: priceRange ? priceRange[1] : filter.maxPrice,
      })
    );
  };

  const handleReset = () => {
    filterDispatch(
      filterActions.setFilters({
        ...filter,
        location: "",
        startDate: "",
        endDate: "",
        minPrice: 0,
        maxPrice: 200,
        type: "",
        make: [],
        fuelType: "",
      })
    );
  };

  return (
    <>
      <Form
        id="filter-form"
        name="filter"
        initialValues={{ remember: true }}
        onValuesChange={handleChange}
      >
        <Row>
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
          <div className="p-4">
            <Select
              id="priceRangeSelect"
              placeholder="Price"
              popupMatchSelectWidth={false}
              dropdownRender={() => (
                <div className="p-4 py-2">
                  <div className="flex items-center">
                    <p className="mr-4">$Min</p>
                    <Form.Item
                      name="priceRange"
                      id="priceRange"
                      initialValue={[filter.minPrice, filter.maxPrice]}
                    >
                      <Slider
                        min={0}
                        max={200}
                        style={{ width: "10vw" }}
                        className="flex-1 w-fit"
                        range
                        id="priceRangeSlider"
                      />
                    </Form.Item>
                    <p className="ml-4">$Max</p>
                  </div>
                </div>
              )}
            />
          </div>

          <Form.Item className="p-4">
            <Button onClick={() => handleShowModal("filters")}>
              More Filters
            </Button>
          </Form.Item>
          <Form.Item className="p-4">
            <Button
              className="px-6 py-2"
              type="primary"
              htmlType="submit"
              id="resetButton"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Row>
      </Form>

      {modal.content === "filters" && modal.isOpen && (
        <Modal
          title="All Filters"
          open={true}
          onCancel={handleCancel}
          footer={null}
        >
          <FilterModal />
        </Modal>
      )}
    </>
  );
};

export default Filter;
