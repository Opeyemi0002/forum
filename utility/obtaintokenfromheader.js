
const obtainToken = req => {
    const headerInfo = req.headers;
    const token = headerInfo["authorization"].split(' ')[1];

    if (!token) {
        return "token not found";
    }else {
        return token;
    }
}

export default obtainToken;