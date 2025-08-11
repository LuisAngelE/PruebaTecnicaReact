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
import CarpetasContext from "../../context/Carpetas/CarpetasContext";
import EditCarpetas from "../../containers/Carpetas/EditCarpetas";

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

export default function TableCarpetas({ carpetas, areas }) {
  const { DeleteCarpeta } = useContext(CarpetasContext);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [idCarpeta, setIdCarpeta] = useState(null);

  const handleClickOpen = (id) => {
    setModalUpdate(true);
    setIdCarpeta(id);
  };

  const handleClickClose = () => {
    setModalUpdate(false);
    setIdCarpeta(null);
  };

  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de carpetas">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Carpeta</StyledTableCell>
              <StyledTableCell>Área</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carpetas.length > 0 ? (
              carpetas?.map((carpeta) => (
                <StyledTableRow key={carpeta.id}>
                  <StyledTableCell data-label="ID">
                    {carpeta.id}
                  </StyledTableCell>
                  <StyledTableCell data-label="Carpeta">
                    {carpeta.nombre}
                  </StyledTableCell>
                  <StyledTableCell data-label="Área">
                    {carpeta.area?.nombre ||
                      areas.find((a) => a.id === carpeta.area_id)?.nombre ||
                      "Sin área"}
                  </StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <Tooltip title="Editar Carpeta" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(carpeta.id)}
                      >
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Eliminar Carpeta" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => DeleteCarpeta(carpeta.id)}
                      >
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  No hay carpetas disponibles
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {idCarpeta !== null && (
        <EditCarpetas
          open={modalUpdate}
          handleClose={handleClickClose}
          id={idCarpeta}
          areas={areas}
        />
      )}
    </>
  );
}
