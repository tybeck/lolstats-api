'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("./constants/identifiers.constant");
var app_1 = require("./app");
var server_1 = require("./server");
var routes_1 = require("./routes/");
var match_controller_1 = require("./controllers/match.controller");
var match_service_1 = require("./services/match.service");
var player_service_1 = require("./services/player.service");
var league_service_1 = require("./services/league.service");
var formatting_service_1 = require("./services/formatting.service");
var match_route_1 = require("./routes/match.route");
var container = new inversify_1.Container();
exports.container = container;
// core
container.bind(identifiers_constant_1.IDENTIFIERS.App).to(app_1.App);
container.bind(identifiers_constant_1.IDENTIFIERS.Server).to(server_1.Server).inSingletonScope();
// middlewares
// services
container.bind(identifiers_constant_1.IDENTIFIERS.FormattingService).to(formatting_service_1.FormattingService).inSingletonScope();
container.bind(identifiers_constant_1.IDENTIFIERS.LeagueService).to(league_service_1.LeagueService).inSingletonScope();
container.bind(identifiers_constant_1.IDENTIFIERS.MatchService).to(match_service_1.MatchService).inSingletonScope();
container.bind(identifiers_constant_1.IDENTIFIERS.PlayerService).to(player_service_1.PlayerService).inSingletonScope();
// controllers
container.bind(identifiers_constant_1.IDENTIFIERS.MatchController).to(match_controller_1.MatchController).inSingletonScope();
// routes
container.bind(identifiers_constant_1.IDENTIFIERS.Routes).to(routes_1.Routes).inSingletonScope();
container.bind(identifiers_constant_1.IDENTIFIERS.MatchRoutes).to(match_route_1.MatchRoutes).inSingletonScope();
//# sourceMappingURL=inversify.config.js.map