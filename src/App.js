import React from "react";
import './scss/app.scss';
import Header from './components/Header';
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import BlockPizza from "./components/BlockPizza";


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <BlockPizza title="Чизбургер-пицца" price={500}/>
            <BlockPizza title="Мексиканская" price={350}/>
            <BlockPizza title="Гавайская" price={400}/>
            <BlockPizza title="4 Мозераті" price={200}/>
            <BlockPizza title="4 Мозераті" price={520}/>
            <BlockPizza title="Пепперони" price={230}/>
            <BlockPizza title="Пепперони" price={230}/>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
