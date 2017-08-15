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
};

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

    ctx.beginPath()
    ctx.moveTo(T, H);
    ctx.lineTo(T, L);
    ctx.stroke();
    ctx.fillRect(T - W/2, O, W, C - O);
    ctx.strokeRect(T - W/2, O, W, C - O);

    if (V) {
      ctx.fillRect(T - W/2, V, W, ctx.canvas.height - V)
    }
  },

};

export { Graph };
