import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import DireccionesContext from "../../context/Direcciones/DireccionesContext";
import React, { useContext, useEffect } from "react";
import TableDirecciones from "../../components/Tables/TableDirecciones";
import AddDirecciones from "./AddDirecciones";
import EmpresasContext from "../../context/Empresas/EmpresasContext";

const Direcciones = () => {
  const { direcciones, GetDirecciones } = useContext(DireccionesContext);
  const { empresas, GetEmpresas } = useContext(EmpresasContext);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    GetDirecciones();
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
            Direcciones
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
                backgroundColor: "#ff8585 ",
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableDirecciones direcciones={direcciones} />
        </Grid>
      </Grid>
      <AddDirecciones
        modal={openModal}
        handleClose={handleClose}
        empresas={empresas}
      />
    </Layout>
  );
};

export default Direcciones;
