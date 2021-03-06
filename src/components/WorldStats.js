import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import lightModeIcon from "../light-mode.png";
import darkModeIcon from "../dark-mode.png";

const url = "https://corona.lmao.ninja/v2/all";

const getLocalStorageTheme = () => {
  if (localStorage.getItem("theme")) return localStorage.getItem("theme");
  return "light-theme";
};

const WorldStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState(getLocalStorageTheme());

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { updated, cases, deaths, recovered, active } = data;
      const updatedTime = new Date(parseInt(updated)).toString();
      setStats({ updatedTime, cases, deaths, recovered, active });
      setLoading(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };
  return (
    <section className="world-stats section">
      <div className="corona-img-container">
        <img src="corona.png" alt="corona" className="corona-img" />
      </div>
      <h1 className="section-title">COVID-19 Live Stats</h1>
      <button className="btn-toggle" onClick={toggleTheme}>
        <div className="mode-icon">
          <img
            src={lightModeIcon}
            alt="light mode"
            className="light-mode-icon"
          />
        </div>
        <div className="mode-icon">
          <img src={darkModeIcon} alt="dark mode" className="dark-mode-icon" />
        </div>
        <div
          className={`${theme === "light-theme" ? "slider" : "slider slide"}`}
        ></div>
      </button>
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
        <div className="world-stats-center section-center">
          <article className="world-card info">
            <h3>cases</h3>
            <NumberFormat
              value={stats.cases}
              displayType="text"
              thousandSeparator=","
            />
            <p>{stats.updatedTime}</p>
          </article>
          <article className="world-card danger">
            <h3>deaths</h3>
            <NumberFormat
              value={stats.deaths}
              displayType="text"
              thousandSeparator=","
            />
            <p>{stats.updatedTime}</p>
          </article>
          <article className="world-card warning">
            <h3>active</h3>
            <NumberFormat
              value={stats.active}
              displayType="text"
              thousandSeparator=","
            />
            <p>{stats.updatedTime}</p>
          </article>
          <article className="world-card success">
            <h3>recovered</h3>
            <NumberFormat
              value={stats.recovered}
              displayType="text"
              thousandSeparator=","
            />
            <p>{stats.updatedTime}</p>
          </article>
        </div>
      )}
    </section>
  );
};

export default WorldStats;
