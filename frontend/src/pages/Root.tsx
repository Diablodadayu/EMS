import React from "react";
import { Layout, Menu } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    label: <Link to="/">List</Link>,
  },
  {
    key: "/new",
    label: <Link to="/new">Create Employee</Link>,
  },
];
const App: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px", height: "calc(100vh - 128px)" }}>
        <div
          style={{
            height: "100%",
            padding: 24,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>DONGXU XIA / 8886742</Footer>
    </Layout>
  );
};

export default App;
