/**
 * Provides functions to interact with the MXFace fingerprint API.
 *
 * The `mxfingerprinturi` and `mxFaceSubscriptionKey` variables hold the API endpoint and subscription key, respectively.
 *
 * The `EnrollFingerprint` function enrolls a fingerprint with the MXFace API.
 *
 * The `SearchFingerprint` function searches for a fingerprint in the MXFace API.
 *
 * The `MatchFingerprints` function matches two fingerprints in the MXFace API.
 *
 * The `PostRequestMxFaceAsync` function is a helper function that makes asynchronous POST requests to the MXFace API.
 *
 * The `getHttpError` function is a helper function that returns a human-readable error message based on the HTTP status code.
 */

var mxfingerprinturi = "https://fingerprintapi.mxface.ai/api/FingerPrint/";
var mxFaceSubscriptionKey = "VRWtecJ7RhltMzCq5blE";

function EnrollFingerprint(enrollRequest) {
  var MarvisAuthRequest = {
    Fingerprint: enrollRequest.Fingerprint,
    ExternalId: enrollRequest.externalId,
    Group: enrollRequest.group,
  };
  var jsonData = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Enroll", jsonData);
}

function SearchFingerprint(searchRequest) {
  var MarvisAuthRequest = {
    Fingerprint: searchRequest.Fingerprint,
    Group: searchRequest.group,
  };
  var jsonData = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Search", jsonData);
}

function MatchFingerprints(matchRequest) {
  debugger;
  var MarvisAuthRequest = {
    Fingerprint1: matchRequest.Fingerprint1,
    Fingerprint2: matchRequest.Fingerprint2,
  };
  var jsonData = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Verify", jsonData);
}

function PostRequestMxFaceAsync(method, jsonData, isBodyAvailable) {
  debugger;
  var res;
  if (isBodyAvailable == 0) {
    $.support.cors = true;
    var httpStatus = false;
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: mxfingerprinturi + method,
      contentType: "application/json; charset=utf-8",
      //data: jsonData,
      dataType: "json",
      headers: {
        subscriptionkey: mxFaceSubscriptionKey,
      },
      processData: false,
      success: function (data) {
        httpStatus = true;
        res = { httpStatus: httpStatus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStatus: httpStatus, err: getHttpError(jqXHR) };
      },
    });
  } else {
    $.support.cors = true;
    var httpStatus = false;
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: mxfingerprinturi + method,
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      headers: {
        subscriptionkey: mxFaceSubscriptionKey,
      },
      processData: false,
      success: function (data) {
        httpStatus = true;
        res = { httpStatus: httpStatus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStatus: httpStatus, err: getHttpError(jqXHR) };
      },
    });
  }
  return res;
}

function getHttpError(jqXHR) {
  var err = "Unhandled exception";
  if (jqXHR.status === 0) {
    err = "Service Unavailable";
  } else if (jqXHR.status == 400) {
    err = "Requested page not found.";
  } else if (jqXHR.status == 500) {
    err = "Internal Server Error";
  } else if (thrownError === "parsererror") {
    err = "Requested JSON parse failed.";
  } else if (thrownError === "timeout") {
    err = "Time out error.";
  } else if (thrownError === "abort") {
    err = "Ajax request aborted.";
  } else {
    err = "Unhandled error.";
  }
  return err;
}
