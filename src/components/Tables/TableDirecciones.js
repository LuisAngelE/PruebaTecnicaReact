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
import DireccionesContext from "../../context/Direcciones/DireccionesContext";
import EditDirecciones from "../../containers/Direcciones/EditDirecciones";
import EmpresasContext from "../../context/Empresas/EmpresasContext";

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

export default function DireccionesTable({ direcciones }) {
  const { DeleteDireccion } = useContext(DireccionesContext);
  const { empresas, GetEmpresas } = useContext(EmpresasContext);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [idDireccion, setIdDireccion] = useState(null);

  useEffect(() => {
    GetEmpresas();
  }, []);

  const handleClickOpen = (id) => {
    setModalUpdate(true);
    setIdDireccion(id);
  };

  const handleClickClose = () => {
    setModalUpdate(false);
    setIdDireccion(null);
  };

  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de direcciones">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Dirección</StyledTableCell>
              <StyledTableCell>Empresa</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {direcciones.length > 0 ? (
              direcciones.map((direccion) => (
                <StyledTableRow key={direccion.id}>
                  <StyledTableCell data-label="ID">
                    {direccion.id}
                  </StyledTableCell>
                  <StyledTableCell data-label="Dirección">
                    {direccion.nombre}
                  </StyledTableCell>
                  <StyledTableCell data-label="Dirección">
                    {direccion.empresa
                      ? direccion.empresa.nombre
                      : "Sin Empresa"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <IconButton
                      size="small"
                      onClick={() => handleClickOpen(direccion.id)}
                    >
                      <Tooltip title="Editar Dirección" placement="top">
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => DeleteDireccion(direccion.id)}
                    >
                      <Tooltip title="Eliminar Dirección" placement="top">
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  No hay direcciones disponibles
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {idDireccion !== null && (
        <EditDirecciones
          open={modalUpdate}
          handleClose={handleClickClose}
          id={idDireccion}
          empresas={empresas}
        />
      )}
    </>
  );
}
