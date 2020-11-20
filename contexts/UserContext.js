import React from "react";

const UserContext = React.createContext({ 
    user: {
        clientId: "",
        password: "",
        token: "",
        itemDTO: [],
        qty: 1
    } 
});

export { UserContext };