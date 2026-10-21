import { View, Text, Button } from 'react-native';
import { usePermiso } from '../../hooks/usePermiso';

export default function Permisos() {
  const camara = usePermiso('camara');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Estado Cámara: {camara.estado}</Text>
      
      {camara.estado === 'preguntable' && (
        <Button title="Pedir Permiso" onPress={camara.pedir} />
      )}
      
      {camara.estado === 'bloqueado' && (
        <Button title="Abrir Ajustes" onPress={camara.abrirAjustes} />
      )}
    </View>
  );
}