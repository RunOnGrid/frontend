import React from 'react';
const Guarantee = () => {
  return (
    <section className="guarantee-section">
      <div className="guarantee-container">
        <div className="guarantee-texts">
          <div className="guarantee-leyenda">100 % MONEY BACK</div>
          <div className="guarantee-titulo"> 30 Day Guarantee</div>
          <div className="guarantee-subtitulo">
            Not happy with our services? We`ll send you your money back for the
            first trial month! Open a ticket at support.runonflux.io
          </div>
          <button className="guarantee-button">Discover more</button>
        </div>
        <img className="guarantee-icon" src={'/moneyBack.png'} />
      </div>
    </section>
  );
};

export default Guarantee;
