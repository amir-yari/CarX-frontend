import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { Button, Layout, Menu, theme, Modal } from "antd";
import Login from "../components/Login";

const { Header, Content, Footer } = Layout;

const Root = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen flex flex-col w-full">
      <Header className="flex items-center w-full">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "1",
              label: <NavLink to="/">Home</NavLink>,
            },
            {
              key: "2",
              label: <NavLink to="/cars">Cars List</NavLink>,
            },
          ]}
          className="flex-1 min-w-0"
        />
        <Button onClick={handleShowModal}>Login</Button>
      </Header>
      <Content className="flex-1 p-12 w-full">
        <div
          className="bg-white min-h-72 p-6 rounded-lg"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Modal
            title="Login"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Login />
          </Modal>
          <Outlet />
        </div>
      </Content>
      <Footer className="text-center w-full">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Root;
