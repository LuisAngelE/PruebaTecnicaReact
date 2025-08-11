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
import DocumentosContext from "../../context/Documentos/DocumentosContext";
import EditDocumentos from "../../containers/Documentos/EditDocumentos";
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

export default function TableDocumentos({ documentos, carpetas, archivos }) {
  const { DeleteDocumento } = useContext(DocumentosContext);
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
              <StyledTableCell>Carpeta</StyledTableCell>
              <StyledTableCell>Tipo de Archivo</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Archivo</StyledTableCell>
              <StyledTableCell>Fecha Creación</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.length > 0 ? (
              documentos.map((documento) => (
                <StyledTableRow key={documento.id}>
                  <StyledTableCell data-label="ID">
                    {documento.id}
                  </StyledTableCell>
                  <StyledTableCell data-label="Carpeta ID">
                    {documento.carpeta?.nombre || "Sin carpeta"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Tipo Archivo ID">
                    {documento.tipo_archivo?.nombre || "Sin tipo"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Nombre">
                    {documento.nombre}
                  </StyledTableCell>
                  <StyledTableCell data-label="Archivo">
                    {documento.archivo}
                  </StyledTableCell>
                  <StyledTableCell data-label="Fecha Creación">
                    {new Date(documento.fecha_creacion).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <IconButton
                      size="small"
                      onClick={() => handleClickOpen(documento.id)}
                    >
                      <Tooltip title="Editar Documento" placement="top">
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => DeleteDocumento(documento.id)}
                    >
                      <Tooltip title="Eliminar Documento" placement="top">
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay documentos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {idDocumento !== null && (
        <EditDocumentos
          open={modalUpdate}
          handleClose={handleClickClose}
          id={idDocumento}
          carpetas={carpetas}
          archivos={archivos}
        />
      )}
    </>
  );
}
