import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.8 + 0.2,
  duration: Math.random() * 2000 + 1500,
}));

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const starAnims = useRef(STARS.map(() => new Animated.Value(0.2))).current;

  useEffect(() => {
    STARS.forEach((star, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starAnims[i], {
            toValue: 1,
            duration: star.duration,
            useNativeDriver: true,
          }),
          Animated.timing(starAnims[i], {
            toValue: 0.2,
            duration: star.duration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {STARS.map((star, i) => (
        <Animated.View
          key={star.id}
          style={[
            styles.star,
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              opacity: starAnims[i],
            },
          ]}
        />
      ))}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>EduChamp GH</Text>
        <Text style={styles.subtitle}>Ghana Education Quiz Champion</Text>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>
        <Text style={styles.loading}>Loading your quiz adventure...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0820',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  trophy: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: '#a78bfa',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#c4b5fd',
    marginBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7c3aed',
  },
  loading: {
    color: '#a78bfa',
    fontSize: 14,
  },
});
