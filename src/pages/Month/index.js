import { NavBar, DatePicker } from "antd-mobile";
import { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { groupBy } from "lodash";
import DailyBill from "./components/DayBill";

function Month() {
  // 控制时间选择器的打开、关闭
  const [isShowTimePicker, setShowTimePicker] = useState(false);

  // 账单时间
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  // 当前月对应的数组
  const [currentMonthList, setMonthList] = useState([]);

  // 从 store 中拿 billList
  const billList = useSelector((state) => state.bill.billList);

  // useMemo 就是 react 的计算属性
  const monthGroup = useMemo(() => {
    // 将时间按月份分组
    return groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  // 计算当月的支出 收入 结余
  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);

    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      // 支出
      pay,
      // 收入
      income,
      // 结余
      total: pay + income,
    };
  }, [currentMonthList]);

  // 首次进入页面，显示当前月的统计数据
  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM");
    // 不为 undefined 时才 set
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  // 时间选择器的确认按钮的回调
  const onConfirm = (date) => {
    // 隐藏时间选择器
    setShowTimePicker(false);

    // 格式化选择的时间
    const formatDate = dayjs(date).format("YYYY-MM");

    // 取出当前月的数组
    setMonthList(monthGroup[formatDate]);

    setCurrentDate(formatDate);
  };

  // 当前月按照日分组
  const dayGroup = useMemo(() => {
    const groupData = groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys,
    };
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      {/* 顶部栏 */}
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>

      <div className="content">
        <div className="header">
          {/* 时间切换下拉 */}
          <div className="date" onClick={() => setShowTimePicker(true)}>
            {/* 账单日期 */}
            <span className="text">{currentDate + ""}月账单</span>

            {/* 日期选择器显示时，箭头向上，即添加 expand 类名*/}
            <span
              className={classNames("arrow", isShowTimePicker && "expand")}
            ></span>
          </div>

          {/* 统计文本 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>

          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={isShowTimePicker}
            onCancel={() => setShowTimePicker(false)}
            onConfirm={onConfirm}
            onClose={() => setShowTimePicker(false)}
            max={new Date()}
          />
        </div>

        {/* 单日列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Month;
