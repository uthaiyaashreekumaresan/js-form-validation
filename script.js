// =============================================
//  PROFESSIONAL FORM VALIDATION - JavaScript
//  Complete validation for 15 fields
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- DOM Elements ----
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    // All form fields
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        dob: document.getElementById('dob'),
        gender: document.getElementById('gender'),
        fatherName: document.getElementById('fatherName'),
        qualification: document.getElementById('qualification'),
        college: document.getElementById('college'),
        course: document.getElementById('course'),
        address: document.getElementById('address'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        pincode: document.getElementById('pincode'),
        message: document.getElementById('message')
    };

    // ---- Regex Patterns ----
    const patterns = {
        alphabetOnly: /^[A-Za-z\s]+$/,
        emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phonePattern: /^[6-9]\d{9}$/,
        pincodePattern: /^[1-9]\d{5}$/,
        alphaNumeric: /^[A-Za-z0-9\s.,\-\/()]+$/
    };

    // =============================================
    //  VALIDATION FUNCTIONS
    // =============================================

    /**
     * Set field as valid
     */
    function setValid(field, feedbackId) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');

        // Handle input group (phone)
        const inputGroup = field.closest('.input-group');
        if (inputGroup) {
            inputGroup.classList.remove('is-invalid');
            inputGroup.classList.add('is-valid');
        }
    }

    /**
     * Set field as invalid with custom message
     */
    function setInvalid(field, feedbackId, message) {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');

        const feedbackEl = document.getElementById(feedbackId);
        if (feedbackEl) {
            feedbackEl.textContent = message;
        }

        // Handle input group (phone)
        const inputGroup = field.closest('.input-group');
        if (inputGroup) {
            inputGroup.classList.remove('is-valid');
            inputGroup.classList.add('is-invalid');
        }
    }

    /**
     * Clear validation state
     */
    function clearValidation(field) {
        field.classList.remove('is-valid', 'is-invalid');
        const inputGroup = field.closest('.input-group');
        if (inputGroup) {
            inputGroup.classList.remove('is-valid', 'is-invalid');
        }
    }

    // ---- Individual Field Validators ----

    function validateFirstName() {
        const value = fields.firstName.value.trim();
        if (value === '') {
            setInvalid(fields.firstName, 'firstNameError', '⚠ First name is required.');
            return false;
        }
        if (value.length < 2) {
            setInvalid(fields.firstName, 'firstNameError', '⚠ Minimum 2 characters required.');
            return false;
        }
        if (!patterns.alphabetOnly.test(value)) {
            setInvalid(fields.firstName, 'firstNameError', '⚠ Only alphabets and spaces are allowed.');
            return false;
        }
        setValid(fields.firstName);
        return true;
    }

    function validateLastName() {
        const value = fields.lastName.value.trim();
        if (value === '') {
            setInvalid(fields.lastName, 'lastNameError', '⚠ Last name is required.');
            return false;
        }
        if (value.length < 1) {
            setInvalid(fields.lastName, 'lastNameError', '⚠ Minimum 1 character required.');
            return false;
        }
        if (!patterns.alphabetOnly.test(value)) {
            setInvalid(fields.lastName, 'lastNameError', '⚠ Only alphabets and spaces are allowed.');
            return false;
        }
        setValid(fields.lastName);
        return true;
    }

    function validateEmail() {
        const value = fields.email.value.trim();
        if (value === '') {
            setInvalid(fields.email, 'emailError', '⚠ Email address is required.');
            return false;
        }
        if (!patterns.emailPattern.test(value)) {
            setInvalid(fields.email, 'emailError', '⚠ Please enter a valid email (e.g., name@example.com).');
            return false;
        }
        setValid(fields.email);
        return true;
    }

    function validatePhone() {
        const value = fields.phone.value.trim();
        if (value === '') {
            setInvalid(fields.phone, 'phoneError', '⚠ Phone number is required.');
            return false;
        }
        if (/[^0-9]/.test(value)) {
            setInvalid(fields.phone, 'phoneError', '⚠ Only digits (0-9) are allowed.');
            return false;
        }
        if (value.length !== 10) {
            setInvalid(fields.phone, 'phoneError', '⚠ Phone number must be exactly 10 digits.');
            return false;
        }
        if (!/^[6-9]/.test(value)) {
            setInvalid(fields.phone, 'phoneError', '⚠ Phone number must start with 6, 7, 8, or 9.');
            return false;
        }
        if (!patterns.phonePattern.test(value)) {
            setInvalid(fields.phone, 'phoneError', '⚠ Please enter a valid 10-digit mobile number.');
            return false;
        }
        setValid(fields.phone);
        return true;
    }

    function validateDob() {
        const value = fields.dob.value;
        if (value === '') {
            setInvalid(fields.dob, 'dobError', '⚠ Date of birth is required.');
            return false;
        }
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 100);

        if (selectedDate >= today) {
            setInvalid(fields.dob, 'dobError', '⚠ Date of birth cannot be today or a future date.');
            return false;
        }
        if (selectedDate < minDate) {
            setInvalid(fields.dob, 'dobError', '⚠ Please enter a valid date of birth.');
            return false;
        }
        // Minimum age 10 years
        const age = today.getFullYear() - selectedDate.getFullYear();
        if (age < 10) {
            setInvalid(fields.dob, 'dobError', '⚠ You must be at least 10 years old.');
            return false;
        }
        setValid(fields.dob);
        return true;
    }

    function validateGender() {
        const value = fields.gender.value;
        if (value === '' || value === null) {
            setInvalid(fields.gender, 'genderError', '⚠ Please select your gender.');
            return false;
        }
        setValid(fields.gender);
        return true;
    }

    function validateFatherName() {
        const value = fields.fatherName.value.trim();
        if (value === '') {
            setInvalid(fields.fatherName, 'fatherNameError', '⚠ Father\'s name is required.');
            return false;
        }
        if (value.length < 2) {
            setInvalid(fields.fatherName, 'fatherNameError', '⚠ Minimum 2 characters required.');
            return false;
        }
        if (!patterns.alphabetOnly.test(value)) {
            setInvalid(fields.fatherName, 'fatherNameError', '⚠ Only alphabets and spaces are allowed.');
            return false;
        }
        setValid(fields.fatherName);
        return true;
    }

    function validateQualification() {
        const value = fields.qualification.value;
        if (value === '' || value === null) {
            setInvalid(fields.qualification, 'qualificationError', '⚠ Please select your qualification.');
            return false;
        }
        setValid(fields.qualification);
        return true;
    }

    function validateCollege() {
        const value = fields.college.value.trim();
        if (value === '') {
            setInvalid(fields.college, 'collegeError', '⚠ College / Institution name is required.');
            return false;
        }
        if (value.length < 3) {
            setInvalid(fields.college, 'collegeError', '⚠ Minimum 3 characters required.');
            return false;
        }
        setValid(fields.college);
        return true;
    }

    function validateCourse() {
        const value = fields.course.value;
        if (value === '' || value === null) {
            setInvalid(fields.course, 'courseError', '⚠ Please select a course.');
            return false;
        }
        setValid(fields.course);
        return true;
    }

    function validateAddress() {
        const value = fields.address.value.trim();
        if (value === '') {
            setInvalid(fields.address, 'addressError', '⚠ Address is required.');
            return false;
        }
        if (value.length < 10) {
            setInvalid(fields.address, 'addressError', '⚠ Please enter a complete address (minimum 10 characters).');
            return false;
        }
        setValid(fields.address);
        return true;
    }

    function validateCity() {
        const value = fields.city.value.trim();
        if (value === '') {
            setInvalid(fields.city, 'cityError', '⚠ City is required.');
            return false;
        }
        if (!patterns.alphabetOnly.test(value)) {
            setInvalid(fields.city, 'cityError', '⚠ Only alphabets and spaces are allowed.');
            return false;
        }
        setValid(fields.city);
        return true;
    }

    function validateState() {
        const value = fields.state.value;
        if (value === '' || value === null) {
            setInvalid(fields.state, 'stateError', '⚠ Please select your state.');
            return false;
        }
        setValid(fields.state);
        return true;
    }

    function validatePincode() {
        const value = fields.pincode.value.trim();
        if (value === '') {
            setInvalid(fields.pincode, 'pincodeError', '⚠ Pincode is required.');
            return false;
        }
        if (/[^0-9]/.test(value)) {
            setInvalid(fields.pincode, 'pincodeError', '⚠ Only digits are allowed.');
            return false;
        }
        if (value.length !== 6) {
            setInvalid(fields.pincode, 'pincodeError', '⚠ Pincode must be exactly 6 digits.');
            return false;
        }
        if (!patterns.pincodePattern.test(value)) {
            setInvalid(fields.pincode, 'pincodeError', '⚠ Please enter a valid Indian pincode.');
            return false;
        }
        setValid(fields.pincode);
        return true;
    }

    function validateMessage() {
        const value = fields.message.value.trim();
        if (value === '') {
            setInvalid(fields.message, 'messageError', '⚠ Message is required.');
            return false;
        }
        if (value.length < 10) {
            setInvalid(fields.message, 'messageError', '⚠ Message must be at least 10 characters long.');
            return false;
        }
        setValid(fields.message);
        return true;
    }

    // =============================================
    //  REAL-TIME INPUT RESTRICTIONS
    // =============================================

    // Block non-alphabet keys on name fields (First Name, Last Name, Father's Name, City)
    function restrictToAlphabets(e) {
        const char = e.key;
        // Allow control keys
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(char)) return;
        // Only allow alphabets and space
        if (!/^[A-Za-z\s]$/.test(char)) {
            e.preventDefault();
            // Shake animation feedback
            e.target.style.animation = 'none';
            e.target.offsetHeight; // reflow
            e.target.style.animation = 'shakeField 0.4s ease-in-out';
        }
    }

    // Block non-numeric keys on phone & pincode
    function restrictToNumbers(e) {
        const char = e.key;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(char)) return;
        if (!/^\d$/.test(char)) {
            e.preventDefault();
            e.target.style.animation = 'none';
            e.target.offsetHeight;
            e.target.style.animation = 'shakeField 0.4s ease-in-out';
        }
    }

    // Prevent paste of non-alphabet content in name fields
    function handleAlphabetPaste(e) {
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (!patterns.alphabetOnly.test(pastedText)) {
            e.preventDefault();
        }
    }

    // Prevent paste of non-numeric content in number fields
    function handleNumberPaste(e) {
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
        }
    }

    // Apply restrictions
    [fields.firstName, fields.lastName, fields.fatherName, fields.city].forEach(field => {
        field.addEventListener('keydown', restrictToAlphabets);
        field.addEventListener('paste', handleAlphabetPaste);
    });

    [fields.phone, fields.pincode].forEach(field => {
        field.addEventListener('keydown', restrictToNumbers);
        field.addEventListener('paste', handleNumberPaste);
    });

    // =============================================
    //  REAL-TIME VALIDATION (on blur & input)
    // =============================================

    // Map each field to its validator
    const validators = {
        firstName: validateFirstName,
        lastName: validateLastName,
        email: validateEmail,
        phone: validatePhone,
        dob: validateDob,
        gender: validateGender,
        fatherName: validateFatherName,
        qualification: validateQualification,
        college: validateCollege,
        course: validateCourse,
        address: validateAddress,
        city: validateCity,
        state: validateState,
        pincode: validatePincode,
        message: validateMessage
    };

    // Attach blur & input event listeners
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        const validator = validators[key];

        // Validate on blur (when user leaves field)
        field.addEventListener('blur', function () {
            if (this.value.trim() !== '' || this.classList.contains('is-invalid')) {
                validator();
            }
            updateProgress();
        });

        // Validate on input (real-time as user types)
        field.addEventListener('input', function () {
            // Only validate if field was previously validated
            if (this.classList.contains('is-valid') || this.classList.contains('is-invalid')) {
                validator();
            }
            updateProgress();
        });

        // For select and date fields, validate on change
        if (field.tagName === 'SELECT' || field.type === 'date') {
            field.addEventListener('change', function () {
                validator();
                updateProgress();
            });
        }
    });

    // =============================================
    //  PROGRESS BAR
    // =============================================

    function updateProgress() {
        if (!progressFill || !progressText) return;
        const totalFields = Object.keys(fields).length;
        let filledFields = 0;

        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (field.value.trim() !== '') {
                filledFields++;
            }
        });

        const percentage = Math.round((filledFields / totalFields) * 100);
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% Completed';

        // Change color based on progress
        if (percentage === 100) {
            progressFill.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            progressText.style.color = '#10b981';
        } else if (percentage >= 50) {
            progressFill.style.background = 'linear-gradient(135deg, #0284c7, #2563eb)';
            progressText.style.color = '#0284c7';
        } else {
            progressFill.style.background = 'linear-gradient(135deg, #38bdf8, #0284c7)';
            progressText.style.color = '#0284c7';
        }
    }

    // =============================================
    //  FORM SUBMISSION
    // =============================================

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Run all validations
        let isValid = true;
        const validationResults = {};

        Object.keys(validators).forEach(key => {
            const result = validators[key]();
            validationResults[key] = result;
            if (!result) isValid = false;
        });

        if (!isValid) {
            // Scroll to first invalid field
            const firstInvalid = document.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
            return;
        }

        // All valid - show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        btnText.classList.add('d-none');
        btnLoader.classList.remove('d-none');
        submitBtn.disabled = true;

        // Collect form data for console output
        const formData = {
            'First Name': fields.firstName.value.trim(),
            'Last Name': fields.lastName.value.trim(),
            'Email': fields.email.value.trim(),
            'Phone': '+91 ' + fields.phone.value.trim(),
            'Date of Birth': fields.dob.value,
            'Gender': fields.gender.value,
            'Father\'s Name': fields.fatherName.value.trim(),
            'Qualification': fields.qualification.value,
            'College / Institution': fields.college.value.trim(),
            'Course': fields.course.value,
            'Address': fields.address.value.trim(),
            'City': fields.city.value.trim(),
            'State': fields.state.value,
            'Pincode': fields.pincode.value.trim(),
            'Message': fields.message.value.trim()
        };

        // ---- Console Output ----
        console.log('%c ✅ FORM SUBMITTED SUCCESSFULLY ', 'background: #22c55e; color: #fff; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
        console.log('%c Form Data:', 'color: #7c3aed; font-size: 13px; font-weight: bold;');
        console.table(formData);
        console.log('Raw Form Data Object:', formData);

        // Simulate submission (replace with actual API call)
        setTimeout(function () {
            // Reset button
            btnText.classList.remove('d-none');
            btnLoader.classList.add('d-none');
            submitBtn.disabled = false;

            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Reset form
            form.reset();

            // Clear all validation states
            Object.values(fields).forEach(field => {
                clearValidation(field);
            });

            // Reset progress
            updateProgress();

        }, 2000);
    });

    // =============================================
    //  SCROLL ANIMATIONS (Intersection Observer)
    // =============================================

    const animatedElements = document.querySelectorAll('.animate-field');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Initial progress update
    updateProgress();
});
