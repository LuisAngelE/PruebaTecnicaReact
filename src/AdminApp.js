import "./App.css";
import AppRouter from "./routes/AppRouter";
import EmpresasState from "./context/Empresas/EmpresasState";
import DireccionesState from "./context/Direcciones/DireccionesState";
import AreasState from "./context/Areas/AreasState";
import CarpetasState from "./context/Carpetas/CarpetasState";
import DocumentosState from "./context/Documentos/DocumentosState";
import ArchivosState from "./context/Archivos/ArchivosState";
function AdminApp() {
  return (
    <ArchivosState>
      <DocumentosState>
        <CarpetasState>
          <AreasState>
            <DireccionesState>
              <EmpresasState>
                <AppRouter />
              </EmpresasState>
            </DireccionesState>
          </AreasState>
        </CarpetasState>
      </DocumentosState>
    </ArchivosState>
  );
}

export default AdminApp;
