function Graph(range) {
  this.range = {
    x: {
      min: range.x.min,
      max: range.x.max,
      range: range.x.max - range.x.min
    },
    y: {
      min: range.y.min,
      max: range.y.max,
      range: range.y.max - range.y.min
    }
  };
  this.scaleVolume = 0.25;
}

Graph.prototype = {
  normY: function(y) {
    return (y - this.range.y.min) / (this.range.y.range);
  },

  normX: function(x) {
    return (x - this.range.x.min) / (this.range.x.range);
  },

  graphCandle: function(ctx, candle) {
    var O = (1 - this.normY(candle.O)) * ctx.canvas.height,
        C = (1 - this.normY(candle.C)) * ctx.canvas.height,
        H = (1 - this.normY(candle.H)) * ctx.canvas.height,
        L = (1 - this.normY(candle.L)) * ctx.canvas.height,
        T = this.normX(candle.T) * ctx.canvas.width,
        W = (candle.width / this.range.x.range) * ctx.canvas.width,
        V = (candle.V) ? (1 - this.normY(candle.V) * this.scaleVolume) * ctx.canvas.height : false;

    console.log(O, C, H, L, T, W, V);

    ctx.beginPath();
    ctx.moveTo(T, H);
    ctx.lineTo(T, L);
    ctx.stroke();
    ctx.fillRect(T - W/2, O, W, C - O);
    ctx.strokeRect(T - W/2, O, W, C - O);

    if (V) {
      ctx.fillRect(T - W/2, V, W, ctx.canvas.height - V);
    }
  },

};

var Candles = function(params) {
  if (typeof params === 'undefined') {
    var params = {};
  }

  this.append = params.append || false;
  this.width = params.width || 500;
  this.height = params.height || 400;
  this.increaseStroke = params.increaseStroke || 'black';
  this.decreaseStroke = params.decreaseStroke || 'black';
  this.volumeStroke = params.volumeStroke || 'grey';
  this.increaseFill = params.increaseFill || 'white';
  this.decreaseFill = params.decreaseFill || 'black';
  this.volumeFill = params.volumeFill || 'grey';
  this.range = {x: {min: 0, max: 100}, y: {min: 0, max: 100}};

  if (params.xRange) {
    this.range.x.min = params.xRange[0];
    this.range.x.max = params.xRange[1];
  }

  if (params.yRange) {
    this.range.y.min = params.yRange[0];
    this.range.y.max = params.yRange[1];
  }

  this.init();
};

Candles.prototype = {
  init: function() {
    this.cvs = document.createElement('canvas');
    this.cvs.id = 'candlesCanvas';
    this.cvs.width = this.width;
    this.cvs.height = this.height;
    this.ctx = this.cvs.getContext('2d');

    // graphing
    this.graph = new Graph(this.range);

    if (this.append) {
      document.getElementById(this.append).appendChild(this.cvs);
    } else {
      document.body.appendChild(this.cvs);
    }
  },

  test: function() {
    this.graph.graphCandle(this.ctx, {
        O: 50,
        C: 30,
        H: 55,
        L: 20,
        T: 50,
        V: 25,
        width: 5
    });
  },

  graph: function(candle) {

  },
};
//# sourceMappingURL=candles.js.map
