import "./App.css";
import AppRouter from "./routes/AppRouter";
import EmpresasState from "./context/Empresas/EmpresasState";
import DireccionesState from "./context/Direcciones/DireccionesState";
import AreasState from "./context/Areas/AreasState";
import CarpetasState from "./context/Carpetas/CarpetasState";
import DocumentosState from "./context/Documentos/DocumentosState";
import TipoArchivosState from "./context/TipoArchivos/TipoArchivosState";
function AdminApp() {
  return (
    <TipoArchivosState>
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
    </TipoArchivosState>
  );
}

export default AdminApp;
