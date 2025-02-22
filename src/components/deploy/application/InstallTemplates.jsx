import Image from "next/image";
import Link from "next/link";
import React from "react";

const InstallTemplates = ({onNext, darkMode}) => {
  return (
    <div className="databaseSelect">
      <span> Add workflows</span>
      <p className="span-deploy">
        You need to add grid workflows to build a docker image.{" "}
      </p>
      <p className="span-deploy">
        Copy the .yml files into .github/workflows folder in your repo to make
        the pipeline usable.
      </p>

      <Link
        target="blank"
        href="https://github.com/RunOnGrid/workflows-templates/tree/main/.github/workflows"
      >
        <div className="install-github">
          <Image alt="" src="/github3.png" height={15} width={15} />
          <span>Get templates</span>
        </div>
      </Link>
      <button onClick={onNext} className="add-button4">
        Continue
      </button>
    </div>
  );
};

export default InstallTemplates;
