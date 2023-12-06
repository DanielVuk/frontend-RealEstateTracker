import { useContext, useEffect } from "react";
import MenuRoutes from "./MenuRoutes";
import { Context } from "./Store";
import LoadingSpinner from "./components/LoadingSpinner";
import { getUserPropertis } from "./services/propertyServices";
import { getUser } from "./services/userServices";

const App = () => {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUser = async () => {
        let response = await getUser(token);

        setState({
          ...state,
          properties: await getUserPropertis(token),
          user: {
            name: response.data.name,
            email: response.data.email,
            id: response.data._id,
          },
        });
      };
      fetchUser();
    }
  }, []);

  return (
    <>
      <MenuRoutes />
      <LoadingSpinner loading={state.loading} />
    </>
  );
};

export default App;
