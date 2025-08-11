import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import AreasContext from "../../context/Areas/AreasContext";
import EditAreas from "../../containers/Areas/EditAreas";
import DireccionesContext from "../../context/Direcciones/DireccionesContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FF8585",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerResponsive = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& thead": {
      display: "none",
    },
    "& tbody tr": {
      display: "block",
      marginBottom: "15px",
    },
    "& td": {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 5px",
      borderBottom: "1px solid #ddd",
      "&:before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      "&:last-child": {
        borderBottom: 0,
      },
    },
  },
}));

export default function TableAreas({ areas }) {
  const { DeleteArea } = useContext(AreasContext);
  const { direcciones, GetDirecciones } = useContext(DireccionesContext);
  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_area, saveIdArea] = useState(null);

  useEffect(() => {
    GetDirecciones();
  }, []);

  const handleClickOpen = (id) => {
    OpenModalUpdate(true);
    saveIdArea(id);
  };

  const handleClickClose = () => {
    OpenModalUpdate(false);
    saveIdArea(null);
  };

  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de áreas">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Dirección</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {areas.length > 0 ? (
              areas.map((area) => (
                <StyledTableRow key={area.id}>
                  <StyledTableCell data-label="ID">{area.id}</StyledTableCell>
                  <StyledTableCell data-label="Nombre">
                    {area.nombre}
                  </StyledTableCell>
                  <StyledTableCell data-label="Dirección">
                    {area.direccion ? area.direccion.nombre : "Sin Dirección"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <IconButton
                      size="small"
                      onClick={() => handleClickOpen(area.id)}
                    >
                      <Tooltip title="Editar Área" placement="top">
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => DeleteArea(area.id)}
                    >
                      <Tooltip title="Eliminar Área" placement="top">
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  No hay áreas disponibles
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {id_area !== null && (
        <EditAreas
          open={modalUpdate}
          handleClose={handleClickClose}
          id={id_area}
          direcciones={direcciones}
        />
      )}
    </>
  );
}
