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
import CarpetasContext from "../../context/Carpetas/CarpetasContext";
import { MenuItem } from "@mui/material";

export default function EditCarpetas({ open, handleClose, id, areas = [] }) {
  const { ChangeCarpeta } = useContext(CarpetasContext);
  const [carpeta, setCarpeta] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (!id) return;
    MethodGet(`/carpetas/${id}`)
      .then((res) => {
        setCarpeta(res.data);

        setValue("nombre", res.data.nombre || "", { shouldDirty: true });
        setValue("area_id", res.data.area_id || "", { shouldDirty: true });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setValue]);

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("area_id", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    data.id = id;
    ChangeCarpeta(data);
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Carpeta</DialogTitle>
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
          {carpeta && (
            <>
              <TextField
                type="text"
                fullWidth
                name="nombre"
                variant="outlined"
                label="Nombre de la carpeta"
                {...register("nombre", {
                  required: "Este campo es requerido",
                  minLength: { value: 4, message: "Mínimo 4 caracteres" },
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                select
                fullWidth
                label="Selecciona el área"
                defaultValue={carpeta.area_id || ""}
                {...register("area_id", {
                  required: "Debes seleccionar un área",
                })}
                error={!!errors.area_id}
                helperText={errors.area_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un área --</em>
                </MenuItem>
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    {area.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </>
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
