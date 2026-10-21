import { useState, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
// COMENTADO PORQUE ROMPE EXPO GO:
// import * as Notifications from 'expo-notifications';

export type EstadoPermiso = 'cargando' | 'concedido' | 'preguntable' | 'bloqueado';
export type Recurso = 'camara' | 'ubicacion' | 'notificaciones';

export function usePermiso(recurso: Recurso) {
  const [estado, setEstado] = useState<EstadoPermiso>('cargando');
  const [indicadorParcial, setIndicadorParcial] = useState(false); // <-- AGREGADO
  
  const [permisoCamara, pedirPermisoCamara] = useCameraPermissions();

  useEffect(() => {
    let montado = true;

    async function cargarEstado() {
      try {
        if (recurso === 'camara') {
          if (permisoCamara) {
            setEstado(permisoCamara.granted ? 'concedido' : (permisoCamara.canAskAgain ? 'preguntable' : 'bloqueado'));
            setIndicadorParcial(false);
          }
        } 
        else if (recurso === 'ubicacion') {
          const res = await Location.getForegroundPermissionsAsync();
          if (montado) {
            setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
            
            // Evaluamos si dio acceso aproximado (coarse)
            const esAproximada = 
              (Platform.OS === 'android' && res.android?.accuracy === 'coarse') ||
              (Platform.OS === 'ios' && res.ios?.scope === 'whenInUse' && res.ios?.accuracy === 'coarse');
              
            setIndicadorParcial(!!esAproximada);
          }
        } 
        /*
        else if (recurso === 'notificaciones') {
          const res = await Notifications.getPermissionsAsync();
          if (montado) {
            setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
            setIndicadorParcial(false);
          }
        }
        */
      } catch (error) {
        console.error("Error cargando permiso:", error);
      }
    }

    cargarEstado();

    return () => { montado = false; };
  }, [recurso, permisoCamara]); 

  const pedir = async () => {
    if (recurso === 'camara') {
      await pedirPermisoCamara();
    } else if (recurso === 'ubicacion') {
      await Location.requestForegroundPermissionsAsync();
      // Recargamos estado interno (forzamos re-render de la UI para Expo Location)
      const res = await Location.getForegroundPermissionsAsync();
      const esAproximada = 
        (Platform.OS === 'android' && res.android?.accuracy === 'coarse') ||
        (Platform.OS === 'ios' && res.ios?.scope === 'whenInUse' && res.ios?.accuracy === 'coarse');
      setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
      setIndicadorParcial(!!esAproximada);
    } 
  };

  const abrirAjustes = () => {
    Linking.openSettings();
  };

  // <-- AHORA DEVOLVEMOS EL INDICADOR PARCIAL
  return { estado, indicadorParcial, pedir, abrirAjustes };
}