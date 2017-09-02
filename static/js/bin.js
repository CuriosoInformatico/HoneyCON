
"use strict";

/*
  HoneyLinux Alfa 0.1
  Desarrollado para HoneyCON 3Edición.
  Samuel López Saura
  @elchicodepython
*/

class System{
  constructor(filesystem){
    this.history = [];
    this.bin = {};
    this.filesystem = filesystem;
  }

  add_binary(name, binary){
    this.bin[name] = binary;
    this.bin[name].install(this.filesystem);
  }

}


class Binary{

  constructor(options, globals){

    this.options = [];

    // Pasamos las variables globales a un scope global
    for (let global in globals){
      this[global] = globals[global];
    }

    for (let method in options){
      this.options.push(method);
      this[method] = options[method];
    }
  }

  install(filesystem){
    this.filesystem = filesystem;
  }

}

class FileSystem{

  constructor(tree){
      this.tree = tree;
    }

    get_cwd(){
        return this.cwd || this.tree;
    }
}

class Folder{
  constructor(name, folders, files){
    this.name = name;
    this.folders = folders || [];
    this.files = files || [];
  }

  appendFolder(folder){
    this.folders.push(folder);
  }

  appendFile(file){
    this.files.push(file);
  }
}


class File{
  constructor(name, content){
    this.name = name;
    this.content = content;
  }
}

let ls = new Binary(
  { // Opciones llamables
      '': function(){

        let cwd = this.filesystem.get_cwd();
        
        let folders = cwd.folders;
        let files = cwd.files;
        
        let folder_names = [];
        let file_names = [];

        for (let folder of folders){
            folder_names.push(`<span class="folder">${folder.name}</span>`);
        }

        for (let file of files){
            file_names.push(`<span class="file">${file.name}</span>`);
        }

        console.log(folder_names);
        console.log(file_names);
        return folder_names.join(' ') + ' ' + file_names.join(' ');
      },
      '-a': function(){return 'folders'},
      '-l': function(){},
      '-la': function(){}
    },
    { // Métodos
      list_dir(params){
        if (params.view_hidden){

        }
      }
    }

  );

let clear = new Binary(
  {'': function(app){app.cmds = []}}
);


let cd = new Binary(
{
  '*': function(app, path){
      let path_parts = path.split('/');
      let cwd = this.filesystem.get_cwd();
      let tmp_dir;
      if (path_parts[0] != ''){ // no es absoluta
        tmp_dir = cwd;
      }
      else{
        tmp_dir = this.filesystem.tree;
        path_parts = path_parts.splice(1);
      }

        for (let part of path_parts){
          let found = false;
          for (let folder of tmp_dir.folders){
            if (folder.name == part){
                tmp_dir = folder;
                console.log(tmp_dir);
                found = true;
                break;
            }
          }
          if (!found){
            return 'La ruta especificada no existe';
          }
        }
        this.filesystem.cwd = tmp_dir;
      
  }
}

);

let cat = new Binary(
{
  '*': function(app, name){

      let cwd = this.filesystem.get_cwd();
      let content = 'El fichero no existe';
      
      for (let file of cwd.files){
        if (file.name == name){
          content = file.content;
          break;
        }
      }
      return content;
  }
}
);



let root = new Folder('/');
let home = new Folder('home');
let ponentes = new Folder('ponentes');
let jueves = new Folder('jueves');
let viernes = new Folder('viernes');
let sabado = new Folder('sabado');


let patrocinadores = new File('patrocinadores.txt', '<h3>Patrocinadores</h3><hr/>Patro1<br/>Patro2<br/><hr/>');
let samuellopez = new File('18:00 "Ahora me ves" La magia del Tracking Web<br/>', '');


root.appendFolder(home);
root.appendFile(patrocinadores);
home.appendFolder(ponentes);

for (let day of [jueves, viernes, sabado]){
  ponentes.appendFolder(day);
}

jueves.appendFile(samuellopez);


let fs = new FileSystem(root);


let honeyLinux = new System(fs);
honeyLinux.add_binary('ls', ls);
honeyLinux.add_binary('clear', clear);
honeyLinux.add_binary('cd', cd);
honeyLinux.add_binary('cat', cat);