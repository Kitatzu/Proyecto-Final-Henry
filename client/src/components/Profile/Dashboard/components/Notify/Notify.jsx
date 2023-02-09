import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";

export default function Notify() {
  const [form, setForm] = useState({
    type: "",
    notification: "",
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    socket.on("notification", (data) => console.log(data));
    return () => socket.off("notification", (data) => console.log(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("notification", JSON.stringify(form));
    setForm({ ...form, message: "" });
  };

  return (
    <Box display={"flex"} flexDirection="column" gap={"20px"} padding="20px">
      <Box></Box>
      <Box
        display={"flex"}
        flexDirection="column"
        gap={"20px"}
        padding="20px"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Typography>Chat: {form.userName}</Typography>
        <TextField
          onChange={handleChange}
          name="type"
          disabled={disabled}
          value={form.type}
          label="Tipo de notificacion"
          sx={{ width: "100%" }}
        />

        <TextField
          onChange={handleChange}
          name="notify"
          value={form.notify}
          multiline={true}
          label="Message"
          sx={{ width: "100%" }}
        />
        <Button variant="contained" type="sumbit">
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
