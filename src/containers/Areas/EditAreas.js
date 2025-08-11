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
import AreasContext from "../../context/Areas/AreasContext";
import { MenuItem } from "@mui/material";

export default function EditAreas({ open, handleClose, id, direcciones }) {
  const { ChangeArea } = useContext(AreasContext);
  const [area, saveArea] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (!id) return;
    let url = `/areas/${id}`;
    MethodGet(url)
      .then((res) => {
        saveArea(res.data);

        setValue("nombre", res.data.nombre || "", { shouldDirty: true });
        setValue("direccion_id", res.data.direccion_id || "", {
          shouldDirty: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setValue]);

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("direccion_id", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    data.id = id;
    ChangeArea(data);
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Área</DialogTitle>
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
          {area && (
            <>
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

              <TextField
                select
                fullWidth
                label="Selecciona la dirección"
                {...register("direccion_id", {
                  required: "Debes seleccionar una dirección",
                })}
                error={!!errors.direccion_id}
                helperText={errors.direccion_id?.message}
                defaultValue={area?.direccion_id || ""}
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
