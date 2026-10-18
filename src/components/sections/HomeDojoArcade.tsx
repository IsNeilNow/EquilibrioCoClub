import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowUp, Pause, X } from "lucide-react";
import "@/styles/global/home-dojo-arcade.css";

type GameId = "cobra" | "flower" | "balance";
type Direction = "up" | "down" | "left" | "right";
type BestScores = Record<GameId, number>;
type Brick = { x: number; y: number; alive: boolean; hue: number };
type FoodKind = "dobok" | "glove" | "helmet" | "target";
const oppositeDirections: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};
type ArcadeSession = {
  game: GameId;
  snake: { x: number; y: number }[];
  direction: Direction;
  nextDirection: Direction;
  food: { x: number; y: number };
  foodKind: FoodKind;
  ball: { x: number; y: number; vx: number; vy: number };
  paddleX: number;
  rivalPaddleY: number;
  bricks: Brick[];
  lives: number;
  player: number;
  rival: number;
  score: number;
  level: number;
  lastStep: number;
  elapsed: number;
  rally: number;
  paused: boolean;
  ended: boolean;
};

const STORAGE_KEY = "equilibrio_arcade_records_v1";
const WIDTH = 720;
const HEIGHT = 450;
const SNAKE_COLUMNS = 30;
const SNAKE_ROWS = 16;
const SNAKE_CELL = 22;
const INITIAL_BEST: BestScores = { cobra: 0, flower: 0, balance: 0 };

const games: {
  id: GameId;
  name: string;
  korean: string;
  subtitle: string;
  description: string;
  accent: string;
}[] = [
  {
    id: "cobra",
    name: "La cobra",
    korean: "용기 · YONG-GI",
    subtitle: "Serpiente de dojang",
    description:
      "Guía la cobra por el tatami y reúne equipo de entrenamiento. Cada pieza acelera el desafío.",
    accent: "copper",
  },
  {
    id: "flower",
    name: "La flor",
    korean: "평화 · PYEONG-HWA",
    subtitle: "Rompebloques",
    description:
      "Rompe los bloques de práctica, conserva tus vidas y avanza por niveles cada vez más exigentes.",
    accent: "flower",
  },
  {
    id: "balance",
    name: "Yin-yang",
    korean: "균형 · GYUN-HYEONG",
    subtitle: "Duelo de equilibrio",
    description:
      "Mueve la paleta para devolver el símbolo al centro. El primero en llegar a siete gana el duelo.",
    accent: "balance",
  },
];

function makeBricks(level: number): Brick[] {
  const rows = Math.min(3 + level, 7);
  const columns = 10;
  const gap = 7;
  const brickWidth = 52;
  const offsetX = (WIDTH - columns * brickWidth - (columns - 1) * gap) / 2;
  return Array.from({ length: rows * columns }, (_, index) => ({
    x: offsetX + (index % columns) * (brickWidth + gap),
    y: 74 + Math.floor(index / columns) * 24,
    alive: true,
    hue: (index % columns) * 8 + 8,
  }));
}

function createSession(game: GameId): ArcadeSession {
  const start = {
    x: Math.floor(SNAKE_COLUMNS / 2),
    y: Math.floor(SNAKE_ROWS / 2),
  };
  return {
    game,
    snake: [start, { x: start.x - 1, y: start.y }, { x: start.x - 2, y: start.y }],
    direction: "right",
    nextDirection: "right",
    food: { x: start.x + 4, y: start.y },
    foodKind: "dobok",
    ball:
      game === "balance"
        ? { x: WIDTH / 2, y: HEIGHT / 2, vx: -210, vy: 150 }
        : { x: WIDTH / 2, y: HEIGHT - 90, vx: 190, vy: -235 },
    paddleX: game === "balance" ? HEIGHT / 2 : WIDTH / 2,
    rivalPaddleY: HEIGHT / 2,
    bricks: makeBricks(1),
    lives: 3,
    player: 0,
    rival: 0,
    score: 0,
    level: 1,
    lastStep: 0,
    elapsed: 0,
    rally: 0,
    paused: false,
    ended: false,
  };
}

function drawDojang(context: CanvasRenderingContext2D, level: number) {
  const wall = context.createLinearGradient(0, 0, 0, HEIGHT);
  wall.addColorStop(0, "#25211c");
  wall.addColorStop(0.47, "#393027");
  wall.addColorStop(1, "#151713");
  context.fillStyle = wall;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  context.fillStyle = "rgba(214, 184, 143, 0.1)";
  context.fillRect(28, 34, WIDTH - 56, 2);
  context.fillStyle = "rgba(214, 184, 143, 0.055)";
  for (let x = 54; x < WIDTH; x += 88) {
    context.fillRect(x, 34, 1, 174);
  }
  context.fillStyle = "rgba(193, 155, 113, 0.08)";
  context.fillRect(52, 60, 112, 96);
  context.strokeStyle = "rgba(225, 197, 160, 0.28)";
  context.lineWidth = 2;
  context.strokeRect(52, 60, 112, 96);
  context.beginPath();
  context.moveTo(108, 60);
  context.lineTo(108, 156);
  context.moveTo(52, 108);
  context.lineTo(164, 108);
  context.stroke();
  context.fillStyle = "rgba(201, 151, 115, 0.62)";
  context.font = "34px serif";
  context.textAlign = "center";
  context.fillText("道", WIDTH - 83, 117);

  const floor = context.createLinearGradient(0, 202, 0, HEIGHT);
  floor.addColorStop(0, "#5b4c3c");
  floor.addColorStop(1, "#20231d");
  context.fillStyle = floor;
  context.beginPath();
  context.moveTo(0, 194);
  context.lineTo(WIDTH, 194);
  context.lineTo(WIDTH, HEIGHT);
  context.lineTo(0, HEIGHT);
  context.fill();
  context.save();
  context.beginPath();
  context.rect(0, 194, WIDTH, HEIGHT - 194);
  context.clip();
  for (let row = 0; row < 6; row += 1) {
    const y = 205 + row * row * 5.8;
    context.strokeStyle = `rgba(227, 203, 163, ${0.15 - row * 0.014})`;
    context.lineWidth = row === 0 ? 2 : 1;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(WIDTH, y);
    context.stroke();
  }
  for (let column = -4; column <= 4; column += 1) {
    context.strokeStyle = "rgba(21, 24, 20, 0.32)";
    context.beginPath();
    context.moveTo(WIDTH / 2 + column * 38, 196);
    context.lineTo(WIDTH / 2 + column * 150, HEIGHT);
    context.stroke();
  }
  context.restore();
  context.strokeStyle = `rgba(199, 139, 103, ${Math.min(0.58, 0.28 + level * 0.025)})`;
  context.lineWidth = 2;
  context.strokeRect(27, 215, WIDTH - 54, HEIGHT - 236);
  context.textAlign = "start";
}

