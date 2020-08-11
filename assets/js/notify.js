var Notify = function(){
  var focus = true;

  window.onblur = function(){  
    focus = false;
  }

  window.onfocus = function(){  
    focus = true;
  }

  this.init = function(){
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
  }

  this.push = function(info){
    new Audio('/notify.mp3').play()

    if(focus) {
      $('.container > .toast')
        .text('Someone mentions you')
        .show();

      window.setTimeout(function(){
        $('.container > .toast').fadeOut()
      }, 2200)

    } else {
      if (window.Notification && Notification.permission === "granted") {
        return new Notification(info.to + ", Someone mentions you", {
          tag: 'mention-notify',
          body: info.from + '::' + info.roomId + ': ' + info.msg,
          icon: '/favicon.png'
        })
      }
      
    }
  }

}
