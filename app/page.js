import "./globals.css";
import Navbar from '../components/navbarHome/NavBar';
import HomePage from '@/components/homePage/HomePage';

export default function Home() {
    return (
        <main className='app'>
            <Navbar />
            <HomePage />
        </main>
    );
}
