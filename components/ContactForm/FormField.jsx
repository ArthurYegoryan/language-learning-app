import React from 'react';
import styles from './ContactForm.module.css';

const FormField = ({ id, label, type, value, onChange, error }) => {
    return (
        <div className={`${styles.formGroup} ${styles.mb3}`}>
            <label htmlFor={id}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    className={`${styles.formControl} ${styles.textarea}`} // Add the textarea class here
                    value={value}
                    onChange={onChange}
                ></textarea>
            ) : (
                <input
                    type={type}
                    id={id}
                    className={styles.formControl}
                    value={value}
                    onChange={onChange}
                />
            )}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default FormField;
