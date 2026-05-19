import { Audio } from 'expo-av';

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: false,
});

async function play(file: any) {
  try {
    const { sound } = await Audio.Sound.createAsync(file, { shouldPlay: true });
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.isLoaded && s.didJustFinish) sound.unloadAsync();
    });
  } catch {}
}

export const playCorrect = () => play(require('../assets/sounds/correct.mp3'));
export const playWrong = () => play(require('../assets/sounds/wrong.mp3'));
export const playClick = () => play(require('../assets/sounds/click.mp3'));
export const playWin = () => play(require('../assets/sounds/correct.mp3'));
