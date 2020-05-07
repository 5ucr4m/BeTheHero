import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import LogoImage from "../../assets/logo.svg";

import api from "../../services/api";

import "./styles.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUF] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = { name, email, whatsapp, city, uf };
    console.log(data);
    try {
      const resp = await api.post("/ongs", data);
      alert(`seu ID de acesso: ${resp.data.id}`);
      history.push("/");
    } catch (e) {
      alert("Erro no cadastro, tente novamente!!");
      console.log(e.response);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImage} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
            casos da sua ONG.
          </p>
          <Link to="/" className="custom-link">
            <FiArrowLeft color="#e02041" size={16} />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="Nome da ONG"
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="e-mail"
            name="E-mail"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="Whatsapp"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              name="Cidade"
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              type="text"
              name="Uf"
              placeholder="Uf"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUF(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
