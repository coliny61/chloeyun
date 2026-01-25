import React from 'react';
import Hero from './components/Hero';

function App() {
  return (
    <main>
      <Hero onNavigate={(page) => console.log("Navigate to:", page)} />
    </main>
  );
}

export default App;