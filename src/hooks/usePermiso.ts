import { useState, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
// 1. COMENTAMOS LA IMPORTACIÓN CONFLICTIVA
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
            setIndicadorParcial(false); // Reseteamos por las dudas
          }
        } 
        else if (recurso === 'ubicacion') {
          const res = await Location.getForegroundPermissionsAsync();
          if (montado) {
            setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
            
            // <-- CORREGIDO PARA TYPESCRIPT ('reduced' en iOS y 'coarse' en Android)
            const esAproximada = 
              (Platform.OS === 'android' && res.android?.accuracy === 'coarse') ||
              (Platform.OS === 'ios' && res.ios?.scope === 'whenInUse' && res.ios?.accuracy === 'reduced');
              
            setIndicadorParcial(!!esAproximada);
          }
        } 
        // 2. COMENTAMOS LA CONSULTA DE NOTIFICACIONES
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
      
      // <-- ACTUALIZAMOS EL ESTADO DESPUÉS DE PEDIR EL PERMISO
      const res = await Location.getForegroundPermissionsAsync();
      const esAproximada = 
        (Platform.OS === 'android' && res.android?.accuracy === 'coarse') ||
        (Platform.OS === 'ios' && res.ios?.scope === 'whenInUse' && res.ios?.accuracy === 'reduced');
        
      setEstado(res.granted ? 'concedido' : (res.canAskAgain ? 'preguntable' : 'bloqueado'));
      setIndicadorParcial(!!esAproximada);
    } 
    // 3. COMENTAMOS EL PEDIDO DE NOTIFICACIONES
    /*
    else if (recurso === 'notificaciones') {
      await Notifications.requestPermissionsAsync();
    }
    */
  };

  const abrirAjustes = () => {
    Linking.openSettings();
  };

  // <-- DEVOLVEMOS EL INDICADOR PARCIAL PARA QUE LA PANTALLA LO LEA
  return { estado, indicadorParcial, pedir, abrirAjustes };
}