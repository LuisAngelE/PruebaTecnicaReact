import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import TableAreas from "../../components/Tables/TableAreas";
import AreasContext from "../../context/Areas/AreasContext";
import React, { useContext, useEffect } from "react";
import AddAreas from "../Areas/AddAreas";
import DireccionesContext from "../../context/Direcciones/DireccionesContext";

const Areas = () => {
  const { areas, GetAreas } = useContext(AreasContext);
  const { direcciones, GetDirecciones } = useContext(DireccionesContext);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    GetAreas();
    GetDirecciones();
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
            Áreas
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableAreas areas={areas} />
        </Grid>
      </Grid>
      <AddAreas
        modal={openModal}
        handleClose={handleClose}
        direcciones={direcciones}
      />
    </Layout>
  );
};

export default Areas;
