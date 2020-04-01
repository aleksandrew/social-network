// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { memo } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

// local dependencies
import styles from './checkbox.module.scss';


export const Checkbox = memo((props) => {
    const cx = classNames.bind(styles);
    const { input, name, classNameLabel, classNameInput, label, ...attr } = props;

    const handleChange = (event) => input.onChange(event);

    return (
        <FormGroup className={cx(styles.formGroup)}>
            <Label className={cx(styles.defaultLabel, classNameLabel)} check>
                <Input name={name}
                    type="checkbox"
                    onChange={handleChange}
                    checked={Boolean(input.value)}
                    className={cx(styles.defaultInput, classNameInput)}
                    {...attr}/>
                { label }
            </Label>
        </FormGroup>
    );
});

Checkbox.propTypes = {
    attr: PropTypes.object,
    name: PropTypes.string,
    descr: PropTypes.string,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    classNameInput: PropTypes.string,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};

Checkbox.defaultProps = {
    attr: {},
    name: '',
    descr: '',
    label: '',
    classNameLabel: '',
    classNameInput: '',
};
