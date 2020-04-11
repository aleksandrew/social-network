// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Input as CustomInput, Label, FormGroup } from 'reactstrap';

// local dependencies
import styles from './input.scss';


const Input = memo((props) => {
    const cx = classNames.bind(styles);
    const { classNameLabel, classNameInput, classNameContainer,
        input, placeholder, label, disabled, type, meta: { touched, error } } = props;

    const hasError = touched && error;

    return (
        <FormGroup style={{ position: 'relative' }}
            className={cx(styles.inputContainerDefault, classNameContainer)}
        >
            {label && (
                <Label
                    htmlFor={input.name}
                    className={cx(styles.defaultLabel, classNameLabel)}
                >
                    {label}
                </Label>
            )}
            <CustomInput
                type={type}
                id={input.name}
                disabled={disabled}
                placeholder={placeholder}
                {...input}
                className={cx(classNameInput, {
                    errorTextarea: hasError,
                })}
                onChange={(e) => input.onChange(e)}
            />
            {hasError && <div className={cx({ errorBlockLitle: hasError })}>{error}</div>}
        </FormGroup>
    );
});

Input.propTypes = {
    attr: PropTypes.object,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    classNameLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameContainer: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};

Input.defaultProps = {
    attr: {},
    label: '',
    disabled: false,
    placeholder: '',
    classNameLabel: '',
    classNameInput: '',
    classNameContainer: '',
};

export default Input;
