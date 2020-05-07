import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import LogoImage from "../../assets/logo.svg";
import api from "../../services/api";

import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem("ongID");
  const ongName = localStorage.getItem("ongName");
  const history = useHistory();

  useEffect(() => {
    if (!ongId || !ongName) {
      history.push("/");
    }
  }, [ongId, ongName, history]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/profile", {
        headers: {
          authorization: ongId
        }
      });
      setIncidents(data);
    };

    load();
  }, [ongId]);

  async function handleDelete(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      });

      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch (e) {
      alert("algo deu errado!!");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImage} alt="Be The Hero" />
        <span>Bem Vindo, {ongName}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo Caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
