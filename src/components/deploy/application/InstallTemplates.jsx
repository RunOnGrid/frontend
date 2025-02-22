import Image from "next/image";
import Link from "next/link";
import React from "react";

const InstallTemplates = ({onNext, darkMode}) => {
  return (
    <div className="databaseSelect">
      <span> Copy templates on your repo</span>
      <p className="span-deploy">
        Click the link below and copy those files into your repo to be able to run the deploy correctly.{" "}
      </p>
      <p className="span-deploy">
        You will need to copy the "grid-ci.ylm" and "grid-helloworld.yml" files into your repo.
      </p>
      <p className="span-deploy">
        Once you copied the files, click the continue button.
      </p>
      <Link target="blank" href='https://github.com/RunOnGrid/workflows-templates/tree/main/.github/workflows'>
      <div className="install-github">
        <Image alt="" src="/github3.png" height={15} width={15} />
        <span >
         Get templates
        </span>
      </div>
      </Link>
      <button onClick={onNext}  className="add-button4">
          Continue
        </button>
    </div>
  );
};

export default InstallTemplates;
