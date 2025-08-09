import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Empresas from "../containers/Empresas/Empresas";
import Direcciones from "../containers/Direcciones/Direcciones";
import Areas from "../containers/Areas/Areas";
import Carpetas from "../containers/Carpetas/Carpetas";
import Documentos from "../containers/Documentos/Documentos";
import Archivos from "../containers/Archivos/Archivos";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Empresas} />
      <Route exact path="/Direcciones" component={Direcciones} />
      <Route exact path="/Areas" component={Areas} />
      <Route exact path="/Carpetas" component={Carpetas} />
      <Route exact path="/Documentos" component={Documentos} />
      <Route exact path="/Archivos" component={Archivos} />
      {/* <Route exact path="/DetailVisits/:id" component={DetailVisits} /> */}
    </Switch>
  );
};

export default AdminRoutes;
