import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import BlockPizza from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading]=React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'popularity', 
    sortProperty: 'rating',
  });


  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://6815f29832debfe95dbce93b.mockapi.io/items?${
      category}&sortBy=${sortBy}&order=${order}`,
  )
    .then((res) => res.json())
    .then((arr)=>{
      setItems(arr);
      setIsLoading(false);
    });
    //window.scrollTo(0,0);
  }, [categoryId, sortType]);


  return (
    <div className="container">
    <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id)=>setCategoryId(id)}/>
            <Sort value={sortType} onChangeSort={(i)=>setSortType(i)}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
          <div className="content__items">
            {isLoading 
              ? [... new Array(10)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj) => <BlockPizza key={obj.id}{...obj} />)}
          </div>
          </div>
    </div>
  )
};

export default Home;