import axios from "axios";

//dohvacanje user property
const getUserPropertis = async (token) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/properties",
      {
        headers: { "x-auth-token": token },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//brisanje property-a
const deleteProperty = async (token, propertyId) => {
  console.log("ID nekretnie za brisati: ", propertyId);
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/properties/" + propertyId,
      {
        headers: { "x-auth-token": token },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//dodavanje property-a
const addProperty = async (token, property) => {
  console.log(property);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/properties ",
      {
        ...property,
      },
      {
        headers: { "x-auth-token": token },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUserPropertis, deleteProperty, addProperty };
