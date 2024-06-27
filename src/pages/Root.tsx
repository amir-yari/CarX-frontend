import { NavLink, Outlet } from "react-router-dom";

import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

const Root = () => {
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
      </Header>
      <Content className="flex-1 p-12 w-full">
        <div
          className="bg-white min-h-72 p-6 rounded-lg"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
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
