import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

function Layout() {
  return (
    <div>
      <Outlet></Outlet>
      我是layout
      <Button color="primary">全局生效</Button>
    </div>
  );
}

export default Layout;
