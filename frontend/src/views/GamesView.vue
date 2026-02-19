<template>
  <div class="games-page">
    <div class="games-container">
      <h1>Games</h1>

      <!-- Game Selection Menu -->
      <div v-if="!activeGame" class="game-menu">
        <div class="game-card" @click="activeGame = 'snake'">
          <div class="game-card-icon">🐍</div>
          <div class="game-card-info">
            <h3>Snake</h3>
            <p>Eat food, grow longer, don't hit the walls!</p>
          </div>
        </div>
        <div class="game-card" @click="activeGame = 'tetris'">
          <div class="game-card-icon">🧱</div>
          <div class="game-card-info">
            <h3>Tetris</h3>
            <p>Stack blocks, clear lines, beat your high score!</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <button v-if="activeGame" class="btn-back" @click="goBack">
        &#8592; Back to Games
      </button>

      <!-- Snake Game -->
      <div v-if="activeGame === 'snake'" class="game-wrapper">
        <div class="game-header">
          <div class="game-score">Score: {{ snakeScore }}</div>
          <div class="game-high-score">Best: {{ snakeHighScore }}</div>
        </div>
        <canvas
          ref="snakeCanvas"
          :width="canvasSize"
          :height="canvasSize"
          class="game-canvas"
          tabindex="0"
          @keydown="onSnakeKeyDown"
        ></canvas>
        <div v-if="snakeGameOver" class="game-overlay">
          <div class="overlay-content">
            <h2>Game Over</h2>
            <p>Score: {{ snakeScore }}</p>
            <button class="btn-play" @click="startSnake">Play Again</button>
          </div>
        </div>
        <div v-if="!snakeStarted" class="game-overlay">
          <div class="overlay-content">
            <h2>Snake</h2>
            <p>Use arrow keys to move</p>
            <button class="btn-play" @click="startSnake">Play</button>
          </div>
        </div>
        <div class="game-controls-mobile">
          <div class="controls-row">
            <button class="ctrl-btn" @click="setSnakeDirection('up')">&#9650;</button>
          </div>
          <div class="controls-row">
            <button class="ctrl-btn" @click="setSnakeDirection('left')">&#9664;</button>
            <button class="ctrl-btn" @click="setSnakeDirection('down')">&#9660;</button>
            <button class="ctrl-btn" @click="setSnakeDirection('right')">&#9654;</button>
          </div>
        </div>
      </div>

      <!-- Tetris Game -->
      <div v-if="activeGame === 'tetris'" class="game-wrapper">
        <div class="game-header">
          <div class="game-score">Score: {{ tetrisScore }}</div>
          <div class="game-high-score">Best: {{ tetrisHighScore }}</div>
        </div>
        <div class="tetris-layout">
          <div class="tetris-main">
            <canvas
              ref="tetrisCanvas"
              :width="tetrisWidth"
              :height="tetrisHeight"
              class="game-canvas"
              tabindex="0"
              @keydown="onTetrisKeyDown"
            ></canvas>
            <div v-if="tetrisGameOver" class="game-overlay tetris-overlay">
              <div class="overlay-content">
                <h2>Game Over</h2>
                <p>Score: {{ tetrisScore }}</p>
                <button class="btn-play" @click="startTetris">Play Again</button>
              </div>
            </div>
            <div v-if="!tetrisStarted" class="game-overlay tetris-overlay">
              <div class="overlay-content">
                <h2>Tetris</h2>
                <p>Arrow keys to move, Up to rotate</p>
                <button class="btn-play" @click="startTetris">Play</button>
              </div>
            </div>
          </div>
          <div class="tetris-sidebar">
            <div class="tetris-next-label">Next</div>
            <canvas
              ref="nextCanvas"
              :width="nextCanvasSize"
              :height="nextCanvasSize"
              class="next-canvas"
            ></canvas>
            <div class="tetris-lines">Lines: {{ tetrisLines }}</div>
            <div class="tetris-level">Level: {{ tetrisLevel }}</div>
          </div>
        </div>
        <div class="game-controls-mobile">
          <div class="controls-row">
            <button class="ctrl-btn" @click="rotateTetrisPiece">&#8635;</button>
          </div>
          <div class="controls-row">
            <button class="ctrl-btn" @click="moveTetris('left')">&#9664;</button>
            <button class="ctrl-btn" @click="moveTetris('down')">&#9660;</button>
            <button class="ctrl-btn" @click="moveTetris('right')">&#9654;</button>
          </div>
          <div class="controls-row">
            <button class="ctrl-btn ctrl-btn-wide" @click="hardDrop">Drop</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const TETRIS_COLS = 10;