function drawTatami(context: CanvasRenderingContext2D, level: number) {
  const background = context.createLinearGradient(0, 0, 0, HEIGHT);
  background.addColorStop(0, "#30322c");
  background.addColorStop(0.48, "#414239");
  background.addColorStop(1, "#202a24");
  context.fillStyle = background;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  const dojoLight = context.createRadialGradient(WIDTH / 2, 80, 12, WIDTH / 2, 115, 410);
  dojoLight.addColorStop(0, "rgba(227, 199, 155, 0.18)");
  dojoLight.addColorStop(1, "rgba(227, 199, 155, 0)");
  context.fillStyle = dojoLight;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "rgba(205, 180, 141, 0.2)";
  context.fillRect(0, 20, WIDTH, 3);
  context.fillStyle = "rgba(181, 153, 119, 0.16)";
  context.fillRect(0, HEIGHT - 22, WIDTH, 3);

  context.save();
  context.translate(WIDTH / 2, HEIGHT / 2);
  context.scale(1, 0.55);
  context.strokeStyle = "rgba(218, 195, 157, 0.17)";
  context.lineWidth = 1.5;
  for (let radius = 90; radius < 680; radius += 46) {
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();
  context.save();
  context.strokeStyle = "rgba(212, 190, 153, 0.2)";
  context.lineWidth = 1;
  for (let y = 45; y < HEIGHT; y += 38) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(WIDTH, y);
    context.stroke();
  }
  for (let x = 0; x < WIDTH; x += 54) {
    context.beginPath();
    context.moveTo(x, 24);
    context.lineTo(WIDTH / 2 + (x - WIDTH / 2) * 1.55, HEIGHT - 22);
    context.stroke();
  }
  context.restore();
  context.strokeStyle = `rgba(214, 157, 112, ${Math.min(0.72, 0.4 + level * 0.03)})`;
  context.lineWidth = 2;
  context.strokeRect(25, 30, WIDTH - 50, HEIGHT - 60);
  context.strokeStyle = "rgba(225, 210, 183, 0.35)";
  context.lineWidth = 1;
  context.strokeRect(33, 38, WIDTH - 66, HEIGHT - 76);
}

