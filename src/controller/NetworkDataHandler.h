#ifndef NETWORK_DATA_HANDLER_H
#define NETWORK_DATA_HANDLER_H


#include <oatpp/web/server/api/ApiController.hpp>
#include <oatpp/macro/codegen.hpp>
#include <oatpp/macro/component.hpp>
#include <oatpp/json/ObjectMapper.hpp>

#include "src/config.h"

#include "dto/lines.h"
#include "dto/stations.h"
#include "dto/network.h"

#include <fstream>
#include <sstream>

#include OATPP_CODEGEN_BEGIN(ApiController) //<-- Begin Codegen

class NetworkDataHandler : public oatpp::web::server::api::ApiController {
	public:
		NetworkDataHandler(OATPP_COMPONENT(std::shared_ptr<oatpp::web::mime::ContentMappers>, apiContentMappers));

		std::string readFile() {
			std::ifstream file(RESOURCE_PATH().generic_string() + std::string("data/ligne.json"));
			std::stringstream buffer;
			buffer << file.rdbuf();
			return buffer.str();
		}

		ENDPOINT("GET", "dyn/network_data", get_network_data) {

			std::string base_path = RESOURCE_PATH().generic_string();
			oatpp::json::ObjectMapper json_object_mapper;

			oatpp::String line_path = oatpp::String(base_path) + "resources-config/data/line.json";
			oatpp::String station_path = oatpp::String(base_path) + "resources-config/data/station.json";

			auto lines_json = Load_Json_File(line_path);
			if (!lines_json) {
				return createResponse(Status::CODE_500, "Missing line.json file");
			}

			auto stations_json = Load_Json_File(station_path);
			if (!stations_json) {
				return createResponse(Status::CODE_500, "Missing station.json file");
			}

			auto lines_dto = Parse_Json<Lines_DTO>(*lines_json, json_object_mapper);
			auto stations_dto = Parse_Json<Stations_DTO>(*stations_json, json_object_mapper);

			if (!lines_dto || !stations_dto) {
				return createResponse(Status::CODE_500, "Invalid JSON format in line or station");
			}

			auto network_dto = NetworkDTO::createShared();

			// === Charger les fichiers station/{id}.json
			for (const auto& station_id : *stations_dto.value()->stations) {
				oatpp::String path = oatpp::String(base_path) + "resources-config/data/station/" + station_id + ".json";
				auto json_station = Load_Json_File(path);
				if (!json_station) {
					OATPP_LOGi("[warning]", "Missing station file: %s", path->c_str());
					continue;
				}

				auto station_dto = Parse_Json<Station_DTO>(*json_station, json_object_mapper);
				if (station_dto) {
					network_dto->stations->push_back({ station_id, station_dto.value() });
				}
				else {
					OATPP_LOGi("[warning]", "Failed to parse station %s", station_id->c_str());
				}
			}

			// === Charger les fichiers line/{id}.json
			for (const auto& line_id : *lines_dto.value()->lines) {
				oatpp::String path = oatpp::String(base_path) + "resources-config/data/line/" + line_id + ".json";
				auto json_line = Load_Json_File(path);
				if (!json_line) {
					OATPP_LOGi("[warning]", "Missing line file: %s", path->c_str());
					continue;
				}

				auto line_dto = Parse_Json<Line_DTO>(*json_line, json_object_mapper);
				if (line_dto) {
					network_dto->lines->push_back({ line_id, line_dto.value() });
				}
				else {
					OATPP_LOGi("[warning]", "Failed to parse line %s", line_id->c_str());
				}
			}

			auto response = createDtoResponse(Status::CODE_200, network_dto);
			response->putHeader("Content-Type", "application/json");
			return response;
		}

private:
	std::optional<oatpp::String> Load_Json_File(const oatpp::String& path);

	template<typename T>
	std::optional<oatpp::Object<T>> Parse_Json(const oatpp::String& json, oatpp::json::ObjectMapper& mapper);

};


#endif