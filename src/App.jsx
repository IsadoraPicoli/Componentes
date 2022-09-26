import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
import originalData from './data/npkgz.json';
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

  const transformedDataset = 
    originalData.map((data) => {
     data.starred_at = new Date(data.starred_at);

     data.day = data.starred_at.getDate();
     data.quantidadeDia = _.countBy(transformedDataset, (record) => `${record.year}-${record.month}-${record.day}`);

     data.month = data.starred_at.getMonth();
     data.quantidadeMes = _.countBy(transformedDataset, (record) => `${record.year}-${record.month}`);

     data.year = data.starred_at.getFullYear();
     data.quantidadeAno = _.countBy(transformedDataset, 'year');

     return data; 
    });

  return (
    <div>
      <h1>Visualização de dados temporais de estrelas no GitHub</h1>

      <div className="line-chart">
        <LineChart width={400} height={400} data={transformedDataset}>
          <Line type="monotone" dataKey="quantidadeAno" stroke="#ef476f" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
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