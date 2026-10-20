# Trabajo Práctico N° 3 - Android, iOS y Expo (Permisos Móviles)

**Alumno/a:** Bogado Augusto

## Parte A. ¿Qué es un permiso y por qué existe?

### A1. Conceptos
**Respondé con tus palabras:**
a) ¿Qué es un permiso? ¿Qué papel cumplen la app, el sistema operativo y la persona usuaria?
*Respuesta: Un permiso es una autorización, la cual es otorgada por el usuario a una aplicación con la finalidad de darle acceso a un recurso del sistema* 

b) ¿Qué es la caja de arena (sandbox) y qué relación tiene con los permisos? ¿Qué puede hacer una app sin ningún permiso?
*Respuesta: La sandbox es un espacio donde una aplicación solamente tiene acceso a sus propios archivos, su relación con los permisos viene de que la aplicación, si quiere usar un archivo fuera de su sandbox, necesita un acceso, acceso que es concedido por el usuario. Una aplicación que no tiene permisos puede mostrar pantallas, guardar sus propios datos y conectarse a internet.*

c) Nombrá las cuatro razones por las que existen los permisos y dá un ejemplo concreto de cada una.
*Respuesta: Las cuatro razones por las cuales existen los permisos son: Privacidad (datos sensibles; ubicación, fotos, voz, etc. no deben salir del dispositivo sin el consentimiento del usuario), Seguridad (en el caso de que una aplicación maliciosa ingrese dentro de la app, el daño queda limitado a los permisos que se otorgaron), Transparencia (el sistema muestra lo que la app usa), Control (la decisión no es permanente, se revisa y se revoca desde ajustes).*

d) En la analogía del portero del edificio, ¿quién es la visita, quién el portero y quién el dueño del departamento? ¿Qué significa que "el portero se acuerda de la respuesta"?
*Respuesta: La visita es la app, el portero es el sistema operativo, y el dueño del departamento es el usuario. Que el portero se acuerde de la respuesta significa que el sistema operativo ya sabe que la aplicación tiene acceso al permiso que solicitó.*

### A2. Declarar y solicitar
**Todo permiso pasa por dos momentos. Completá la tabla:**

| | Declarar (al compilar) | Solicitar (al ejecutar) |
| :--- | :--- | :--- |
| **¿Qué se hace?** | Se le notifica al sistema qué recursos podría usar la app y queda escrito dentro del paquete instalado | Cuando el usuario usa la función, el código solicita acceso y el sistema muestra el diálogo |
| **¿Dónde / cómo en Android?** | Una línea <uses-permission> en AndroidManifest.xml | Utilizado solo para los permisos de tiempo de ejecución |
| **¿Dónde / cómo en iOS?** | Un texto de propósito en el Info.plist | Para cada recurso protegido |
| **¿Dónde / cómo en Expo?** | Los dos archivos se generan desde app.json | request...PermissionsAsync() o el hook del módulo |
| **¿Qué pasa si se omite?** | Si no se declara, no se puede solicitar | Si no se solicita, no se tiene |

### A3. Verdadero o falso
**Indicá V o F y justificá las falsas:**
a) El diálogo de permiso lo dibuja tu app con componentes de React Native.
*Respuesta: Falso. El código no dibuja el diálogo del permiso, sino que es el sistema el que lo muestra.* 

b) En Expo, la fuente de verdad de los permisos es `app.json` (o `app.config.ts`), no el `AndroidManifest.xml`.
*Respuesta: V* 

c) Agregar un permiso nuevo en el `Info.plist` se puede publicar con una actualización OTA.
*Respuesta: * 

d) Si tu código pide un permiso que no está en el manifiesto, Android igual muestra el diálogo.
*Respuesta: Falso. Android deniega el permiso en el acto si es que el código pide un permiso que no está en el manifiesto.* 

e) El paquete `expo-permissions` es la forma recomendada de pedir permisos en SDK 57.
*Respuesta: Falso. El paquete expo-permissions ya no existe, por lo que cada módulo maneja sus propios permisos.* 

f) En iOS, las notificaciones no llevan texto de propósito en el `Info.plist`.
*Respuesta: Falso. En iOS, cada recurso protegido exige un texto de propósito en el Info.plist.* 

