import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <div>
      <Outlet></Outlet>
      我是layout
      <Button color="primary">全局生效</Button>
    </div>
  );
}

export default Layout;
