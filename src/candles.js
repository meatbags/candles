import { Graph } from './modules/graph';

var Candles = function(params) {
  if (typeof params === 'undefined') {
    var params = {};
  }

  this.init(params);
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
    if (this.append) {
      document.getElementById(this.append).appendChild(this.cvs);
    } else {
      document.body.appendChild(this.cvs);
    }
  },

  test: function() {
    var price = 50, volume = 50;

    for (var i=0; i<102; i+=2) {
      price += Math.random() * 4 - 2;
      volume += Math.random() * 10 - 5;

      this.graph.graphCandle(this.ctx, {
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