g) Con acceso limitado a fotos, `status` vale `'granted'` y el matiz está en `accessPrivileges`.
*Respuesta: V* 

h) Desinstalar y reinstalar la app es la forma confiable de volver a "sin decidir" en las dos plataformas.
*Respuesta: V* 

### A4. Los estados de un permiso
a) Dibujá (o describí) el diagrama de estados de un permiso en Android y en iOS. ¿Cuál es la diferencia central entre las dos plataformas?
*Respuesta: 
Android: Un permiso inicialmente comienza como undetermined, pero puede tener tres estados posteriores: concedido, denegado o parcial. Si es denegado, se pregunta de nuevo, si es rechazado otra vez, es bloqueado.
iOS: Un permiso inicialmente comienza como undetermined, pero puede tener tres estados posteriores: concedido, bloqueado o parcial. Si es denegado, queda como bloqueado, de modo que si el usuario quiere concebir el permiso, debe hacerlo desde ajustes.
La diferencia radica en que Android da dos oportunidades (junto con una alternativa) al momento de denegarse un permiso, iOS no tiene estado denegado, sino que la denegación de un permiso lleva directamente a su bloqueo.
*

b) Completá qué devuelve Expo en cada estado:

| Estado | status | canAskAgain | ¿Puede aparecer el diálogo? |
| :--- | :--- | :--- | :--- |
| Sin decidir | undetermined | true | Sí  |
| Concedido | granted | true | Sí |
| Denegado (se puede volver a pedir) | denied | true | Sí |
| Bloqueado | denied | false | No |

---

## Parte B. Android: tipos de permisos y manifiesto

### B1. Clasificá los permisos
**Indicá el tipo (de instalación / de tiempo de ejecución / especial) y cómo los obtiene la app.**

| Permiso | Tipo | ¿Cómo se obtiene? |
| :--- | :--- | :--- |
| `INTERNET` | de instalación | se concede por default |
| `CAMERA` | tiempo de ejecución | se pide con un diálogo |
| `VIBRATE` | de instalación | se concede por default |
| `SYSTEM_ALERT_WINDOW` | especial | se activa en ajustes |
| `POST_NOTIFICATIONS` | de tiempo de ejecución | se activa con un diálogo |
| `ACCESS_NETWORK_STATE` | de instalación | se concede por default |
| `READ_CONTACTS` | tiempo de ejecución | se activa con un diálogo |
| `SCHEDULE_EXACT_ALARM` | especial | se activa en ajustes |
| `RECORD_AUDIO` | tiempo de ejecución | se activa con la opción "solo esta vez" |
| `MANAGE_EXTERNAL_STORAGE` | especial | se activa en ajustes |

### B2. Grupos y nombres
a) ¿Qué es un grupo de permisos? Si la app pide `ACCESS_FINE_LOCATION` y `ACCESS_COARSE_LOCATION` juntos, ¿cuántos diálogos ve la persona?
*Respuesta: Un grupo de permisos es un conjunto de permisos destinados a una sección específica, por ejemplo, "Ubicación", que es lo que saldría (un sólo diálogo) si la app pide ACCESS_FINE_LOCATION y ACCESS_COARSE_LOCATION.*

b) ¿Qué prefijo lleva el nombre completo de un permiso? Escribí el nombre completo del permiso de cámara.
*Respuesta: El prefijo que lleva el nombre completo de un permiso es RECORD_AUDIO (aunque hay varios más), por ejemplo, CAMERA*

c) ¿Qué son los permisos de firma (signature)? ¿Por qué no se usan en apps comunes?
*Respuesta: Un permiso de firma (o signature permission) es un mecanismo de seguridad que otorga permisos automáticamente a una aplicación solo si está firmada con el mismo certificado criptográfico que la aplicación que definió ese permiso. No se usan en apps comunes, ya que están diseñados para ecosistemas cerrados del mismo creador.*

### B3. Leé el manifiesto
a) ¿Qué permisos se conceden solos al instalar y cuáles hay que pedir además en tiempo de ejecución?
*Respuesta: 
Al instalar: INTERNET
Tiempo de ejecución: CAMERA, ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION, POST_NOTIFICATIONS*

