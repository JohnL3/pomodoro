Vue.component('timer',{
  template:'<span></span>'
});
new Vue({
  el:'#root',
  data:{
    color:'color',
    nocolor:'no-color',
    sessionTime:'0',
    displaySessionTime:'00:00',
    displayBreakTime:'00:00',
    breakTime:'0',
    resetBreak:'',
    resetSession:'',
    start:'',
    sessionTimer: true,
    timerRunning: false,
    label: 'Session Time',
    count: 0
  },
	methods:{
		updateTime() {
		 
		   let time, totalSec = 0;
		   
		  		if(this.sessionTimer === true) {
		  		  this.label = 'Session Time';
		  		  this.count = 0;
		  		  this.displayBreakTime = this.resetBreak.toString().toHHMMSS();
		  		  time = this.displaySessionTime;
		        totalSec = this.deductTime(time);
		        this.displaySessionTime = totalSec.toString().toHHMMSS();
		      if(totalSec < 0) this.sessionTimer = false;
		  		}
		  		  if(this.sessionTimer === false) {
		  		    this.label = 'Break   Time';
		  		    this.displaySessionTime = this.resetSession.toString().toHHMMSS();
		  		    time = this.displayBreakTime;
		            if(this.count === 0){
		              totalSec = this.breakTime;
		              this.count++;
		            } else {
		                totalSec = this.deductTime(time);
		              }
		          this.displayBreakTime = totalSec.toString().toHHMMSS();
		            if(totalSec < 0) this.sessionTimer = true,this.label = 'Session Time';
		  		}
		},
		setSession(){
		  
			this.displaySessionTime = this.sessionTime;
			this.displaySessionTime = this.displaySessionTime.toString().toHHMMSS();
			this.resetSession = this.sessionTime;
		},
	  startTimers(){
	    let self = this;
	    if(this.timerRunning === false && this.sessionTime != '0') {
	    this.start = setInterval(function(){self.updateTime();},1000);
	    this.timerRunning = true;
	    }
	  },
	  pauseTimers(){
	    if(this.timerRunning === true) {
	    clearInterval(this.start);
	    this.timerRunning = false;
	    }
	  },
	  setBreak(){
			this.displayBreakTime = this.breakTime;
			this.displayBreakTime = this.displayBreakTime.toString().toHHMMSS();
			this.resetBreak = this.breakTime;
		},
		deductTime(time){
		  time = time.split(/[.:]/);
      var min = +time[0],
          sec = +time[1],
          totalSec;
   
     if(min >0) min= min*60;
     totalSec = min + sec;
     totalSec -=1;
     return totalSec;
		}
		
	  }

});

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
};