function drawKoreanGarden(context: CanvasRenderingContext2D, level: number) {
  const sky = context.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#283b3a");
  sky.addColorStop(0.52, "#8a745d");
  sky.addColorStop(1, "#d0a879");
  context.fillStyle = sky;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  const sun = context.createRadialGradient(536, 104, 4, 536, 104, 80);
  sun.addColorStop(0, "rgba(248, 216, 163, 0.85)");
  sun.addColorStop(0.45, "rgba(246, 202, 143, 0.24)");
  sun.addColorStop(1, "rgba(246, 202, 143, 0)");
  context.fillStyle = sun;
  context.fillRect(440, 8, 192, 192);

  const mountain = (
    points: [number, number][],
    color: string,
  ) => {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(points[0][0], HEIGHT);
    points.forEach(([x, y]) => context.lineTo(x, y));
    context.lineTo(WIDTH, HEIGHT);
    context.closePath();
    context.fill();
  };
  mountain(
    [[0, 186], [78, 126], [133, 163], [228, 98], [311, 158], [401, 112], [495, 163], [601, 107], [720, 169]],
    "rgba(33, 56, 49, 0.65)",
  );
  mountain(
    [[0, 234], [93, 177], [178, 219], [297, 156], [388, 216], [516, 160], [635, 219], [720, 185]],
    "rgba(30, 47, 38, 0.9)",
  );

  const ground = context.createLinearGradient(0, 222, 0, HEIGHT);
  ground.addColorStop(0, "#676343");
  ground.addColorStop(1, "#262f25");
  context.fillStyle = ground;
  context.fillRect(0, 220, WIDTH, HEIGHT - 220);
  context.strokeStyle = "rgba(222, 198, 149, 0.18)";
  for (let x = -80; x < WIDTH + 80; x += 32) {
    context.beginPath();
    context.moveTo(WIDTH / 2 + (x - WIDTH / 2) * 0.15, 220);
    context.lineTo(x, HEIGHT);
    context.stroke();
  }

  context.fillStyle = "rgba(24, 33, 28, 0.95)";
  context.beginPath();
  context.moveTo(500, 214);
  context.lineTo(528, 184);
  context.lineTo(572, 184);
  context.lineTo(600, 214);
  context.lineTo(589, 214);
  context.lineTo(589, 207);
  context.lineTo(511, 207);
  context.lineTo(511, 214);
  context.fill();
  context.fillRect(516, 214, 8, 32);
  context.fillRect(576, 214, 8, 32);
  context.fillStyle = "rgba(198, 142, 107, 0.7)";
  context.fillRect(542, 215, 15, 30);

  context.save();
  context.globalAlpha = Math.min(0.44, 0.16 + level * 0.025);
  for (let index = 0; index < 12; index += 1) {
    const x = (index * 89 + 35) % WIDTH;
    const y = 44 + ((index * 57) % 190);
    const size = 2 + (index % 3);
    context.fillStyle = index % 2 ? "#f2d1bd" : "#e7b9ae";
    context.beginPath();
    context.ellipse(x, y, size, size * 1.8, index, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawArena(
  context: CanvasRenderingContext2D,
  game: GameId,
  level: number,
) {
  if (game === "cobra") drawDojang(context, level);
  else if (game === "flower") drawKoreanGarden(context, level);
  else drawTatami(context, level);

  const vignette = context.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.2,
    WIDTH / 2,
    HEIGHT / 2,
    WIDTH * 0.8,
  );
  vignette.addColorStop(0, "rgba(8, 10, 8, 0)");
  vignette.addColorStop(1, "rgba(8, 10, 8, 0.24)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

function drawTrainingItem(
  context: CanvasRenderingContext2D,
  kind: FoodKind,
  x: number,
  y: number,
  pulse: number,
) {
  context.save();
  context.translate(x, y);
  context.shadowColor = "rgba(238, 197, 144, 0.72)";
  context.shadowBlur = 9 + pulse * 3;
  context.strokeStyle = "#f0cf9f";
  context.fillStyle = "rgba(46, 39, 31, 0.9)";
  context.lineWidth = 1.8;
  context.lineJoin = "round";
  context.lineCap = "round";

  if (kind === "dobok") {
    context.beginPath();
    context.moveTo(-8, -8);
    context.lineTo(-3, -10);
    context.lineTo(0, -5);
    context.lineTo(4, -10);
    context.lineTo(9, -8);
    context.lineTo(6, 1);
    context.lineTo(8, 9);
    context.lineTo(-8, 9);
    context.lineTo(-6, 1);
    context.closePath();
    context.fill();
    context.stroke();
    context.beginPath();
    context.moveTo(-3, -10);
    context.lineTo(0, -3);
    context.lineTo(4, -10);
    context.moveTo(-7, 2);
    context.lineTo(7, 2);
    context.stroke();
    context.fillStyle = "#a95748";
    context.fillRect(-1.5, -4, 3, 7);
  } else if (kind === "glove") {
    context.beginPath();
    context.moveTo(-6, 7);
    context.lineTo(-7, 1);
    context.lineTo(-5, -2);
    context.lineTo(-5, -7);
    context.quadraticCurveTo(-5, -10, -2, -9);
    context.lineTo(0, -4);
    context.lineTo(1, -10);
    context.quadraticCurveTo(4, -12, 5, -8);
    context.lineTo(6, -2);
    context.quadraticCurveTo(11, -1, 9, 5);
    context.lineTo(7, 9);
    context.closePath();
    context.fill();
    context.stroke();
    context.beginPath();
    context.moveTo(-5, 3);
    context.lineTo(7, 3);
    context.stroke();
  } else if (kind === "helmet") {
    context.beginPath();
    context.arc(0, 0, 9, Math.PI, 0);
    context.lineTo(9, 4);
    context.lineTo(5, 4);
    context.lineTo(4, 8);
    context.lineTo(-5, 8);
    context.lineTo(-6, 4);
    context.lineTo(-9, 4);
    context.closePath();
    context.fill();
    context.stroke();
    context.beginPath();
    context.moveTo(-7, -2);
    context.lineTo(7, -2);
    context.moveTo(0, -8);
    context.lineTo(0, 4);
    context.stroke();
  } else {
    context.beginPath();
    context.arc(0, 0, 9, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.beginPath();
    context.arc(0, 0, 5, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#cf9970";
    context.beginPath();
    context.arc(0, 0, 1.8, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawCobraHead(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: Direction,
) {
  const angle: Record<Direction, number> = {
    up: -Math.PI / 2,
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
  };
  context.save();
  context.translate(x, y);
  context.rotate(angle[direction]);
  context.shadowColor = "rgba(17, 12, 9, 0.48)";
  context.shadowBlur = 6;
  context.fillStyle = "#d6a16f";
  context.beginPath();
  context.moveTo(13, 0);
  context.quadraticCurveTo(8, 8, 0, 8);
  context.quadraticCurveTo(-7, 8, -9, 2);
  context.quadraticCurveTo(-11, -6, -4, -9);
  context.quadraticCurveTo(0, -12, 4, -8);
  context.quadraticCurveTo(11, -7, 13, 0);
  context.fill();
  context.shadowBlur = 0;
  context.strokeStyle = "#f0c997";
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(-4, -7);
  context.quadraticCurveTo(0, -15, 5, -8);
  context.fill();
  context.stroke();
  context.fillStyle = "#29231d";
  context.beginPath();
  context.arc(4, -4, 1.35, 0, Math.PI * 2);
  context.arc(4, 4, 1.35, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#704735";
  context.lineWidth = 1.2;
  context.beginPath();
  context.moveTo(10, -1.5);
  context.lineTo(15, -2.5);
  context.moveTo(10, 1.5);
  context.lineTo(15, 2.5);
  context.stroke();
  context.restore();
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawGame(context: CanvasRenderingContext2D, session: ArcadeSession) {
  drawArena(context, session.game, session.level);
  if (session.game === "cobra") {
    const offsetX = (WIDTH - SNAKE_COLUMNS * SNAKE_CELL) / 2;
    const offsetY = (HEIGHT - SNAKE_ROWS * SNAKE_CELL) / 2;
    const fieldWidth = SNAKE_COLUMNS * SNAKE_CELL;
    const fieldHeight = SNAKE_ROWS * SNAKE_CELL;
    context.save();
    context.beginPath();
    context.rect(offsetX, offsetY, fieldWidth, fieldHeight);
    context.clip();
    context.fillStyle = "rgba(18, 16, 13, 0.13)";
    context.fillRect(offsetX, offsetY, fieldWidth, fieldHeight);
    context.strokeStyle = "rgba(225, 190, 146, 0.055)";
    context.lineWidth = 1;
    for (let column = 1; column < SNAKE_COLUMNS; column += 1) {
      const x = offsetX + column * SNAKE_CELL;
      context.beginPath();
      context.moveTo(x, offsetY);
      context.lineTo(x, offsetY + fieldHeight);
      context.stroke();
    }
    for (let row = 1; row < SNAKE_ROWS; row += 1) {
      const y = offsetY + row * SNAKE_CELL;
      context.beginPath();
      context.moveTo(offsetX, y);
      context.lineTo(offsetX + fieldWidth, y);
      context.stroke();
    }
    context.restore();
    context.strokeStyle = "rgba(224, 174, 125, 0.6)";
    context.lineWidth = 2;
    context.strokeRect(offsetX, offsetY, fieldWidth, fieldHeight);

    const segmentCenter = (part: { x: number; y: number }) => ({
      x: offsetX + part.x * SNAKE_CELL + SNAKE_CELL / 2,
      y: offsetY + part.y * SNAKE_CELL + SNAKE_CELL / 2,
    });
    const bodyGradient = context.createLinearGradient(
      offsetX,
      offsetY,
      offsetX + fieldWidth,
      offsetY + fieldHeight,
    );
    bodyGradient.addColorStop(0, "#e0ae79");
    bodyGradient.addColorStop(0.5, "#bc7953");
    bodyGradient.addColorStop(1, "#875039");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    session.snake.slice().reverse().forEach((part, index) => {
      const center = segmentCenter(part);
      if (index === 0) context.moveTo(center.x, center.y);
      else context.lineTo(center.x, center.y);
    });
    context.strokeStyle = "rgba(65, 37, 27, 0.86)";
    context.lineWidth = 18;
    context.stroke();
    context.strokeStyle = bodyGradient;
    context.lineWidth = 13;
    context.stroke();
    session.snake.slice(1).forEach((part, index) => {
      if (index % 3 !== 0) return;
      const center = segmentCenter(part);
      context.fillStyle = "rgba(255, 220, 179, 0.72)";
      context.beginPath();
      context.arc(center.x, center.y, 1.7, 0, Math.PI * 2);
      context.fill();
    });
    const head = session.snake[0];
    drawCobraHead(
      context,
      offsetX + head.x * SNAKE_CELL + SNAKE_CELL / 2,
      offsetY + head.y * SNAKE_CELL + SNAKE_CELL / 2,
      session.direction,
    );
    drawTrainingItem(
      context,
      session.foodKind,
      offsetX + session.food.x * SNAKE_CELL + SNAKE_CELL / 2,
      offsetY + session.food.y * SNAKE_CELL + SNAKE_CELL / 2,
      Math.sin(session.elapsed * 9),
    );
    return;
  }

  if (session.game === "flower") {
    session.bricks.forEach((brick) => {
      if (!brick.alive) return;
      const gradient = context.createLinearGradient(brick.x, brick.y, brick.x, brick.y + 15);
      gradient.addColorStop(0, `hsl(${brick.hue + 18} 36% 59%)`);
      gradient.addColorStop(1, `hsl(${brick.hue} 31% 34%)`);
      context.fillStyle = gradient;
      roundRect(context, brick.x, brick.y, 52, 15, 3);
      context.fill();
      context.strokeStyle = "rgba(255, 232, 205, 0.4)";
      context.stroke();
      context.strokeStyle = "rgba(255, 235, 207, 0.23)";
      context.beginPath();
      context.moveTo(brick.x + 7, brick.y + 4);
      context.lineTo(brick.x + 45, brick.y + 4);
      context.stroke();
      context.fillStyle = "rgba(255, 235, 207, 0.72)";
      context.beginPath();
      context.arc(brick.x + 26, brick.y + 8, 1.2, 0, Math.PI * 2);
      context.fill();
    });
    context.save();
    context.globalAlpha = 0.72;
    context.strokeStyle = "#e4c7aa";
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(session.ball.x, session.ball.y + 10);
    context.quadraticCurveTo(session.ball.x - 17, session.ball.y + 28, session.ball.x - 27, session.ball.y + 16);
    context.stroke();
    context.restore();
    context.fillStyle = "#d6b58d";
    roundRect(context, session.paddleX - 48, HEIGHT - 35, 96, 9, 5);
    context.fill();
    context.fillStyle = "rgba(77, 53, 39, 0.7)";
    context.fillRect(session.paddleX - 28, HEIGHT - 33, 56, 2);
    context.shadowColor = "rgba(229, 185, 132, 0.7)";
    context.shadowBlur = 16;
    context.fillStyle = "#f1d1a1";
    context.beginPath();
    context.arc(session.ball.x, session.ball.y, 7, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;
    return;
  }

  context.save();
  context.strokeStyle = "rgba(223, 199, 167, 0.38)";
  context.setLineDash([8, 10]);
  context.beginPath();
  context.moveTo(WIDTH / 2, 35);
  context.lineTo(WIDTH / 2, HEIGHT - 35);
  context.stroke();
  context.setLineDash([]);
  context.fillStyle = "#c98461";
  roundRect(context, 28, session.paddleX - 42, 9, 84, 5);
  context.fill();
  context.fillStyle = "#d3c1a6";
  roundRect(context, WIDTH - 37, session.rivalPaddleY - 42, 9, 84, 5);
  context.fill();
  context.shadowColor = "rgba(236, 212, 174, 0.75)";
  context.shadowBlur = 18;
  context.fillStyle = "#ead3b2";
  context.beginPath();
  context.arc(session.ball.x, session.ball.y, 9, 0, Math.PI * 2);
  context.fill();
  context.restore();
  context.font = "600 32px Oswald, sans-serif";
  context.fillStyle = "rgba(229, 208, 176, 0.72)";
  context.textAlign = "center";
  context.fillText(String(session.player), WIDTH / 2 - 55, 58);
  context.fillText(String(session.rival), WIDTH / 2 + 55, 58);
  context.textAlign = "start";
}

function randomFood(snake: ArcadeSession["snake"]) {
  const emptyCells = Array.from(
    { length: SNAKE_COLUMNS * SNAKE_ROWS },
    (_, index) => ({
      x: index % SNAKE_COLUMNS,
      y: Math.floor(index / SNAKE_COLUMNS),
    }),
  ).filter(
    (cell) => !snake.some((part) => part.x === cell.x && part.y === cell.y),
  );
  return emptyCells.length
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null;
}

function ArcadeCanvas({
  session,
  playing,
  paused,
  onScore,
  onLevel,
  onLives,
  onRival,
  onFinish,
  onDirection,
  onStart,
  onPause,
}: {
  session: ArcadeSession;
  playing: boolean;
  paused: boolean;
  onScore: (score: number) => void;
  onLevel: (level: number) => void;
  onLives: (lives: number) => void;
  onRival: (score: number) => void;
  onFinish: (score: number) => void;
  onDirection: (direction: Direction) => void;
  onStart: () => void;
  onPause: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef(session);
  const callbacksRef = useRef({
    onScore,
    onLevel,
    onLives,
    onRival,
    onFinish,
    onPause,
  });
  sessionRef.current = session;
  callbacksRef.current = { onScore, onLevel, onLives, onRival, onFinish, onPause };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let previous = 0;
    let scoreReported = sessionRef.current.score;
    let levelReported = sessionRef.current.level;
    let livesReported = sessionRef.current.lives;
    let rivalReported = sessionRef.current.rival;
    const state = sessionRef.current;

    const finish = () => {
      if (state.ended) return;
      state.ended = true;
      state.paused = false;
      callbacksRef.current.onFinish(state.score);
    };

    const reportProgress = () => {
      if (scoreReported !== state.score) {
        scoreReported = state.score;
        callbacksRef.current.onScore(state.score);
      }
      if (levelReported !== state.level) {
        levelReported = state.level;
        callbacksRef.current.onLevel(state.level);
      }
      if (livesReported !== state.lives) {
        livesReported = state.lives;
        callbacksRef.current.onLives(state.lives);
      }
      if (rivalReported !== state.rival) {
        rivalReported = state.rival;
        callbacksRef.current.onRival(state.rival);
      }
    };

    const updateSnake = () => {
      const reversesDirection =
        oppositeDirections[state.direction] === state.nextDirection;
      if (!reversesDirection) state.direction = state.nextDirection;
      const head = { ...state.snake[0] };
      if (state.direction === "up") head.y -= 1;
      if (state.direction === "down") head.y += 1;
      if (state.direction === "left") head.x -= 1;
      if (state.direction === "right") head.x += 1;
      const eating = head.x === state.food.x && head.y === state.food.y;
      const collisionBody = eating ? state.snake : state.snake.slice(0, -1);
      if (
        head.x < 0 ||
        head.x >= SNAKE_COLUMNS ||
        head.y < 0 ||
        head.y >= SNAKE_ROWS ||
        collisionBody.some((part) => part.x === head.x && part.y === head.y)
      ) {
        finish();
        return;
      }
      state.snake.unshift(head);
      if (eating) {
        state.score += 10;
        const nextFood = randomFood(state.snake);
        if (!nextFood) {
          reportProgress();
          finish();
          return;
        }
        state.food = nextFood;
        const foodKinds: FoodKind[] = ["dobok", "glove", "helmet", "target"];
        state.foodKind = foodKinds[Math.floor(Math.random() * foodKinds.length)];
        if (state.score > 0 && state.score % 50 === 0) {
          state.level += 1;
          callbacksRef.current.onLevel(state.level);
        }
      } else {
        state.snake.pop();
      }
      reportProgress();
    };

    const updateBreakout = (delta: number) => {
      const speed = 1 + (state.level - 1) * 0.14;
      state.ball.x += state.ball.vx * speed * delta;
      state.ball.y += state.ball.vy * speed * delta;
      if (state.ball.x < 9 || state.ball.x > WIDTH - 9) state.ball.vx *= -1;
      if (state.ball.y < 9) state.ball.vy = Math.abs(state.ball.vy);
      if (
        state.ball.vy > 0 &&
        state.ball.y + 7 >= HEIGHT - 39 &&
        state.ball.y < HEIGHT - 25 &&
        Math.abs(state.ball.x - state.paddleX) < 55
      ) {
        const hit = (state.ball.x - state.paddleX) / 52;
        state.ball.y = HEIGHT - 42;
        state.ball.vx = hit * Math.min(410, 255 + state.level * 14);
        state.ball.vy = -Math.min(
          430,
          Math.max(210, Math.abs(state.ball.vy) * (1 + state.level * 0.012)),
        );
      }
      for (const brick of state.bricks) {
        if (
          brick.alive &&
          state.ball.x >= brick.x - 7 &&
          state.ball.x <= brick.x + 59 &&
          state.ball.y >= brick.y - 7 &&
          state.ball.y <= brick.y + 22
        ) {
          brick.alive = false;
          state.ball.vy *= -1;
          state.score += 10;
          break;
        }
      }
      if (state.bricks.every((brick) => !brick.alive)) {
        state.level += 1;
        state.bricks = makeBricks(state.level);
        state.paddleX = WIDTH / 2;
        state.ball = {
          x: WIDTH / 2,
          y: HEIGHT - 90,
          vx: 185 + Math.min(100, state.level * 10),
          vy: -(235 + Math.min(110, state.level * 12)),
        };
        callbacksRef.current.onLevel(state.level);
      }
      if (state.ball.y > HEIGHT + 10) {
        state.lives -= 1;
        if (state.lives <= 0) finish();
        else {
          state.ball = {
            x: WIDTH / 2,
            y: HEIGHT - 90,
            vx: 190 * (Math.random() > 0.5 ? 1 : -1),
            vy: -235,
          };
        }
      }
      reportProgress();
    };

    const updatePong = (delta: number) => {
      state.elapsed += delta;
      const difficulty = Math.min(8, state.player * 0.65 + state.elapsed / 38);
      const ballPace = Math.min(1.42, 1 + state.elapsed * 0.00065 + state.player * 0.025);
      state.ball.x += state.ball.vx * ballPace * delta;
      state.ball.y += state.ball.vy * ballPace * delta;
      if (state.ball.y < 17 || state.ball.y > HEIGHT - 17) {
        state.ball.vy *= -1;
        state.ball.y = Math.max(17, Math.min(HEIGHT - 17, state.ball.y));
      }
      if (
        state.ball.vx < 0 &&
        state.ball.x < 43 &&
        state.ball.x > 23 &&
        Math.abs(state.ball.y - state.paddleX) < 53
      ) {
        state.ball.x = 43;
        state.ball.vx = Math.min(390, Math.abs(state.ball.vx) * 1.045);
        state.ball.vy += ((state.ball.y - state.paddleX) / 53) * 95;
        state.rally += 1;
      }
      let rivalTarget = HEIGHT / 2;
      if (state.ball.vx > 0) {
        const timeToPaddle = Math.max(0, (WIDTH - 40 - state.ball.x) / (state.ball.vx * ballPace));
        const projectedY = state.ball.y + state.ball.vy * timeToPaddle;
        const arenaHeight = HEIGHT - 34;
        const foldedY =
          arenaHeight -
          Math.abs((((projectedY - 17) % (arenaHeight * 2)) + arenaHeight * 2) % (arenaHeight * 2) - arenaHeight);
        rivalTarget = foldedY + 17;
      } else {
        rivalTarget = HEIGHT / 2 + (state.ball.y - HEIGHT / 2) * 0.14;
      }
      const errorAmplitude = Math.max(13, 48 - difficulty * 4.2);
      rivalTarget += Math.sin(state.elapsed * (2.2 + difficulty * 0.15)) * errorAmplitude;
      rivalTarget = Math.max(52, Math.min(HEIGHT - 52, rivalTarget));
      const cpuSpeed = Math.min(335, 150 + difficulty * 23);
      state.rivalPaddleY += Math.max(
        -cpuSpeed * delta,
        Math.min(cpuSpeed * delta, rivalTarget - state.rivalPaddleY),
      );
      if (
        state.ball.vx > 0 &&
        state.ball.x > WIDTH - 48 &&
        state.ball.x < WIDTH - 24 &&
        Math.abs(state.ball.y - state.rivalPaddleY) < 53
      ) {
        state.ball.x = WIDTH - 48;
        state.ball.vx = -Math.min(390, Math.abs(state.ball.vx) * 1.045);
        state.ball.vy += ((state.ball.y - state.rivalPaddleY) / 53) * 105;
        state.rally += 1;
      }
      if (state.ball.x < 0) {
        state.rival += 1;
        state.rally += 1;
        state.ball = {
          x: WIDTH / 2,
          y: HEIGHT / 2,
          vx: 205,
          vy: state.rival % 2 === 0 ? 150 : -150,
        };
      } else if (state.ball.x > WIDTH) {
        state.player += 1;
        state.score = state.player;
        state.rally += 1;
        state.ball = {
          x: WIDTH / 2,
          y: HEIGHT / 2,
          vx: -205,
          vy: state.player % 2 === 0 ? -150 : 150,
        };
        reportProgress();
      }
      const nextLevel = Math.min(10, Math.floor(difficulty) + 1);
      if (nextLevel > state.level) {
        state.level = nextLevel;
        callbacksRef.current.onLevel(state.level);
      }
      reportProgress();
      if (state.player >= 7 || state.rival >= 7) finish();
    };

    const render = (time: number) => {
      const delta = Math.min((time - (previous || time)) / 1000, 0.04);
      previous = time;
      if (playing && !state.paused && !state.ended) {
        if (state.game === "cobra") {
          state.elapsed += delta;
          const interval = Math.max(88, 170 - (state.level - 1) * 9);
          if (state.elapsed * 1000 >= interval) {
            state.elapsed = 0;
            updateSnake();
          }
        } else if (state.game === "flower") {
          updateBreakout(delta);
        } else {
          updatePong(delta);
        }
      }
      drawGame(context, state);
      frame = window.requestAnimationFrame(render);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const directions: Record<string, Direction> = {
        ArrowUp: "up",
        w: "up",
        W: "up",
        ArrowDown: "down",
        s: "down",
        S: "down",
        ArrowLeft: "left",
        a: "left",
        A: "left",
        ArrowRight: "right",
        d: "right",
        D: "right",
      };
      const direction = directions[event.key];
      if (direction && state.game === "cobra") {
        event.preventDefault();
        if (
          oppositeDirections[state.direction] !== direction &&
          oppositeDirections[state.nextDirection] !== direction
        ) {
          state.nextDirection = direction;
        }
      }
      if (direction && state.game === "balance") {
        event.preventDefault();
        if (direction === "up") state.paddleX -= 38;
        if (direction === "down") state.paddleX += 38;
      }
      if (direction && state.game === "flower") {
        event.preventDefault();
        if (direction === "left") state.paddleX -= 38;
        if (direction === "right") state.paddleX += 38;
      }
      if ((event.key === " " || event.key === "p" || event.key === "P") && state.game !== "cobra") {
        event.preventDefault();
        callbacksRef.current.onPause();
      }
      state.paddleX = Math.max(52, Math.min(WIDTH - 52, state.paddleX));
    };
    const onPointerMove = (event: PointerEvent) => {
      if (state.game === "cobra" || !canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * WIDTH;
      state.paddleX =
        state.game === "flower"
          ? Math.max(50, Math.min(WIDTH - 50, x))
          : Math.max(48, Math.min(HEIGHT - 48, (event.clientY - bounds.top) / bounds.height * HEIGHT));
    };

    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("pointermove", onPointerMove);
    drawGame(context, state);
    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [playing, session.game]);

  const direction = (next: Direction) => {
    onDirection(next);
  };
  const handleOverlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onStart();
    }
  };

  return (
    <div className="arcade-board-wrap">
      <canvas
        ref={canvasRef}
        className="arcade-board"
        width={WIDTH}
        height={HEIGHT}
        aria-label={`Área de juego: ${games.find((game) => game.id === session.game)?.name}`}
      />
      {session.game === "cobra" && (
        <div className="arcade-dpad" aria-label="Controles de dirección">
          <button onClick={() => direction("up")} aria-label="Arriba">
            <ArrowUp />
          </button>
          <button onClick={() => direction("left")} aria-label="Izquierda">
            <ArrowLeft />
          </button>
          <button onClick={() => direction("down")} aria-label="Abajo">
            <ArrowUp className="rotate-180" />
          </button>
          <button onClick={() => direction("right")} aria-label="Derecha">
            <ArrowLeft className="rotate-180" />
          </button>
        </div>
      )}
      {(!playing || paused) && (
        <div
          className="arcade-board-overlay"
          role="button"
          tabIndex={0}
          aria-label={
            paused
              ? "Toca para continuar la partida"
              : session.ended
                ? "Toca para jugar otra vez"
                : "Toca para comenzar la partida"
          }
          onClick={onStart}
          onKeyDown={handleOverlayKeyDown}
        >
          <span className="arcade-board-overlay__seal">
            {paused ? "잠시만" : session.ended ? "수고했어요" : "준비"}
          </span>
          <span className="arcade-board-overlay__prompt">
            {paused
              ? "Toca para continuar"
              : session.ended
                ? "Toca para volver a jugar"
                : "Toca la pista para comenzar"}
          </span>
        </div>
      )}
    </div>
  );
}

function Emblem({ game }: { game: GameId }) {
  if (game === "flower") {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <g className="arcade-emblem__flower">
          {Array.from({ length: 5 }, (_, index) => (
            <path
              key={index}
              d="M50 51c-7-5-11-12-10-20 1-7 5-12 10-16 5 4 9 9 10 16 1 8-3 15-10 20Z"
              transform={`rotate(${index * 72} 50 50)`}
            />
          ))}
        </g>
        <circle className="arcade-emblem__flower-center" cx="50" cy="50" r="6" />
        <path className="arcade-emblem__flower-stamen" d="M50 44v-7m-4 9-5-5m13 5 5-5" />
      </svg>
    );
  }
  if (game === "balance") {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle className="arcade-emblem__taegeuk-base" cx="50" cy="50" r="38" />
        <path className="arcade-emblem__taegeuk-dark" d="M50 12a38 38 0 0 1 0 76 19 19 0 0 1 0-38 19 19 0 0 0 0-38Z" />
        <circle className="arcade-emblem__taegeuk-dot-dark" cx="50" cy="31" r="6" />
        <circle className="arcade-emblem__taegeuk-dot-light" cx="50" cy="69" r="6" />
        <circle className="arcade-emblem__taegeuk-ring" cx="50" cy="50" r="43" />
        <g className="arcade-emblem__trigram">
          <path d="M8 37h8m-8 4h8m-8 4h8" />
          <path d="M84 55h8m-8 4h8m-8 4h8" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path className="arcade-emblem__cobra-body" d="M48 39c-3 8-12 10-19 17-7 8-4 19 5 25 12 10 34 9 43-2 8-10 1-21-10-23-8-2-16 1-17 7-1 5 4 9 10 9" />
      <path className="arcade-emblem__cobra-neck" d="M49 42c-1-5-5-8-8-12" />
      <path className="arcade-emblem__cobra-hood" d="M35 27c-6-7-5-16 2-20 4-2 8 1 13 1s9-3 13-1c7 4 8 13 2 20l-6 9c-5-3-13-3-18 0l-6-9Z" />
      <path className="arcade-emblem__cobra-face" d="M39 28c4 3 8 4 11 4s7-1 11-4m-11 4v5" />
      <circle className="arcade-emblem__eye" cx="43" cy="20" r="2.2" />
      <circle className="arcade-emblem__eye" cx="57" cy="20" r="2.2" />
    </svg>
  );
}

export function HomeDojoArcade() {
  const [selected, setSelected] = useState<GameId | null>(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [rivalScore, setRivalScore] = useState(0);
  const [bestScores, setBestScores] = useState(INITIAL_BEST);
  const bestScoresRef = useRef(INITIAL_BEST);
  const [storageMessage, setStorageMessage] = useState("");
  const [paused, setPaused] = useState(false);
  const [session, setSession] = useState<ArcadeSession | null>(null);
  const sessionRef = useRef<ArcadeSession | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed: unknown = JSON.parse(saved);
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        ["cobra", "flower", "balance"].every(
          (key) =>
            typeof (parsed as Record<string, unknown>)[key] === "number" &&
            Number.isFinite((parsed as Record<string, number>)[key]) &&
            (parsed as Record<string, number>)[key] >= 0,
        )
      ) {
        const loadedScores = parsed as BestScores;
        bestScoresRef.current = loadedScores;
        setBestScores(loadedScores);
      }
    } catch {
      setStorageMessage("No se pudieron leer los récords guardados en este navegador.");
    }
  }, []);

  const saveBestScore = useCallback((game: GameId, result: number) => {
    const current = bestScoresRef.current;
    if (result <= current[game]) return;
    const next = { ...current, [game]: result };
    bestScoresRef.current = next;
    setBestScores(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      setStorageMessage("No se pudo guardar el récord en este navegador.");
    }
  }, []);

  const chooseGame = (game: GameId) => {
    const next = createSession(game);
    sessionRef.current = next;
    setSession(next);
    setSelected(game);
    setScore(0);
    setLevel(1);
    setLives(next.lives);
    setRivalScore(0);
    setPaused(false);
    setPlaying(false);
  };

  const startGame = () => {
    const game = selected;
    if (!game) return;
    const next = createSession(game);
    sessionRef.current = next;
    setSession(next);
    setScore(0);
    setLevel(1);
    setLives(next.lives);
    setRivalScore(0);
    setPaused(false);
    setPlaying(true);
  };

  const finishGame = useCallback(
    (result: number) => {
      setPlaying(false);
      setPaused(false);
      setSession((current) => {
        if (!current) return current;
        const ended = { ...current, ended: true, paused: false };
        sessionRef.current = ended;
        return ended;
      });
      if (selected) saveBestScore(selected, result);
    },
    [saveBestScore, selected],
  );

  const closeGame = () => {
    setSelected(null);
    setPlaying(false);
    setPaused(false);
    setSession(null);
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGame();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selected]);

  const updateDirection = (direction: Direction) => {
    const current = sessionRef.current;
    if (
      current &&
      current.game === "cobra" &&
      oppositeDirections[current.direction] !== direction &&
      oppositeDirections[current.nextDirection] !== direction
    ) {
      current.nextDirection = direction;
    }
  };

  const togglePause = () => {
    if (!session || session.ended) return;
    const nextPaused = !paused;
    session.paused = nextPaused;
    setPaused(nextPaused);
  };

  const handleGameSurfaceAction = () => {
    if (paused) togglePause();
    else if (!playing || session?.ended) startGame();
  };

  const selectedGame = games.find((game) => game.id === selected);
  const activeSession = session;

  return (
    <section
      id="juegos-dojang"
      className="home-arcade relative isolate overflow-hidden border-y border-border"
      data-home-scene="dojo"
    >
      <div className="home-arcade__brush" aria-hidden="true" />
      <div className="home-arcade__seal" aria-hidden="true">道</div>
      <div className="relative z-10 mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <header className="home-arcade__heading">
          <p className="eyebrow">Dojo abierto · Una pausa en el camino</p>
          <span className="home-arcade__hangul" lang="ko">정신 · 도전 · 균형</span>
          <h2 className="uppercase">
            Entrena la mente.
            <br />
            <span>Juega el camino.</span>
          </h2>
          <p>
            La cobra representa el arma de Equilibrio; la flor honra la fuerza
            de todas las mujeres; el yin-yang nos recuerda vivir en balance.
            Elige un símbolo y pon a prueba tu espíritu marcial.
          </p>
        </header>

        <div className="home-arcade__games" aria-label="Elige un minijuego">
          {games.map((game, index) => (
            <button
              key={game.id}
              type="button"
              className={`arcade-card arcade-card--${game.accent}`}
              onClick={() => chooseGame(game.id)}
            >
              <span className="arcade-card__number">0{index + 1}</span>
              <span className="arcade-card__emblem"><Emblem game={game.id} /></span>
              <span className="arcade-card__copy">
                <span className="arcade-card__korean" lang="ko">{game.korean}</span>
                <span className="arcade-card__name">{game.name}</span>
                <span className="arcade-card__subtitle">{game.subtitle}</span>
                <span className="arcade-card__description">{game.description}</span>
              </span>
              <span className="arcade-card__record">
                <span>Récord local</span>
                <strong>{bestScores[game.id]} pts</strong>
              </span>
              <span className="arcade-card__action">
                Abrir juego <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
        {storageMessage && !selected && (
          <p className="arcade-storage-message" role="status">{storageMessage}</p>
        )}
        <footer className="home-arcade__footer">
          <span>수련은 계속된다 · La práctica continúa</span>
          <span>Los récords se guardan solo en tu dispositivo</span>
        </footer>
      </div>
      {selected && selectedGame && activeSession && createPortal(
        <div
          className="arcade-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGame();
          }}
        >
          <section
            className={`arcade-console arcade-console--${selectedGame.accent}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="arcade-dialog-title"
          >
            <div className="arcade-console__top">
              <span className="arcade-console__korean" lang="ko">{selectedGame.korean}</span>
              <button className="arcade-console__close" onClick={closeGame} aria-label="Cerrar juego">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="arcade-console__layout">
              <div className="arcade-console__stage">
                <div className="arcade-console__game-heading">
                  <div>
                    <p className="eyebrow">Dojang · sala de práctica</p>
                    <h3 id="arcade-dialog-title">
                      {selectedGame.name}<span> / {selectedGame.subtitle}</span>
                    </h3>
                  </div>
                  <span className="arcade-console__live">
                    <i aria-hidden="true" />
                    {playing ? (paused ? "En pausa" : "En juego") : session.ended ? "Partida terminada" : "Listo para jugar"}
                  </span>
                </div>
                <aside className={`arcade-scorecard arcade-scorecard--${selected}`} aria-label="Estadísticas de la partida">
                  <div className="arcade-scorecard__item">
                    <span>{selected === "balance" ? "Tu marcador" : "Puntos"}</span>
                    <strong>{score}{selected === "balance" && <small> / 7</small>}</strong>
                  </div>
                  {selected !== "balance" && (
                    <div className="arcade-scorecard__item">
                      <span>{selected === "cobra" ? "Do" : "Nivel"}</span>
                      <strong>{level.toString().padStart(2, "0")}</strong>
                    </div>
                  )}
                  {selected === "flower" && (
                    <div className="arcade-scorecard__item">
                      <span>Vidas</span>
                      <strong className="arcade-scorecard__lives">
                        {"● ".repeat(lives)}
                        <span>{"● ".repeat(Math.max(0, 3 - lives))}</span>
                      </strong>
                    </div>
                  )}
                  {selected === "balance" && (
                    <div className="arcade-scorecard__item">
                      <span>CPU</span>
                      <strong>{rivalScore}<small> / 7</small></strong>
                    </div>
                  )}
                  <div className="arcade-scorecard__record">
                    <span>Récord personal</span>
                    <strong>{bestScores[selected]} <small>pts</small></strong>
                    <span className="arcade-scorecard__saved">Guardado en este dispositivo</span>
                  </div>
                </aside>
                <ArcadeCanvas
                  session={activeSession}
                  playing={playing}
                  paused={paused}
                  onScore={setScore}
                  onLevel={setLevel}
                  onLives={setLives}
                  onRival={setRivalScore}
                  onFinish={finishGame}
                  onDirection={updateDirection}
                  onStart={handleGameSurfaceAction}
                  onPause={togglePause}
                />
                <div className="arcade-console__controls">
                  <p>
                    {selected === "cobra"
                      ? "Flechas o WASD · gira antes del límite y reúne equipo"
                      : selected === "flower"
                        ? "Mueve con el puntero o ← → · espacio para pausar"
                        : `Puntero o ↑ ↓ · rival nivel ${level.toString().padStart(2, "0")}`}
                  </p>
                  <div className="arcade-console__buttons">
                    {playing && (
                      <button
                        className="arcade-icon-button"
                        onClick={togglePause}
                        aria-label={paused ? "Continuar" : "Pausar"}
                        title={paused ? "Continuar" : "Pausar"}
                      >
                        <Pause aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {storageMessage && <p className="arcade-storage-message" role="status">{storageMessage}</p>}
          </section>
        </div>,
        document.body,
      )}
    </section>
  );
}
