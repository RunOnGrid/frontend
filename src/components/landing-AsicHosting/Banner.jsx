import Link from "next/link";
import Triangles from "./Triangles";

const Banner = ({ title, subtitle, subtitle2 }) => {
  return (
    <div className="banner-container">
      <div className="textosBanner">
        <div className="tituloBanner">{title}</div>
        <div className="subtituloBanner">{subtitle}</div>
        <div className="subtituloBanner2">{subtitle2}</div>
        <div className="container-botones">
          {" "}
          <button className="button-landing-1">
            {" "}
            <Link href="/login">DEPLOY NOW </Link>
          </button>
          {/* <button className="button-landing-2">BOOK A DEMO</button> */}
        </div>
      </div>
      <Triangles />
    </div>
  );
};

export default Banner;
