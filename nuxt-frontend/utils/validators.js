const required = (propertyType) => {
    return v => v && v.length > 0 || `You must type ${propertyType}`;
};

const minLength = (propertyType, minLength) => {
    return v => v.length >= minLength || `${propertyType} must have at least ${minLength} characters`;
};

const isNumber = (propertyType) => {
    return v => v && (!isNaN(parseInt(v))) || `${propertyType} must be a number`;
};

const isEmail = (propertyType) => {
    return v => v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} must be valid`;
};

export default {
    required,
    minLength,
    isNumber,
    isEmail
};