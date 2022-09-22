import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './data/amzn.json';
import './data/npkgz.json';
import './data/openjdk.json';
import './App.css';

const SERIES = ["day", "week", "mouth", "year"];
const SCALE = ["Linear", "Logaritmic",];

function App() {
  const [series, setSeries] = useState(SERIES[0]);
  const [scale, setScale] = useState(SCALE[0]);

  const handleChangeSeries = event =>
    setSeries(event.target.value);

  const handleChangeScale = event =>
    setScale(event.target.value);
  const data = [{Starred_at: 'Page A', uv: 400, pv: 2400, Stargazers: 2400}, {Starred_at: 'Page B', uv: 800, pv: 5000, Stargazers: 5000}, {Starred_at: 'Page C', uv: 100, pv: 700, Stargazers: 700}];
  
  return (
    <div>
      <h1>Visualização de dados temporais de estrelas no GitHub</h1>

      <div className="line-chart">
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#ef476f" />
          <Line type="monotone" dataKey="pv" stroke="#06d6a0" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="Starred_at" />
          <YAxis dataKey="Stargazers" />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>

      <div className="container">
        <div className="selector">
          <label for="series_select" className="label">
            <strong>Series: </strong>
          </label>
          <select id="series_select" onChange={handleChangeSeries}>
            {SERIES.map(s => <option key={s} value={s}>By {s}</option>)}
          </select>
        </div>
        
        <div className="selector">
          <label for="scale_select" className="label">
            <strong>Scale: </strong>
          </label>
          <select onChange={handleChangeScale}>
            {SCALE.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default App