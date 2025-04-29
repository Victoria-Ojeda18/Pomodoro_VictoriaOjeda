import { Audio } from "expo-av"; // Asegúrate de tener instalado expo-av
const playSound = async (sonido) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        (sonido) // Cambia la ruta al sonido que deseas reproducir
      );
      await sound.playAsync();
  
      // Liberar el recurso después de que termine de reproducirse
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  export default playSound; // Solo exportás la función, no la llamás
