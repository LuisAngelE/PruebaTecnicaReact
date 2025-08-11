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
import DocumentosContext from "../../context/Documentos/DocumentosContext";

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

export default function AddDocumentos({
  modal,
  handleClose,
  carpetas,
  archivos = [],
}) {
  const { AddDocumento } = React.useContext(DocumentosContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("carpeta_id", "", { shouldDirty: true });
    setValue("tipo_archivo_id", "", { shouldDirty: true });
    setValue("archivo", "", { shouldDirty: true });
    setValue("fecha_creacion", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("archivo", data.archivo[0]);
    formData.append("nombre", data.nombre);
    formData.append("carpeta_id", data.carpeta_id);
    formData.append("tipo_archivo_id", data.tipo_archivo_id);
    formData.append("fecha_creacion", data.fecha_creacion);

    AddDocumento(formData);
    handleClose();
    reset();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Agregar Documento
      </BootstrapDialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter")
            e.preventDefault();
        }}
      >
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Selecciona la carpeta"
                defaultValue=""
                {...register("carpeta_id", {
                  required: "Debes seleccionar una empresa",
                })}
                error={!!errors.carpeta_id}
                helperText={errors.carpeta_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una carpeta --</em>
                </MenuItem>
                {carpetas.map((carpeta) => (
                  <MenuItem key={carpeta.id} value={carpeta.id}>
                    {carpeta.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Selecciona el tipo de archivo"
                defaultValue=""
                {...register("tipo_archivo_id", {
                  required: "Debes seleccionar una tipo de archivo",
                })}
                error={!!errors.tipo_archivo_id}
                helperText={errors.tipo_archivo_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una tipo de archivo --</em>
                </MenuItem>
                {archivos.map((archivo) => (
                  <MenuItem key={archivo.id} value={archivo.id}>
                    {archivo.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                name="nombre"
                variant="outlined"
                label="Nombre del documento"
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
              <input
                type="file"
                {...register("archivo", {
                  required: "Debes subir un archivo",
                })}
                style={{ width: "100%" }}
              />
              {errors.archivo && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.archivo.message}
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                fullWidth
                {...register("fecha_creacion", {
                  required: "La fecha de creación es requerida",
                })}
                error={!!errors.fecha_creacion}
                helperText={errors.fecha_creacion?.message}
              />
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
  );
}
