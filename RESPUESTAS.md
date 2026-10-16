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
| Ubicación precisa o aproximada | | |
| Las notificaciones pasan a ser un permiso (`POST_NOTIFICATIONS`) | | |
| Acceso parcial a fotos y videos ("Seleccionar fotos") | | |
| Permiso de red local (`ACCESS_LOCAL_NETWORK`) | | |

¿Qué es el `targetSdkVersion`? ¿A qué API apunta Expo SDK 57 y qué exige Google Play desde el 31 de agosto de 2026?
*Respuesta:*

---

## Parte C. iOS: textos de propósito y acceso parcial

### C1. Claves del Info.plist
**Escribí la clave que corresponde a cada recurso. Si no lleva clave, indicalo.**

| Recurso | Clave en Info.plist |
| :--- | :--- |
| Cámara | |
| Micrófono | |
| Ubicación en uso | |
| Ubicación siempre | |
| Fotos (leer) | |
| Fotos (solo guardar) | |
| Contactos | |
| Face ID | |
| Rastreo entre apps (ATT) | |
| Notificaciones | |

### C2. Sin texto, no hay permiso
a) ¿Qué pasa si falta el texto de propósito y la app intenta usar la cámara? ¿Y al subir la build a App Store Connect? Mencioná el código de error.
*Respuesta:*

b) ¿Cuántas veces muestra iOS el diálogo de un permiso? Si la persona dice que no, ¿qué le queda a la app?
*Respuesta:*

c) En el diálogo de iOS, ¿qué parte arma el sistema y cuál escribís vos? En Expo, ¿dónde se configura ese texto?
*Respuesta:*

d) Una librería usa una API protegida que tu app nunca llama y Apple rechaza la build. ¿Por qué pasa y cómo se resuelve?
*Respuesta:*

### C3. Probador de textos de propósito
**Evaluá cada texto para `NSLocationWhenInUseUsageDescription` según la pauta 5.1.1 de Apple. Indicá si lo aprobarías y reescribí los que no.**

| Texto propuesto | ¿Aprobado? | Versión mejorada |
| :--- | :--- | :--- |
| "Necesitamos tu ubicación." | | |
| "Para mejorar tu experiencia." | | |
| "Usamos tu ubicación para mostrarte las farmacias de turno más cercanas." | | |
| "La app no funciona sin ubicación." | | |
| "Ubicación requerida por el sistema." | | |

### C4. Acceso parcial y gradual
**Para cada caso indicá desde qué versión de iOS existe y qué valor o función de Expo lo detecta o lo pide.**

| Caso | iOS | En Expo |
| :--- | :--- | :--- |
| Fotos limitadas ("Seleccionar fotos") | | |
| Ubicación aproximada (interruptor "Precisa") | | |
| "Permitir una vez" (ubicación) | | |
| Ubicación escalonada: de "al usar la app" a "Siempre" | | |
| Notificaciones provisionales | | |
| Rastreo entre apps (App Tracking Transparency) | | |

¿Qué versión mínima de iOS requiere Expo SDK 57? ¿Qué consecuencia práctica tiene eso sobre la tabla anterior?
*Respuesta:*

### C5. Android vs iOS, lado a lado
**Completá la tabla comparativa.**

| | Android | iOS |
| :--- | :--- | :--- |
| **¿Dónde se declara?** | | |
| **Texto en el diálogo** | | |
| **Oportunidades para preguntar** | | |
| **"Solo esta vez" / "Permitir una vez"** | | |
| **Notificaciones** | | |
| **Ubicación en segundo plano** | | |
| **Si falta la declaración** | | |

---

## Parte D. Expo: una API, dos plataformas

### D1. Módulos y funciones
**Indicá qué módulo de Expo y qué hook o función de permiso usarías en cada caso.**

| Necesidad | Módulo | Hook / función de permiso |
| :--- | :--- | :--- |
| Escanear un QR con la cámara | | |
| Grabar video con sonido | | |
| Mostrar farmacias cercanas | | |
| Seguir un envío con la app en segundo plano | | |
| Mostrar un recordatorio | | |
| Grabar una nota de voz | | |
| Galería propia dentro de la app | | |
| Publicidad personalizada entre apps (iOS) | | |

Un tutorial usa `import * as Permissions from 'expo-permissions'`. ¿Qué te dice eso sobre el tutorial?
*Respuesta:*

### D2. Consultar, pedir y el hook
a) ¿Qué diferencia hay entre `get...PermissionsAsync()` y `request...PermissionsAsync()`? ¿Cuál puede mostrar un diálogo?
*Respuesta:*

b) El hook devuelve tres elementos. ¿Qué es cada uno? ¿Qué vale permiso en el primer render y qué tiene que mostrar la pantalla mientras tanto?
*Respuesta:*

c) Si `canAskAgain` es `false`, ¿qué pasa al llamar a `request...()`? ¿Qué problema aparece si se lo llama en un bucle?
*Respuesta:*

### D3. Leé la respuesta
**Para cada `PermissionResponse`, indicá qué debería hacer la app.**

