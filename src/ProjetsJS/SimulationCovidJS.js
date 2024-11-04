import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';
import '../styles/SimulationCovid.css';

const SimulationComponent = () => {
  const [populationSize, setPopulationSize] = useState(100);
  const [infectionRate, setInfectionRate] = useState(0.3);
  const [recoveryTime, setRecoveryTime] = useState(300);
  const [mortalityRate, setMortalityRate] = useState(0.05);
  const [capacityThreshold, setCapacityThreshold] = useState(30);
  const [running, setRunning] = useState(false);
  const [statistics, setStatistics] = useState({
    susceptibles: 0,
    infectes: 0,
    retablis: 0,
    decedes: 0,
  });

  const sketchRef = useRef();
  const susceptibles = useRef([]);
  const infectes = useRef([]);
  const retablis = useRef([]);
  const decedes = useRef([]);

  useEffect(() => {
    const sketch = (p) => {
      let population = [];
      const infectionRadius = 10;
      const speed = 2;

      class Person {
        constructor() {
          this.x = p.random(p.width / 2);
          this.y = p.random(p.height);
          this.vx = p.random(-speed, speed);
          this.vy = p.random(-speed, speed);
          this.state = 'S';
          this.infectedTime = 0;
        }

        move() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > p.width / 2) this.vx *= -1;
          if (this.y < 0 || this.y > p.height) this.vy *= -1;
          this.x = p.constrain(this.x, 0, p.width / 2);
          this.y = p.constrain(this.y, 0, p.height);
        }

        infect(other) {
          if (this.state === 'I' && other.state === 'S') {
            const d = p.dist(this.x, this.y, other.x, other.y);
            if (d < infectionRadius && p.random() < infectionRate) {
              other.state = 'I';
              other.infectedTime = 0;
            }
          }
        }

        update(currentMortalityRate) {
          if (this.state === 'I') {
            this.infectedTime++;
            if (this.infectedTime > recoveryTime) {
              if (p.random() < currentMortalityRate) {
                this.state = 'D';
              } else {
                this.state = 'R';
              }
            }
          }
        }

        show() {
          if (this.state === 'S') p.fill(0, 0, 255);
          else if (this.state === 'I') p.fill(255, 0, 0);
          else if (this.state === 'R') p.fill(0, 255, 0);
          if (this.state !== 'D') {
            p.noStroke();
            p.ellipse(this.x, this.y, 10, 10);
          }
        }
      }

      const resetSimulation = () => {
        population = [];
        for (let i = 0; i < populationSize; i++) {
          population.push(new Person());
        }
        population[0].state = 'I';
      };

      const drawGraph = () => {
        const graphWidth = p.width / 2;
        const graphHeight = p.height;

        p.push();
        p.translate(p.width / 2, 0);
        p.stroke(0);
        p.line(0, graphHeight, graphWidth, graphHeight);
        p.line(0, 0, 0, graphHeight);

        const drawCurve = (data, color) => {
          p.stroke(color);
          p.noFill();
          p.beginShape();
          data.forEach((value, i) => {
            const x = p.map(i, 0, data.length, 0, graphWidth);
            const y = p.map(value, 0, populationSize, graphHeight, 0);
            p.vertex(x, y);
          });
          p.endShape();
        };

        drawCurve(susceptibles.current, [0, 0, 255]);
        drawCurve(infectes.current, [255, 0, 0]);
        drawCurve(retablis.current, [0, 255, 0]);
        drawCurve(decedes.current, [0, 0, 0]);

        p.pop();
      };

      p.setup = () => {
        p.createCanvas(1200, 600);
        resetSimulation();
      };

      p.draw = () => {
        if (running) {
          p.background(255);
          let numSusceptibles = 0;
          let numInfectes = 0;
          let numRetablis = 0;
          let numDecedes = 0;

          const currentMortalityRate = mortalityRate + (population.filter(p => p.state === 'I').length > capacityThreshold ? 0.05 : 0);

          for (let i = population.length - 1; i >= 0; i--) {
            const person = population[i];
            person.move();
            person.update(currentMortalityRate);
            person.show();
            for (let other of population) {
              if (person !== other) person.infect(other);
            }

            if (person.state === 'S') numSusceptibles++;
            else if (person.state === 'I') numInfectes++;
            else if (person.state === 'R') numRetablis++;
            else if (person.state === 'D') {
              population.splice(i, 1);
              numDecedes++;
            }
          }

          setStatistics((prevStatistics) => ({
            susceptibles: numSusceptibles,
            infectes: numInfectes,
            retablis: numRetablis,
            decedes: prevStatistics.decedes + numDecedes,
          }));

          susceptibles.current.push(numSusceptibles);
          infectes.current.push(numInfectes);
          retablis.current.push(numRetablis);
          decedes.current.push(statistics.decedes);

          drawGraph();
        }
      };
    };

    const canvas = new p5(sketch, sketchRef.current);
    return () => {
      canvas.remove();
    };
  }, [populationSize, infectionRate, recoveryTime, mortalityRate, capacityThreshold, running]);

  const startSimulation = () => setRunning(true);
  const pauseSimulation = () => setRunning(false);

  return (
    <div className="container">
      <div className="controls">
        <label>Population: </label>
        <input type="number" value={populationSize} onChange={(e) => setPopulationSize(Number(e.target.value))} />
        <label>Infection Rate: </label>
        <input type="number" value={infectionRate} onChange={(e) => setInfectionRate(Number(e.target.value))} />
        <label>Recovery Time: </label>
        <input type="number" value={recoveryTime} onChange={(e) => setRecoveryTime(Number(e.target.value))} />
        <label>Mortality Rate: </label>
        <input type="number" value={mortalityRate} onChange={(e) => setMortalityRate(Number(e.target.value))} />
        <label>Hospital Capacity: </label>
        <input type="number" value={capacityThreshold} onChange={(e) => setCapacityThreshold(Number(e.target.value))} />
        <button onClick={startSimulation}>Démarrer</button>
        <button onClick={pauseSimulation}>Pause</button>
      </div>
      <div className="statistics">
        <div>Susceptibles: <span>{statistics.susceptibles}</span></div>
        <div>Infectés: <span>{statistics.infectes}</span></div>
        <div>Rétablis: <span>{statistics.retablis}</span></div>
        <div>Décédés: <span>{statistics.decedes}</span></div>
      </div>
      <div ref={sketchRef}></div>
    </div>
  );
};

export default SimulationComponent;
