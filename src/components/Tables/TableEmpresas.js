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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import EmpresasContext from "../../context/Empresas/EmpresasContext";
import EditEmpresas from "../../containers/Empresas/EditEmpresas";

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

export default function EmpresasTable({ empresas }) {
  const { DeleteEmpresa } = useContext(EmpresasContext);
  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_service, saveIdService] = useState(null);
  const handleClickOpen = (id) => {
    OpenModalUpdate(true);
    saveIdService(id);
  };
  const handleClickClose = () => {
    OpenModalUpdate(false);
    saveIdService(null);
  };
  console.log(empresas);
  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de empresas">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <StyledTableRow key={empresa.id}>
                <StyledTableCell data-label="ID">{empresa.id}</StyledTableCell>
                <StyledTableCell data-label="Nombre">
                  {empresa.nombre}
                </StyledTableCell>
                <StyledTableCell data-label="Acciones">
                  <IconButton
                    size="small"
                    onClick={() => handleClickOpen(empresa.id)}
                  >
                    <Tooltip title="Editar Empresa" placement="top">
                      <EditIcon sx={{ color: "#e7a62f" }} />
                    </Tooltip>
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => DeleteEmpresa(empresa.id)}
                  >
                    <Tooltip title="Eliminar Empresa" placement="top">
                      <DeleteIcon sx={{ color: "#FF0000" }} />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerResponsive>
      {id_service !== null && (
        <EditEmpresas
          open={modalUpdate}
          handleClose={handleClickClose}
          id={id_service}
        />
      )}
    </>
  );
}
