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
import DocumentosContext from "../../context/Documentos/DocumentosContext";
import { MenuItem } from "@mui/material";

export default function EditDocumentos({ open, handleClose, id, empresas = [] }) {
  const { ChangeDocumento } = useContext(DocumentosContext);
  const [documento, setDocumento] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (!id) return;
    MethodGet(`/documentos/${id}`)
      .then((res) => {
        setDocumento(res.data);

        setValue("nombre", res.data.nombre || "", { shouldDirty: true });
        setValue("empresa_id", res.data.empresa_id || "", { shouldDirty: true });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setValue]);

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("empresa_id", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    data.id = id;
    ChangeDocumento(data);
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Documento</DialogTitle>
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
          {documento && (
            <>
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
                sx={{ mb: 2 }}
              />

              <TextField
                select
                fullWidth
                label="Selecciona la empresa"
                defaultValue=""
                {...register("empresa_id", {
                  required: "Debes seleccionar una empresa",
                })}
                error={!!errors.empresa_id}
                helperText={errors.empresa_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una empresa --</em>
                </MenuItem>
                {empresas.map((empresa) => (
                  <MenuItem key={empresa.id} value={empresa.id}>
                    {empresa.nombre}
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
