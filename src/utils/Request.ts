import timingFetch from "./TimingFetch";
import { handleError } from "./Error";
import { APIPREFIX } from "./Host";

export default function request(
  url = "",
  { params = {}, method = "GET", headers = {}, formData = null }
) {
  let requestUrl = url;
  if (url.indexOf("http") < 0) {
    requestUrl = APIPREFIX + url;
  }

  const _headers = {
    "Content-Type": "application/json",
    // 其他 如token等
    ...headers
  };

  if (formData) {
    // _headers["Content-Type"] = "multipart/form-data";
    // 计算不了分隔符 就让http自行计算
    delete _headers["Content-Type"];
  }

  const body =
    formData ||
    (method !== "GET" && method !== "DELETE" ? JSON.stringify(params) : null);
  return timingFetch(requestUrl, { body, method, headers: _headers })
    .then(response => response.json())
    .then(res => {
      if (res || res.success || res.code === 200 || res.status === "ok") {
        return res;
      }
      throw new Error(
        res && res.result && res.result.message ? res.result.message : "错误"
      );
    })
    .catch(handleError);
}