b) ¿Qué significa `android:maxSdkVersion="32"`? ¿Qué permisos reemplazan a `READ_EXTERNAL_STORAGE` desde Android 13?
*Respuesta: Significa que el nivel máximo de la API de Android en el que se puede instalar y ejecutar la aplicación es la API 32. Los permisos que reemplazan a READ_EXTERNAL_STORAGE son: READ_MEDIA_IMAGES, READ_MEDIA_VIDEO y READ_MEDIA_AUDIO *

c) ¿Qué hace `tools:node="remove"`? Escribí el fragmento de `app.json` que lo genera.
*Respuesta: La línea elimina un elemento específico que haya sido heredado de una dependencia o librería externa. El fragmento que lo genera es: "blockedPermissions": ["android.permission.RECORD_AUDIO]*

d) Necesitás agregar `SCHEDULE_EXACT_ALARM`, que ninguna librería declara. ¿En qué propiedad de `app.json` va?
*Respuesta: Iría en la propiedad "permissions".*

e) ¿Por qué en Expo no conviene editar este archivo a mano? ¿Funciona `blockedPermissions` en Expo Go?
*Respuesta: Principalmente porque es generado por AndroidManifest.xml, el cual ya maneja el .json, y editarlo puede llevar a mal funcionamiento. blockedPermissions no funciona en Expo Go.*

### B4. Así pregunta Android
a) ¿Se puede poner texto propio dentro del diálogo de Android? Entonces, ¿dónde tenés que explicar para qué usás el permiso?
*Respuesta: En Android se puede poner texto propio, se debe explicar el por qué del permiso al momento de pedirlo. *

b) ¿Qué diferencia hay entre "Mientras la app está en uso" y "Solo esta vez"? ¿Para qué permisos existe esta última opción?
*Respuesta: La primera es un acceso que se mantiene, pero solo si la aplicación está en primer plano, mientras que la segunda revoca los permisos después de salir de la misma.*

c) En Android 11+, ¿qué pasa si la persona toca "No permitir" dos veces? ¿Qué valor toma `canAskAgain`?
*Respuesta: canAskAgain pasa a ser false después del segundo rechazo.*

d) La ubicación aproximada tiene una precisión de unos 3 km². Dá un ejemplo de función que anda bien con ella y otro de una que no.
*Respuesta: Si se utiliza precisión de 3km² entonces android.accuracy debería valer coarse. Si vale fine, entonces la función no funcionaría correctamente.*

e) Si la persona revoca un permiso desde Ajustes mientras la app está abierta, ¿qué hace Android con el proceso de la app?
*Respuesta: Android finaliza el proceso de manera inmediata.*

### B5. Android, versión por versión
**Completá en qué versión apareció cada cambio y qué implica para tu código.**

| Cambio | Versión (API) | Qué implica para el código |
| :--- | :--- | :--- |
| Nacen los permisos en tiempo de ejecución | API 23 | El código debe contemplar que un permiso puede no estar |
| La ubicación en segundo plano pasa a ser un permiso aparte | API 29 | La función requestBackgroundPermissionsAsync(), siempre después del pedido de primer plano |
| Dos rechazos equivalen a "no volver a preguntar" | API 30 | canAskAgain pasa a false después del segundo rechazo |
| Ubicación precisa o aproximada | API 31 | android.accuracy vale "fine" o "coarse" |
| Las notificaciones pasan a ser un permiso (`POST_NOTIFICATIONS`) | API 33 | expo-notifications se usa para solicitar el permiso |
| Acceso parcial a fotos y videos ("Seleccionar fotos") | API 34 | accessPrivileges puede valer "limited" también en Android |
| Permiso de red local (`ACCESS_LOCAL_NETWORK`) | API 36 | Expo SDK 57 ya compila con target API 36 (la versión del cambio) |

¿Qué es el `targetSdkVersion`? ¿A qué API apunta Expo SDK 57 y qué exige Google Play desde el 31 de agosto de 2026?
*Respuesta: Es el target que Google Play exige a apps nuevas y actualizaciones, esto es exigido desde el 31 de agosto de 2026*

