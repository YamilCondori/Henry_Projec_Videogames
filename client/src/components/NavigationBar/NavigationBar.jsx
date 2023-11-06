import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NavigationBar.module.css'
import { filter, orderBy} from '../../Redux/actions';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  const [toggleOrder, setOrder] = useState({
    AtoZ: false,
    ZtoA: false,
    ratingAsc: false,
    ratingDesc:false
  })

  const handleFilter = optionFilter => {
    dispatch(filter(optionFilter));
  };

  const handeSort = (event) => {
    if(event.target.name==='alphabetic'){
      setOrder((prevState)=>{
        if(!prevState.AtoZ){
          return {...prevState, AtoZ: true, ratingAsc:false , ratingDesc:false}
        } else if(!prevState.ZtoA){
          return {...prevState, ZtoA: true}
        } else {
          return {AtoZ: false , ZtoA: false, ratingAsc: false , ratingDesc: false  }
        }
      })
    } else if (event.target.name==='rating'){
      setOrder((prevState)=>{
        if(!prevState.ratingAsc){
          return {...prevState, ratingAsc: true, AtoZ:false, ZtoA:false }
        } else if(!prevState.ratingDesc){
          return {...prevState, ratingDesc: true}
        } else {
          return {AtoZ: false , ZtoA: false,ratingAsc: false , ratingDesc: false }
        }
      })
    }
  };

  const handleRatingSort = () => {
    // dispatch(sortByRating());
  };

  useEffect(()=>{
    dispatch(orderBy(toggleOrder))
  },[toggleOrder])

  return (
    <div className={styles.container} >
      <button name='alphabetic' onClick={handeSort}>Sort A-Z</button>
      <button name='rating' onClick={handeSort}>Sort by Rating</button>
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