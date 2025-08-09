import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import CarpetasContext from "../../context/Carpetas/CarpetasContext";
import React, { useContext, useEffect, useState } from "react";
import TableCarpetas from "../../components/Tables/TableCarpetas";
import AddCarpetas from "./AddCarpetas";
import AreasContext from "../../context/Areas/AreasContext";

const Carpetas = () => {
  const { carpetas, GetCarpetas } = useContext(CarpetasContext);
  const { areas, GetAreas } = useContext(AreasContext);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    GetCarpetas();
    GetAreas();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={10}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black" }}
          >
            Carpetas
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
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
        <Grid item xs={12}>
          <TableCarpetas carpetas={carpetas} areas={areas} />
        </Grid>
      </Grid>
      <AddCarpetas modal={openModal} handleClose={handleClose} areas={areas} />
    </Layout>
  );
};

export default Carpetas;
