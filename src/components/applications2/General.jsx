import Select from "@/commons/Select";
import Link from "next/link";
import React from "react";

const convertirSegundosADiasYHoras = (segundos) => {
  if (!segundos && segundos !== 0) return "Not available";
  const SEGUNDOS_POR_MINUTO = 60;
  const MINUTOS_POR_HORA = 60;
  const HORAS_POR_DIA = 24;
  const segundosTotales = parseFloat(segundos);
  const minutosTotales = segundosTotales / SEGUNDOS_POR_MINUTO;
  const horasTotales = minutosTotales / MINUTOS_POR_HORA;
  const dias = Math.floor(horasTotales / HORAS_POR_DIA);
  const horasRestantes = horasTotales % HORAS_POR_DIA;
  const horasFormateadas = Math.round(horasRestantes * 100) / 100;
  return `${dias} days & ${horasFormateadas} hours`;
};
const formatDate = (dateString) => {
  if (!dateString) return "---";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "---";

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};
const extractConfigDetails = (app) => {
  const configDetails = {
    dcloudProfile: "N/A",
    cpuUnits: "N/A",
    memorySize: "N/A",
    storageSize: "N/A",
    appName: "",
    repotag: "",
  };

  if (!app?.configurationDetails) {
    return configDetails;
  }

  // Encontramos el nombre de la aplicación dinámicamente

  const deploymentKeys = Object.keys(app.configurationDetails.deployment || {});
  if (deploymentKeys.length > 0) {
    configDetails.appName = deploymentKeys[0];

    // Obtenemos el perfil de dcloud con el nombre dinámico
    configDetails.dcloudProfile =
      app.configurationDetails.deployment[configDetails.appName]?.dcloud
        ?.profile || "N/A";
  }

  // Buscamos en profiles para obtener recursos

  if (app.configurationDetails.profiles?.compute) {
    if (
      configDetails.appName &&
      app.configurationDetails.profiles.compute[configDetails.appName]
    ) {
      const resources =
        app.configurationDetails.profiles.compute[configDetails.appName]
          .resources || {};

      configDetails.cpuUnits = resources.cpu?.units || "N/A";
      configDetails.memorySize = resources.memory?.size || "N/A";
      configDetails.storageSize = resources.storage?.size || "N/A";
      configDetails.repotag =
        app.configurationDetails.services[configDetails.appName].image;
    } else {
      // Buscamos en todas las keys de compute por si el nombre es diferente
      const computeKeys = Object.keys(
        app.configurationDetails.profiles.compute
      );
      if (computeKeys.length > 0) {
        // Si no encontramos el nombre antes, lo establecemos ahora
        if (!configDetails.appName) {
          configDetails.appName = computeKeys[0];
        }

        const resources =
          app.configurationDetails.profiles.compute[computeKeys[0]].resources ||
          {};
        configDetails.cpuUnits = resources.cpu?.units || "N/A";
        configDetails.memorySize = resources.memory?.size || "N/A";
        configDetails.storageSize = resources.storage?.size || "N/A";
      }
    }
  }

  return configDetails;
};

const General = ({ darkMode, app }) => {
  const configDetails = extractConfigDetails(app);

  return (
    <div className={`main-content ${darkMode ? "dark" : "light"}`}>
      <div className="general">
        <div className="general-item">
          <label>Service name</label>
          <span> {configDetails.dcloudProfile}</span>
          {/* <span className="edit-icon">✏️</span> */}
        </div>

        <div className="general-item">
          <label>URI</label>
          <Link
            href={`https://${app.uri}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{app.uri}</span>
          </Link>
        </div>
        <div className="general-item">
          <label>Cloud Provider</label>
          <span>{app.cloudProvider}</span>
        </div>
        <div className="general-item">
          <label>Image Name</label>
          <span>{configDetails.repotag}</span>
        </div>
        <div className="general-item">
          <label>Status</label>
          <span className="status pending">
            {" "}
            <div
              className={
                app.status === "Deployed"
                  ? "circle3"
                  : app.status === "Failed"
                  ? "circle4"
                  : "circle5"
              }
            ></div>
            {app.status}
          </span>
        </div>

        <div className="general-item">
          <label>Instance resources</label>
          <span>
            CPU({configDetails.cpuUnits})--Memory(
            {configDetails.memorySize}
            )--Storage({configDetails.storageSize})
          </span>
        </div>

        <div className="general-item">
          <label>Time Remaining</label>
          <span>{convertirSegundosADiasYHoras(app.timeRemainingSeconds)}</span>
        </div>
        <div className="general-item">
          <label>USD Remaining</label>
          <span>
            USD{" "}
            {app.totalRemainingInUsd ? app.totalRemainingInUsd.toFixed(2) : ""}
          </span>
        </div>
        <div className="general-item">
          <label>Total Spent</label>
          <span>
            USD {app.totalSpentInUsd ? app.totalSpentInUsd.toFixed(5) : ""}
          </span>
        </div>
        <div className="general-item">
          <label>Created</label>
          <span>{formatDate(app.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default General;
{
  /* <div className="general-item">
          <label>Allowed geolocations</label>
          <span>NORTH AMERICA - SOUTH AMERICA - EUROPE</span>
        </div> */
}
{
  /* <div className="general-item">
          <label>Forbidden geolocations</label>
          <span>None</span>
        </div> */
}
{
  /* <div className="general-item">
          <label>Instance type</label>
          <button style={{ display: "flex" }}>
            <h4>STANDARD</h4> 256 MB (RAM) - 0.1 CPU - 1 GB (STORAGE) - 3
            INSTANCES
          </button>
          <span className="edit-link">Update</span>
        </div> */
}