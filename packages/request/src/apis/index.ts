import { http } from "../..";

const midwayGate = "http://localhost:7001";

const nestGate = "http://localhost:7002";

export const greetMidway = () => {
  return http.get<string>(`${midwayGate}/api/greeting`);
};

export const greetNest = () => {
  return http.get<string>(`${nestGate}/api/greeting`);
};
