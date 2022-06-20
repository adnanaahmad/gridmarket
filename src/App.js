import LineChartExample from './components/lineChart';
import StackedBar from './components/stacked';
import HeatmapExample from './components/heatmap';
import ScatterPlot from './components/scatterplot';
import BoxplotExample from './components/boxPlot';
import Violinplot from './components/violinplot';
import Piechart from './components/piechart';

function App() {
  return (
    <div style={{padding: 5}}>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Real Data Examples</div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>Latitude</div>
        <div style={{width: '100%'}}>
          <LineChartExample/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Longitude</div>
        </div>
      </div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>Country</div>
        <div style={{width: '100%'}}>
          <HeatmapExample/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Longitude</div>
        </div>
      </div>
      <div style={{direction: 'row', display: 'flex', width: '100%', marginBottom: '100px'}}>
        <div style={{margin: 'auto'}}>Latitude</div>
        <div style={{width: '100%'}}>
          <ScatterPlot/>
          <div style={{marginTop: 2, margin: 'auto', textAlign: 'center'}}>Longitude</div>
        </div>
      </div>
      <div style={{marginBottom: 100, marginLeft: 50, marginTop: 20, fontWeight: 500, fontSize: 'large', textDecoration: 'underline'}}>Mock Data Examples</div>
      <div style={{ marginBottom: '100px'}}>
        <StackedBar/>
      </div>
      <div style={{ marginBottom: '100px'}}>
        <BoxplotExample/>
      </div>
      <div style={{ marginBottom: '100px'}}>
        <Violinplot/>
      </div>
      <div>
        <Piechart/>
      </div>

    </div>
  );
}

export default App;
