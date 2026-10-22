import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { usePermiso, Recurso } from '../../hooks/usePermiso';

export default function PantallaPreviaPermiso() {
  const { recurso } = useLocalSearchParams<{ recurso: Recurso }>();
  const permiso = usePermiso(recurso);

  // Textos obligatorios que pide la cátedra
  const beneficios: Record<string, string> = {
    camara: 'Usamos tu cámara para leer el QR del aula.',
    ubicacion: 'Usamos tu ubicación para marcar dónde está el problema.',
    notificaciones: 'Te avisamos cuando se resuelva tu reporte.'
  };

  const pedirYVolver = async () => {
    await permiso.pedir();
    // Una vez que la persona responde al diálogo del sistema, cerramos el modal
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{beneficios[recurso as string]}</Text>
      
      {permiso.estado === 'bloqueado' ? (
        <>
          <Text style={styles.aclaracion}>
            El permiso está bloqueado. Para usar esta función, tenés que habilitarlo manualmente en la configuración de tu teléfono.
          </Text>
          <Button title="Abrir Ajustes" onPress={permiso.abrirAjustes} />
        </>
      ) : (
        <>
          <Text style={styles.aclaracion}>
            (Podés cambiar esta preferencia en Ajustes cuando quieras)
          </Text>
          <Button title="Continuar" onPress={pedirYVolver} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 18, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  aclaracion: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#666' }
});