const TETRIS_ROWS = 20;

const TETROMINOES = {
  I: { shape: [[1,1,1,1]], color: '#00f0f0' },
  O: { shape: [[1,1],[1,1]], color: '#f0f000' },
  T: { shape: [[0,1,0],[1,1,1]], color: '#a000f0' },
  S: { shape: [[0,1,1],[1,1,0]], color: '#00f000' },
  Z: { shape: [[1,1,0],[0,1,1]], color: '#f00000' },
  J: { shape: [[1,0,0],[1,1,1]], color: '#0000f0' },
  L: { shape: [[0,0,1],[1,1,1]], color: '#f0a000' },
};

const TETRO_KEYS = Object.keys(TETROMINOES);

export default {
  name: 'GamesView',
  data() {
    return {
      activeGame: null,
      canvasSize: 400,

      // Snake
      snakeGridSize: 20,
      snakeTileCount: 20,
      snake: [],
      snakeFood: { x: 0, y: 0 },
      snakeDir: { x: 1, y: 0 },
      snakeNextDir: { x: 1, y: 0 },
      snakeScore: 0,
      snakeHighScore: 0,
      snakeGameOver: false,
      snakeStarted: false,
      snakeInterval: null,

      // Tetris
      tetrisCellSize: 0,
      tetrisWidth: 0,
      tetrisHeight: 0,
      nextCanvasSize: 100,
      tetrisBoard: [],
      tetrisCurrent: null,
      tetrisCurrentPos: { x: 0, y: 0 },
      tetrisNext: null,
      tetrisScore: 0,
      tetrisHighScore: 0,
      tetrisLines: 0,
      tetrisLevel: 1,
      tetrisGameOver: false,
      tetrisStarted: false,
      tetrisInterval: null,
    };
  },
  mounted() {
    this.canvasSize = Math.min(400, window.innerWidth - 48);
    this.snakeGridSize = this.canvasSize / this.snakeTileCount;
    this.tetrisCellSize = Math.floor(this.canvasSize / TETRIS_COLS);
    this.tetrisWidth = this.tetrisCellSize * TETRIS_COLS;
    this.tetrisHeight = this.tetrisCellSize * TETRIS_ROWS;
    this.nextCanvasSize = this.tetrisCellSize * 5;
  },
  beforeUnmount() {
    clearInterval(this.snakeInterval);
    clearInterval(this.tetrisInterval);
  },
  watch: {
    activeGame(game) {
      // Clean up when switching
      clearInterval(this.snakeInterval);
      clearInterval(this.tetrisInterval);
      this.snakeStarted = false;
      this.snakeGameOver = false;
      this.tetrisStarted = false;
      this.tetrisGameOver = false;
    }
  },
  methods: {
    goBack() {
      clearInterval(this.snakeInterval);
      clearInterval(this.tetrisInterval);
      this.activeGame = null;
    },

    // ==================== SNAKE ====================
    startSnake() {
      clearInterval(this.snakeInterval);
      const mid = Math.floor(this.snakeTileCount / 2);
      this.snake = [
        { x: mid, y: mid },
        { x: mid - 1, y: mid },
        { x: mid - 2, y: mid },
      ];
      this.snakeDir = { x: 1, y: 0 };
      this.snakeNextDir = { x: 1, y: 0 };
      this.snakeScore = 0;
      this.snakeGameOver = false;
      this.snakeStarted = true;
      this.spawnSnakeFood();
      this.snakeInterval = setInterval(this.snakeTick, 120);
      this.$refs.snakeCanvas.focus();
    },
    spawnSnakeFood() {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * this.snakeTileCount),
          y: Math.floor(Math.random() * this.snakeTileCount),
        };
      } while (this.snake.some(s => s.x === pos.x && s.y === pos.y));
      this.snakeFood = pos;
    },
    snakeTick() {
      this.snakeDir = { ...this.snakeNextDir };
      const head = {
        x: this.snake[0].x + this.snakeDir.x,
        y: this.snake[0].y + this.snakeDir.y,
      };
      if (head.x < 0 || head.x >= this.snakeTileCount || head.y < 0 || head.y >= this.snakeTileCount) {
        this.endSnake();
        return;
      }
      if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
        this.endSnake();
        return;
      }
      this.snake.unshift(head);
      if (head.x === this.snakeFood.x && head.y === this.snakeFood.y) {
        this.snakeScore++;
        if (this.snakeScore > this.snakeHighScore) this.snakeHighScore = this.snakeScore;
        this.spawnSnakeFood();
        if (this.snakeScore % 5 === 0) {
          clearInterval(this.snakeInterval);
          const speed = Math.max(50, 120 - this.snakeScore * 3);
          this.snakeInterval = setInterval(this.snakeTick, speed);
        }
      } else {
        this.snake.pop();
      }
      this.drawSnake();
    },
    drawSnake() {
      const canvas = this.$refs.snakeCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const g = this.snakeGridSize;

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= this.snakeTileCount; i++) {
        ctx.beginPath(); ctx.moveTo(i * g, 0); ctx.lineTo(i * g, this.canvasSize); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * g); ctx.lineTo(this.canvasSize, i * g); ctx.stroke();
      }

      ctx.fillStyle = '#DE483A';
      ctx.shadowColor = '#DE483A';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.snakeFood.x * g + g / 2, this.snakeFood.y * g + g / 2, g / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      this.snake.forEach((seg, i) => {
        const ratio = 1 - i / this.snake.length;
        const r = Math.round(64 + ratio * 158);
        const gr = Math.round(115 + ratio * 140);
        const b = Math.round(255 - ratio * 0);
        ctx.fillStyle = `rgb(${r}, ${gr}, ${b})`;
        const padding = i === 0 ? 1 : 2;
        ctx.beginPath();
        ctx.roundRect(seg.x * g + padding, seg.y * g + padding, g - padding * 2, g - padding * 2, 4);
        ctx.fill();
      });
    },
    endSnake() {
      clearInterval(this.snakeInterval);
      this.snakeGameOver = true;
      this.drawSnake();
    },
    onSnakeKeyDown(e) {
      const key = e.key;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)) e.preventDefault();
      if (key === 'ArrowUp' && this.snakeDir.y !== 1) this.snakeNextDir = { x: 0, y: -1 };
      else if (key === 'ArrowDown' && this.snakeDir.y !== -1) this.snakeNextDir = { x: 0, y: 1 };
      else if (key === 'ArrowLeft' && this.snakeDir.x !== 1) this.snakeNextDir = { x: -1, y: 0 };
      else if (key === 'ArrowRight' && this.snakeDir.x !== -1) this.snakeNextDir = { x: 1, y: 0 };
    },
    setSnakeDirection(dir) {
      if (!this.snakeStarted || this.snakeGameOver) return;
      if (dir === 'up' && this.snakeDir.y !== 1) this.snakeNextDir = { x: 0, y: -1 };
      else if (dir === 'down' && this.snakeDir.y !== -1) this.snakeNextDir = { x: 0, y: 1 };
      else if (dir === 'left' && this.snakeDir.x !== 1) this.snakeNextDir = { x: -1, y: 0 };
      else if (dir === 'right' && this.snakeDir.x !== -1) this.snakeNextDir = { x: 1, y: 0 };
    },

    // ==================== TETRIS ====================
    createBoard() {
      return Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(null));
    },
    randomPiece() {
      const key = TETRO_KEYS[Math.floor(Math.random() * TETRO_KEYS.length)];
      const t = TETROMINOES[key];
      return { shape: t.shape.map(row => [...row]), color: t.color };
    },
    startTetris() {
      clearInterval(this.tetrisInterval);
      this.tetrisBoard = this.createBoard();
      this.tetrisScore = 0;
      this.tetrisLines = 0;
      this.tetrisLevel = 1;
      this.tetrisGameOver = false;
      this.tetrisStarted = true;
      this.tetrisNext = this.randomPiece();
      this.spawnTetrisPiece();
      this.tetrisInterval = setInterval(this.tetrisTick, this.getDropSpeed());
      this.$refs.tetrisCanvas.focus();
    },
    getDropSpeed() {
      return Math.max(100, 800 - (this.tetrisLevel - 1) * 70);
    },
    spawnTetrisPiece() {
      this.tetrisCurrent = this.tetrisNext;
      this.tetrisNext = this.randomPiece();
      const cols = this.tetrisCurrent.shape[0].length;
      this.tetrisCurrentPos = { x: Math.floor((TETRIS_COLS - cols) / 2), y: 0 };
      if (this.collides(this.tetrisCurrent.shape, this.tetrisCurrentPos)) {
        this.endTetris();
      }
      this.drawNextPiece();
    },
    collides(shape, pos) {
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (!shape[r][c]) continue;
          const nx = pos.x + c;
          const ny = pos.y + r;
          if (nx < 0 || nx >= TETRIS_COLS || ny >= TETRIS_ROWS) return true;
          if (ny >= 0 && this.tetrisBoard[ny][nx]) return true;
        }
      }
      return false;
    },
    lockPiece() {
      const shape = this.tetrisCurrent.shape;
      const pos = this.tetrisCurrentPos;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (!shape[r][c]) continue;
          const ny = pos.y + r;
          const nx = pos.x + c;
          if (ny >= 0 && ny < TETRIS_ROWS && nx >= 0 && nx < TETRIS_COLS) {
            this.tetrisBoard[ny][nx] = this.tetrisCurrent.color;
          }
        }
      }
      this.clearLines();
      this.spawnTetrisPiece();
    },
    clearLines() {
      let cleared = 0;
      for (let r = TETRIS_ROWS - 1; r >= 0; r--) {
        if (this.tetrisBoard[r].every(cell => cell !== null)) {
          this.tetrisBoard.splice(r, 1);
          this.tetrisBoard.unshift(Array(TETRIS_COLS).fill(null));
          cleared++;
          r++; // recheck same row index
        }
      }
      if (cleared > 0) {
        const points = [0, 100, 300, 500, 800];
        this.tetrisScore += (points[cleared] || 800) * this.tetrisLevel;
        this.tetrisLines += cleared;
        if (this.tetrisScore > this.tetrisHighScore) this.tetrisHighScore = this.tetrisScore;
        const newLevel = Math.floor(this.tetrisLines / 10) + 1;
        if (newLevel !== this.tetrisLevel) {
          this.tetrisLevel = newLevel;
          clearInterval(this.tetrisInterval);
          this.tetrisInterval = setInterval(this.tetrisTick, this.getDropSpeed());
        }
      }
    },
    tetrisTick() {
      const newPos = { x: this.tetrisCurrentPos.x, y: this.tetrisCurrentPos.y + 1 };
      if (this.collides(this.tetrisCurrent.shape, newPos)) {
        this.lockPiece();
      } else {
        this.tetrisCurrentPos = newPos;
      }
      this.drawTetris();
    },
    rotateTetrisPiece() {
      if (!this.tetrisStarted || this.tetrisGameOver) return;
      const shape = this.tetrisCurrent.shape;
      const rows = shape.length;
      const cols = shape[0].length;
      const rotated = Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => shape[rows - 1 - r][c])
      );
      // Wall kick: try original, then left/right shifts
      for (const dx of [0, -1, 1, -2, 2]) {
        const testPos = { x: this.tetrisCurrentPos.x + dx, y: this.tetrisCurrentPos.y };
        if (!this.collides(rotated, testPos)) {
          this.tetrisCurrent.shape = rotated;
          this.tetrisCurrentPos = testPos;
          this.drawTetris();
          return;
        }
      }
    },
    moveTetris(dir) {
      if (!this.tetrisStarted || this.tetrisGameOver) return;
      let dx = 0, dy = 0;
      if (dir === 'left') dx = -1;
      else if (dir === 'right') dx = 1;
      else if (dir === 'down') dy = 1;
      const newPos = { x: this.tetrisCurrentPos.x + dx, y: this.tetrisCurrentPos.y + dy };
      if (!this.collides(this.tetrisCurrent.shape, newPos)) {
        this.tetrisCurrentPos = newPos;
        this.drawTetris();
      }
    },
    hardDrop() {
      if (!this.tetrisStarted || this.tetrisGameOver) return;
      while (!this.collides(this.tetrisCurrent.shape, { x: this.tetrisCurrentPos.x, y: this.tetrisCurrentPos.y + 1 })) {
        this.tetrisCurrentPos.y++;
      }
      this.lockPiece();
      this.drawTetris();
    },
    drawTetris() {
      const canvas = this.$refs.tetrisCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const cs = this.tetrisCellSize;

      // Background
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, this.tetrisWidth, this.tetrisHeight);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= TETRIS_COLS; c++) {
        ctx.beginPath(); ctx.moveTo(c * cs, 0); ctx.lineTo(c * cs, this.tetrisHeight); ctx.stroke();
      }
      for (let r = 0; r <= TETRIS_ROWS; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * cs); ctx.lineTo(this.tetrisWidth, r * cs); ctx.stroke();
      }

      // Locked blocks
      for (let r = 0; r < TETRIS_ROWS; r++) {
        for (let c = 0; c < TETRIS_COLS; c++) {
          if (this.tetrisBoard[r][c]) {
            ctx.fillStyle = this.tetrisBoard[r][c];
            ctx.beginPath();
            ctx.roundRect(c * cs + 1, r * cs + 1, cs - 2, cs - 2, 3);
            ctx.fill();
            // Highlight
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fillRect(c * cs + 2, r * cs + 2, cs - 4, 3);
          }
        }
      }

      // Ghost piece
      if (this.tetrisCurrent) {
        let ghostY = this.tetrisCurrentPos.y;
        while (!this.collides(this.tetrisCurrent.shape, { x: this.tetrisCurrentPos.x, y: ghostY + 1 })) {
          ghostY++;
        }
        const shape = this.tetrisCurrent.shape;
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const gx = (this.tetrisCurrentPos.x + c) * cs;
            const gy = (ghostY + r) * cs;
            ctx.strokeStyle = this.tetrisCurrent.color;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(gx + 1, gy + 1, cs - 2, cs - 2, 3);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        // Current piece
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const px = (this.tetrisCurrentPos.x + c) * cs;
            const py = (this.tetrisCurrentPos.y + r) * cs;
            ctx.fillStyle = this.tetrisCurrent.color;
            ctx.beginPath();
            ctx.roundRect(px + 1, py + 1, cs - 2, cs - 2, 3);
            ctx.fill();
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(px + 2, py + 2, cs - 4, 3);
          }
        }
      }
    },
    drawNextPiece() {
      const canvas = this.$refs.nextCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const size = this.nextCanvasSize;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, size, size);

      if (!this.tetrisNext) return;
      const shape = this.tetrisNext.shape;
      const rows = shape.length;
      const cols = shape[0].length;
      const cellSize = Math.floor(size / 5);
      const offsetX = Math.floor((size - cols * cellSize) / 2);
      const offsetY = Math.floor((size - rows * cellSize) / 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!shape[r][c]) continue;
          ctx.fillStyle = this.tetrisNext.color;
          ctx.beginPath();
          ctx.roundRect(offsetX + c * cellSize + 1, offsetY + r * cellSize + 1, cellSize - 2, cellSize - 2, 3);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(offsetX + c * cellSize + 2, offsetY + r * cellSize + 2, cellSize - 4, 3);
        }
      }
    },
    endTetris() {
      clearInterval(this.tetrisInterval);
      this.tetrisGameOver = true;
      this.drawTetris();
    },
    onTetrisKeyDown(e) {
      if (!this.tetrisStarted || this.tetrisGameOver) return;
      const key = e.key;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(key)) e.preventDefault();
      if (key === 'ArrowLeft') this.moveTetris('left');
      else if (key === 'ArrowRight') this.moveTetris('right');
      else if (key === 'ArrowDown') this.moveTetris('down');
      else if (key === 'ArrowUp') this.rotateTetrisPiece();
      else if (key === ' ') this.hardDrop();
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
  max-width: 600px;
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

/* Game Menu */
.game-menu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 420px;
  margin: 0 auto;
}

.game-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  background: #fff;
  border: 2px solid #eee;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.game-card:hover {
  border-color: #DE483A;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(222, 72, 58, 0.12);
}

.game-card-icon {
  font-size: 2.8rem;
  flex-shrink: 0;
}

.game-card-info h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.game-card-info p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

/* Back Button */
.btn-back {
  display: inline-block;
  margin-bottom: 24px;
  padding: 8px 20px;
  background: none;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  border-color: #DE483A;
  color: #DE483A;
}

/* Game Wrapper */
.game-wrapper {
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

.tetris-overlay {
  margin-top: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

/* Tetris Layout */
.tetris-layout {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}

.tetris-main {
  position: relative;
}

.tetris-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
}

.tetris-next-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.next-canvas {
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.tetris-lines, .tetris-level {
  font-size: 0.9rem;
  font-weight: 700;
  color: #555;
}

/* Mobile Controls */
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

.ctrl-btn-wide {
  width: 120px;
  font-size: 1rem;
  font-weight: 700;
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
  .tetris-layout {
    flex-direction: column;
    align-items: center;
  }
  .tetris-sidebar {
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
