
import { useState } from "react";
import { Platform } from "react-native";
import { YStack, XStack, Text, Button, Image, ScrollView, Card, Theme, H2, H4, SizableText, View } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { Camera } from "@tamagui/lucide-icons";
import Svg, { Circle as SvgCircle } from "react-native-svg";

const DAILY_GOAL = 2000;
const DUMMY_MEALS = [
  {
    id: 1,
    photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    name: "Avocado Toast",
    calories: 320,
    note: "Breakfast, whole grain bread.",
  },
  {
    id: 2,
    photo: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    name: "Chicken Salad",
    calories: 450,
    note: "Lunch, extra veggies.",
  },
];

function CircularProgress({ value, max, size = 140, stroke = 14, color = "#34c759", bg = "#e6f4ea" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  // Fallback for web if SVG fails
  if (Platform.OS === "web" && typeof window === "undefined") {
    // SSR fallback
    return (
      <YStack width={size} height={size} ai="center" jc="center" bg={bg} br={size / 2}>
        <Text fontWeight="700" fontSize={32} color={color}>
          {value}
        </Text>
        <Text fontSize={14} color="$gray10">/ {max} kcal</Text>
      </YStack>
    );
  }

  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
      <Svg width={size} height={size}>
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bg}
          strokeWidth={stroke}
          fill="none"
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <YStack position="absolute" alignItems="center" justifyContent="center">
        <Text fontWeight="700" fontSize={32} color={color}>
          {value}
        </Text>
        <Text fontSize={14} color="$gray10">/ {max} kcal</Text>
      </YStack>
    </View>
  );
}

export default function HomeScreen() {
  const [meals] = useState(DUMMY_MEALS);
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <Theme name="light">
      <YStack f={1} bg="#f7faf7">
        {/* Header with green gradient */}
        <LinearGradient
          colors={["#34c759", "#00b894"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            paddingTop: 60,
            paddingBottom: 32,
            paddingHorizontal: 24,
            alignItems: "center",
            shadowColor: "#34c759",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <H2 color="white" fontWeight="800" letterSpacing={1.2} style={{ textShadowColor: "#1e7e34", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 }}>
            AI Calories Tracker
          </H2>
          <Text color="white" fontSize={16} mt={4} mb={8} style={{ opacity: 0.92 }}>
            Healthy habits, powered by AI
          </Text>
          <CircularProgress value={totalCalories} max={DAILY_GOAL} />
          <Text color="white" fontSize={14} mt={8} style={{ opacity: 0.85 }}>
            Daily Goal
          </Text>
        </LinearGradient>

        {/* Meals List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingTop: 16 }}>
          <XStack ai="center" jc="space-between" mb={12}>
            <H4 color="#222" fontWeight="700" letterSpacing={0.5}>Today’s Meals</H4>
            <Button
              icon={Camera}
              size="$4"
              bg="#34c759"
              color="white"
              borderRadius={100}
              px={18}
              py={10}
              elevation={2}
              pressStyle={{ bg: "#00b894" }}
              onPress={() => {}}
              style={{
                shadowColor: "#34c759",
                shadowOpacity: 0.18,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            >
              Snap Meal
            </Button>
          </XStack>
          {meals.length === 0 ? (
            <YStack ai="center" jc="center" mt={40}>
              <Text color="$gray10" fontSize={18}>No meals logged yet.</Text>
              <Text color="$gray9" fontSize={14} mt={4}>Tap "Snap Meal" to add your first meal!</Text>
            </YStack>
          ) : (
            meals.map((meal) => (
              <Card
                key={meal.id}
                elevate
                size="$4"
                mb={18}
                bg="white"
                borderRadius={20}
                overflow="hidden"
                shadowColor="#34c759"
                shadowOpacity={0.10}
                style={{
                  borderWidth: 1,
                  borderColor: "#e6f4ea",
                  shadowColor: "#34c759",
                  shadowOpacity: 0.10,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <XStack>
                  <Image
                    source={{ uri: meal.photo }}
                    width={80}
                    height={80}
                    borderRadius={16}
                    style={{
                      margin: 12,
                      backgroundColor: "#e6f4ea",
                      borderWidth: 1,
                      borderColor: "#d0f5e6",
                    }}
                  />
                  <YStack f={1} jc="center" px={8} py={12}>
                    <SizableText fontWeight="700" fontSize={18} color="#222" mb={2}>
                      {meal.name}
                    </SizableText>
                    <Text color="#34c759" fontWeight="700" fontSize={16} mt={2}>
                      {meal.calories} kcal
                    </Text>
                    <Text color="$gray10" fontSize={13} mt={2}>
                      {meal.note}
                    </Text>
                  </YStack>
                </XStack>
              </Card>
            ))
          )}
        </ScrollView>
      </YStack>
    </Theme>
  );
}