---

## Parte C. iOS: textos de propósito y acceso parcial

### C1. Claves del Info.plist
**Escribí la clave que corresponde a cada recurso. Si no lleva clave, indicalo.**

| Recurso | Clave en Info.plist |
| :--- | :--- |
| Cámara | NSCameraUsageDescription |
| Micrófono | NSMicrophoneUsageDescription |
| Ubicación en uso | NSLocationWhenIUseUsageDescription |
| Ubicación siempre | NSLocationAlwaysAndWhenInUseUsageDescription |
| Fotos (leer) | NSPhotoLibraryUsageDescription |
| Fotos (solo guardar) | NSPhotoLibraryAddUsageDescription |
| Contactos | NSContactsUsageDescription |
| Face ID | NSFaceIDUsageDescription |
| Rastreo entre apps (ATT) | NSUserTrackingUsageDescription |
| Notificaciones | No llevan texto, se pide directamente en Info.plist |

### C2. Sin texto, no hay permiso
a) ¿Qué pasa si falta el texto de propósito y la app intenta usar la cámara? ¿Y al subir la build a App Store Connect? Mencioná el código de error.
*Respuesta: Si falta el texto, el acceso falla, con la cámara o las fotos, la app directamente se cierra. Además, App Store Connect rechaza la build*

b) ¿Cuántas veces muestra iOS el diálogo de un permiso? Si la persona dice que no, ¿qué le queda a la app?
*Respuesta: El diálogo aparece una sola vez, después, la decisión solo cambia desde Ajustes*

c) En el diálogo de iOS, ¿qué parte arma el sistema y cuál escribís vos? En Expo, ¿dónde se configura ese texto?
*Respuesta: La parte armada por el sistema es el Título, la parte que escribe el desarrollador es el texto de propósito*

d) Una librería usa una API protegida que tu app nunca llama y Apple rechaza la build. ¿Por qué pasa y cómo se resuelve?
*Respuesta: *

### C3. Probador de textos de propósito
**Evaluá cada texto para `NSLocationWhenInUseUsageDescription` según la pauta 5.1.1 de Apple. Indicá si lo aprobarías y reescribí los que no.**

| Texto propuesto | ¿Aprobado? | Versión mejorada |
| :--- | :--- | :--- |
| "Necesitamos tu ubicación." | No | Usamos tu ubicación para mostrarte las farmacias de turno más cercanas |
| "Para mejorar tu experiencia." | No | Es necesaria para mostrarte las farmacias más cercanas |
| "Usamos tu ubicación para mostrarte las farmacias de turno más cercanas." | Sí | Usamos tu ubicación solo mientras usás la app, para ordenar las famarcias por distancia. No guardamos tu ubicación |
| "La app no funciona sin ubicación." | No | La app requiere de tu ubicación para mostrarte farmacias más cercanas |
| "Ubicación requerida por el sistema." | No | La app requiere de tu ubicación para mostrarte farmacias más cercanas |

### C4. Acceso parcial y gradual
**Para cada caso indicá desde qué versión de iOS existe y qué valor o función de Expo lo detecta o lo pide.**

| Caso | iOS | En Expo |
| :--- | :--- | :--- |
| Fotos limitadas ("Seleccionar fotos") | iOS 14 | accessPrivileges: limited |
| Ubicación aproximada (interruptor "Precisa") | iOS 14 | ios.accuracy: 'reduced' |
| "Permitir una vez" (ubicación) | iOS 13 | Location.requestForegroundPermissions |
| Ubicación escalonada: de "al usar la app" a "Siempre" | iOS 13 | watchPosition |
| Notificaciones provisionales | iOS 12 | provisional: true  |
| Rastreo entre apps (App Tracking Transparency) | iOS 14.5 | expo-tracking-transparency |

¿Qué versión mínima de iOS requiere Expo SDK 57? ¿Qué consecuencia práctica tiene eso sobre la tabla anterior?
*Respuesta: La versión mínima de iOS es iOS 14.5, ya que esta contiene los permisos de fotos limitadas y app tracking transparency, además de los otros permisos de la tabla anterior.*

