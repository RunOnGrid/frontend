import Image from "next/image";
import Link from "next/link";
import React from "react";

function AppsTableRow({
  name,
  type,
  status,
  team,
  creationDate,
  renewalDate,
  instanceType,
  mode,
}) {
  return (
    <>
      <Link href="/profile/project/activity">
        <div className={`table-row ${mode ? "dark" : "light"}`}>
          <h3>{name}</h3>
          <h4>{type}</h4>
          <div className="status">
            {" "}
            <div className="circle3"></div>
            {status}
          </div>
          <div className="app-members">
            <div className="member-image-back">
              <Image
                className="member-image"
                alt=""
                src="/memberDark.svg"
                width={40}
                height={40}
              />
            </div>
            <div className="member-image-back">
              <Image
                className="member-image"
                alt=""
                src="/memberDark.svg"
                width={40}
                height={40}
              />
            </div>
            <div className="member-image-back">
              <Image
                className="member-image"
                alt=""
                src="/memberDark.svg"
                width={40}
                height={40}
              />
            </div>
          </div>
          <h5>
            {" "}
            <Image alt="" src="/calendar.png" height={15} width={15} />
            {creationDate}
          </h5>
          <h5>
            {" "}
            <Image alt="" src="/calendar.png" height={15} width={15} />
            {renewalDate}
          </h5>
          <h4>{instanceType}</h4>
          <Image alt="" src="/edit.png" height={20} width={20} />
        </div>
      </Link>
    </>
  );
}

export default AppsTableRow;
