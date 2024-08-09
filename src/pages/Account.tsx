import { useEffect, useState } from "react";

import { IdcardOutlined, PhoneOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  DatePicker,
  Typography,
  message,
  UploadFile,
  UploadProps,
} from "antd";
import ImgCrop from "antd-img-crop";

import { useInput } from "../hooks/useInput";
import { validateName } from "../util/validation";

import { useUserDispatch, useUserSelector } from "../store/hooks";
import { userActions } from "../store/user-slice";

const { Title } = Typography;

const Account = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const userDispatch = useUserDispatch();
  const user = useUserSelector((state) => state.user);

  useEffect(() => {
    if (user.profileImage) {
      setFileList([
        {
          uid: "-1",
          name: "profileImage.png",
          status: "done",
          thumbUrl: user.profileImage,
        },
      ]);
    }
  }, [user.profileImage]);

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

  const handleFinish = (allValues: any) => {
    const { fname, lname, dob, phoneNumber, expiryDate, licenseNumber } =
      allValues;
    userDispatch(
      userActions.setUserInfo({
        ...user,
        firstName: fname ? fname : user.firstName,
        lastName: lname ? lname : user.lastName,
        phone: phoneNumber ? phoneNumber : user.phone,
        DLN: licenseNumber ? licenseNumber : user.DLN,
        dob: dob ? dob.$d.toISOString() : user.dob,
        DLExpirationDate: expiryDate
          ? expiryDate.$d.toISOString()
          : user.DLExpirationDate,
        profileImage: fileList![0].thumbUrl
          ? fileList![0].thumbUrl
          : user.profileImage,
      })
    );
    message.success("Saved");
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="px-16 mx-16">
      <Form
        id="signup-form"
        name="signup"
        className="signup-form p-16"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        variant="filled"
      >
        <Title>Account</Title>
        <Form.Item name="profileImage" id="profile-image-input">
          <ImgCrop>
            <Upload
              action=""
              listType="picture-circle"
              maxCount={1}
              fileList={fileList}
              onChange={handleChange}
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length === 1 ? null : uploadButton}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          name="fname"
          id="fname-input"
          initialValue={user.firstName}
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
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="lname"
          id="lname-input"
          initialValue={user.lastName}
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
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="dob"
          id="dob-input"
          // initialValue={user.dob}
          // validateStatus={user.dob ? "success" : "error"}
          // help={user.dob ? "" : "Please select your date of birth!"}
        >
          <DatePicker id="dob" placeholder="Date of Birth" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          id="phone-number-input"
          initialValue={user.phone}
          // validateStatus={
          //   validatePhoneNumber(phoneNumber) ? "success" : "error"
          // }
          // help={
          //   validatePhoneNumber(phoneNumber)
          //     ? ""
          //     : "Please input a valid Phone Number!"
          // }
        >
          <Input
            id="phoneNumber"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="licenseNumber"
          id="license-number-input"
          initialValue={user.DLN}
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
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          id="expiry-date-input"
          // placeHolder={user.DLExpirationDate}
          //   validateStatus={expiryDate ? "success" : "error"}
          //   help={
          //     expiryDate
          //       ? ""
          //       : "Please select the expiry date of your Driver's License!"
          //   }
        >
          <DatePicker id="expiryDate" placeholder="Expiry Date" />
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

export default Account;