### C5. Android vs iOS, lado a lado
**Completá la tabla comparativa.**

| | Android | iOS |
| :--- | :--- | :--- |
| **¿Dónde se declara?** | <uses-permission> en el manifiesto | Texto de propósito en Info.plist |
| **Texto en el diálogo** | Lo arma el sistema | Lo escribe el desarrollador | 
| **Oportunidades para preguntar** | Dos rechazos y se bloquea | Una sola |
| **"Solo esta vez" / "Permitir una vez"** | Ubicación cámara y micrófono | Solo ubicación |
| **Notificaciones** | Permiso de tiempo de ejecución | Siempre se piden |
| **Ubicación en segundo plano** | Se concede desde Ajustes | Segundo pedido para pasar a "siempre" |
| **Si falta la declaración** | Se deniega sin mostrar diálogo | Falla o se cierra la app; la tienda rechaza la build |

---

## Parte D. Expo: una API, dos plataformas

### D1. Módulos y funciones
**Indicá qué módulo de Expo y qué hook o función de permiso usarías en cada caso.**

| Necesidad | Módulo | Hook / función de permiso |
| :--- | :--- | :--- |
| Escanear un QR con la cámara | expo-camera | useCameraPermission |
| Grabar video con sonido | expo-camera | useCameraPermission y useMicrophonePermissions |
| Mostrar farmacias cercanas | expo-location | useForegroundPermissions |
| Seguir un envío con la app en segundo plano | expo-location | useBackgroundPermissions |
| Mostrar un recordatorio | expo-notifications | getPermissionsAsync y requestPermissionAsync |
| Grabar una nota de voz | expo-audio | requestRecordingPermissionsAsync |
| Galería propia dentro de la app | expo-image-picker | useMediaLibraryPermissions |
| Publicidad personalizada entre apps (iOS) | expo-tracking-transparency | useTrackingPermissions |

Un tutorial usa `import * as Permissions from 'expo-permissions'`. ¿Qué te dice eso sobre el tutorial?
*Respuesta: expo-permissions ya no existe, si el tutorial lo usa, el mismo está desactualizado*

### D2. Consultar, pedir y el hook
a) ¿Qué diferencia hay entre `get...PermissionsAsync()` y `request...PermissionsAsync()`? ¿Cuál puede mostrar un diálogo?
*Respuesta: get... se usa para consultar, mientras que request... se usa para pedir el permiso. El que muestra el diálogo es request... *

b) El hook devuelve tres elementos. ¿Qué es cada uno? ¿Qué vale permiso en el primer render y qué tiene que mostrar la pantalla mientras tanto?
*Respuesta: status (el estado del permiso), granted (un booleano que muestra si está autorizado o no), canAskAgain (un booleano para mostrar el diálogo o no). En el primer render, permiso es undetermined, y lo que debe mostrar la pantalla es el resultado de canAskAgain.*

c) Si `canAskAgain` es `false`, ¿qué pasa al llamar a `request...()`? ¿Qué problema aparece si se lo llama en un bucle?
*Respuesta: No mostrará la ventana emergente al usuario y devolverá directamente el estado actual del permiso.*

### D3. Leé la respuesta
**Para cada `PermissionResponse`, indicá qué debería hacer la app.**

| Respuesta | Qué hace la app |
| :--- | :--- |
| `null` | El hook todavía está consultando, la app debería mostrar un indicador de carga |
| `{ status: 'granted', granted: true }` | Usar la función |
| `{ status: 'undetermined', canAskAgain: true }` | Explicar el beneficio y ofrecer un botón que llame a pedir |
| `{ status: 'denied', canAskAgain: true }` | Mostrar una alternativa y la opción de volver a intentar |
| `{ status: 'denied', canAskAgain: false }` | Explicar cómo habilitarlo y abrir ajustes con Linking.openSettings() |
| `{ status: 'granted', accessPrivileges: 'limited' }` | Trabajar con la selección y ofrecer ampliarla |
| `{ status: 'granted', android: { accuracy: 'coarse' } }` | Mostrar la ubicación aproximada |

