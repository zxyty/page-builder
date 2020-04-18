const PRODUCTION = true;

// api 接口地址
const HOST_P = "http://10.17.70.52"; // production
const HOST_D = "http://10.17.70.52"; // dev

// api 端口地址
const PORT_P = "8080"; // production
const PORT_D = "8080"; // dev

export const HOST = PRODUCTION ? HOST_P : HOST_D;
export const PORT = PRODUCTION ? PORT_P : PORT_D;
// export const APIPREFIX = PORT === "80" ? HOST : `${HOST}:${PORT}`;
export const APIPREFIX = `${HOST}:${PORT}`;
