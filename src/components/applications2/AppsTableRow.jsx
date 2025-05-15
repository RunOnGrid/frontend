import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AppsTableRow({
  type,
  status,
  creationDate,
  mode,
  name,
  uri,
  darkMode,
  handleModal,
  app,
}) {
  const router = useRouter();
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

  const formattedCreationDate = formatDate(creationDate);

  const ensureProtocol = (url) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const handleRowClick = () => {
    if (app.cloudProvider === "AKASH") {
      router.push(`/profile/project/activity?id=${app.id}`);
    } else {
      router.push(`/profile/project/activityFlux?id=${app.id}`);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleModal(app.serviceName, app.id);
  };

  return (
    <>
      <div
        onClick={handleRowClick}
        className={`table-row ${mode ? "dark" : "light"}`}
      >
        {uri ? (
          <h3 onClick={handleLinkClick}>
            <Link
              className="name-link"
              target="_blank"
              href={ensureProtocol(uri)}
            >
              {uri || "---"}
            </Link>
          </h3>
        ) : (
          <h3>{name || "---"}</h3>
        )}

        <h3>{type || "---"}</h3>

        <div className="status">
          <div
            className={
              status === "Deployed"
                ? "circle3"
                : status === "Failed"
                ? "circle4"
                : status === "Pending"
                ? "circle5"
                : "circle6"
            }
          ></div>
          {status}
        </div>

        <div className="date-actions-container">
          <h5>
            <Image alt="Reloj" src="/clock.png" height={15} width={15} />
            {formattedCreationDate}
          </h5>
        </div>
        <div className="action-icons">
          {/* <Image
            alt="Editar"
            src={darkMode ? "/edit.png" : "/edit.png"}
            height={18}
            width={18}
          /> */}
          <Image
            onClick={handleDeleteClick}
            alt="Eliminar"
            src={darkMode ? "/delete2.png" : "/deleteL.png"}
            height={18}
            width={18}
          />
          {/* <Link href={`/profile/project/activity?id=${app.id}`}>
            <Image alt="" src="/settingsLigth.png" width={22} height={22} />
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default AppsTableRow;