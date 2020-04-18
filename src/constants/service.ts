import { Office365HostPrefix } from "@utils/Host";

const predictPic = "/predict";

const scope = ["openid", "Mail.Read", "User.Read"].join("+");
const outlookConnect = `
https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=5e1fe9d7-ce70-4876-86c1-e292d02a2d47&redirect_uri=http://localhost:6943/api/connect/outlook&response_type=code&scope=${scope}`;

const getOfficeProfileMe = `${Office365HostPrefix}/me`;

export const Service = {
  predictPic,
  outlookConnect,
  getOfficeProfileMe
};
