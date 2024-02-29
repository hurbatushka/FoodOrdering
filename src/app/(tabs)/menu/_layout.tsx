import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function MenuStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Пиццы',
          headerLeft: () => (
            <Link style={{ marginRight: 10 }} href="/cart" asChild>
              <Pressable>
                <FontAwesome name="shopping-cart" size={20} color={Colors.light.tint} />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
