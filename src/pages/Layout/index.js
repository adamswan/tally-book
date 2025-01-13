import { TabBar } from "antd-mobile";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import "./index.scss";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 用 dispatch 才能调用 store 中的方法
    dispatch(getBillList());
  }, [dispatch]);

  // 切换菜单跳转路由
  const navigate = useNavigate();

  // 切换面板的回调
  const handlerChange = (path) => { // 参数path 就是点击的菜单的 key
    console.log(path);
    navigate(path);
  };

  return (
    <div className="layout">
      {/* 二级路由的出口 */}
      <div className="container">
        <Outlet />
      </div>

      {/* 底部的 tabbar */}
      <div className="footer">

        <TabBar onChange={handlerChange}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
