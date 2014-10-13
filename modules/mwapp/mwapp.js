
define(['require','exports','modules/mwevent/mwevent.js','modules/mwevent/mwevent.js','modules/mwtimeline/mwtimeline.js'],function(require,exports,mwevent,mwcommunicate,mwtimeline){
 

  function MWApp(){
    var that = this;
    store.set('maiwang_openid', '');
  }

  MWApp.prototype = {
    restore:function(){

    },
    setTask:function(){
      
      mwcommunicate.trigger('getTask',{callback:function(data){
        if(data.questionLis){

        }
      }});

    }
  }

  mwevent.addEvent('setTask',function(a_options) {
      mwapp = mwapp || new MWApp();
      // console.log('mwalert_show:',a_options.msg)
      mwapp.setTask(a_options);
      return;
  });


}) 
 