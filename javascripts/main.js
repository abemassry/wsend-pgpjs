$(document).ready(function() {
  function loginUser(uid) {
    $.ajax({
      type: "POST",
      data: "uid="+uid,
      url: "/loginuser",
      dataType: "text",
      success: function(msg)
      {
        if (msg) {
          if (msg === 'unregistered' || msg === 'account not found' || msg === 'unknown' || msg === 'could not log in user') {
            // dont do anything
          } else {
            var usernameDisplay = msg.toString();
            $('li.dropdown#fat-menu').html('\
            <a href="#" id="drop3" role="button" data-toggle="dropdown" class="dropdown-toggle">'+usernameDisplay+' <b class="caret"></b></a>\
            <ul role="menu" aria-labelledby="drop3" class="dropdown-menu">\
              <li role="presentation"><a role="menuitem" tabindex="-1" href="/profile">Profile</a></li>\
                <li role="presentation"><a role="menuitem" tabindex="-1" href="/logout" onclick="logoutOfSite()">Logout</a></li>\
                </ul>');
          }
        }
      }
    });


  }
  function registerInfoMessage() {
    $('#info-box').append('<div class="alert alert-info" id="info-area"></div>');
    $('#info-area').append('Registration is free and comes with 2GB of storage space');
    $('#info-area').append('<br />');
    $('#info-area').append('unregistered accounts are limited to 200MB');
    $('#info-area').append('<br />');
    $('#info-area').append('<a href="/register" class="text-warning" target="_blank">Sign up now!</a>');
    
  }
  function freeInfoMessage() {
    $('#info-box').append('<div class="alert alert-info" id="info-area"></div>');
    $('#info-area').append('Free accounts are limited to 2GB');
    $('#info-area').append('<br />');
    $('#info-area').append('<a href="/profile/account/" class="text-warning" target="_blank">Purchase space</a> and get up to 10GB files');
  }


  if (supports_html5_storage() !== false) {

      if (typeof user_id !== "undefined") {
        localStorage["account_created"] = 1;
        localStorage[".id"] = user_id;
        if (localStorage["account_created"] == 1) {
          $('#uid').val(localStorage[".id"]);
          var uid = localStorage[".id"];
          $.ajax({
            type: "POST",
            data: "uid="+uid,
            url: "/usertype",
            success: function(userType)
            {
              if (userType === 'free') {
                if (sessionVar == false) {
                  loginUser(uid);
                }
                //freeInfoMessage();
              } else if (userType === 'unregistered') {
                //registerInfoMessage();
              }
            }
          });  
        } 
      } else if (localStorage["account_created"] == 1) {
        var uid = localStorage[".id"];
        $.ajax({
          type: "POST",
          data: "uid="+uid,
          url: "/usertype",
          success: function(userType)
          {
            if (userType === 'free') {
              if (sessionVar == false) {
                loginUser(uid);
              }
              //freeInfoMessage();
            } else if (userType === 'unregistered') {
              //registerInfoMessage();
            } else if (userType === 'paid') {
              if (sessionVar == false) {
                loginUser(uid);
              }
            }
          }
        });  
      } else {
        // dont do anything
      }

    
  }
});
