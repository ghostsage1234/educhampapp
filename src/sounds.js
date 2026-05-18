import { Audio } from 'expo-av';

export async function playCorrect() {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/correct.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(s => { if (s.didJustFinish) sound.unloadAsync(); });
  } catch (e) {}
}

export async function playWrong() {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/wrong.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(s => { if (s.didJustFinish) sound.unloadAsync(); });
  } catch (e) {}
}

export async function playWin() {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/win.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(s => { if (s.didJustFinish) sound.unloadAsync(); });
  } catch (e) {}
}
