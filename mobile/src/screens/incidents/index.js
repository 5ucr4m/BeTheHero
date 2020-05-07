import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LogoImage from "../../assets/logo.png";

import api from "../../services/api";
import styles from "./styles";

export default function incidents() {
  const { navigate } = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (count > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const { data, headers } = await api.get(`/incidents?page=${page}`);
    const total = headers["x-total-count"] || 0;

    setCount(total);
    setIncidents([...incidents, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImage} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{count} Caso(s)</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem Vindo!!</Text>
      <Text style={styles.description}>Escolha 1 dos casos e salve o dia.</Text>

      <FlatList
        style={styles.incidentsList}
        data={incidents}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={incident => String(incident.id)}
        // showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incidents}>
            <Text style={styles.incidentsProperty}>ONG:</Text>
            <Text style={styles.incidentsValue}>{incident.name}</Text>

            <Text style={styles.incidentsProperty}>CASO: </Text>
            <Text style={styles.incidentsValue}>{incident.description}</Text>

            <Text style={styles.incidentsProperty}>Valor: </Text>
            <Text style={styles.incidentsValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => navigate("details", { incident })}
            >
              <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
