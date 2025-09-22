import axios from "axios";
import crypto from "crypto";
import { Base64 } from "js-base64";
import https from "https";
import url from "url";

const API_URL = "https://preprod-api.deusxpay.com/pay";
const API_KEY = process.env.DEUSX_API_KEY;
const API_SECRET = process.env.DEUSX_API_SECRET;

function encodeHmac(key, msg) {
  return crypto.createHmac("sha256", key).update(msg).digest("hex");
}

export async function deusxPayRequest(
  endpoint,
  payload = null,
  method = "GET"
) {
  const nonce = Date.now().toString();
  const parsedUrl = url.parse(endpoint, true);
  const basePath = parsedUrl.pathname.startsWith("/v1/")
    ? parsedUrl.pathname
    : `/v1/${parsedUrl.pathname}`;
  const requestPath = basePath.endsWith("/") ? basePath : basePath + "/";
  const queryParams = new URLSearchParams(parsedUrl.query).toString();
  let stringPayload = "";
  if (method !== "GET" && payload) {
    stringPayload =
      typeof payload === "object" ? JSON.stringify(payload) : payload;
  }
  const signatureData = {
    path: requestPath,
    nonce: nonce,
    payload: stringPayload,
  };

  const signatureDataString = JSON.stringify(signatureData);
  const b64 = Base64.encode(signatureDataString);
  const signature = encodeHmac(API_SECRET, b64);
  console.log("🔑 Signing Data:", signatureDataString);
  console.log("📦 Base64:", b64);
  console.log("📝 Signature:", signature);
  const headers = {
    "X-DEUSXPAY-KEY": API_KEY,
    "X-DEUSXPAY-NONCE": nonce,
    "X-DEUSXPAY-SIGNATURE": signature,
    "Content-Type": "application/json",
  };
  const fullUrl = `${API_URL}${requestPath}${
    queryParams ? `?${queryParams}` : ""
  }`;
  console.log("🌍 Full URL:", fullUrl);
  console.log("📦 Payload:", payload);
  console.log("🔑 Headers:", headers);
  return axios({
    method,
    url: fullUrl,
    data: method !== "GET" ? payload : undefined,
    headers,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  });
}

export const verifyWebhook = (callbackId, signature) => {
  const token = process.env.DEUSX_WEBHOOK_TOKEN;
  const expected = crypto
    .createHmac("sha256", token)
    .update(callbackId)
    .digest("hex");
  return expected === signature;
};
