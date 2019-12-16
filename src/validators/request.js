'use strict';

let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (! value || value.length <= 0) {
        errors.push({ message: message });
    }
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (! value || value.length < min) {
        errors.push({ message: message });
    }
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len) {
        errors.push({ message: message });
    }
}

ValidationContract.prototype.isEmail = (value, message) => {
    let reg = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    // Se der erro no let, mude para var.

    if (! reg.test(value)) {
        errors.push({ message: message });
    }
}

ValidationContract.prototype.validRoles = (values, message) => {
    if (typeof values != 'undefined') {
        values = values.split(',');
    }
    
    for(let value of values) {
        if (! ['test', 'user', 'admin'].includes(value)) {
            errors.push({ message: message });
    
            return;
        }
    }
}

ValidationContract.prototype.errors = () => {// Retorna a lista de erros.
    return errors;
}

ValidationContract.prototype.clear = () => {// Limpa os erros.
    errors = [];
}

ValidationContract.prototype.isValid = () => {// Valida.
    return errors.length == 0;
}

module.exports = ValidationContract;