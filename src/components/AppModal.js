import { Box, Modal, Slide } from "@mui/material";

const style = {
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 20,
  minWidth: "550px",
  p: 4,
};

const AppModal = ({ open, onClose, children }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slide in={open}>
        <Box sx={style}>{children}</Box>
      </Slide>
    </Modal>
  );
};

export default AppModal;
