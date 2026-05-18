import { Audio } from 'expo-av';

async function playSound(require_path) {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(require_path, { shouldPlay: true });
    sound.setOnPlaybackStatusUpdate((s) => {
      if (s.didJustFinish) sound.unloadAsync();
    });
  } catch (e) {}
}

export async function playCorrect() {
  await playSound(require('../assets/sounds/correct.wav'));
  setTimeout(() => playSound(require('../assets/sounds/correct2.wav')), 160);
}

export async function playWrong() {
  await playSound(require('../assets/sounds/wrong.wav'));
}

export async function playWin() {
  await playSound(require('../assets/sounds/win.wav'));
  setTimeout(() => playSound(require('../assets/sounds/win2.wav')), 200);
  setTimeout(() => playSound(require('../assets/sounds/win3.wav')), 400);
}
