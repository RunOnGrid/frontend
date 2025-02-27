import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AppsTableRow({ type, status, creationDate, mode, name }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [deploymentUri, setDeploymentUri] = useState("");
  const [deploymentDate, setDeploymentDate] = useState("");

  // Formatear creationDate a mm/dd/yy
  const formatDate = (dateString) => {
    if (!dateString) return "---";

    // Crear un objeto Date a partir de la fecha ISO
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return "---";

    // Obtener mes, día y año
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    // Formatear en mm/dd/yy
    return `${month}/${day}/${year}`;
  };

  // Fecha formateada para mostrar
  const formattedCreationDate = formatDate(creationDate);

  return (
    <>
      <div className={`table-row ${mode ? "dark" : "light"}`}>
        <h3>{name || "---"}</h3>
        {deploymentUri ? deploymentUri : "---"}

        <div>
          {status === "Pending" ? (
            <>
              <button className="add-button"> Try again </button>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="status">
          {" "}
          <div className={status === "Deployed" ? "circle3" : "circle5"}></div>
          {status}
        </div>
        <h5>
          {" "}
          <Image alt="" src="/calendar.png" height={15} width={15} />
          {formattedCreationDate}
        </h5>
        {/* <Image alt="" src="/edit.png" height={20} width={20} /> */}
      </div>
    </>
  );
}

export default AppsTableRow;