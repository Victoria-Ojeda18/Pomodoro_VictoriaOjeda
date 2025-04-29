import { View, Text, Pressable, StyleSheet } from "react-native";
import toggleSound from "../utility/playSound"; // Ruta correcta según tu estructura

const Boton = ({ run, setRun, tiempo, setTiempo }) => {
  const handlePress = () => {
    if (tiempo === 0) {
      setTiempo(25 * 60);
      setRun(false);
    } else {
      setRun(!run);
    }

    toggleSound(require("../assets/sound/click_Boton.mp3"));
  };

  const getTextoBoton = () => {
    if (tiempo === 0) return "Reiniciar";
    return run ? "Parar" : "Iniciar";
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.boton, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          {getTextoBoton()}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 10,
    justifyContent: "center",
    fontFamily: "Poppins",
    backgroundColor: "#83B366",
  },
});

export default Boton;
