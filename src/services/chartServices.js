import axios from "axios";

const getIncomeExpenseByProjectChart = async (propertyId) => {
  return await axios.get(
    process.env.REACT_APP_API_URL +
      "/charts/income-expense-by-project/" +
      propertyId,
    {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }
  );
};

const getPropertyChart = async (propertyId) => {
  return await axios.get(
    process.env.REACT_APP_API_URL + "/charts/propertyChart/" + propertyId,
    {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }
  );
};

export { getIncomeExpenseByProjectChart, getPropertyChart };
