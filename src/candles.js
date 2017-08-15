import { Graph } from './modules/graph';

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
