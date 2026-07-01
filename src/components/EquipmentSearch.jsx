import React, { memo, useMemo } from 'react';
import { equipment } from '../data/index.js';

function EquipmentSearch({ search, selectedEquipment, onSearch, onSelect }) {
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return equipment
      .filter((item) => `${item.tag} ${item.name}`.toLowerCase().includes(query))
      .slice(0, 8);
  }, [search]);

  return (
    <section className="search-panel">
      <input
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Поиск по тегу/названию"
        aria-label="Поиск оборудования"
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <button
              key={item.id}
              className={selectedEquipment === item.id ? 'active' : ''}
              onClick={() => onSelect(item.id)}
            >
              <b>{item.tag}</b>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(EquipmentSearch);
