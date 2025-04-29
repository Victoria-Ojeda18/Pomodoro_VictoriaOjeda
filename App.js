import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./components/titulo";
import Visor from "./components/visor";
import Boton from "./components/boton";
import Tabs from "./components/tabs";
import { useState, useEffect } from "react";
import playSound from "./utility/playSound";
import * as Notifications from 'expo-notifications'; // Importar el paquete de notificaciones

// Configuración para notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Función para enviar notificación
export const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏳ Pomodoro Finalizado",
      body: "Tu tiempo ha terminado. ¡Tómate un descanso!",
      sound: true,
    },
    trigger: null, // Se envía de inmediato
  });
};

// Solicitar permisos de notificación
const solicitarPermisosNotificaciones = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      console.log("Permiso de notificación denegado");
      return;
    }
  }
  console.log("Permiso de notificación concedido");
};

const alarma = require("./assets/sound/Don_OmarConteo.mp3"); // Reemplazalo si tu ruta es otra

export default function App() {
  const [tiempo, setTiempo] = useState(25 * 60);  // Empezamos con 25 minutos
  const [seleccion, setSeleccion] = useState(0);  // Inicializamos con "Pomodoro"
  const [run, setRun] = useState(false);

  const colores = ["#D7EAAC", "#B2DCE2", "#EAD094"];
  
  useEffect(() => {
    const tiempos = [25 * 60, 5 * 60, 10 * 60];  // Pomodoro, Descanso Corto, Descanso Largo
    setTiempo(tiempos[seleccion]);  // Actualizamos el tiempo según la selección
  }, [seleccion]);

  useEffect(() => {
    solicitarPermisosNotificaciones();  // Solicitar permisos para notificaciones
  }, []);

  useEffect(() => {
    let intervalo;

    if (run && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo(tiempoAnterior => tiempoAnterior - 1); // Reducir el tiempo en un segundo
      }, 0.5);
    }

    if (tiempo === 0 && run) {
      playSound(alarma);  // Reproducir sonido de alarma
      setRun(false);  // Detenemos el temporizador cuando el tiempo llega a 0

      // Enviar notificación cuando el tiempo llegue a 0
      enviarNotificacion();  // Llamar a la función para enviar la notificación
    }

    return () => clearInterval(intervalo);  // Limpiar el intervalo cuando se detenga el temporizador
  }, [run, tiempo]);

  return (
    <View
      style={[ 
        styles.container, 
        Platform.OS === "android" && { paddingTop: 25 }, 
        { backgroundColor: colores[seleccion] },  // Cambiar color de fondo según la opción seleccionada
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Titulo titulo={"Pomodoro"} />
        <Visor tiempo={tiempo} />
        <Boton run={run} setRun={setRun} />
        <Tabs setSeleccion={setSeleccion} seleccion={seleccion} setMinutos={setTiempo} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    fontFamily: "Poppins",
  },
});
