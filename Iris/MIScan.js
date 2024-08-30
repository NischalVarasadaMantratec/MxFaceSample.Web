var uri = "http://localhost:8035/miscan/"

function GetDeviceInfoAsync() {debugger
    return PostRequestAsync("info", "", 0);
}

function CaptureIris(timeout) {
    var MarvisAuthRequest = {
        "TimeOut": timeout
    };
    var jsondata = JSON.stringify(MarvisAuthRequest);
    return PostRequestAsync("capture", jsondata);
}

function PostRequestAsync(method, jsonData, isBodyAvailable) {
    var res;
    if (isBodyAvailable == 0) {
        $.support.cors = true;
        var httpStaus = false;
        $.ajax({
            type: "POST",
            async: false,
            crossDomain: true,
            url: uri + method,
            contentType: "application/json; charset=utf-8",
            //data: jsonData,
            dataType: "json",
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
    else {
        $.support.cors = true;
        var httpStaus = false;
        $.ajax({
            type: "POST",
            async: false,
            crossDomain: true,
            url: uri + method,
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            dataType: "json",
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

function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}