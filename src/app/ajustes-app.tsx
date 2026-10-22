import { View, Text, Switch, StyleSheet } from 'react-native';
import { usePermiso } from '../hooks/usePermiso';

export default function AjustesApp() {
  const permiso = usePermiso('notificaciones');

  const toggleSwitch = async (valor: boolean) => {
    if (valor) {
      if (permiso.estado === 'bloqueado') {
        permiso.abrirAjustes();
      } else {
        await permiso.pedir();
      }
    } else {
      // Si la persona quiere apagarlo, la mandamos a los ajustes del sistema, 
      // ya que Android no permite "quitar" permisos desde el código
      permiso.abrirAjustes();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes de la App</Text>
      
      <View style={styles.fila}>
        <Text style={styles.texto}>Avisarme cuando se resuelva mi reporte</Text>
        <Switch 
          value={permiso.estado === 'concedido'} 
          onValueChange={toggleSwitch} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  texto: { fontSize: 16, flex: 1, paddingRight: 10 }
});