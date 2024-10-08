var mxfaceuri = "https://iris.mxface.ai/api/Iris/";
var mxFaceSubscriptionKey = "Your Subscription Key";

// Function to enroll iris data
function EnrollIris(enrollRequest) {
  var MarvisAuthRequest = {
    Iris: enrollRequest.Iris,
    ExternalId: enrollRequest.externalId,
    Group: enrollRequest.group,
  };
  var jsondata = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Enroll", jsondata);
}

// Function to search for iris data
function SearchIris(searchRequest) {
  var MarvisAuthRequest = {
    iris: searchRequest.Iris,
    group: searchRequest.group,
  };
  var jsondata = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Search", jsondata);
}

// Function to match two iris data
function MatchIris(matchRequest) {
  var MarvisAuthRequest = {
    iris1: matchRequest.Iris1,
    iris2: matchRequest.Iris2,
  };
  var jsondata = JSON.stringify(MarvisAuthRequest);
  return PostRequestMxFaceAsync("Verify", jsondata);
}

// Function to perform an asynchronous POST request to the specified method with optional JSON data
function PostRequestMxFaceAsync(method, jsonData, isBodyAvailable) {
  var res;
  if (isBodyAvailable == 0) {
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: mxfaceuri + method,
      contentType: "application/json; charset=utf-8",
      //data: jsonData,
      dataType: "json",
      headers: {
        subscriptionkey: mxFaceSubscriptionKey,
      },
      processData: false,
      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });
  } else {
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: mxfaceuri + method,
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      headers: {
        subscriptionkey: mxFaceSubscriptionKey,
      },
      processData: false,
      success: function (data) {
        httpStaus = true;
        res = { httpStaus: httpStaus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) {
        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
      },
    });
  }
  return res;
}

// Function to get the HTTP error message
function getHttpError(jqXHR) {
  var err = "Unhandled Exception";
  if (jqXHR.status === 0) {
    err = "Service Unavailable";
  } else if (jqXHR.status == 404) {
    err = "Requested page not found";
  } else if (jqXHR.status == 500) {
    err = "Internal Server Error";
  } else if (thrownError === "parsererror") {
    err = "Requested JSON parse failed";
  } else if (thrownError === "timeout") {
    err = "Time out error";
  } else if (thrownError === "abort") {
    err = "Ajax request aborted";
  } else {
    err = "Unhandled Error";
  }
  return err;
}
