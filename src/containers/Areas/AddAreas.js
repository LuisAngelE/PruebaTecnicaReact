import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AreasContext from "../../context/Areas/AreasContext"; // Asegúrate de tener este contexto

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddAreas({ modal, handleClose, direcciones }) {
  const { AddArea } = React.useContext(AreasContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("direccion_id", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    AddArea(data);
    handleClose();
    reset();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Agregar Área
        </BootstrapDialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter")
              e.preventDefault();
          }}
        >
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  name="nombre"
                  variant="outlined"
                  label="Nombre del área"
                  {...register("nombre", {
                    required: "Este campo es requerido",
                    minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    maxLength: { value: 255, message: "Máximo 255 caracteres" },
                  })}
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Selecciona la dirección"
                  defaultValue=""
                  {...register("direccion_id", {
                    required: "Debes seleccionar una empresa",
                  })}
                  error={!!errors.direccion_id}
                  helperText={errors.direccion_id?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona una dirección --</em>
                  </MenuItem>
                  {direcciones.map((direccion) => (
                    <MenuItem key={direccion.id} value={direccion.id}>
                      {direccion.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "#ff8585",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#ff8585",
                },
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
