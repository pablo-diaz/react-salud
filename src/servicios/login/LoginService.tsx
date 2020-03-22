type LoginData = {
    usuario: string,
    passwd: string
};

const realizarLogin = (data: LoginData) : boolean => {
    console.log("Login data", data);
    return true;
};

export default {
    realizarLogin
};