export function getToken(){
    return localStorage.getItem("auth-token");
};

export function setToken(token){
    localStorage.setItem("auth-token", token);
    return "ok";
};