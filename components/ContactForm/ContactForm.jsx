'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import FormField from './FormField';
import Button from '@/generalComponents/button/Button.component';
import { useRouter } from "next/navigation";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    });
    const [error, setError] = useState('');
    const { push } = useRouter();

    const goHomeButtonHandler = () => {
        push("/");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    };

    const validateForm = () => {
        const { firstName, lastName, email, message } = formData;
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            setError('Please fill in all fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        console.log(formData);
        clearForm();
    };

    const clearForm = () => {
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setError('');
    };

    return (
        <div className={styles.mainContainer}>
            <Button label="HOME" 
                className={styles.contactUsGoHomeButton}
                onClickHandler={goHomeButtonHandler}
            />
            <section className={styles.contactInfoMain}>
                <div className={styles.container}>
                    <div className={styles.titleMain}>
                        <h3 className={styles.titleStyle}>Contact Us</h3>
                        <p className={styles.subTitleStyle}>
                            Get the info you are looking for right now
                        </p>
                    </div>
                    <div className={styles.contact}>
                        <form method='post'>
                            <div className={styles.row}>
                                <div className={styles.leftColumn}>
                                    <FormField
                                        id='firstName'
                                        label='First Name'
                                        type='text'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <FormField
                                        id='lastName'
                                        label='Last Name'
                                        type='text'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <FormField
                                        id='email'
                                        label='Email'
                                        type='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={error}
                                    />
                                </div>
                                <div className={styles.rightColumn}>
                                    <FormField
                                        id='message'
                                        label='Write Message'
                                        type='textarea'
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div
                                className={`${styles.formGroup2} ${styles.mt3} ${styles.textRight}`}
                            >
                                <div className='btn'>
                                    <button
                                        type='button'
                                        className={`${styles.customBtn} ${styles.btn1}`}
                                        onClick={validateForm}
                                    >
                                        Send Now
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactForm;
