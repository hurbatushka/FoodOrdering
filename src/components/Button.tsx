import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(({ text, ...pressableProps }, ref) => {
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable ref={ref} {...pressableProps} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={{
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: Colors.light.tint,
          padding: 15,
          alignItems: 'center',
          borderRadius: 100,
          marginVertical: 10,
          opacity: animated,
        }}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Button;
