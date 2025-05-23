
import React from 'react';
import HeatMap from 'react-heatmap-grid';

const HeatmapResult = () => {
  const xLabels = ['Ahri', 'Yasuo', 'Lux'];
  const yLabels = ['유사도'];
  const data = [[84.3, 76.5, 63.3]];

  console.log("🧪 xLabels:", xLabels);
  console.log("🧪 yLabels:", yLabels);
  console.log("🧪 data:", data);

  const isValid =
    Array.isArray(xLabels) &&
    Array.isArray(yLabels) &&
    Array.isArray(data) &&
    Array.isArray(data[0]);

  if (!isValid) {
    return <p style={{ color: 'red' }}>❌ 히트맵 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto', marginBottom: '20px' }}>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        squares
        height={60}
        xLabelsStyle={{ color: '#000', fontSize: '14px' }}
        yLabelsStyle={{ color: '#000', fontSize: '14px' }}
        cellStyle={{
          fontSize: '16px',
          color: '#fff',
          fontWeight: 'bold'
        }}
        background={(x, y, val) => {
          const alpha = Math.max(val / 100, 0.3);
          return `rgba(0, 123, 255, ${alpha})`;
        }}
        cellRender={(x, y, value) => `${value}%`}
      />
    </div>
  );
};

export default HeatmapResult;
