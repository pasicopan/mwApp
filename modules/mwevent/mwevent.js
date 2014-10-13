/*
mwevent.js
 */
define(function(require,exports){

    function MWEvent(){
      var that = this;
      that.__listener__ = {};
    }
    MWEvent.prototype = {
      addEvent:function(a_s,a_callback){
        var that = this;
        console.log('addEvent ',a_s)
        try{
          if(!that.__listener__[a_s]){
            that.__listener__[a_s] = [a_callback];
          }else{
            that.__listener__[a_s].push(a_callback);
          }
          return true;
        } catch(e) {}
        return false;
      },
      // search from last ele
      removeEvent:function(a_s,a_callback){
        var that = this;
        if(that.__listener__[a_s]){
          var _i = that.__listener__[a_s].length;
          while(_i--){
            if(a_callback === that.__listener__[a_s][_i]){
              that.__listener__[a_s].splice(_i,1);
              return true;
            }
          }
        }
        return false;
      },
      trigger:function(a_s,a_o){
        var that = this;
        console.log('trigger ',a_s)
        // console.log('that.__listener__ is:',that.__listener__)
        // try{
          if(that.__listener__[a_s]){
            var _i = 0;
            var _len = that.__listener__[a_s].length;
            while(_i<_len){
              if($.isFunction(that.__listener__[a_s][_i] ) ){
                // console.log('that.__listener__[a_s] :',that.__listener__[a_s])
                that.__listener__[a_s][_i](a_o);
                
              }
              _i++;
            }
            return true;
          }
        // } catch(e) {
        //   console.warn('trigger error:',e.message)
        // }
        return false;
      }
    }
    
  return new MWEvent();
  // exports.mwevent = new MWEvent();
})