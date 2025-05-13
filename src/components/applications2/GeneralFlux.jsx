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
  const dcloudProfile =
    app?.configurationDetails?.compose[0]?.name || "N/A";

  const cpuUnits =
    app?.configurationDetails?.compose[0]?.cpu ||
    "N/A";
  const memorySize =
    app?.configurationDetails?.compose[0].ram
       || "N/A";
  const storageSize =
    app?.configurationDetails?.compose[0].hdd
      || "N/A";
    
  const imageName = 
    app?.configurationDetails?.compose[0].repotag || "N/A"

  const deployCost = 
    app?.deployAmount || "N/A"



  return {
    dcloudProfile,
    cpuUnits,
    memorySize,
    storageSize,
    imageName,
    deployCost
  };
};

const GeneralFlux = ({ darkMode, app }) => {
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
          <label>Image</label>
          <span>{configDetails.imageName}</span>
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
          <label>Created</label>
          <span>{formatDate(app.createdAt)}</span>
        </div>
              
        <div className="general-item">
          <label>CPU Units</label>
          <span>{configDetails.cpuUnits}</span>
        </div>
        <div className="general-item">
          <label>Memory</label>
          <span>{configDetails.memorySize}</span>
        </div>
        <div className="general-item">
          <label>Storage</label>
          <span>{configDetails.storageSize}</span>
        </div>

        <div className="general-item">
          <label>Deploy Cost</label>
          <span>
            USD 
            ${configDetails.deployCost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralFlux;