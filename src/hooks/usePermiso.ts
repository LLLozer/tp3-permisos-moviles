import { useState, useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from 'expo-router';

export type EstadoPermiso = 'cargando' | 'concedido' | 'preguntable' | 'bloqueado';
export type Recurso = 'camara' | 'ubicacion' | 'notificaciones';

export function usePermiso(recurso: Recurso) {
  const [estado, setEstado] = useState<EstadoPermiso>('cargando');
  const [indicadorParcial, setIndicadorParcial] = useState(false);
  
  const [permisoCamara, pedirPermisoCamara] = useCameraPermissions();

  const camaraGranted = permisoCamara?.granted;
  const camaraCanAskAgain = permisoCamara?.canAskAgain;

  const cargarEstado = useCallback(async () => {
    try {
      if (recurso === 'camara') {
        if (permisoCamara) {
          setEstado(camaraGranted ? 'concedido' : (camaraCanAskAgain ? 'preguntable' : 'bloqueado'));
          setIndicadorParcial(false);
        }
      } 
      else if (recurso === 'ubicacion') {
        const res = await Location.getForegroundPermissionsAsync();
        setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
        const esAproximada = 
          (Platform.OS === 'android' && res.android?.accuracy === 'coarse') ||
          (Platform.OS === 'ios' && res.ios?.scope === 'whenInUse' && res.ios?.accuracy === 'reduced');
        setIndicadorParcial(!!esAproximada);
      }
      else if (recurso === 'notificaciones') {
        // Consultamos el estado real del permiso de notificaciones
        const res = await Notifications.getPermissionsAsync();
        setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
        setIndicadorParcial(false);
      }
    } catch (error) {
      console.error("Error cargando permiso:", error);
    }
  }, [recurso, camaraGranted, camaraCanAskAgain]); 

  useFocusEffect(useCallback(() => { cargarEstado(); }, [cargarEstado]));

  const pedir = async () => {
    if (recurso === 'camara') {
      await pedirPermisoCamara();
    } else if (recurso === 'ubicacion') {
      await Location.requestForegroundPermissionsAsync();
    } else if (recurso === 'notificaciones') {
      // Requisito G2.5: Crear el canal en Android antes de pedir el permiso
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('reportes', {
          name: 'Reportes',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      await Notifications.requestPermissionsAsync();
    } 
    await cargarEstado();
  };

  const abrirAjustes = () => { Linking.openSettings(); };

  return { estado, indicadorParcial, pedir, abrirAjustes };
}