import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="level" />
        <Stack.Screen name="class" />
        <Stack.Screen name="subject" />
        <Stack.Screen name="examtype" />
        <Stack.Screen name="nameentry" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="results" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="becesubject" />
        <Stack.Screen name="beceyear" />
        <Stack.Screen name="beceessay" />
      </Stack>
    </>
  );
}
