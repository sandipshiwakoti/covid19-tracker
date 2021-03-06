import React, { useState, useEffect, useCallback } from "react";
import NumberFormat from "react-number-format";

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
        throw new Error();
      }
      if (!Array.isArray(data)) {
        setStats([data]);
        setError(false);
      } else {
        setStats(data);
        setError(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      <div className="section-center">
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
                  <div className="covid-info">
                    <div>
                      <p>Today's Cases</p>
                      <NumberFormat
                        value={todayCases}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Total Cases</p>
                      <NumberFormat
                        value={cases}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Today's Deaths</p>
                      <NumberFormat
                        value={todayDeaths}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Total Deaths</p>
                      <NumberFormat
                        value={deaths}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Today's Recovered</p>
                      <NumberFormat
                        value={todayRecovered}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Total Recovered</p>
                      <NumberFormat
                        value={recovered}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Active</p>
                      <NumberFormat
                        value={active}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                    <div>
                      <p>Critical</p>
                      <NumberFormat
                        value={critical}
                        displayType="text"
                        thousandSeparator=","
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountriesStats;
