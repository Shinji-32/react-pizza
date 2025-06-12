import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import BlockPizza from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { searchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const {searchValue} = React.useContext(searchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading]=React.useState(true);
  //const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'popularity', 
    sortProperty: 'rating',
  });


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(`https://6815f29832debfe95dbce93b.mockapi.io/items?page=${currentPage}&limit=4&${
      category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    .then((res) => res.json())
    .then((arr)=>{
      setItems(arr);
      setIsLoading(false);
    });
    //window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = Array.isArray(items) ? items.map((obj) => <BlockPizza key={obj.id} {...obj} />) : [];
  const skeletons = [... new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
    <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort value={sortType} onChangeSort={(i)=>setSortType(i)}/>
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
          <div className="content__items">
            {isLoading ? skeletons : pizzas}</div>
          </div>
        <Pagination onChangePage={(number)=> setCurrentPage(number)}/>
    </div>
  )
};

export default Home;