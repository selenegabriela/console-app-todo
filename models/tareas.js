const Tarea = require("./tarea");
require('colors');


class Tareas {
  _listado = {};

  get listadoArr(){

    const listado = []
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea)
    });

    return listado;
  }

  constructor(){
    this._listado = {}
  }

  borrarTarea(id = '') {
    delete this._listado[id];
  }

  cargarTareasFromArray(tareas = []){
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(){

    console.log();
    this.listadoArr.forEach((tarea, i) => {
      
      const idx = `${i + 1}.`.green;
      const idxRed = `${i + 1}.`.red;
      const { completadoEn, desc } = tarea;
      const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;

      console.log(`${completadoEn ? idx : idxRed} ${desc} :: ${estado}`);
    });

  };

  listarPendientesCompletadas( completadas = true){

    let contador = 0;
    let contadorString = '';
    console.log();
    this.listadoArr.forEach((tarea) => {
      const estado = !tarea.completadoEn && 'Pendiente'.red;
      
      if(completadas && tarea.completadoEn) {
        contador += 1;
        contadorString = contador.toString();
        console.log(`${contadorString.green}${'.'.green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
      } else if(!completadas && !tarea.completadoEn){
        contador += 1;
        contadorString = contador.toString();
        console.log(`${contadorString.red}${'.'.red} ${tarea.desc} :: ${estado}`);
      }

    });

  }

  toggleCompletadas( ids = [] ) {
    ids.forEach( id => {
      const tarea = this._listado[id];
      !tarea.completadoEn ? tarea.completadoEn = new Date().toISOString() : null;
      console.log(tarea);
    });

    this.listadoArr.forEach( tarea => {
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;