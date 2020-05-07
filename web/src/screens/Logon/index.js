import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import LogoImage from "../../assets/logo.svg";
import ImageHeroes from "../../assets/heroes.png";

import api from "../../services/api";

import "./styles.css";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();
    try {
      const { data } = await api.post("/session", { id });

      if (!data) {
        alert("ID não encontrado!!");
        return;
      }

      console.log(data);
      localStorage.setItem("ongID", id);
      localStorage.setItem("ongName", data.name);
      history.push("/profile");
    } catch (e) {
      alert("Algo deu errado, tente novamente!!");
      console.log(e);
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImage} alt="Be The Hero" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="custom-link">
            <FiLogIn color="#e02041" size={16} />
            Não tenho Cadastro
          </Link>
        </form>
      </section>
      <img src={ImageHeroes} alt="Heroes" />
    </div>
  );
}
