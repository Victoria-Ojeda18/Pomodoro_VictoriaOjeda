import { View, Text, StyleSheet } from "react-native";

export default function Titulo({ titulo }) {
  return (
    <View style={{ alignItems: "center", marginBottom: 30 }}>
      <Text style={styles.texto}>
        {titulo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: "#F25016",
    fontSize: 60,
    padding: 20, 
    textAlign: "center", 
    textShadowRadius: 5,
    letterSpacing: 2, 
    marginTop: 40, 
    fontFamily: "Poppins",

  },
});
