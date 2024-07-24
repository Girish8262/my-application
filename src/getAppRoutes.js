import { Route } from 'react-router-dom';
import Home from './Page/Home';
import Main from './Page/Main';
import About from './Page/About';
import CreateItem from './Page/CreateItem'; 

const getAppRoutes = () => {
  return (
    <>
      <Route path="/" exact element={<Main />} />
      <Route path="/Home" exact element={<Home />} />
      <Route path="/About" exact element={<About />} />
      <Route path="/home/create" exact element={<CreateItem />} />
    </>
  );
};

export default getAppRoutes;
