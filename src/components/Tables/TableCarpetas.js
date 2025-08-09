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

  // Datos fake para pruebas
  const empresasFake = [
    { id: 1, nombre: "TechCorp S.A." },
    { id: 2, nombre: "Construcciones del Norte" },
    { id: 3, nombre: "Alimentos del Valle" },
  ];

  const areasFake = [
    {
      id: 1,
      nombre: "Recursos Humanos",
      direccion: {
        id: 1,
        nombre: "Oficina Central",
        empresa: empresasFake[0],
      },
    },
    {
      id: 2,
      nombre: "Producción",
      direccion: {
        id: 2,
        nombre: "Planta Industrial",
        empresa: empresasFake[1],
      },
    },
    {
      id: 3,
      nombre: "Marketing",
      direccion: {
        id: 3,
        nombre: "Sucursal Norte",
        empresa: empresasFake[2],
      },
    },
  ];

  const carpetasFake = [
    { id: 1, nombre: "Contratos", area_id: 1 },
    { id: 2, nombre: "Capacitaciones", area_id: 1 },
    { id: 3, nombre: "Plan de Producción", area_id: 2 },
    { id: 4, nombre: "Campañas Digitales", area_id: 3 },
    { id: 5, nombre: "Sin Asignar", area_id: null },
  ];

  // Si no se pasan datos reales, usar los fake
  const carpetasToRender = carpetas && carpetas.length > 0 ? carpetas : carpetasFake;
  const areasToRender = areas && areas.length > 0 ? areas : areasFake;

  const getArea = (area_id) => areasToRender.find((a) => a.id === area_id) || null;

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
            {carpetasToRender.map((carpeta) => {
              const area = getArea(carpeta.area_id);
              return (
                <StyledTableRow key={carpeta.id}>
                  <StyledTableCell data-label="ID">{carpeta.id}</StyledTableCell>
                  <StyledTableCell data-label="Carpeta">{carpeta.nombre}</StyledTableCell>
                  <StyledTableCell data-label="Área">{area ? area.nombre : "Sin Área"}</StyledTableCell>
                  <StyledTableCell data-label="Acciones">
                    <IconButton size="small" onClick={() => handleClickOpen(carpeta.id)}>
                      <Tooltip title="Editar Carpeta" placement="top">
                        <EditIcon sx={{ color: "#e7a62f" }} />
                      </Tooltip>
                    </IconButton>

                    <IconButton size="small" onClick={() => DeleteCarpeta(carpeta.id)}>
                      <Tooltip title="Eliminar Carpeta" placement="top">
                        <DeleteIcon sx={{ color: "#FF0000" }} />
                      </Tooltip>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainerResponsive>

      {idCarpeta !== null && (
        <EditCarpetas
          open={modalUpdate}
          handleClose={handleClickClose}
          id={idCarpeta}
          areas={areasToRender}
        />
      )}
    </>
  );
}