¿Cuáles son los dos campos que deciden casi todo? ¿Qué pregunta responde cada uno?
*Respuesta: Los campos que deciden casi todo son granted, el cual pregunta si debería usar el permiso; y canAskAgain, el cual pregunta si debería pedir el permiso o mandar a usuario a ajustes.*

### D4. Simulación del ciclo completo
**Android 14, app recién instalada, `expo-location`. Escribí el estado después de cada paso.**

| # | Acción | status | canAskAgain | ¿Diálogo? |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `getForegroundPermissionsAsync()` | undetermined | true | Sí |
| 2 | `requestForegroundPermissionsAsync()` → "No permitir" | undetermined | true | Sí |
| 3 | `requestForegroundPermissionsAsync()` → "No permitir" | undetermined | true | Sí |
| 4 | `requestForegroundPermissionsAsync()` | undetermined | true | Sí |
| 5 | habilita `Linking.openSettings()` → "Mientras la app está en uso" → vuelve y la app consulta | granted | true | Sí |
| 6 | Igual que el 5, pero la app no vuelve a consultar: ¿qué muestra? | granted | false | No |

Repetí los pasos 1 a 4 en iOS. ¿En qué paso cambia el resultado y por qué? ¿Qué pasa en iOS si la persona elige "Permitir una vez" y después cierra y reabre la app?
*Respuesta: Cambia al No Permitir, ya que iOS pregunta una sola vez y si el usuario elige NO Permitir, se bloquea el permiso y lo manda a ajustes para poder configurarlo. Si el usuario elige permitir una vez, seguido de cerrar y abrir la app, la misma vuelve a consultar por el permiso.*

### D5. Configurar app.json
Escribí el bloque `expo.plugins` (y lo que haga falta en `expo.android`) para una app que:
- lee códigos QR con la cámara pero no graba video (sin micrófono en iOS y sin `RECORD_AUDIO` en Android);
- usa la ubicación solo en primer plano para mostrar puntos de reciclaje cercanos;
- no debe tener `SYSTEM_ALERT_WINDOW` en el manifiesto final.

*Respuesta: 
{
  "expo": {
    "name": "Farmacias Ya",
    "plugins": [
      ["expo-camera", {
        "cameraPermission": "Usamos la cámara para leer el QR de tu receta.",
        "microphonePermission": false,
        "recordAudioAndroid": false
      }],
      ["expo-location", {
        "locationWhenInUsePermission": "Usamos tu ubicación para mostrarte las farmacias de turno más cercanas."
      }],
      "expo-notifications"
    ]
  }
}
*

¿Por qué `expo-camera` agrega `RECORD_AUDIO` en Android aunque la app no grabe sonido?
*Respuesta: Se agrega porque ya lo trae el plugin interno del framework.*

### D6. Expo Go no es tu app
a) ¿Por qué tus textos de propósito no aparecen cuando probás en Expo Go?
*Respuesta: No aparecen porque los diálogos son los de Expo Go.*

b) ¿Qué se puede probar en Expo Go y qué necesita una development build? Pensá en push en Android y en ubicación en segundo plano.
*Respuesta: En expo go no se puede probar las notificaciones push en Adroid, y requieren de una development build.*

c) Escribí los comandos para ver los archivos nativos generados y para compilar una development build en Android.
*Respuesta: npx expo prebuild --clean, npx expo run:android, eas build --profile development --platform ios*

d) ¿Cómo volvés un permiso a "sin decidir" sin reinstalar, en Android (adb) y en el simulador de iOS (xcrun simctl)?
*Respuesta: Desinstalar y reinstalar la app es la forma confiable de volver a "sin decidir". Aplica para las dos plataformas.*

---

## Parte E. Recetas: leer y corregir código

### E1. Encontrá los errores (cámara)
Escribí la versión corregida del componente `Escanear` con los cuatro estados (cargando → concedido → preguntable → bloqueado).

*Respuesta (Código corregido):
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Linking } from 'react-native';
// Cargando y Explicacion son componentes propios de la app

