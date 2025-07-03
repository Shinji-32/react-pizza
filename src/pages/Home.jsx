import React from 'react';
// Redux toolkit немає хуків, там є створення storage. Тому тут беремо ці хуки із react-redux
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import BlockPizza from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { searchContext } from '../App';

const Home = () => {
  const {categoryId, sort} = useSelector((state) => state.filter); //тут видалили categoryId бо тілкьи число виводимо, а нам треба і число і сортайп. Також ми скоротили код таким чином за допомогою деструктуризації
  const sortType = sort.sortProperty;//тут просто ми звертаємось до цього типу
  const dispatch = useDispatch();



  const {searchValue} = React.useContext(searchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading]=React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);



  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    console.log(id);
  }

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
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
            <Sort/>
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