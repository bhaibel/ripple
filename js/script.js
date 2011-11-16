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
      
      ColorChangeManager = function(config){
        var defaults = {
          neighborsFunction: getNeighbors,
          changeFunction: currentColorFunction,
          decreaseFunction: third
        };
        for(prop in config) {
          defaults[prop] = config[prop]
        }
        
        this.run = function(coords, increment){
          if(increment > .01) {
            var neighbors = defaults.neighborsFunction(coords),
                idx = neighbors.length;
            defaults.changeFunction(getCellFromXY(coords), increment)
            while(idx--) {
              this.run(neighbors[idx], defaults.decreaseFunction(increment));
            }
          }
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
        centerCoords = [parseInt(centerXY[0]), parseInt(centerXY[1])],
        changeManager = new ColorChangeManager();
    
    changeManager.run(centerCoords, .2);
  });
  
  $('#colors').change(function(){
    setCurrentColorFunction();
  });
  $('document').ready(function(){
    setCurrentColorFunction();
  });
}(jQuery, net.brehaut.Color))