import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import styles from './styles.module.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CostComparison = () => {
  const [selectedSize, setSelectedSize] = useState("small");

  const dataConfig = {
    small: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [2083, 1956, 1610, 1536, 0],
      clusterCosts: [949, 1105, 953, 906, 251],
      label: "8 vCPU, 32GB RAM, 500GB storage"
    },
    medium: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [8095, 7154, 6217, 5586, 0],
      clusterCosts: [3557, 3913, 3588, 3324, 843],
      label: "32 vCPU, 128GB RAM, 1TB storage"
    },
    large: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [33748, 31127, 28530, 0, 0],
      clusterCosts: [15463, 18872, 15495, 0, 0],
      label: "96 vCPU, 768GB RAM, 10TB storage"
    },
  };

  const { labels, cloudManagedCosts, clusterCosts, label } = dataConfig[selectedSize];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Cloud-managed PostgreSQL",
        data: cloudManagedCosts,
        backgroundColor: "#FFA726",
        barThickness: 60,
      },
      {
        label: "PostgreSQL Cluster",
        data: clusterCosts,
        backgroundColor: "#42A5F5",
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (context) => `$${context.raw}/month` },
      },
    },
    scales: {
      x: { display: true, grid: { display: false } },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Cost (USD/month)" },
      },
    },
  };

  return (
    <div className={styles.costComparisonSection}>
      <div className={styles.textBlock}>
        <h1>Cost comparison</h1>
        <p>
          The open-source alternative to cloud-managed databases with maximum cost-efficiency infrastructure.
        </p>
      </div>
      <div className={styles.chartAndTextContainer}>
        <div className={styles.chartContainer}>
          <h4>PostgreSQL Cluster vs Cloud-managed database</h4>
          <div className={styles.dropdown}>
            <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
              {Object.entries(dataConfig).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <Bar data={chartData} options={options} />
          <p className={styles.smallText}>
            Note: Prices for a DB cluster with a primary DB instance and two readable standby DB instances.
          </p>
        </div>
        <div className={styles.textContainer}>
          <p>
            You gain the reliability of RDS-level service without additional costs, as our product is completely free.
          </p>
          <p>
            This means you only pay for the server resources you use, avoiding the overhead of managed database service fees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostComparison;
