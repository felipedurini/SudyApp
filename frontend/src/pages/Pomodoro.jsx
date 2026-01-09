import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";

const RADIUS = 90;
const BASE_STROKE = 13;     // rojo / verde
const OVERLAY_STROKE = 14;  // blanco
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// audios (se crean una sola vez)
const studyEndSound = new Audio("/study-end.wav");
const breakEndSound = new Audio("/break-end.wav");

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [mode, setMode] = useState("work"); // work | break
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [running, setRunning] = useState(false);

  const totalSeconds =
    mode === "work" ? workMinutes * 60 : breakMinutes * 60;

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setRunning(false);
  }, [workMinutes, breakMinutes, mode, totalSeconds]);

  useEffect(() => {
    if (!running) return;

    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          const next = mode === "work" ? "break" : "work";

          if (next === "break") {
            studyEndSound.currentTime = 0;
            studyEndSound.play();
          } else {
            breakEndSound.currentTime = 0;
            breakEndSound.play();
          }

          setMode(next);
          return next === "work"
            ? workMinutes * 60
            : breakMinutes * 60;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [running, mode, workMinutes, breakMinutes]);

  const progress = secondsLeft / totalSeconds;
  const offset = CIRCUMFERENCE * progress;

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const color = mode === "work" ? "#ef4444" : "#22c55e";

  return (
    <div className="min-h-screen bg-zinc-50">
      <AppHeader />

      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-medium text-zinc-900">
          Pomodoro
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          La técnica Pomodoro es un método de estudio que propone
          trabajar en bloques de tiempo concentrado, seguidos de
          descansos cortos.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          El nombre proviene del temporizador de cocina con forma
          de tomate (“pomodoro”) que utilizaba Francesco Cirillo.
        </p>

        {/* Timer */}
        <div className="mt-10 flex flex-col items-center">
          <svg width="220" height="220">
            {/* base = tiempo total (color) */}
            <circle
              cx="110"
              cy="110"
              r={RADIUS}
              stroke={color}
              strokeWidth={BASE_STROKE}
              fill="none"
            />

            {/* overlay = tiempo consumido (blanco) */}
            <circle
              cx="110"
              cy="110"
              r={RADIUS}
              stroke="#e5e7eb"
              strokeWidth={OVERLAY_STROKE}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 110 110)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-zinc-800 text-3xl font-mono"
            >
              {mm}:{ss}
            </text>
          </svg>

          <p className="mt-4 text-sm text-zinc-600">
            {mode === "work"
              ? "Tiempo de estudio"
              : "Tiempo de descanso"}
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="rounded-xl bg-zinc-900 px-6 py-2.5 text-sm
                         text-white hover:bg-zinc-800"
            >
              {running ? "Pausar" : "Iniciar"}
            </button>

            <button
              onClick={() => {
                setRunning(false);
                setMode("work");
                setSecondsLeft(workMinutes * 60);
              }}
              className="rounded-xl border border-zinc-300 px-6 py-2.5
                         text-sm text-zinc-700 hover:bg-zinc-100"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Configuración */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-700">
              Minutos de estudio
            </label>
            <input
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-300
                         px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-700">
              Minutos de descanso
            </label>
            <input
              type="number"
              min={1}
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-zinc-300
                         px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
