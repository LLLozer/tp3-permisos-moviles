import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';
import { usePermiso } from '../../hooks/usePermiso';
import { router } from 'expo-router';

export default function Escanear() {
  const camara = usePermiso('camara');

  // Estado 1: Cargando
  if (camara.estado === 'cargando') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando cámara...</Text>
      </View>
    );
  }

  // Estado 2: Preguntable (redirige a la pantalla previa modal)
  if (camara.estado === 'preguntable') {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>Necesitamos acceso a la cámara para escanear el código QR de la puerta.</Text>
        <Button title="Continuar" onPress={() => router.push('/permisos/camara')} />
      </View>
    );
  }

  // Estado 3: Bloqueado (ofrece ir a Ajustes o camino alternativo)
  if (camara.estado === 'bloqueado') {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>La cámara está bloqueada.</Text>
        <Button title="Abrir Ajustes" onPress={camara.abrirAjustes} />
        <View style={{ marginTop: 20 }}>
          <Button title="Ingresar código a mano (Alternativa)" onPress={() => alert('Acá iría el input manual')} color="gray" />
        </View>
      </View>
    );
  }

  // Estado 4: Concedido (muestra la cámara)
  return (
    <View style={{ flex: 1 }}>
      <CameraView 
        style={{ flex: 1 }} 
        facing="back"
        onBarcodeScanned={({ data }) => {
          alert(`QR Escaneado con éxito: ${data}`);
          router.back(); // Vuelve al formulario
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { fontSize: 16, textAlign: 'center', marginBottom: 20 }
});