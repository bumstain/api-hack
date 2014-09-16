$(document).ready(function(){

  // Client information and API keys
  var min='', 
      url='',
      instagram = {
        clientID: '2a04d812bc124b2eb9f86bd1d883540a',
        apiHost: 'https://api.instagram.com',
      }

  // Load images from Instagram
  function imageLoad() {                      
    tag = $('input').val();

    // Instagram AJAX request and callback
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=48",
      data: {
        'client_id': instagram.clientID, 
        'max_tag_id': min
      },

      // Return Instagram image output
      success: function(images) {
        min = images.pagination.next_max_tag_id;
        url = images.pagination.next_url;
        $('.controlbutton').removeClass('hidden');
        console.dir(images);
        for (var i = 0; i < images.data.length; i++) {
          likes = images.data[i].likes.count;
          console.log(likes);
          link = images.data[i].link;
          urlsrc = images.data[i].images.thumbnail.url;
          $("#output").append("<div id='outputpic'><a target='_blank' href='" + link + "'>" + "</div></div><img src='" + urlsrc + "'></img></div>");
        }  
      }      
    });
  }
    
  // Submit input after delay
  var timerid;                                     
  $('input').keyup(function(){
    clearTimeout(timerid);
    timerid = setTimeout(function(){
      imageLoad(); 
    }, 
    300);
  });

  // Clear pictures and start new search
  $('#clear').on('click', function(){         
    $('#output').empty();
    $('input').val('');
    $('input').focus();
  })

  // Clear input value
  $('input').on('click focusin', function() {      
      this.value = '';
  });
});

