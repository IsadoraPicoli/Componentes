import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './data/amzn.json';
import './data/npkgz.json';
import './data/openjdk.json';

function App() {
  const data = [{Date: 'Page A', uv: 400, pv: 2400, Stargazers: 2400}, {Date: 'Page B', uv: 800, pv: 5000, Stargazers: 5000}, {Date: 'Page C', uv: 100, pv: 700, Stargazers: 700}]
  
  return (
    <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#ef476f" />
    <Line type="monotone" dataKey="pv" stroke="#06d6a0" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="Date" />
    <YAxis dataKey="Stargazers" />
    <Tooltip />
  </LineChart>
  )
}

export default App
