import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import LogoImage from "../../assets/logo.svg";

import api from "../../services/api";

import "./styles.css";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongID");
  const ongName = localStorage.getItem("ongName");
  const history = useHistory();

  useEffect(() => {
    if (!ongId || !ongName) {
      history.push("/");
    }
  }, [ongId, ongName, history]);

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post("/incidents", data, {
        headers: {
          authorization: ongId
        }
      });
      history.push("/profile");
    } catch (e) {
      alert("Algo deu errado, tente novamente!!");
    }
  }

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={LogoImage} alt="Be The Hero" />
          <h1>Cadastrar Novo Caso</h1>
          <p>
            Descreva o caso detalhadamento para encontrar um Herói para resolver
            isso.
          </p>
          <Link to="/profile" className="custom-link">
            <FiArrowLeft color="#e02041" size={16} />
            Voltar para Home
          </Link>
        </section>
        <form action="">
          <input
            type="text"
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="number"
            min="0.00"
            step="0.01"
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" onClick={handleNewIncident}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
