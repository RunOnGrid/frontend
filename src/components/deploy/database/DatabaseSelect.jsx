import Image from "next/image";
import React from "react";

const DatabaseSelect = ({ onClick }) => {
  return (
    <div className="databaseSelect">
      <div style={{ display: "flex" }}>
        <h3>2.</h3>
        <span>Database type</span>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <button onClick={() => onClick("MySQL")}>
          <Image src="/psqlLogo.png" alt="" height={45} width={130} />
        </button>
        <button onClick={() => onClick("PostgreSQL")}>
          <Image src="/psqlLogo.png" alt="" height={45} width={130} />
        </button>
        <button onClick={() => onClick("MongoDB")}>
          <Image src="/psqlLogo.png" alt="" height={45} width={130} />
        </button>
        <button onClick={() => onClick("SQLite")}>
          <Image src="/psqlLogo.png" alt="" height={45} width={130} />
        </button>
      </div>
    </div>
  );
};

export default DatabaseSelect;
