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
import { useContext, useState } from "react";
import TipoArchivosContext from "../../context/TipoArchivos/TipoArchivosContext";
import EditTipoArchivos from "../../containers/TipoArchivos/EditTipoArchivos";

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
    "& thead": { display: "none" },
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
      "&:last-child": { borderBottom: 0 },
    },
  },
}));

export default function TableDocumentos({ archivos = [] }) {
  const { DeleteArchivo } = useContext(TipoArchivosContext);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [idDocumento, setIdDocumento] = useState(null);
  const handleClickOpen = (id) => {
    setModalUpdate(true);
    setIdDocumento(id);
  };
  const handleClickClose = () => {
    setModalUpdate(false);
    setIdDocumento(null);
  };
  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de documentos">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivos.length > 0 ? (
              archivos.map((archivo) => (
                <StyledTableRow key={archivo.id}>
                  <StyledTableCell data-label="ID">
                    {archivo.id}
                  </StyledTableCell>
                  <StyledTableCell data-label="Nombre">
                    {archivo.nombre}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <Tooltip title="Editar Documento" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(archivo.id)}
                      >
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar Documento" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => DeleteArchivo(archivo.id)}
                      >
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay tipos de archivos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>
      {idDocumento !== null && (
        <EditTipoArchivos
          open={modalUpdate}
          handleClose={handleClickClose}
          id={idDocumento}
        />
      )}
    </>
  );
}
