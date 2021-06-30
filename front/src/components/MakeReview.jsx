import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";

const MakeReview = ({ userUuid, text, productUuid }) => {
  const CHARACTER_LIMIT = 200;
  const [values, setValues] = useState({
    name: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <TextField
          label="Dejanos tu Comentario..."
          fullWidth="true"
          multiline
          inputProps={{ maxLength: CHARACTER_LIMIT }}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          variant="outlined"
          helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
        ></TextField>
        <Button variant="contained" color="default">
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default MakeReview;
