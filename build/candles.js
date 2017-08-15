function Graph(params) {
  this.style = {
    increase: {
      fill: params.increaseFill || 'white',
      stroke: params.increaseStroke || 'black'
    },
    decrease: {
      fill: params.decreaseFill || 'black',
      stroke: params.decreaseStroke || 'black'
    },
    volume: {
      fill: params.volumeFill || '#ddd',
      stroke: params.volumeStroke || '#ccc'
    }
  };
  this.range = {
    x: {
      min: 0,
      max: 100,
      range: 100
    },
    y: {
      min: 0,
      max: 100,
      range: 100
    },
    v: {
      min: 0,
      max: 100,
      range: 100
    }
  };
  if (params.xRange) {
    this.range.x.min = params.xRange[0];
    this.range.x.max = params.xRange[1];
    this.range.x.range = this.range.x.max - this.range.x.min;
  }
  if (params.yRange) {
    this.range.y.min = params.yRange[0];
    this.range.y.max = params.yRange[1];
    this.range.y.range = this.range.y.max - this.range.y.min;
  }
  if (params.volumeRange) {
    this.range.v.min = params.volumeRange[0];
    this.range.v.max = params.volumeRange[1];
    this.range.v.range = this.range.v.max - this.range.v.min;
  }
  this.scaleVolume = 0.25;
  this.candles = [];
}

Graph.prototype = {
  normY: function(y) {
    return (y - this.range.y.min) / (this.range.y.range);
  },

  normX: function(x) {
    return (x - this.range.x.min) / (this.range.x.range);
  },

  normV: function(v) {
    return (v - this.range.v.min) / (this.range.v.range);
  },

  drawCandle: function(ctx, candle) {
    var O = (1 - this.normY(candle.O)) * ctx.canvas.height,
        C = (1 - this.normY(candle.C)) * ctx.canvas.height,
        H = (1 - this.normY(candle.H)) * ctx.canvas.height,
        L = (1 - this.normY(candle.L)) * ctx.canvas.height,
        T = this.normX(candle.T) * ctx.canvas.width,
        W = (candle.width / this.range.x.range) * ctx.canvas.width,
        V = (candle.V) ? (1 - this.normV(candle.V) * this.scaleVolume) * ctx.canvas.height : false;

    if (O <= C) {
      ctx.fillStyle = this.style.increase.fill;
      ctx.strokeStyle = this.style.increase.stroke;
    } else {
      ctx.fillStyle = this.style.decrease.fill;
      ctx.strokeStyle = this.style.decrease.stroke;
    }

    ctx.beginPath();
    ctx.moveTo(T, H);
    ctx.lineTo(T, L);
    ctx.stroke();
    ctx.fillRect(T - W/2, O, W, C - O);
    ctx.strokeRect(T - W/2, O, W, C - O);

    if (V) {
      ctx.fillStyle = this.style.volume.fill;
      ctx.strokeStyle = this.style.volume.stroke;
      ctx.fillRect(T - W/2, V, W, ctx.canvas.height - V);
      ctx.strokeRect(T - W/2, V, W, ctx.canvas.height - V);
    }
  },

  draw: function(ctx, O, C, H, L, T, W, V) {

  }
};

var Candles = function(params) {
  this.init((typeof params !== 'undefined') ? params : {});
};

Candles.prototype = {
  init: function(params) {
    // canvas setup
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.element = (params.append) ? document.getElementById(params.append) : document.body;
    this.cvs.width = params.width || 500;
    this.cvs.height = params.height || 400;

    // graph
    this.graph = new Graph(params);

    // append to document
    this.element.appendChild(this.cvs);
  },

  test: function() {
    var price = 50, volume = 50;

    for (var i=0; i<102; i+=2) {
      price += Math.random() * 4 - 2;
      volume += Math.random() * 10 - 5;

      this.graph.drawCandle(this.ctx, {
          O: price + Math.random() * 10 - 5,
          C: price + Math.random() * 10 - 5,
          H: price + Math.random() * 10,
          L: price - Math.random() * 10,
          T: i,
          V: volume,
          width: 1.5
      });
    }
  },

  graphCandle: function(candle) {

  },

  graphCandleSet: function(set) {

  },

  autoGraph: function(set) {

  }
};
//# sourceMappingURL=candles.js.map