export default function Escanear() {
  const [permiso, pedirPermiso] = useCameraPermissions();
  const abrirAjustes = () => Linking.openSettings();

  if (!permiso) return <Cargando />; // 1. todavía consultando

  if (permiso.granted) {             // 2. concedido
    return <CameraView style={{ flex: 1 }} facing="back" />;
  }

  if (permiso.canAskAgain) {         // 3. se puede pedir
    return (
      <Explicacion texto="Usamos la cámara para leer el QR de tu receta.">
        <Button title="Continuar" onPress={pedirPermiso} />
      </Explicacion>
    );
  }

  return (                           // 4. bloqueado: solo Ajustes
    <Explicacion texto="La cámara está desactivada para esta app.">
      <Button title="Abrir Ajustes" onPress={abrirAjustes} />
    </Explicacion>
  );
}
*

### E2. El orden importa (ubicación)
a) ¿Qué está mal en el código `activarSeguimiento()`? ¿Qué ocurre en iOS y qué ocurre en Android 11+?
*Respuesta: Location.requestBackgroundPermissionsAsync() fallará o no se compartará correctamente en iOS debido a cómo se maneja el flujo de permisos.*

b) Reescribí la función correctamente.
*Respuesta:
export async function activarSeguimiento() {
  // 1. Verificar si ya tenemos permiso en primer plano
  const primerPlanoStatus = await Location.getForegroundPermissionsAsync();
  
  // Si no está concedido, lo solicitamos
  if (primerPlanoStatus.status !== 'granted') {
    const solicitarPrimerPlano = await Location.requestForegroundPermissionsAsync();
    if (solicitarPrimerPlano.status !== 'granted') return false;
  }

  // 2. Verificar si ya tenemos permiso en segundo plano
  const segundoPlanoStatus = await Location.getBackgroundPermissionsAsync();
  
  // Si no está concedido, lo solicitamos
  if (segundoPlanoStatus.status !== 'granted') {
    const solicitarSegundoPlano = await Location.requestBackgroundPermissionsAsync();
    return solicitarSegundoPlano.status === 'granted';
  }

  return true;
}
*

c) Escribí `obtenerUbicacion()` para que devuelva las coordenadas y un booleano aproximada que contemple Android (`accuracy`) e iOS (`accuracy`). Si se deniega, debe devolver `null` sin romper la app.
*Respuesta:
export async function obtenerUbicacion() {
  const permiso = await Location.requestForegroundPermissionsAsync();
  if (!permiso.granted) return null; // la app sigue: búsqueda manual

  const aproximada =
    permiso.android?.accuracy === 'coarse' ||
    permiso.ios?.accuracy === 'reduced';

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return { ...coords, aproximada };
}
*

d) ¿Hace falta segundo plano para "farmacias cercanas"? ¿Qué exige Google Play si lo pedís?
*Respuesta: Para "farmcias cercanas" alcanza con primer plano. Google Play exige una declaración especial para ello.*

### E3. Notificaciones mudas
a) ¿Cuál es la causa más probable de que en Android 14 no aparezca el diálogo al llamar `requestPermissionsAsync()`? ¿Qué hay que hacer antes de pedir el permiso?
*Respuesta: El permiso POST_NOTIFICATIONS es la causa más probable de que no aparezca el diálogo, ya que expo indica que el diálogo no aparece hasta que exista al menos un canal.*

b) ¿Qué pasa con este permiso en Android 12 o anterior?
*Respuesta: Las notificaciones vienen habilitadas y el pedido responde sin diálogo.*

c) ¿Qué opción de iOS permite recibir notificaciones sin diálogo? ¿Cómo detectás en código ese estado?
*Respuesta: allowProvisional: true, la cual permite obtener notificaciones silenciosas sin diálogo.*

d) ¿En qué momento conviene pedir este permiso? Dá un ejemplo de buen y de mal momento.
*Respuesta: Conviene pedirlo después de una acción con sentido, por ejemplo "notificar cuando el pedido esté listo", un mal uso sería hacerlo cuando se abre la app por primera vez.*

### E4. Fotos sin pedir permiso
**Completá la tabla:**

