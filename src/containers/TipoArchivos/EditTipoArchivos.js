import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import MethodGet from "../../config/service";
import TipoArchivosContext from "../../context/TipoArchivos/TipoArchivosContext";

export default function EditTipoArchivos({ open, handleClose, id }) {
  const { ChangeArchivo } = useContext(TipoArchivosContext);
  const [archivo, saveArchivo] = useState(null);
  useEffect(() => {
    if (!id) return;
    MethodGet(`/tipos-archivos/${id}`)
      .then((res) => {
        saveArchivo(res.data);
        console.log(res.data, "archivo editado");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
  };
  const onSubmit = (data) => {
    data.id = id;
    ChangeArchivo(data);
    handleClose();
    reset();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Tipo de Archivo</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          {archivo && (
            <TextField
              type="text"
              fullWidth
              name="nombre"
              variant="outlined"
              defaultValue={archivo.nombre}
              label="Nombre del tipo de archivo"
              {...register("nombre", {
                required: "Este campo es requerido",
                minLength: { value: 4, message: "Mínimo 4 caracteres" },
                maxLength: { value: 255, message: "Máximo 255 caracteres" },
              })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
