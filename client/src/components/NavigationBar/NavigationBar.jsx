import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavigationBar.module.css'
import { filter, orderBy} from '../../Redux/actions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  const [toggleButtonAlpha, setButtonAlpha] = useState({
    AtoZ: false,
    ZtoA: false,
  })

  const handleFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handleAlphabeticalSort = () => {
    setButtonAlpha((prevState)=>{
      if(!prevState.AtoZ){
        return {...prevState, AtoZ: true }
      } else if(!prevState.ZtoA){
        return {...prevState, ZtoA: true}
      } else {
        return {AtoZ: false , ZtoA: false }
      }
    })
  };

  const handleRatingSort = () => {
    // dispatch(sortByRating());
  };

  useEffect(()=>{
    dispatch(orderBy(toggleButtonAlpha))
  },[toggleButtonAlpha])

  return (
    <div className={styles.container} >
      <button onClick={handleAlphabeticalSort}>Sort A-Z</button>
      <button onClick={handleRatingSort}>Sort by Rating</button>
      <div>
        <span>Filter by Genre:</span>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All Videogames</option>
            {genres.map(genre => (
                <option value={genre.name} key={genre.name}>{genre.name}</option>
            ))}
        </select>
      </div>
      <div>
        <span>Filter by Origin:</span>
        <select onChange={(event)=>handleFilter(event.target.value)}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DataBase</option>
        </select>
      </div>
    </div>
  );
};

export default NavigationBar;