| Necesidad | Herramienta | Permiso |
| :--- | :--- | :--- |
| Elegir una foto de perfil | ImagePicker.launchImageLibraryAsync | Ninguno |
| Sacar una foto en el momento | ImagePicker.launchCameraAsync | Cámara |
| Editor que muestra toda la galería | expo-media-library | Fotos |
| Adjuntar la foto de un comprobante | expo-media-library | Fotos (limitado) |

¿Por qué Google Play restringe `READ_MEDIA_IMAGES` y `READ_MEDIA_VIDEO`? ¿Desde cuando? ¿Qué es "el mejor permiso"?
*Respuesta: Google Play restringe estos permisos por cuestiones de privacidad y seguridad de los usuarios, para que las apps no tengan acceso permanente a las fotos y videos de los usuarios. El mejor permiso es el que no se tiene que pedir.*

### E5. Volver de Ajustes
**Completá los espacios del hook y respondé.**
a) ¿Por qué los hooks de Expo no se enteran solos de que el permiso cambió en Ajustes?
*Respuesta: Cuando una app manda a un usuario a ajustes, la app queda en segundo plano, y al volver, el permiso pudo haber sufrido un cambio.*

b) ¿Qué función del hook de cámara le pasarías a `useRevisarAlVolver`?
*Respuesta: *

c) ¿Por qué no conviene guardar el estado del permiso en un store global "para siempre"?
*Respuesta:*

---

## Parte F. Buenas prácticas y tiendas

### F1. Pedir en contexto
**Indicá el momento justo para pedir cada permiso y la alternativa si la persona dice que no.**

| App y permiso | ¿Cuándo pedirlo? | Alternativa si lo deniegan |
| :--- | :--- | :--- |
| Delivery / ubicación | | |
| Billetera virtual / cámara | | |
| Red social / contactos | | |
| Mensajería / micrófono | | |
| Turnos médicos / notificaciones | | |
| Editor de fotos / galería completa| | |

¿Por qué pedir cuatro permisos apenas se abre la app "entrena el No permitir automático"?
*Respuesta:*

### F2. La pantalla previa
a) ¿Qué tres elementos tiene una buena pantalla previa al diálogo del sistema?
*Respuesta:*

b) ¿Por qué el botón debe decir "Continuar" y no "Permitir"?
*Respuesta:*

c) ¿Qué dice la pauta 5.1.1(iv) de Apple sobre botones como "Ahora no" o "Cerrar" en esa pantalla?
*Respuesta:*

d) ¿Cómo cambia la pantalla si el permiso ya está bloqueado?
*Respuesta:*

### F3. Mínimo privilegio
**Para cada caso elegí la opción más chica que alcanza y justificá.**
a) Ubicación precisa o aproximada para "puntos de reciclaje de tu barrio".
*Respuesta:*

b) Ubicación "en uso" o "siempre" para "registrar una carrera con el celular en el bolsillo".
*Respuesta:*

c) Selector del sistema o permiso de galería para "subir la foto del DNI".
*Respuesta:*

d) `expo-camera` con o sin micrófono para "escanear el QR del aula".
*Respuesta:*

### F4. Tiendas
a) Nombrá dos requisitos de Google Play y dos de App Store relacionados con permisos y privacidad.
*Respuesta:*

b) ¿Qué es el manifiesto de privacidad (`PrivacyInfo.xcprivacy`) y dónde se configura en Expo?
*Respuesta:*

c) ¿Qué suma Android 17 y qué va a exigir Google Play desde el 27/01/2027 a las apps que hoy piden `READ_CONTACTS`?
*Respuesta:*

### F5. Errores comunes
**Para cada situación explicá la causa y la solución:**
a) La consola de Xcode muestra: "This app has crashed because it attempted to access privacy-sensitive data without a usage description."
*Respuesta:*

b) "En Expo Go anda, en la build no": en la development build la cámara se deniega sin mostrar ningún diálogo.
*Respuesta:*

c) Después de habilitar la ubicación en Ajustes, la app sigue diciendo "bloqueado".
*Respuesta:*

d) La pantalla queda en "Pidiendo permiso..." para siempre porque el código llama a `request...()` cada vez que se renderiza.
*Respuesta:*

e) Una app de turnos no permite entrar a ninguna pantalla si se deniegan las notificaciones.
*Respuesta:*