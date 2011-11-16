/* Author: Betsy Haibel

*/

(function($, Color) {
  var colorChange = function(element, changeFunction) {
        var original = element.css('background-color'),
            changed = changeFunction(Color(original)).toCSS();

        element.css('background-color', changed);
      },
      getNeighbors = function(centerCoords) {
        var x = centerCoords[0],
            y = centerCoords[1];

            neighborCoords = [
              [x - 1, y],
              [x, y - 1],
              [x + 1, y],
              [x, y + 1]
            ];
        return neighborCoords;
      },
      cellId = function(xy) {
        return '#' + xy.join('-');
      },
      getCellFromXY = function(xy) {
        return $(cellId(xy));
      },
      changeWithNeighbors = function(centerCoords, neighborsFunction, changeFunction, decreaseFunction, startVal) {
        if(startVal > .01) {
          var neighbors = neighborsFunction(centerCoords),
              idx = neighbors.length;
          changeFunction(getCellFromXY(centerCoords), startVal);
          while (idx--) {
            changeWithNeighbors(neighbors[idx], neighborsFunction, changeFunction, decreaseFunction, decreaseFunction(startVal));
          };
        }
      },
            
      black = function(element, increment) {
        colorChange(element, function(color) {
          return color.darkenByAmount(increment);
        });
      },
      red = function(element, increment) {
        colorChange(element, function(color) {
          return color.setRed(color.getRed() + increment);
        });
      },
      green = function(element, increment) {
        colorChange(element, function(color) {
          return color.setGreen(color.getGreen() + increment);
        });
      },
      blue = function(element, increment) {
        colorChange(element, function(color) {
          return color.setBlue(color.getBlue() + increment);
        });
      },
      white = function(element, increment) {
        colorChange(element, function(color) {
          return color.lightenByAmount(increment);
        });
      },
      
      currentColorFunction,
      setCurrentColorFunction = function() {
        name = $('#colors').find('input:radio[name="colors"]:checked').val();
        currentColorFunction = eval(name);
      },
      
      third = function(increment) {
        return increment / 3;
      };
        
  $('td').click(function() {
    var center = $(this),
        centerXY = center.attr('id').split('-'),
        centerCoords = [parseInt(centerXY[0]), parseInt(centerXY[1])];
    
    changeWithNeighbors(centerCoords, getNeighbors, currentColorFunction, third, .2);
  });
  
  $('#colors').change(function(){
    setCurrentColorFunction();
  });
  $('document').ready(function(){
    setCurrentColorFunction();
  });
}(jQuery, net.brehaut.Color))