| Respuesta | Qué hace la app |
| :--- | :--- |
| `null` | |
| `{ status: 'granted', granted: true }` | |
| `{ status: 'undetermined', canAskAgain: true }` | |
| `{ status: 'denied', canAskAgain: true }` | |
| `{ status: 'denied', canAskAgain: false }` | |
| `{ status: 'granted', accessPrivileges: 'limited' }` | |
| `{ status: 'granted', android: { accuracy: 'coarse' } }` | |

¿Cuáles son los dos campos que deciden casi todo? ¿Qué pregunta responde cada uno?
*Respuesta:*

### D4. Simulación del ciclo completo
**Android 14, app recién instalada, `expo-location`. Escribí el estado después de cada paso.**

| # | Acción | status | canAskAgain | ¿Diálogo? |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `getForegroundPermissionsAsync()` | | | |
| 2 | `requestForegroundPermissionsAsync()` → "No permitir" | | | |
| 3 | `requestForegroundPermissionsAsync()` → "No permitir" | | | |
| 4 | `requestForegroundPermissionsAsync()` | | | |
| 5 | habilita `Linking.openSettings()` → "Mientras la app está en uso" → vuelve y la app consulta | | | |
| 6 | Igual que el 5, pero la app no vuelve a consultar: ¿qué muestra? | | | |

Repetí los pasos 1 a 4 en iOS. ¿En qué paso cambia el resultado y por qué? ¿Qué pasa en iOS si la persona elige "Permitir una vez" y después cierra y reabre la app?
*Respuesta:*

### D5. Configurar app.json
Escribí el bloque `expo.plugins` (y lo que haga falta en `expo.android`) para una app que:
- lee códigos QR con la cámara pero no graba video (sin micrófono en iOS y sin `RECORD_AUDIO` en Android);
- usa la ubicación solo en primer plano para mostrar puntos de reciclaje cercanos;
- no debe tener `SYSTEM_ALERT_WINDOW` en el manifiesto final.

*Respuesta:*

¿Por qué `expo-camera` agrega `RECORD_AUDIO` en Android aunque la app no grabe sonido?
*Respuesta:*

### D6. Expo Go no es tu app
a) ¿Por qué tus textos de propósito no aparecen cuando probás en Expo Go?
*Respuesta:*

b) ¿Qué se puede probar en Expo Go y qué necesita una development build? Pensá en push en Android y en ubicación en segundo plano.
*Respuesta:*

c) Escribí los comandos para ver los archivos nativos generados y para compilar una development build en Android.
*Respuesta:*

d) ¿Cómo volvés un permiso a "sin decidir" sin reinstalar, en Android (adb) y en el simulador de iOS (xcrun simctl)?
*Respuesta:*

---

## Parte E. Recetas: leer y corregir código

### E1. Encontrá los errores (cámara)
Escribí la versión corregida del componente `Escanear` con los cuatro estados (cargando → concedido → preguntable → bloqueado).

*Respuesta (Código corregido):*

### E2. El orden importa (ubicación)
a) ¿Qué está mal en el código `activarSeguimiento()`? ¿Qué ocurre en iOS y qué ocurre en Android 11+?
*Respuesta:*

b) Reescribí la función correctamente.
*Respuesta:*

c) Escribí `obtenerUbicacion()` para que devuelva las coordenadas y un booleano aproximada que contemple Android (`accuracy`) e iOS (`accuracy`). Si se deniega, debe devolver `null` sin romper la app.
*Respuesta:*

d) ¿Hace falta segundo plano para "farmacias cercanas"? ¿Qué exige Google Play si lo pedís?
*Respuesta:*

### E3. Notificaciones mudas
a) ¿Cuál es la causa más probable de que en Android 14 no aparezca el diálogo al llamar `requestPermissionsAsync()`? ¿Qué hay que hacer antes de pedir el permiso?
*Respuesta:*

b) ¿Qué pasa con este permiso en Android 12 o anterior?
*Respuesta:*

c) ¿Qué opción de iOS permite recibir notificaciones sin diálogo? ¿Cómo detectás en código ese estado?
*Respuesta:*

d) ¿En qué momento conviene pedir este permiso? Dá un ejemplo de buen y de mal momento.
*Respuesta:*

### E4. Fotos sin pedir permiso
**Completá la tabla:**

| Necesidad | Herramienta | Permiso |
| :--- | :--- | :--- |
| Elegir una foto de perfil | | |
| Sacar una foto en el momento | | |
| Editor que muestra toda la galería | | |
| Adjuntar la foto de un comprobante | | |

¿Por qué Google Play restringe `READ_MEDIA_IMAGES` y `READ_MEDIA_VIDEO`? ¿Desde cuando? ¿Qué es "el mejor permiso"?
*Respuesta:*

### E5. Volver de Ajustes
**Completá los espacios del hook y respondé.**
a) ¿Por qué los hooks de Expo no se enteran solos de que el permiso cambió en Ajustes?
*Respuesta:*

b) ¿Qué función del hook de cámara le pasarías a `useRevisarAlVolver`?
*Respuesta:*

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