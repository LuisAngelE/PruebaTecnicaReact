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

export default function EditDocumentos({
  open,
  handleClose,
  id,
  carpetas = [],
  archivos = [],
}) {
  const { ChangeDocumento } = useContext(DocumentosContext);
  const [documento, setDocumento] = useState(null);
  console.log(id, "id en edit");

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
        setValue("carpeta_id", res.data.carpeta_id || "", {
          shouldDirty: true,
        });
        setValue("tipo_archivo_id", res.data.tipo_archivo_id || "", {
          shouldDirty: true,
        });
        setValue(
          "fecha_creacion",
          res.data.fecha_creacion?.slice(0, 10) || "",
          { shouldDirty: true }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, setValue]);

  const reset = () => {
    setValue("nombre", "", { shouldDirty: true });
    setValue("carpeta_id", "", { shouldDirty: true });
    setValue("tipo_archivo_id", "", { shouldDirty: true });
    setValue("fecha_creacion", "", { shouldDirty: true });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", data.nombre);
    formData.append("carpeta_id", data.carpeta_id);
    formData.append("tipo_archivo_id", data.tipo_archivo_id);
    formData.append("fecha_creacion", data.fecha_creacion);

    if (data.archivo && data.archivo.length > 0) {
      formData.append("archivo", data.archivo[0]);
    }

    ChangeDocumento({ ...data, id, archivo: data.archivo });
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Documento</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        encType="multipart/form-data"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent dividers>
          {documento && (
            <>
              <TextField
                select
                fullWidth
                label="Selecciona la carpeta"
                {...register("carpeta_id", {
                  required: "Debes seleccionar una carpeta",
                })}
                error={!!errors.carpeta_id}
                helperText={errors.carpeta_id?.message}
                sx={{ mb: 2 }}
                defaultValue={documento?.carpeta_id || ""}
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

              <TextField
                select
                fullWidth
                label="Selecciona el tipo de archivo"
                {...register("tipo_archivo_id", {
                  required: "Debes seleccionar un tipo de archivo",
                })}
                error={!!errors.tipo_archivo_id}
                helperText={errors.tipo_archivo_id?.message}
                sx={{ mb: 2 }}
                defaultValue={documento?.tipo_archivo_id || ""}
              >
                <MenuItem value="">
                  <em>-- Selecciona un tipo de archivo --</em>
                </MenuItem>
                {archivos.map((archivo) => (
                  <MenuItem key={archivo.id} value={archivo.id}>
                    {archivo.nombre}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                type="text"
                fullWidth
                name="nombre"
                variant="outlined"
                label="Nombre del documento"
                {...register("nombre", {
                  required: "Este campo es requerido",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                sx={{ mb: 2 }}
              />

              <input
                type="file"
                {...register("archivo")}
                style={{ width: "100%", marginBottom: 16 }}
              />
              {errors.archivo && (
                <p style={{ color: "red", fontSize: "0.8rem" }}>
                  {errors.archivo.message}
                </p>
              )}

              <TextField
                type="date"
                fullWidth
                {...register("fecha_creacion", {
                  required: "La fecha de creación es requerida",
                })}
                error={!!errors.fecha_creacion}
                helperText={errors.fecha_creacion?.message}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              reset();
            }}
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
