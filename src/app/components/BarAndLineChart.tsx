'use client'
import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarAndLineChartProps {
  data: number[];  // Accepts data array
}

function BarAndLineChart({ data }: BarAndLineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'center',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    };

    const chartData: ChartData = {
      labels: ['PVC1', 'PVC2', 'PVC3'],  // Static labels
      datasets: [
        {
          type: 'bar' as const,
          label: 'ระดับน้ำ(cm.) ',
          data,  // Use the passed `data` array here
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const mixedChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options,
    });

    return () => {
      mixedChart.destroy();
    };
  }, [data]);  // Re-run the effect if `data` changes

  return (
    <div className="chart-container h-[300px] px-6 pt-8 overflow-scroll flex flex-col items-center hide-scrollbar">
      <canvas ref={chartRef} />
    </div>
  );
}

export default BarAndLineChart;
