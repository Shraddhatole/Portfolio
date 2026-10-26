import {
  AppWindow, ChartColumn, BrainCircuit, CodeXml, Cpu, Database, Lightbulb, MessageSquareText,
  Network, ChartPie, ScanSearch, Sigma, TrendingUp, Workflow, Wrench, Circle,
} from 'lucide-react'

// Icon names are stored as strings in src/data — add new ones to this map
const map = {
  AppWindow, ChartColumn, BrainCircuit, CodeXml, Cpu, Database, Lightbulb, MessageSquareText,
  Network, ChartPie, ScanSearch, Sigma, TrendingUp, Workflow, Wrench,
}

export default function Icon({ name, size = 22, ...rest }) {
  const C = map[name] || Circle
  return <C size={size} aria-hidden="true" {...rest} />
}
