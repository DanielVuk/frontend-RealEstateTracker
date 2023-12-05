import axios from "axios";

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

const deleteProperty = async (token, propertyId) => {
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

const addProperty = async (token, property) => {
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

const getPropertyById = async (token, propertyId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/properties/" + propertyId,
      {
        headers: { "x-auth-token": token },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateProperty = async (token, propertyId, updatedProperty) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/properties/" + propertyId,
      updatedProperty,
      {
        headers: { "x-auth-token": token },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPaginatedProperties = async (currentPage, itemsPerPage, filter) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/properties/paginated-properties`,

      {
        headers: { "x-auth-token": localStorage.getItem("token") },
        params: {
          page: currentPage,
          itemsPerPage,
          type: filter?.type,
          minPrice: filter?.minPrice,
          maxPrice: filter?.maxPrice,
          minArea: filter?.minArea,
          maxArea: filter?.maxArea,
        },
      }
    );

    return {
      properties: response.data.properties,
      totalProperties: response.data.totalProperties,
    };
  } catch (error) {
    console.error(error);
  }
};

export {
  getUserPropertis,
  deleteProperty,
  addProperty,
  getPropertyById,
  updateProperty,
  getPaginatedProperties,
};
