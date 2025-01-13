// 账单列表相关store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  // 数据
  initialState: {
    billList: [],
  },

  reducers: {
    // 同步的修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

const { setBillList } = billStore.actions;

// 异步发请求
export function getBillList() {
  return async (dispatch) => {
    // 发请求
    const res = await axios.get("http://localhost:8888/ka");

    // 触发同步方法去修改数据
    dispatch(setBillList(res.data));
  };
}

const billReducer = billStore.reducer;

export default billReducer;
