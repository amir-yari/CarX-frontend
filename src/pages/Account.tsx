import { useState } from "react";

import { UserOutlined, IdcardOutlined, PhoneOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  DatePicker,
  message,
  Typography,
  Avatar,
  UploadFile,
} from "antd";

import { useInput } from "../hooks/useInput";
import { validateName } from "../util/validation";

import {
  useModalDispatch,
  useUserDispatch,
  useUserSelector,
} from "../store/hooks";

const { Title } = Typography;

const Signup = () => {
  const [fileList, setFileList] = useState<UploadFile[]>();

  const modalDispatch = useModalDispatch();
  const userDispatch = useUserDispatch();
  const userProfileImage = useUserSelector((state) => state.user.profileImage);

  const {
    value: FnameValue,
    handleInputBlur: handleFnameBlur,
    handleInputChange: handleFnameChange,
    isValid: isFnameValid,
    isTouched: isFnameTouched,
  } = useInput("", validateName);

  const {
    value: LnameValue,
    handleInputBlur: handleLnameBlur,
    handleInputChange: handleLnameChange,
    isValid: isLnameValid,
    isTouched: isLnameTouched,
  } = useInput("", validateName);

  const handleFinish = () => {
    if (isFnameValid && isLnameValid) {
      console.log({
        firstName: FnameValue,
        lastName: LnameValue,
      });
    } else {
      message.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="px-16 mx-16">
      <Form
        id="signup-form"
        name="signup"
        className="signup-form p-16"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <Title>Account</Title>
        <Form.Item name="profileImage" id="profile-image-input">
          <Upload fileList={fileList}>
            <Avatar
              size={64}
              style={{ backgroundColor: "black", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </Upload>
        </Form.Item>
        <Form.Item
          name="fname"
          id="fname-input"
          validateStatus={
            !isFnameTouched ? "" : isFnameValid ? "success" : "error"
          }
          help={
            !isFnameTouched
              ? ""
              : isFnameValid
              ? ""
              : "Please input a valid First name!"
          }
        >
          <Input
            id="fname"
            placeholder="First Name"
            value={FnameValue}
            onChange={handleFnameChange}
            onBlur={handleFnameBlur}
          />
        </Form.Item>
        <Form.Item
          name="lname"
          id="lname-input"
          validateStatus={
            !isLnameTouched ? "" : isLnameValid ? "success" : "error"
          }
          help={
            !isLnameTouched
              ? ""
              : isLnameValid
              ? ""
              : "Please input a valid Last name!"
          }
        >
          <Input
            id="lname"
            placeholder="Last Name"
            value={LnameValue}
            onChange={handleLnameChange}
            onBlur={handleLnameBlur}
          />
        </Form.Item>

        <Form.Item
          name="dob"
          id="dob-input"
          //   validateStatus={dob ? "success" : "error"}
          //   help={dob ? "" : "Please select your date of birth!"}
        >
          <DatePicker
            id="dob"
            placeholder="Date of Birth"
            //   onChange={(date) => setDob(date ? date.format("YYYY-MM-DD") : null)}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          id="phone-number-input"
          //   validateStatus={
          //     validatePhoneNumber(phoneNumber) ? "success" : "error"
          //   }
          //   help={
          //     validatePhoneNumber(phoneNumber)
          //       ? ""
          //       : "Please input a valid Phone Number!"
          //   }
        >
          <Input
            id="phoneNumber"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="licenseNumber"
          id="license-number-input"
          // validateStatus={
          //   validateLicenseNumber(licenseNumber) ? "success" : "error"
          // }
          // help={
          //   validateLicenseNumber(licenseNumber)
          //     ? ""
          //     : "Please input a valid Driver's License Number!"
          // }
        >
          <Input
            id="licenseNumber"
            prefix={<IdcardOutlined className="site-form-item-icon" />}
            placeholder="Driver's License Number"
            // value={licenseNumber}
            // onChange={(e) => setLicenseNumber(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          id="expiry-date-input"
          //   validateStatus={expiryDate ? "success" : "error"}
          //   help={
          //     expiryDate
          //       ? ""
          //       : "Please select the expiry date of your Driver's License!"
          //   }
        >
          <DatePicker
            id="expiryDate"
            placeholder="Expiry Date"
            //   onChange={(date) =>
            //     setExpiryDate(date ? date.format("YYYY-MM-DD") : null)
            //   }
          />
        </Form.Item>
        <Form.Item id="buttons">
          <Button type="primary" htmlType="submit" id="signup-button">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
