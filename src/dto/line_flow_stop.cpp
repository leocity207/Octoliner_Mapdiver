#include "line_flow_stop.h"


bool Line_Flow_Stop_DTO::hasArrivalMinute() const {
  return arrival_minute.getPtr() != nullptr;
}

bool Line_Flow_Stop_DTO::hasDepartureMinute() const {
  return departure_minute.getPtr() != nullptr;
}

bool Line_Flow_Stop_DTO::hasFlags() const {
  return flags && !flags->empty();
}