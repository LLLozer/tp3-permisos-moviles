import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

export default function Avisos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bandeja de Avisos</Text>
      <Text style={styles.subtitulo}>
        Si denegaste las notificaciones, vas a ver tus alertas acá.
      </Text>

      <View style={styles.aviso}>
        <Text style={{ fontWeight: 'bold' }}>¡Reporte Resuelto!</Text>
        <Text>El foco del Laboratorio 1 fue cambiado.</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Ir a Ajustes para activar notificaciones" onPress={() => router.push('/ajustes-app')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  aviso: { backgroundColor: '#e6f7ff', padding: 15, borderRadius: 8, width: '100%', borderWidth: 1, borderColor: '#91d5ff' }
});