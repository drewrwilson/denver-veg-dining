function loadpoints(url) {
  jQuery.ajax({
    url: url,
    dataType: "json",
    beforeSend: function(){
        //$(this).closest('div').html('getting file...');
    },
    success: function(data) {
          //$(this).closest('div').html(data);
          window.points = data;
    },
    complete: function(){
        //stuff here
        jfpioam(window.points.features);
        displayList(window.points.features);
    }

  });
}

function displayList(data) {
$.each(data,
  function(i,item) {
    count++;
    console.log(count);
    if (item.properties.Name) {
      htmlContent  = '<div class="listing-item"><h2> <i class="fa fa-map-marker"></i> ' + item.properties.Name + '</h2>';
      if (item.properties.Address) {
        htmlContent += '<div class="address">' + item.properties.Address
        if (item.properties.Phone) {
          htmlContent += ' | <span class="phone">' + item.properties.Phone + '</span>';
        }
        htmlContent += '</div>';
      }

      if (item.properties.Commentary) {
        htmlContent += '<div class="desc">' + item.properties.Commentary + '</div>';
      }
      htmlContent = '<div class="col-sm-6 col-xs-12 col-lg-3 col-md-4">' + htmlContent + '</div><div class="fadeout"></div></div>';

      if (count == 4) {
        htmlContent += '<div class="clearfix"></div>';
        count = 0;
      } else if (count == 3) {
        htmlContent += '<div class="clearfix visible-md"></div>';
      }
      // } else if (count % 2 === 0) {
      // 	htmlContent += '<div class="clearfix visible-sm visible-md visible-lg"></div>';
      // } else {
      // 	htmlContent += '<div class="clearfix visible-sm"></div>';
      // }
      $('#list-of-places').append(htmlContent);
    };
  }
);

}


function jfpioam(data){
  function onEachFeature(feature, layer) {
      // does this feature have a property named Commentary?
      var popUpText;
      if (feature.properties) {
          popUpText = '<strong>' + feature.properties.Name + '</strong><br />' + feature.properties.Address + '<br />' + feature.properties.Commentary;
          if (feature.properties.Phone) {
            popUpText += '<em>' + feature.properties.Phone + '</em>';
          }
          layer.bindPopup(popUpText);
      }
  }

    var map = L.map('map-div').setView([39.7595884,-104.9608549], 12);

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/drewrwilson.i6935ig3/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
      maxZoom: 18
  }).addTo(map);

  L.geoJson(data, {
      onEachFeature: onEachFeature
  }).addTo(map);

  //initialize currentCol as 'left'
  var currentCol = 'left';
}
