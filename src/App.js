import React from "react";


import Header from './components/Header';
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import BlockPizza from "./components/BlockPizza";

import './scss/app.scss';


function App() {
  const [items, setItems] = React.useState([]);


  React.useEffect(() => {
    fetch('https://6815f29832debfe95dbce93b.mockapi.io/items').then((res) => {
      return res.json();
    })
    .then((arr)=>{
      setItems(arr);
    })
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
          <div className="content__items">
            {items.map((obj) => (
                <BlockPizza key={obj.id} {...obj} />
              ))
            }
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
