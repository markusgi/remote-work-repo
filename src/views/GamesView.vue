<template>
  <div class="games-page">
    <div class="games-container">
      <h1>Games</h1>
      <div class="snake-game-wrapper">
        <div class="game-header">
          <div class="game-score">Score: {{ score }}</div>
          <div class="game-high-score">Best: {{ highScore }}</div>
        </div>
        <canvas
          ref="canvas"
          :width="canvasSize"
          :height="canvasSize"
          class="game-canvas"
          tabindex="0"
          @keydown="onKeyDown"
        ></canvas>
        <div v-if="gameOver" class="game-overlay">
          <div class="overlay-content">
            <h2>Game Over</h2>
            <p>Score: {{ score }}</p>
            <button class="btn-play" @click="startGame">Play Again</button>
          </div>
        </div>
        <div v-if="!started" class="game-overlay">
          <div class="overlay-content">
            <h2>Snake</h2>
            <p>Use arrow keys to move</p>
            <button class="btn-play" @click="startGame">Play</button>
          </div>
        </div>
        <div class="game-controls-mobile">
          <div class="controls-row">
            <button class="ctrl-btn" @click="setDirection('up')">&#9650;</button>
          </div>
          <div class="controls-row">
            <button class="ctrl-btn" @click="setDirection('left')">&#9664;</button>
            <button class="ctrl-btn" @click="setDirection('down')">&#9660;</button>
            <button class="ctrl-btn" @click="setDirection('right')">&#9654;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesView',
  data() {
    return {
      gridSize: 20,
      tileCount: 20,
      canvasSize: 400,
      snake: [],
      food: { x: 0, y: 0 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      score: 0,
      highScore: 0,
      gameOver: false,
      started: false,
      intervalId: null,
    };
  },
  mounted() {
    this.canvasSize = Math.min(400, window.innerWidth - 48);
    this.gridSize = this.canvasSize / this.tileCount;
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    startGame() {
      clearInterval(this.intervalId);
      const mid = Math.floor(this.tileCount / 2);
      this.snake = [
        { x: mid, y: mid },
        { x: mid - 1, y: mid },
        { x: mid - 2, y: mid },
      ];
      this.direction = { x: 1, y: 0 };
      this.nextDirection = { x: 1, y: 0 };
      this.score = 0;
      this.gameOver = false;
      this.started = true;
      this.spawnFood();
      this.intervalId = setInterval(this.tick, 120);
      this.$refs.canvas.focus();
    },
    spawnFood() {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * this.tileCount),
          y: Math.floor(Math.random() * this.tileCount),
        };
      } while (this.snake.some(s => s.x === pos.x && s.y === pos.y));
      this.food = pos;
    },
    tick() {
      this.direction = { ...this.nextDirection };
      const head = {
        x: this.snake[0].x + this.direction.x,
        y: this.snake[0].y + this.direction.y,
      };

      // Wall collision
      if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
        this.endGame();
        return;
      }

      // Self collision
      if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
        this.endGame();
        return;
      }

      this.snake.unshift(head);

      if (head.x === this.food.x && head.y === this.food.y) {
        this.score++;
        if (this.score > this.highScore) this.highScore = this.score;
        this.spawnFood();
        // Speed up slightly
        if (this.score % 5 === 0) {
          clearInterval(this.intervalId);
          const speed = Math.max(50, 120 - this.score * 3);
          this.intervalId = setInterval(this.tick, speed);
        }
      } else {
        this.snake.pop();
      }

      this.draw();
    },
    draw() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const g = this.gridSize;

      // Background
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= this.tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * g, 0);
        ctx.lineTo(i * g, this.canvasSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * g);
        ctx.lineTo(this.canvasSize, i * g);
        ctx.stroke();
      }

      // Food
      ctx.fillStyle = '#DE483A';
      ctx.shadowColor = '#DE483A';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(
        this.food.x * g + g / 2,
        this.food.y * g + g / 2,
        g / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Snake
      this.snake.forEach((seg, i) => {
        const ratio = 1 - i / this.snake.length;
        const r = Math.round(64 + ratio * 158);
        const gr = Math.round(115 + ratio * 140);
        const b = Math.round(255 - ratio * 0);
        ctx.fillStyle = `rgb(${r}, ${gr}, ${b})`;
        const padding = i === 0 ? 1 : 2;
        ctx.beginPath();
        ctx.roundRect(
          seg.x * g + padding,
          seg.y * g + padding,
          g - padding * 2,
          g - padding * 2,
          4
        );
        ctx.fill();
      });
    },
    endGame() {
      clearInterval(this.intervalId);
      this.gameOver = true;
      this.draw();
    },
    onKeyDown(e) {
      const key = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
      }
      if (key === 'ArrowUp' && this.direction.y !== 1) {
        this.nextDirection = { x: 0, y: -1 };
      } else if (key === 'ArrowDown' && this.direction.y !== -1) {
        this.nextDirection = { x: 0, y: 1 };
      } else if (key === 'ArrowLeft' && this.direction.x !== 1) {
        this.nextDirection = { x: -1, y: 0 };
      } else if (key === 'ArrowRight' && this.direction.x !== -1) {
        this.nextDirection = { x: 1, y: 0 };
      }
    },
    setDirection(dir) {
      if (!this.started || this.gameOver) return;
      if (dir === 'up' && this.direction.y !== 1) this.nextDirection = { x: 0, y: -1 };
      else if (dir === 'down' && this.direction.y !== -1) this.nextDirection = { x: 0, y: 1 };
      else if (dir === 'left' && this.direction.x !== 1) this.nextDirection = { x: -1, y: 0 };
      else if (dir === 'right' && this.direction.x !== -1) this.nextDirection = { x: 1, y: 0 };
    },
  },
};
</script>

<style scoped>
.games-page {
  padding: 120px 24px 80px;
  min-height: 100vh;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
}

.games-container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.games-container h1 {
  font-size: 2.4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
}

.snake-game-wrapper {
  position: relative;
  display: inline-block;
}

.game-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 4px;
}

.game-score, .game-high-score {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
}

.game-high-score {
  color: #DE483A;
}

.game-canvas {
  display: block;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  outline: none;
  cursor: pointer;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 46, 0.85);
  border-radius: 12px;
  margin-top: 44px;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.overlay-content p {
  font-size: 1.1rem;
  margin-bottom: 24px;
  color: #ccc;
}

.btn-play {
  padding: 14px 36px;
  background: #DE483A;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(222, 72, 58, 0.3);
}

.btn-play:hover {
  background: #c73a2d;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(222, 72, 58, 0.4);
}

.game-controls-mobile {
  display: none;
  margin-top: 20px;
}

.controls-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 4px;
}

.ctrl-btn {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: none;
  background: #f0f0f0;
  font-size: 1.3rem;
  cursor: pointer;
  color: #333;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ctrl-btn:hover {
  background: #e0e0e0;
}

.ctrl-btn:active {
  background: #DE483A;
  color: white;
}

@media (max-width: 600px) {
  .game-controls-mobile {
    display: block;
  }
}
</style>
