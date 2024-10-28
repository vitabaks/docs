import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './styles.module.css';

const ExtensionsTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [versionFilter, setVersionFilter] = useState('16');
  const [typeFilter, setTypeFilter] = useState('DEB');
  const [searchQuery, setSearchQuery] = useState('');

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
        applyFilters(data, 'ALL', '16', 'DEB', '');
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
  const applyFilters = (data, category, version, type, query) => {
    const filtered = data.filter((row) => {
      const matchesCategory = category === 'ALL' || row.category === category;
      const pgVersions = row.pg_ver?.replace(/[{}]/g, '').split(',');
      const matchesVersion = pgVersions?.includes(version);
      const matchesType = (type === 'DEB' && row.deb_pkg) || (type === 'RPM' && row.rpm_pkg);

      // Search for matches in name, description, and package name
      const packageName = type === 'DEB' ? row.deb_pkg : row.rpm_pkg;
      const matchesSearch =
        row.name?.toLowerCase().includes(query.toLowerCase()) ||
        row.en_desc?.toLowerCase().includes(query.toLowerCase()) ||
        packageName?.toLowerCase().includes(query.toLowerCase());

      return matchesCategory && matchesVersion && matchesType && matchesSearch;
    });

    setFilteredData(filtered);
  };

  // Handler for changing the category filter
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategoryFilter(newCategory);
    applyFilters(data, newCategory, versionFilter, typeFilter, searchQuery);
  };

  // Handler for changing the version filter
  const handleVersionChange = (e) => {
    const newVersion = e.target.value;
    setVersionFilter(newVersion);
    applyFilters(data, categoryFilter, newVersion, typeFilter, searchQuery);
  };

  // Handler for changing the package type filter
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setTypeFilter(newType);
    applyFilters(data, categoryFilter, versionFilter, newType, searchQuery);
  };

  // Handler for changing the search query
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    applyFilters(data, categoryFilter, versionFilter, typeFilter, newQuery);
  };

  return (
    <div>
      <div className={styles.filters}>
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
          Package Type:{' '}
          <select value={typeFilter} onChange={handleTypeChange}>
            <option value="DEB">DEB</option>
            <option value="RPM">RPM</option>
          </select>
        </label>
      </div>

      {/* Search Field on a New Row */}
      <div className={styles.filters}>
        <label>
          Search:{' '}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, description, or package"
            className={styles.searchInput}
          />
        </label>
      </div>

      {filteredData.length > 0 ? (
        <table className={styles.table}>
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
                <td>
                  {row.url ? (
                    <a href={row.url} target="_blank" rel="noopener noreferrer">
                      {row.name}
                    </a>
                  ) : (
                    row.name
                  )}
                </td>
                <td>{row.en_desc}</td>
                <td>
                  {typeFilter === 'DEB'
                    ? row.deb_pkg.replace('$v', versionFilter)
                    : row.rpm_pkg.replace('$v', versionFilter)}
                </td>
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
