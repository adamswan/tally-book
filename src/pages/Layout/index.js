import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Outlet></Outlet>
      我是layout
    </div>
  );
}

export default Layout;
