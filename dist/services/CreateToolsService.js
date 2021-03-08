"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Tools_1 = __importDefault(require("../models/Tools"));
var CreateTagService_1 = __importDefault(require("../services/CreateTagService"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateToolsService = /** @class */ (function () {
    function CreateToolsService() {
    }
    CreateToolsService.prototype.execute = function (_a) {
        var title = _a.title, link = _a.link, description = _a.description, tags = _a.tags;
        return __awaiter(this, void 0, void 0, function () {
            var toolsRepository, checkToolsExists, newTags, tools;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toolsRepository = typeorm_1.getRepository(Tools_1.default);
                        return [4 /*yield*/, toolsRepository.findOne({
                                where: { title: title },
                            })];
                    case 1:
                        checkToolsExists = _b.sent();
                        if (checkToolsExists)
                            throw new AppError_1.default('Tools already exists.');
                        return [4 /*yield*/, this.resolveTags(tags)];
                    case 2:
                        newTags = _b.sent();
                        tools = toolsRepository.create({
                            title: title,
                            link: link,
                            description: description
                        });
                        tools.tags = newTags;
                        return [4 /*yield*/, toolsRepository.save(tools)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, tools];
                }
            });
        });
    };
    CreateToolsService.prototype.resolveTags = function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var tagsService, tagsT, i, newTag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagsService = new CreateTagService_1.default();
                        tagsT = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < tags.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, tagsService.execute(tags[i])];
                    case 2:
                        newTag = _a.sent();
                        tagsT.push(newTag);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, tagsT];
                }
            });
        });
    };
    return CreateToolsService;
}());
exports.default = CreateToolsService;
