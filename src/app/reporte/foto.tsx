import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { usePermiso } from '../../hooks/usePermiso';

export default function Foto() {
  const camara = usePermiso('camara');
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const sacarFoto = async () => {
    // Si no tiene permiso concedido, mandamos al modal explicativo
    if (camara.estado !== 'concedido') {
      router.push('/permisos/camara');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const elegirDeGaleria = async () => {
    // Requisito G2.3: El selector del sistema no requiere pedir permiso de lectura
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adjuntar foto del desperfecto</Text>
      
      <View style={styles.botones}>
        <Button title="Sacar foto (Cámara)" onPress={sacarFoto} />
        <Button title="Elegir de la galería" onPress={elegirDeGaleria} color="#666" />
      </View>

      {fotoUri && (
        <View style={styles.preview}>
          <Text>Vista previa:</Text>
          <Image source={{ uri: fotoUri }} style={styles.imagen} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  titulo: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  botones: { gap: 15, width: '100%', maxWidth: 300 },
  preview: { marginTop: 30, alignItems: 'center' },
  imagen: { width: 250, height: 250, marginTop: 10, borderRadius: 10 }
});