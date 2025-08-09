import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import TipoArchivosContext from "../../context/TipoArchivos/TipoArchivosContext";
import React, { useContext, useEffect } from "react";
import TableTipoArchivos from "../../components/Tables/TableTipoArchivos";
import AddTipoArchivos from "./AddTipoArchivos";
import EmpresasContext from "../../context/Empresas/EmpresasContext";

const TipoArchivos = () => {
  const { tipoArchivos, GetTipoArchivos } = useContext(TipoArchivosContext);
  const { empresas, GetEmpresas } = useContext(EmpresasContext);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    GetTipoArchivos();
    GetEmpresas();
  }, []);

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
            Tipo de Archivo
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
              "&:hover": { color: "black", backgroundColor: "#ff8585" },
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableTipoArchivos tipoArchivos={tipoArchivos} />
        </Grid>
      </Grid>
      <AddTipoArchivos modal={openModal} handleClose={handleClose} empresas={empresas} />
    </Layout>
  );
};

export default TipoArchivos;
