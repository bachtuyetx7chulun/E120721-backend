"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var configs_1 = require("./configs");
var routers_1 = __importDefault(require("./routers"));
var error_middleware_1 = require("./middleware/error.middleware");
var App = /** @class */ (function () {
    function App(port) {
        this.port = port;
        this.app = express_1.default();
        this.configure();
        this.api();
        this.handleError();
    }
    App.prototype.api = function () {
        this.app.use('/api/v1', routers_1.default);
    };
    App.prototype.configure = function () {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.set('port', this.port || configs_1.PORT || 5000);
        this.app.use(morgan_1.default('dev'));
    };
    App.prototype.handleError = function () {
        this.app.use(error_middleware_1.GetError);
        this.app.use(error_middleware_1.HandleError);
    };
    App.prototype.listen = function () {
        this.app.listen(process.env.PORT || 5000, function () {
            console.log("Server is running");
        });
    };
    return App;
}());
exports.default = App;
