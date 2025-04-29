import { Text, View, StyleSheet } from "react-native";

// Formateamos el tiempo a MM:SS
export default function Visor({ tiempo }) {
  const formatTime = (tiempo) => {
    const minutes = Math.floor(tiempo / 60);
    const seconds = tiempo % 60;

    // Devolvemos en formato MM:SS, asegurándonos de que siempre haya dos dígitos
    const padWithZero = (num) => (num < 10 ? "0" + num : num);
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontFamily: "Poppins", }}>
        {formatTime(tiempo)} {/* Mostramos el tiempo formateado */}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#D3A4EA",
    fontFamily: "Poppins",

  },
});
