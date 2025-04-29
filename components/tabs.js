import { View, Text, Pressable, StyleSheet } from "react-native";

// Opciones y tiempos en minutos
const opciones = ["Pomodoro", "Descanso Corto", "Descanso Largo"];
const tiempos = [25, 5, 10]; // Minutos para cada opción

const Tabs = ({ seleccion, setSeleccion, setMinutos }) => {
  const handlerSeleccion = (index) => {
    setSeleccion(index);  // Actualizamos la opción seleccionada
    setMinutos(tiempos[index]);  // Actualizamos los minutos según la opción
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {opciones.map((opcion, index) => (
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            { opacity: pressed ? 0.5 : 1 },
            {
              borderColor: seleccion === index ? "white" : "transparent",  // Cambiamos el borde cuando está seleccionado
            },
          ]}
          key={index}
          onPress={() => handlerSeleccion(index)}
        >
          <Text style={{ color: "white" }}>{opcion}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    borderWidth: 2,
    width: "33%",
    padding: 8,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    marginTop: 15,
    fontFamily: "Poppins",
    backgroundColor: "transparent",
  },
});

export default Tabs;
