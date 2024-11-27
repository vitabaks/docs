import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CostComparisonComponent = () => {
  const [selectedSize, setSelectedSize] = useState("small");
  const [aspectRatio, setAspectRatio] = useState(1.7);
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth > 480 ? 1.7 : 1.2);
    };

    handleResize(); // Set initial aspect ratio based on window size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dataConfig = {
    small: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [2083, 1956, 1610, 1536, 0],
      clusterCosts: [949, 1105, 953, 906, 267],
      cloudManagedDetails: [
        "Amazon RDS for PostgreSQL",
        "Google Cloud SQL for PostgreSQL",
        "Azure Database for PostgreSQL",
        "DigitalOcean PostgreSQL",
        "Hetzner Cloud PostgreSQL (Not Available)"
      ],
      clusterDetails: [
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster (€251/month)"
      ],
      setupsManaged: [
        "db.m6id.2xlarge with 500GB EBS gp3",
        "Enterprise edition: 8 vCPU, 32GB RAM, 500GB storage",
        "D8s v3 with 500GB Standard SSD (LRS)",
        "8 vCPU, 32GB RAM, 500GB storage",
        "-"
      ],
      setupsCluster: [
        "m6i.2xlarge with 500GB EBS gp3",
        "n2-standard-8 with 500GB pd-ssd",
        "D8s v5 with 500GB Standard SSD (LRS)",
        "g-8vcpu-32gb with 500GB SSD",
        "CCX33 with 500GB SSD"
      ],
      differences: [-54, -43, -41, -41, "0"],
      label: "8 vCPU, 32GB RAM, 500GB storage"
    },
    medium: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [8095, 7154, 6217, 5586, 0],
      clusterCosts: [3557, 3913, 3588, 3324, 896],
      cloudManagedDetails: [
        "Amazon RDS for PostgreSQL",
        "Google Cloud SQL for PostgreSQL",
        "Azure Database for PostgreSQL",
        "DigitalOcean PostgreSQL",
        "Hetzner Cloud PostgreSQL (Not Available)"
      ],
      clusterDetails: [
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster (€843/month)"
      ],
      setupsManaged: [
        "db.m6id.8xlarge with 1TB EBS gp3",
        "Enterprise edition: 32 vCPU, 128GB RAM, 1TB storage",
        "D32s v5 with 1TB Standard SSD (LRS)",
        "32 vCPU, 128GB RAM, 1TB storage",
        "-"
      ],
      setupsCluster: [
        "m6i.8xlarge with 1TB EBS gp3",
        "n2-standard-32 with 10TB pd-ssd",
        "D32s v5 with 1TB Standard SSD (LRS)",
        "g-32vcpu-128gb with 1TB SSD",
        "CCX53 with 1TB SSD"
      ],
      differences: [-56, -45, -42, -40, "0"],
      label: "32 vCPU, 128GB RAM, 1TB storage"
    },
    large: {
      labels: ["AWS", "GCP", "Azure", "DigitalOcean", "Hetzner"],
      cloudManagedCosts: [33748, 31127, 28530, 0, 0],
      clusterCosts: [15463, 18872, 15495, 0, 0],
      cloudManagedDetails: [
        "Amazon RDS for PostgreSQL",
        "Google Cloud SQL for PostgreSQL",
        "Azure Database for PostgreSQL",
        "-",
        "-"
      ],
      clusterDetails: [
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "PostgreSQL Cluster",
        "-",
        "-"
      ],
      setupsManaged: [
        "db.r6id.24xlarge with 10TB EBS gp3",
        "Enterprise edition: 96 vCPU, 624GB RAM, 10TB storage",
        "E96ds v5 with 10TB Standard SSD (LRS)",
        "-",
        "-"
      ],
      setupsCluster: [
        "r6i.24xlarge with 10TB EBS gp3",
        "n2-highmem-96 with 10TB pd-ssd",
        "E96s v5 with 10TB Standard SSD (LRS)",
        "-",
        "-"
      ],
      differences: [-54, -39, -41, "0", "0"],
      label: "96 vCPU, 768GB RAM, 10TB storage"
    }
  };

  const { labels, cloudManagedCosts, clusterCosts, cloudManagedDetails, clusterDetails, setupsManaged, setupsCluster, differences, label } = dataConfig[selectedSize];

  const chartData = {
    labels,
    datasets: [
      {
        label: "PostgreSQL Cluster",
        data: clusterCosts,
        backgroundColor: "#42A5F5",
        stack: 'stack1',
        order: 1,
      },
      {
        label: "Cloud-managed Postgres",
        data: cloudManagedCosts,
        backgroundColor: "#FFA726",
        stack: 'stack1',
        order: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            if (context.dataset.label === "Cloud-managed Postgres") {
              return [
                `Service: ${cloudManagedDetails[index]}`,
                `Setup: ${setupsManaged[index]}`,
                `Cost: $${cloudManagedCosts[index]}/month`
              ];
            } else if (context.dataset.label === "PostgreSQL Cluster") {
              const savingsText = differences[index] !== "0" ? `Savings: ${differences[index]}%` : null;
              return [
                `Service: ${clusterDetails[index]}`,
                `Setup: ${setupsCluster[index]}`,
                `Cost: $${clusterCosts[index]}/month`,
                savingsText
              ].filter(Boolean);
            }
            return `$${context.raw}/month`;
          }
        },
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16
        },
      }
    },
    scales: {
      x: { 
        stacked: true,
        display: true, 
        grid: { display: false },
        ticks: {
          font: {
            size: 14,
          },
          color: isDarkTheme ? '#FFFFFF' : '#000000',
        },
        barPercentage: 1.0,
        categoryPercentage: 0.2,
      },
      y: {
        beginAtZero: true,
        stacked: true,
        title: { display: true, text: "Cost (USD/month)" },
        ticks: {
          callback: (value) => `$${value}`,
          font: {
            size: 14,
          },
          color: isDarkTheme ? '#FFFFFF' : '#000000',
        },
      },
    },
    aspectRatio: aspectRatio,
  };

  return (
    <div className={styles.costComparisonSection}>
      <div className={styles.textBlock}>
        <h1>Cost comparison</h1>
        <p>
          An open-source alternative to cloud-managed databases with cost-efficient infrastructure.
        </p>
      </div>
      <div className={styles.chartAndTextContainer}>
        <div className={styles.chartContainer}>
          <div className={styles.dropdown}>
            <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
              {Object.entries(dataConfig).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <Bar data={chartData} options={options} />
          <p className={styles.smallText}>
            Estimated monthly price (compute and storage) for a DB cluster with a primary and two standby replicas.
          </p>
        </div>
        <div className={styles.textContainer}>
          <h3>RDS-level service, no extra costs</h3>
          <p>
            Unlike cloud DBaaS, our solution is open-source and provided without extra costs.
            Enjoy an automated self-managed database without the high fees of cloud-managed databases.
          </p>
          <p>
            Pay only for the server resources you use, avoiding extra margins.
            Just compare the savings between cloud-managed database fees and basic VM costs.
          </p>
        </div>
      </div>
    </div>
  );
};

const CostComparison = () => (
  <BrowserOnly>
    {() => <CostComparisonComponent />}
  </BrowserOnly>
);

export default CostComparison;
