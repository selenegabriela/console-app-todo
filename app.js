require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

  const tareas = new Tareas();
  const tareasDB = leerDB();

  
  if(tareasDB){
    tareas.cargarTareasFromArray(tareasDB)
  }

  let opt = '';
  do {
    
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;
        case '2':
          tareas.listadoCompleto();
        break;
        case '3':
          tareas.listarPendientesCompletadas(true);
        break;
        case '4':
          tareas.listarPendientesCompletadas(false);
        break;
        case '5':
          const ids = await mostrarListadoCheckList(tareas.listadoArr);
          console.log(ids);
          tareas.toggleCompletadas(ids);
        break;
        case '6':
          const id = await listadoTareasBorrar(tareas.listadoArr);
          if(id.toString() !== '0') {
            const ok = await confirmar('¿Estás seguro?');
            if ( ok ) {
              tareas.borrarTarea(id);
              console.log('Tarea borrada');
            }
          }
        break;
        }
      guardarDB(tareas.listadoArr);

    if(opt !== '0') await pausa();

  } while (opt !== '0');


}

main();