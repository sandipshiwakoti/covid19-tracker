import React, { useState, useEffect, useCallback } from "react";
const urlAll = "https://corona.lmao.ninja/v2/countries?sort=cases";
const baseUrlSingle = "https://corona.lmao.ninja/v2/countries/";

const CountriesStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    let url;
    if (value) url = baseUrlSingle + value;
    else url = urlAll;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.message) {
        setError(true);
      } else if (!Array.isArray(data)) {
        setStats([data]);
        setError(false);
      } else {
        setStats(data);
        setError(false);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }, [value]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className="countries-stats section">
      <form className="form-search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="input-country"
          id="input-country"
          placeholder="search country"
          value={value}
          onChange={handleChange}
        />
      </form>

      {loading && !error && (
        <div className="preloader-img-container">
          <img
            src="preloader.gif"
            className="preloader-img"
            alt="preloader-corona"
          ></img>
        </div>
      )}

      {!loading && error && <h1 className="section-title">not found</h1>}

      {!loading && !error && (
        <div className="countries-stats-center section-center">
          {stats.map((item, index) => {
            const {
              country,
              countryInfo: { flag },
              cases,
              todayCases,
              deaths,
              todayDeaths,
              recovered,
              todayRecovered,
              active,
              critical,
            } = item;
            return (
              <article key={index} className="country-card">
                <h3>{country}</h3>
                <div className="flag-img-container">
                  <img src={flag} alt={country} className="flag-img" />
                </div>
                <p>Total Cases: {cases}</p>
                <p>Today's Cases: {todayCases}</p>
                <p>Deaths: {deaths}</p>
                <p>Todays Deaths: {todayDeaths}</p>
                <p>Total Recovered: {recovered}</p>
                <p>Today's recovered: {todayRecovered}</p>
                <p>Active: {active}</p>
                <p>Critical: {critical}</p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CountriesStats;
