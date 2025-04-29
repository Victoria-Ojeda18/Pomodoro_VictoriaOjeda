import { Audio } from "expo-av";

let sound; // Variable global para mantener la instancia de sonido
let reproduciendo = false;

const toggleSound = async (sonido) => {
  try {
    if (reproduciendo && sound) {
      await sound.stopAsync(); // Detener el sonido si está en reproducción
      await sound.unloadAsync(); // Liberar el recurso
      reproduciendo = false;
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(sonido);
    sound = newSound;
    await sound.playAsync();
    reproduciendo = true;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
        reproduciendo = false;
      }
    });
  } catch (error) {
    console.error("Error al reproducir/detener el sonido:", error);
  }
};

export default toggleSound;
