import React from 'react';
import './App.css';
//import ImageComponent from './components/imageComponent/ImageComponent.tsx';
import CarouselComponent  from './components/CarouselComponent/CaroselComponent.tsx';

const App: React.FC = () => {
  return (
    <div className="App">
      <CarouselComponent />
    </div>
  );
};

export default App;

