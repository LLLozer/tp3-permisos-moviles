import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Reportes</Text>
      
      {/* Lista simulada para cumplir la consigna G1 */}
      <View style={styles.lista}>
        <View style={styles.itemLista}>
          <Text>• Foco quemado (Pendiente)</Text>
          <Button title="Ver" onPress={() => router.push('/reporte/1')} />
        </View>
        <View style={styles.itemLista}>
          <Text>• Canilla rota (En curso)</Text>
          <Button title="Ver" onPress={() => router.push('/reporte/2')} />
        </View>
      </View>

      <Button 
        title="Nuevo Reporte" 
        onPress={() => router.push('/reporte/nuevo')} 
      />
      
      {/* Botón temporal directo al escáner para probar rápido la cámara */}
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Probar Escáner QR" 
          onPress={() => router.push('/reporte/escanear')} 
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  lista: { marginBottom: 30, width: '100%', paddingHorizontal: 20 },
  itemLista: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 }
});