import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import DocumentosContext from "../../context/Documentos/DocumentosContext";
import React, { useContext, useEffect } from "react";
import TableDocumentos from "../../components/Tables/TableDocumentos";
import AddDocumentos from "./AddDocumentos";
import CarpetasContext from "../../context/Carpetas/CarpetasContext";
import TiposArchivosContext from "../../context/TipoArchivos/TipoArchivosContext";

const Documentos = () => {
  const { documentos, GetDocumentos } = useContext(DocumentosContext);
  const { carpetas, GetCarpetas } = useContext(CarpetasContext);
  const { archivos, GetTipoArchivos } = useContext(TiposArchivosContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [searchNombre, setSearchNombre] = React.useState("");
  const [searchTipoArchivo, setSearchTipoArchivo] = React.useState("");
  const [searchCarpeta, setSearchCarpeta] = React.useState("");

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    GetDocumentos(searchNombre, searchTipoArchivo, searchCarpeta);
    GetCarpetas();
    GetTipoArchivos();
  }, [searchNombre, searchTipoArchivo, searchCarpeta]);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black" }}
          >
            Documentos
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClickOpen}
            sx={{
              color: "black",
              backgroundColor: "#ff8585",
              "&:hover": {
                color: "black",
                backgroundColor: "#ff8585",
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            size="small"
            fullWidth
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Filtrar por tipo de archivo"
            value={searchTipoArchivo}
            onChange={(e) => setSearchTipoArchivo(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {archivos.map((archivo) => (
              <MenuItem key={archivo.id} value={archivo.id}>
                {archivo.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            select
            label="Filtrar por carpeta"
            value={searchCarpeta}
            onChange={(e) => setSearchCarpeta(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todas</MenuItem>
            {carpetas.map((carpeta) => (
              <MenuItem key={carpeta.id} value={carpeta.id}>
                {carpeta.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableDocumentos
            documentos={documentos}
            carpetas={carpetas}
            archivos={archivos}
          />
        </Grid>
      </Grid>
      <AddDocumentos
        modal={openModal}
        handleClose={handleClose}
        carpetas={carpetas}
        archivos={archivos}
      />
    </Layout>
  );
};

export default Documentos;
