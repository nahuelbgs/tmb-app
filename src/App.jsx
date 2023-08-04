import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import Swal from "sweetalert2";
import "./App.css";

function App() {
  const [hombre, setHombre] = useState(false);
  const [mujer, setMujer] = useState(false);
  const [heightValue, setHeightValue] = useState(120);
  const [ageValue, setAgeValue] = useState(50);
  const [weightValue, setWeightValue] = useState(50);
  const [activity, setActivity] = useState(1.2);
  const [tmb, setTmb] = useState(0);

  const handleHombre = (e) => {
    e.preventDefault();
    if (mujer == true) {
      setHombre(!hombre);
      setMujer(!mujer);
    } else setHombre(!hombre);
  };
  const handleMujer = (e) => {
    e.preventDefault();
    if (hombre == true) {
      setMujer(!mujer);
      setHombre(!hombre);
    } else setMujer(!mujer);
  };
  const handleHeight = (e) => {
    setHeightValue(e.target.value);
  };
  const handleAge = (e) => {
    setAgeValue(e.target.value);
  };
  const handleWeight = (e) => {
    setWeightValue(e.target.value);
  };
  const handleSelect = (e) => {
    if (e.target.value === "Poco o ningún ejercicio") {
      setActivity(1.2);
    } else if (e.target.value === "Ejercicio ligero (1-3 días a la semana)") {
      setActivity(1.375);
    } else if (e.target.value === "Ejercicio moderado (3-5 días a la semana)") {
      setActivity(1.55);
    } else if (e.target.value === "Ejercicio fuerte (6-7 días a la semana)") {
      setActivity(1.725);
    } else {
      setActivity(1.9);
    }
  };
  const handleTmb = (e) => {
    e.preventDefault;
    if (hombre === true) {
      setTmb(
        parseInt(
          (10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5) * activity
        )
      );
    } else if (mujer === true) {
      setTmb(
        parseInt(
          (10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161) *
            activity
        )
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Debes seleccionar el género",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };
  const handleBack = (e) => {
    e.preventDefault();
    setTmb(0);
  };
  return (
    <>
      {tmb === 0 ? (
        <section className="app-section">
          <div className="container">
            <h1 className="tmb-h1">Tasa Metabólica Basal</h1>
            <div className="container-genero">
              <button
                onClick={handleHombre}
                className={`button-genero ${hombre == true ? "active" : ""}`}
              >
                Hombre
              </button>
              <button
                onClick={handleMujer}
                className={`button-genero ${mujer == true ? "active" : ""}`}
              >
                Mujer
              </button>
            </div>
            <div className="container-altura">
              <h1>Altura (cm)</h1>
              <p className="altura-value">{heightValue}</p>
              <input
                className="range"
                onChange={handleHeight}
                type="range"
                min="120"
                max="210"
              />
            </div>
            <div className="container-double">
              <div className="container-edad">
                <h1>Edad</h1>
                <p className="value">{ageValue}</p>
                <input
                  className="range"
                  onChange={handleAge}
                  type="range"
                  min="10"
                  max="90"
                />
              </div>
              <div className="container-peso">
                <h1>Peso (kg)</h1>
                <p className="value">{weightValue}</p>
                <input
                  className="range"
                  onChange={handleWeight}
                  type="range"
                  min="40"
                  max="130"
                />
              </div>
            </div>
            <select className="select" onChange={handleSelect}>
              <option>Poco o ningún ejercicio</option>
              <option>Ejercicio ligero (1-3 días a la semana)</option>
              <option>Ejercicio moderado (3-5 días a la semana)</option>
              <option>Ejercicio fuerte (6-7 días a la semana)</option>
              <option>
                Ejercicio muy fuerte (dos veces al día, entrenamientos muy
                duros)
              </option>
            </select>
            <button onClick={handleTmb} className="button-calcular">
              CALCULAR
            </button>
          </div>
        </section>
      ) : (
        <section className="app-section">
          <div className="container">
          <div className="tmb-important-container">
              <h2 className="tmb-important">IMPORTANTE</h2>
              <p className="tmb-important-p">
                Esta información brinda un diagnóstico del momento, no debe
                usarse para efectos de seguimiento nutricional.
              </p>
            </div>
            <p className="tmb-p">Tu tasa metabólica basal es: <span className="tmb-span">{tmb}</span></p>
            <button onClick={handleBack} className="button-calcular">
              ATRAS
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
