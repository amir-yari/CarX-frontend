import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Menu, theme, Modal, Image } from "antd";

import { motion } from "framer-motion";

import Login from "../components/Login";
import Signup from "../components/Signup";
import { openModal, closeModal } from "../store/modal-slice";
import { useModalDispatch, useModalSelector } from "../store/hooks";
import logoLinks from "../assets/logoLinks.json";

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
      <Header className="flex items-center">
        <div className="demo-logo pr-6" style={{ paddingTop: "1.05rem" }}>
          <NavLink to={"/"}>
            <Image
              src={logoLinks["logo-white-no-background-png"]}
              style={{ maxHeight: "30px" }}
              preview={false}
            />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: "1",
              label: (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <NavLink to="/">Home</NavLink>
                </motion.div>
              ),
            },
            {
              key: "2",
              label: (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <NavLink to="/cars">Cars List</NavLink>
                </motion.div>
              ),
            },
          ]}
          className="flex-1 min-w-0"
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Button onClick={() => handleShowModal("login")}>Login</Button>
        </motion.div>
      </Header>

      {modal.isOpen && (
        <Modal
          title={modal.content === "signup" ? "Signup" : "Login"}
          open={true}
          onCancel={handleCancel}
          footer={null}
        >
          {modalContent}
        </Modal>
      )}

      <div
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
