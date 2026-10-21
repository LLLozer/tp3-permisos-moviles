import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function NuevoReporte() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Aula o Sector:</Text>
      <TextInput style={styles.input} placeholder="Ej. Laboratorio 1" />
      <Button title="Escanear QR del Aula" onPress={() => router.push('/reporte/escanear')} />

      <Text style={styles.label}>Descripción del problema:</Text>
      <TextInput style={styles.input} placeholder="Ej. La canilla pierde agua" multiline />

      <View style={styles.botones}>
        <Button title="Adjuntar Foto" onPress={() => router.push('/reporte/foto')} color="#555" />
        <Button title="Marcar Ubicación" onPress={() => router.push('/reporte/ubicacion')} color="#555" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Guardar Reporte" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  botones: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }
});