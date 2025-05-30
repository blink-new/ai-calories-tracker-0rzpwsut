
import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </TamaguiProvider>
  );
}