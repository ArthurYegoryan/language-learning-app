import LinkComponent from '@/generalComponents/linkComponents/homeLink/LinkComponent';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='about-contact-part'>
                <LinkComponent path='/about' label='About' classname='home-link' />
                <LinkComponent path='/contactUs' label='Contact us' classname='home-link' />
            </ul>
            <ul className='reg-login-part'>
                <LinkComponent
                    path='/login'
                    label='Login'
                    // className='link-navbar'
                    classname='home-link'
                />
                <LinkComponent path='/registration' label='Registration' classname='home-link' />
            </ul>
        </div>
    );
};

export default Navbar;
