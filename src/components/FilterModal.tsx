import { Form, Button, Row, Radio, Divider, TreeSelect } from "antd";

import {
  useFilterDispatch,
  useFilterSelector,
  useModalDispatch,
} from "../store/hooks";
import { filterActions } from "../store/filter-slice";

import { carmakes } from "../util/constants";
import { closeModal } from "../store/modal-slice";

const FilterModal = () => {
  const filterDispatch = useFilterDispatch();
  const filter = useFilterSelector((state) => state.filter);
  const modalDispatch = useModalDispatch();

  const handleFinish = () => {
    modalDispatch(closeModal());
  };

  const treeData = carmakes.map((make) => ({
    title: make.title,
    value: make.value,
  }));

  const tProps = {
    treeData,
    treeCheckable: true,
    placeholder: "Please select",
    showSearch: false,
    style: { width: "20rem" },
  };

  const handleChange = (values: any) => {
    const { carType, carMake, fuelType } = values;

    filterDispatch(
      filterActions.setFilters({
        ...filter,
        type: carType,
        make: carMake ? carMake : [],
        fuelType: fuelType,
      })
    );
  };

  return (
    <Form
      id="filter-modal"
      name="filter-modal"
      initialValues={{ remember: true }}
      onValuesChange={handleChange}
      onFinish={handleFinish}
    >
      <Row className="pt-5">
        <Form.Item
          id="carType"
          name="carType"
          label="Car Type"
          className="mt-25"
          colon={false}
          initialValue={filter.type}
        >
          <Radio.Group>
            <Radio.Button value="sedan">Sedan</Radio.Button>
            <Radio.Button value="suv">SUV</Radio.Button>
            <Radio.Button value="truck">Truck</Radio.Button>
            <Radio.Button value="van">Van</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item
          name="carMake"
          id="carMake"
          label="Car Make"
          className=""
          colon={false}
          initialValue={filter.make}
        >
          <TreeSelect {...tProps} />
        </Form.Item>
      </Row>
      <Divider />
      <Row>
        <Form.Item
          id="fuelType"
          name="fuelType"
          label="Fuel Type"
          className="mb-20"
          colon={false}
          initialValue={filter.fuelType}
        >
          <Radio.Group>
            <Radio.Button value="gas">Gas</Radio.Button>
            <Radio.Button value="hybrid">Hybrid</Radio.Button>
            <Radio.Button value="electric">Electric</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Form.Item className="absolute bottom-0 right-4 ">
        <Button
          className="px-6 py-2"
          type="primary"
          htmlType="submit"
          id="closeButton"
        >
          View Results
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilterModal;
