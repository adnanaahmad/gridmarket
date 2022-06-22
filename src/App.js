import LineChartExample from './components/lineChart';
import StackedBar from './components/stacked';
import HeatmapExample from './components/heatmap';
import ScatterPlot from './components/scatterplot';
import BoxplotExample from './components/boxPlot';
import Violinplot from './components/violinplot';
import Piechart from './components/piechart';
import HeatMapVisx from './visx/components/heatmap';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import ViolinplotVisx from './visx/components/violinplot';
import BoxplotVisx from './visx/components/boxplot';
import LineplotVisx from './visx/components/lineplot';
import ScatterPlotVisx from './visx/components/scatterplot';
import BarchartVisx from './visx/components/barchart';


function App() {
  return (
    <div style={{padding: 5, height: '100%'}}>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Real Data Examples</div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>Solar_gen</div>
        <div style={{width: '100%'}}>
          <LineChartExample/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Hour</div>
        </div>
      </div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>IRR</div>
        <div style={{width: '100%'}}>
          <ScatterPlot/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Capex_Payback</div>
        </div>
      </div>
      <div style={{ marginBottom: '100px'}}>
        <StackedBar/>
      </div>
      <div style={{ marginBottom: '100px', height: 500, width: '100%'}}>
        <Violinplot/>
      </div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>Hour</div>
        <div style={{width: '100%'}}>
          <HeatmapExample/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Day</div>
        </div>
      </div>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Mock Data Examples</div>
      <div style={{ marginBottom: '100px'}}>
        <BoxplotExample/>
      </div>
      {/* <div style={{ marginBottom: '100px'}}>
        <Piechart/>
      </div> */}
      {/* <div style={{width: '100%', border: '1px solid', marginBottom: 100}}></div>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'xx-large'}}>
        Visx Charts
      </div>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Real Data Examples</div>
      <div style={{height: 500, width: 600, marginBottom: '100px'}}>
        <ParentSize>{({ width, height }) => <HeatMapVisx width={width} height={height} />}</ParentSize>
      </div>
      <div style={{marginBottom: '100px', height: 500}}>
        <ParentSize>{({ width, height }) => <ScatterPlotVisx width={width} height={height} />}</ParentSize>
      </div>
      <div style={{marginBottom: '100px', height: 500}}>
        <ParentSize>{({ width, height }) => <BarchartVisx width={width} height={height} />}</ParentSize>
      </div>
      <div style={{marginBottom: '100px', height: 500}}>
        <ParentSize>{({ width, height }) => <LineplotVisx width={width} height={height} />}</ParentSize>
      </div>
      <div style={{marginBottom: '100px', height: 500}}>
        <ParentSize>{({ width, height }) => <ViolinplotVisx width={width} height={height} />}</ParentSize>
      </div>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>
        Mock Data Example
      </div>
      <div style={{marginBottom: '100px', height: 500}}>
        <ParentSize>{({ width, height }) => <BoxplotVisx width={width} height={height} />}</ParentSize>
      </div> */}
    </div>
  );
}

export default App;
