import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Las pestañas principales ocultan el header del Stack */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Pantalla modal para los permisos */}
      <Stack.Screen 
        name="permisos/[recurso]" 
        options={{ presentation: 'modal', title: 'Permiso Requerido' }} 
      />
      
      {/* Otras pantallas que heredan la navegación normal */}
      <Stack.Screen name="reporte/nuevo" options={{ title: 'Nuevo Reporte' }} />
      <Stack.Screen name="ajustes-app" options={{ title: 'Ajustes' }} />
    </Stack>
  );
}