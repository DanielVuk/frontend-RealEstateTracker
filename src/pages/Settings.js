import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Context } from "../Store"; // Prilagodite putanju prema vašem kontekstu
// import { deleteAccount } from "../services/userServices"; // Prilagodite putanju prema vašim uslugama

const SettingsPage = () => {
  const [state, setState] = useContext(Context);

  const handleDeleteAccount = async () => {
    try {
      // Pozovite funkciju za brisanje računa
      //   await deleteAccount(state.token);
      // Dodajte dodatne radnje nakon brisanja računa ako je potrebno
      // ...
      // Prijavite korisnika ili preusmjerite na početnu stranicu
      // ...
    } catch (error) {
      // Obradite greške prilikom brisanja računa
      console.error("Error deleting account:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Settings</Typography>
      <Typography>
        User: {state.user.name} ({state.user.email})
      </Typography>
      {/* Prikaz dodatnih informacija o korisniku */}
      {/* ... */}

      {/* Gumb za brisanje računa */}
      <Button variant="contained" color="error" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </Box>
  );
};

export default SettingsPage;
