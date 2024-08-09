import { Link } from "react-router-dom";

import { Button } from "antd";

const Summary = () => (
  <Button>
    <Link to={"/success"}>Checkout</Link>
  </Button>
);

export default Summary;
