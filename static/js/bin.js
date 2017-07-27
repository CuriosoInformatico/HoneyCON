
let bin  = {

  ls : {
    options: {
      '': function(){return 'Listado'},
      '-a': function(){return 'folders'},
      '-l': function(){},
      '-la': function(){}}
  },
  cat : {
    options: {}
  },
  clear: {
    options: {'': function(app){app.cmds = []}}
  }

};
