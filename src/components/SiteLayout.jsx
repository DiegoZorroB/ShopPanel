import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import LoginModal from './LoginModal.jsx';

export default function SiteLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <footer className="site-footer"><div className="container d-flex justify-content-between flex-wrap gap-2"><span>La Mesa · Recetario</span><span>Una práctica de interfaces con React</span></div></footer>
      <LoginModal />
    </>
  );
}
