import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.draw = this.draw.bind(this);
  }


  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    this.setState(
      {
        ctx: ctx,
        canvas: canvas,
        x: canvas.width / 2,
        y: canvas.height - 30,
        dx: 2,
        dy: -2,
        ballRadius: 10,
        paddleWidth: 75,
        paddleHeight: 10,
        paddleX: (canvas.width-75)/2
      }
    )  
    setInterval(this.draw, 17);
  }

  drawBall(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.state.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

   drawPaddle(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, this.state.paddleWidth, this.state.paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

  draw() {
    const ctx = this.state.ctx
    const ballRadius = this.state.ballRadius

    ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    let x = this.state.x
    let y = this.state.y
    let dx = this.state.dx
    let dy = this.state.dy

    let paddleX = this.state.paddleX

    this.drawBall(ctx, x, y)

    this.drawPaddle(ctx, paddleX, this.state.canvas.height - this.state.paddleHeight)
    if (x + dx > this.state.canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy > this.state.canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    this.setState({ x: x + dx, y: y + dy, dx: dx, dy: dy })
  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" width={480} height={320} className="canvas" />
      </div>
    );
  }
}

export default App;
