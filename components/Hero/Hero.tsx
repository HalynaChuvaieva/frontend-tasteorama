import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import css from './Hero.module.css';

function Hero() {
  const [search, setSearch] = useState('');

  const handleSearch = (value: String) => {
    setSearch(value);
  };
  return (
    <div className={css.hero}>
      <h1 className={css.hero__title}>Plan, Cook, and Share Your Flavors</h1>
      <SearchBox value={search} onSearch={handleSearch} />
    </div>
  );
}

export default Hero;
