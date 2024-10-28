import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const ExtensionsTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [versionFilter, setVersionFilter] = useState('16');
  const [typeFilter, setTypeFilter] = useState('DEB');

  const csvFilePath = '/extensions.csv';

  useEffect(() => {
    // Uploading data from CSV
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;
        setData(data);
        setCategories(getUniqueCategories(data));
        applyFilters(data, 'ALL', '16', 'DEB');
      },
      error: (error) => {
        console.error('Error loading CSV:', error);
      },
    });
  }, []);

  // A function for getting unique categories
  const getUniqueCategories = (data) => {
    const categories = data.map((row) => row.category).filter(Boolean);
    return ['ALL', ...new Set(categories)];
  };

  // A function for applying filters
  const applyFilters = (data, category, version, type) => {
    const filtered = data.filter((row) => {
      const matchesCategory = category === 'ALL' || row.category === category;
      // Remove the curly brackets and separate the versions
      const pgVersions = row.pg_ver?.replace(/[{}]/g, '').split(',');
      const matchesVersion = pgVersions?.includes(version);
      const matchesType = (type === 'DEB' && row.deb_pkg) || (type === 'RPM' && row.rpm_pkg);
      return matchesCategory && matchesVersion && matchesType;
    });

    setFilteredData(filtered);
  };

  // Handler for changing the category filter
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategoryFilter(newCategory);
    applyFilters(data, newCategory, versionFilter, typeFilter);
  };

  // Handler for changing the version filter
  const handleVersionChange = (e) => {
    const newVersion = e.target.value;
    setVersionFilter(newVersion);
    applyFilters(data, categoryFilter, newVersion, typeFilter);
  };

  // Handler for changing the package type filter
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setTypeFilter(newType);
    applyFilters(data, categoryFilter, versionFilter, newType);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Category:{' '}
          <select value={categoryFilter} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: '10px' }}>
          Postgres Version:{' '}
          <select value={versionFilter} onChange={handleVersionChange}>
            <option value="17">17</option>
            <option value="16">16</option>
            <option value="15">15</option>
            <option value="14">14</option>
            <option value="13">13</option>
            <option value="12">12</option>
          </select>
        </label>

        <label style={{ marginLeft: '10px' }}>
          Type:{' '}
          <select value={typeFilter} onChange={handleTypeChange}>
            <option value="DEB">DEB</option>
            <option value="RPM">RPM</option>
          </select>
        </label>
      </div>

      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Extension</th>
              <th>Description</th>
              <th>Package</th>
              <th>Repo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.en_desc}</td>
                <td>{typeFilter === 'DEB' ? row.deb_pkg.replace('$v', versionFilter) : row.rpm_pkg.replace('$v', versionFilter)}</td>
                <td>{row.repo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found for the selected filters.</p>
      )}
    </div>
  );
};

export default ExtensionsTable;
