import { Link } from "react-router-dom";

import { Button, Result } from "antd";

const Success = () => (
  <Result
    status="success"
    title="Successfully rented your car!"
    subTitle="Order number: 2017182818828182881"
    extra={
      <Button>
        <Link to={"/"}>Back to Home Page</Link>
      </Button>
    }
  />
);

export default Success;
