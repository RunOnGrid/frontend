const Banner = ({ title, subtitle }) => {
  return (
    <div className="textosBanner">
      <div className="tituloBanner">{title}</div>
      <div className="subtituloBanner">{subtitle}</div>
      <div className="container-botones">
        <button className="button-landing-1">DEPLOY NOW</button>
        <button className="button-landing-2">BOOK A DEMO</button>
      </div>
    </div>
  );
};

Banner.defaultProps = {
  title:
    'Power Your  Asic mining Operations with Our Reliable Hosting Solution',
  subtitle:
    'Our ASIC Mining Hosting service provides you with a secure and stable environment to house your mining rigs. With 24/7 monitoring, redundant power and cooling, and expert support, you can focus on mining while we take care of the rest. Sign up now to take your mining operations to the next level.',
};

export default Banner;
