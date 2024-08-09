import { Link } from "react-router-dom";

import { Button, Result } from "antd";

const Error = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button>
        <Link to={"/"}>Back to Home Page</Link>
      </Button>
    }
  />
);

export default Error;
