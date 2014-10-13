/*
mwclock.js
 */
define(function() {

	var clockCallback;

	var startTime = new Date().getTime();
	var count = 0;
	// setInterval(function(){
	//     var i = 0;
	//     while(i++ < 100000000);
	// }, 0);
	function fixed() {
		if(clockCallback) clockCallback();
	    count++;
	    var offset = new Date().getTime() - (startTime + count * 1000);
	    var nextTime = 1000 - offset;
	    if (nextTime < 0) nextTime = 0;
	    setTimeout(fixed, nextTime);
	     
	    // console.log('offset is:',offset);
	    // console.log(new Date().getTime() - (startTime + count * 1000));
	}
	setTimeout(fixed, 1000);
	function _setIntervalPerSecond(a_f){
		var that = this;
		if($.isFunction(a_f)){
			clockCallback = function(){
				a_f.call(that)
			};
		}else{
			console.warn('_setIntervalPerSecond argument is not a function')
		}
	}

	return {setIntervalPerSecond:_setIntervalPerSecond}
})