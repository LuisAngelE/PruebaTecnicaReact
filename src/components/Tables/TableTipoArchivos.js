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
import { useState } from "react";

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

export default function TableDocumentos() {
  // Dataset fake basado en la estructura real de la tabla `documentos`
  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      carpeta_id: 10,
      tipo_archivo_id: 2,
      nombre: "Informe Financiero 2024",
      archivo: "informe_financiero_2024.pdf",
      fecha_creacion: "2024-01-15T09:30:00Z",
      created_at: "2024-01-15T09:30:00Z",
      updated_at: "2024-02-01T14:20:00Z",
      empresa: { nombre: "TechCorp S.A." },
    },
    {
      id: 2,
      carpeta_id: 12,
      tipo_archivo_id: 1,
      nombre: "Manual de Seguridad",
      archivo: "manual_seguridad.pdf",
      fecha_creacion: "2024-03-02T10:00:00Z",
      created_at: "2024-03-02T10:00:00Z",
      updated_at: "2024-03-05T16:45:00Z",
      empresa: { nombre: "Construcciones del Norte" },
    },
    {
      id: 3,
      carpeta_id: 14,
      tipo_archivo_id: 3,
      nombre: "Plan de Marketing Q1",
      archivo: "plan_marketing_q1.docx",
      fecha_creacion: "2024-01-05T11:15:00Z",
      created_at: "2024-01-05T11:15:00Z",
      updated_at: "2024-01-20T08:40:00Z",
      empresa: { nombre: "TechCorp S.A." },
    },
    {
      id: 4,
      carpeta_id: 15,
      tipo_archivo_id: 4,
      nombre: "Contrato de Proveedor",
      archivo: "contrato_proveedor.pdf",
      fecha_creacion: "2024-02-10T14:00:00Z",
      created_at: "2024-02-10T14:00:00Z",
      updated_at: "2024-02-12T09:25:00Z",
      empresa: { nombre: "Alimentos del Valle" },
    },
    {
      id: 5,
      carpeta_id: 18,
      tipo_archivo_id: 2,
      nombre: "Reporte de Auditoría",
      archivo: "reporte_auditoria.xlsx",
      fecha_creacion: "2024-04-01T08:00:00Z",
      created_at: "2024-04-01T08:00:00Z",
      updated_at: "2024-04-03T17:55:00Z",
      empresa: null, // Solo este documento no tiene empresa
    },
  ]);

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

  const DeleteDocumento = (id) => {
    setDocumentos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de documentos">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Archivo</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc) => (
              <StyledTableRow key={doc.id}>
                <StyledTableCell data-label="ID">{doc.id}</StyledTableCell>
                <StyledTableCell data-label="Nombre">
                  {doc.nombre}
                </StyledTableCell>
                <StyledTableCell data-label="Archivo">
                  {doc.archivo}
                </StyledTableCell>

                <StyledTableCell data-label="Acciones">
                  <IconButton
                    size="small"
                    onClick={() => handleClickOpen(doc.id)}
                  >
                    <Tooltip title="Editar Documento" placement="top">
                      <EditIcon sx={{ color: "#e7a62f" }} />
                    </Tooltip>
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => DeleteDocumento(doc.id)}
                  >
                    <Tooltip title="Eliminar Documento" placement="top">
                      <DeleteIcon sx={{ color: "#FF0000" }} />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {/* Simulación de modal */}
      {idDocumento !== null && (
        <div style={{ padding: 20, background: "#eee", marginTop: 10 }}>
          <p>Editando documento con ID: {idDocumento}</p>
          <button onClick={handleClickClose}>Cerrar</button>
        </div>
      )}
    </>
  );
}
