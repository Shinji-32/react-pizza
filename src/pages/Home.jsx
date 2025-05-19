import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import BlockPizza from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading]=React.useState(true);


  React.useEffect(() => {
    fetch('https://6815f29832debfe95dbce93b.mockapi.io/items').then((res) => {
      return res.json();
    })
    .then((arr)=>{
      setItems(arr);
      setIsLoading(false);
    });
    //window.scrollTo(0,0);
  }, []);


  return (
    <div className="container">
    <div className="content__top">
            <Categories/>
            <Sort/>
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