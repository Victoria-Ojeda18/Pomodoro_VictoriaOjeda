import { View, Text, Pressable, StyleSheet } from "react-native";
import { Audio } from "expo-av";

const Boton = ({ run, setRun, tiempo, setTiempo }) => {
  const toggleRun = () => {
    if (tiempo === 0) {
      // Reiniciar tiempo si llegó a 0
      setTiempo(25 * 60); // O cualquier otro valor por defecto
      setRun(false); // Queda pausado después de reiniciar
    } else {
      // Alternar entre correr y pausar
      setRun(!run);
    }
    playSound();
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/click_Boton.mp3") // Cambia la ruta al sonido que quieras reproducir
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  // Texto del botón dependiendo del estado
  const getTextoBoton = () => {
    if (tiempo === 0) return "Reiniciar"; // Si el tiempo llegó a 0, muestra "Reiniciar"
    return run ? "Parar" : "Iniciar"; // Si está corriendo, muestra "Parar", sino "Iniciar"
  };

  return (
    <View>
      <Pressable
        onPress={toggleRun}
        style={({ pressed }) => [styles.boton, { opacity: pressed ? 0.5 : 1 }]}>
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
