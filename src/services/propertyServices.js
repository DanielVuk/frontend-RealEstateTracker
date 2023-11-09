import axios from "axios";

//dohvacanje user property
const getUserPropertis = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/properties", {
      headers: { "x-auth-token": token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//brisanje property-a
const deleteProperty = async (token, propertyId) => {
  try {
    const response = await axios.delete(
      "http://localhost:8000/api/properties/" + propertyId,
      {
        headers: { "x-auth-token": token },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUserPropertis, deleteProperty };
