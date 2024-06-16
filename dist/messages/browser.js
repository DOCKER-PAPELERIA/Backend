"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.error = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
// export const success = (req, res, status=200, mensaje = null) => {
//     res.status(status).json({
//         error: false,
//         status:status,
//         body:mensaje
//     })
// };

// export const error = (req, res, status=500, mensaje="")  => {
//     res.status(status).json({
//         error: true,
//         status:status,
//         body:mensaje
//     })
// };

var success = exports.success = function success(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var body = arguments.length > 3 ? arguments[3] : undefined;
  var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var response = {
    error: false,
    status: status,
    body: body
  };
  if (message) response.message = message;
  res.status(status).json(response);
};
var error = exports.error = function error(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var err = arguments.length > 3 ? arguments[3] : undefined;
  res.status(status).json((0, _defineProperty2["default"])({
    error: true,
    status: status
  }, "error", err.message || err));
};