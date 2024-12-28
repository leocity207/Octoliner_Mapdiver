#include "lines.h"

const oatpp::Type* LineDTO::GetStationType(const Fields<Any>& stations, const std::string& key)
{
	auto& value = stations[key];
	if (!value)
		return nullptr;
	return value.get()->type;
}

oatpp::Vector<oatpp::String> LineDTO::GetStationList(const Fields<Any>& stations, const std::string& key)
{
	auto& value = stations[key];
	if (!value)
		return nullptr;
	oatpp::Vector<oatpp::String> rmt = oatpp::Vector<oatpp::String>::createShared();
	auto station_list_wrapped = value.retrieve(value.get()->type);
	auto station_list = station_list_wrapped.cast<oatpp::Vector<oatpp::Any>>();
	for (const auto& station : *station_list) 
	{
		auto station_wrapped = station.retrieve(station.get()->type);
		auto station_list = station_wrapped.cast<oatpp::String>();
		rmt.get()->push_back(station_list);
	}
	return rmt;
}

oatpp::String LineDTO::GetStationString(const Fields<Any>& stations, const std::string& key)
{
	auto& value = stations[key];
	if (!value)
		return nullptr;
	auto str = value.retrieve(value.get()->type);
	return str.cast<oatpp::String>();
}