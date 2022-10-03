/* Os códigos comentados estão relacionados a mudança de escala do gráfico */

import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
import originalData from './data/npkgz.json';
import './App.css';
// import { scaleLog } from 'd3-scale';

const SERIES = ["day", "week", "mouth", "year"];
const SCALE = ["Linear", "Logarithmic"];

export function Componente() {
  const [series, setSeries] = useState(SERIES[0]);
  const [scale, setScale] = useState(SCALE[0]);
  
  const transformedDataset = 
    originalData.map((data) => {
     data.starred_at = new Date(data.starred_at);
     data.day = data.starred_at.getDate();
     data.week = data.starred_at.getDay();
     data.month = data.starred_at.getMonth();
     data.year = data.starred_at.getFullYear();
     return data; 
    });

  const quantidadeDia = _.countBy(transformedDataset, (record) => `${record.year}/${record.month}/${record.day}`);
  const quantidadeSemana = _.countBy(transformedDataset, (record) => `${record.week}`);
  const quantidadeMes = _.countBy(transformedDataset, (record) => `${record.year}/${record.month}`);
  const quantidadeAno = _.countBy(transformedDataset, 'year');
  
  let final = Object.entries(quantidadeDia).map((dado) => {
    return {
      'Data': dado[0],
      'Quantidade': dado[1]
    }
  });

  // let escala = "auto";

  const handleChangeSeries = event => {
    setSeries(event.target.value);
  }
  
  const handleChangeScale = event =>
    setScale(event.target.value);

  if (series === SERIES[0]) {
    final = Object.entries(quantidadeDia).map((dado) => {
      return {
        'Data': dado[0],
        'Quantidade': dado[1]
      }
    });
  } else if (series === SERIES[1]) {
    final = Object.entries(quantidadeSemana).map((dado) => {
      return {
        'Data': dado[0],
        'Quantidade': dado[1]
      }
    });
  } else if (series === SERIES[2]) {
    final = Object.entries(quantidadeMes).map((dado) => {
      return {
        'Data': dado[0],
        'Quantidade': dado[1]
      }
    });
  } else if (series === SERIES[3]) {
    final = Object.entries(quantidadeAno).map((dado) => {
      return {
        'Data': dado[0],
        'Quantidade': dado[1]
      }
    }); 
  }

  /*
  if (scale === SCALE[0]) {
    escala = "linear";
  } else if (scale === SCALE[1]) {
    escala = "log";
  }
  */

  return (
    <div>
    <h1>Visualização de dados temporais de estrelas no GitHub</h1>

    <div className="line-chart">
      <LineChart width={700} height={500} data={final}>
        <Line type="monotone" dataKey="Quantidade" stroke="#ef476f" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="Data"  scale={escala}  />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>

    <div className="container">
      <div className="selector">
        <label htmlFor="series_select" className="label">
          <strong>Series: </strong>
        </label>
        <select id="series_select" onChange={handleChangeSeries}>
          {SERIES.map(s => <option key={s} value={s}>By {s}</option>)}
        </select>
      </div>
      
      <div className="selector">
        <label htmlFor="scale_select" className="label">
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