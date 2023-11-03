import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavigationBar.module.css'
import { filter} from '../../Redux/actions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);

  const handleGenreFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handleOriginFilter = origin => {
    // dispatch(filterByOrigin(origin));
  };

  const handleAlphabeticalSort = () => {
    // dispatch(sortAlphabetically());
  };

  const handleRatingSort = () => {
    // dispatch(sortByRating());
  };

  return (
    <div className={styles.container} >
      <button onClick={handleAlphabeticalSort}>Sort A-Z</button>
      <button onClick={handleRatingSort}>Sort by Rating</button>
      <div>
        <span>Filter by Genre:</span>
        <select onChange={(event)=>handleGenreFilter(event.target.value)}>
            <option value="">All Videogames</option>
            {genres.map(genre => (
                <option value={genre.name} key={genre.name}>{genre.name}</option>
            ))}
        </select>
      </div>
      <div>
        <span>Filter by Origin:</span>
        <select onChange={(event)=>handleGenreFilter(event.target.value)}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DataBase</option>
        </select>
      </div>
    </div>
  );
};

export default NavigationBar;