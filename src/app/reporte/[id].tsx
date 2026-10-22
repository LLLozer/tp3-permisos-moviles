import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { usePermiso } from '../../hooks/usePermiso';

// Configuración para que la notificación se muestre por arriba aunque la app esté abierta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function DetalleReporte() {
  const { id } = useLocalSearchParams();
  const permiso = usePermiso('notificaciones');

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: El reporte no existe.</Text>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    );
  }

  const simularResolucion = async () => {
    if (permiso.estado !== 'concedido') {
      alert('Tenés que activar las notificaciones en Ajustes para recibir el aviso.');
      router.push('/ajustes-app');
      return;
    }

    alert('¡Simulación iniciada! Podés salir de la app (minimizarla). La notificación llegará en 10 segundos.');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '✅ Reporte Resuelto',
        body: `El problema del reporte #${id} ha sido solucionado.`,
        data: { idReporte: id },
      },
      trigger: {
        seconds: 10,
        channelId: 'reportes', // Usa el canal que creado en el hook
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reporte #{id}</Text>
      <Text style={styles.detalle}>Sector: Laboratorio 1</Text>
      <Text style={styles.detalle}>Problema: Foco quemado</Text>
      <Text style={styles.estado}>Estado: Pendiente</Text>

      <View style={{ marginTop: 40 }}>
        <Button 
          title="Simular resolución (Tarda 10s)" 
          onPress={simularResolucion} 
          color="#2e8b57"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  detalle: { fontSize: 18, marginBottom: 10 },
  estado: { fontSize: 18, color: 'orange', fontWeight: 'bold', marginTop: 10 },
  error: { fontSize: 18, color: 'red', marginBottom: 20 }
});