"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Tags_1 = __importDefault(require("./Tags"));
/**
 * Type orm faz a inicialização das variáveis
 */
var Tools = /** @class */ (function () {
    function Tools() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Tools.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "link", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tools.prototype, "description", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Tags_1.default; }, function (tags) { return tags.tools; }, { cascade: true, onDelete: "CASCADE" }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Tools.prototype, "tags", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Tools.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Tools.prototype, "updated_at", void 0);
    Tools = __decorate([
        typeorm_1.Entity('tools')
    ], Tools);
    return Tools;
}());
exports.default = Tools;
