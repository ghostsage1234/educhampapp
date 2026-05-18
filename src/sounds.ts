import { Audio } from 'expo-av';

async function setupAudio() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: false,
    playThroughEarpieceAndroid: false,
  });
}

async function playSound(file: any) {
  try {
    await setupAudio();
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}

export const playCorrect = () => playSound(require('../assets/sounds/correct.mp3'));
export const playWrong = () => playSound(require('../assets/sounds/wrong.mp3'));
export const playClick = () => playSound(require('../assets/sounds/click.mp3'));
export const playWin = () => playSound(require('../assets/sounds/correct.mp3'));
