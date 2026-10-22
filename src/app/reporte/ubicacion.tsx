import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { usePermiso } from '../../hooks/usePermiso';

export default function Ubicacion() {
  const permiso = usePermiso('ubicacion');
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lon: number } | null>(null);
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    let montado = true;
    
    if (permiso.estado === 'concedido') {
      setBuscando(true);
      Location.getCurrentPositionAsync({})
        .then((loc) => {
          if (montado) {
            setCoordenadas({ lat: loc.coords.latitude, lon: loc.coords.longitude });
            setBuscando(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (montado) setBuscando(false);
        });
    }
    
    return () => { montado = false; };
  }, [permiso.estado]);

  if (permiso.estado === 'cargando' || buscando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (permiso.estado === 'preguntable') {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>Necesitamos tu ubicación para marcar el problema.</Text>
        <Button title="Continuar" onPress={() => router.push('/permisos/ubicacion')} />
      </View>
    );
  }

  if (permiso.estado === 'bloqueado') {
    return (
      <View style={styles.center}>
        <Text style={styles.texto}>La ubicación está denegada.</Text>
        <Button title="Abrir Ajustes" onPress={permiso.abrirAjustes} />
        
        <View style={styles.alternativaContainer}>
          <Text style={{ marginBottom: 15, fontWeight: 'bold' }}>Alternativa: Elegir sector a mano</Text>
          <Button title="Patio Central" onPress={() => router.back()} color="#666" />
          <View style={{ marginTop: 10 }}>
            <Button title="Estacionamiento" onPress={() => router.back()} color="#666" />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.titulo}>Ubicación registrada</Text>
      
      {permiso.indicadorParcial ? (
        <Text style={styles.coordenadas}>📍 Ubicación aproximada</Text>
      ) : (
        <Text style={styles.coordenadas}>
          📍 Lat: {coordenadas?.lat?.toFixed(4)}, Lon: {coordenadas?.lon?.toFixed(4)}
        </Text>
      )}
      
      <View style={{ marginTop: 30 }}>
        <Button title="Confirmar y Volver" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  coordenadas: { fontSize: 16, color: 'green', backgroundColor: '#e0ffe0', padding: 15, borderRadius: 8, overflow: 'hidden' },
  alternativaContainer: { marginTop: 40, width: '100%', padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 }
});