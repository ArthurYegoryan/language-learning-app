import LinkComponent from '@/generalComponents/linkComponents/homeLink/LinkComponent';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='about-contact-part'>
                <LinkComponent path='/about' label='About' />
                <LinkComponent path='/contactUs' label='Contact us' />
            </ul>
            <ul className='reg-login-part'>
                <LinkComponent
                    path='/login'
                    label='Login'
                    className='link-navbar'
                />
                <LinkComponent path='/registration' label='Registration' />
            </ul>
        </div>
    );
};

export default Navbar;
