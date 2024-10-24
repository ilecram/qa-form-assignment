export const validRegistrationFormData = {
    firstName: "Jan", 
    lastName: "Kowalski",
    email: "email@email.com",
    password: "Mypass123!",
    repeatPassword: "Mypass123!",
    birthDate: "2024-10-23",
    language: "pl",
    phoneNumber: "111222333"
}

export const expectedRegistrationConfirmationHeader = (firstName: string, emailAddress: string): string => {
    return `${firstName}, dziękujemy za rejestrację!`;
};
export const expectedRegistrationConfirmationMessage = (firstName: string, emailAddress: string): string => {
    return `Na Twój adres email ${emailAddress} wysłaliśmy wiadomość z linkiem aktywującym konto`;
};

export const navigationLinks = Object.freeze({
    registrationForm: {
        termsAndConditions: "/regulamin",
        privacyPolicy: "/polityka-prywatnosci",
      }
  });
  