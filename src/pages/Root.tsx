import { NavLink, Outlet } from "react-router-dom";

import { Button, Layout, Menu, theme, Modal } from "antd";

import Login from "../components/Login";
import Signup from "../components/Signup";

import { openModal, closeModal } from "../store/modal-slice";
import { useModalDispatch, useModalSelector } from "../store/hooks";

const { Header, Footer } = Layout;

const Root = () => {
  const modalDispatch = useModalDispatch();
  const modal = useModalSelector((state) => state.modal);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleShowModal = (content: string) => {
    modalDispatch(openModal(content));
  };

  const handleCancel = () => {
    modalDispatch(closeModal());
  };

  let modalContent;
  switch (modal.content) {
    case "login":
      modalContent = <Login />;
      break;
    case "signup":
      modalContent = <Signup />;
      break;
    default:
      modalContent = null;
  }

  return (
    <Layout className="min-h-screen flex flex-col w-full">
      <Header className="flex items-center w-full">
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
        <Button onClick={() => handleShowModal("login")}>Login</Button>
      </Header>
      <Modal
        title={modal.content === "signup" ? "Signup" : "Login"}
        open={modal.isOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {modalContent}
      </Modal>
      <div
        className="h-screen"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </div>
      <Footer className="text-center w-full">
        CarX ©{new Date().getFullYear()} Created by Amir & Hassan
      </Footer>
    </Layout>
  );
};

export default Root;
