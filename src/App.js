import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ChartNav from "./layouts/ChartNav";
import MainChart from "./layouts/MainChart";
import Header from "./layouts/Header";
import Filters from './layouts/Filters';
import PowerFileValidator from "./Service/PowerFileValidator";
import IncorrectFileError from "./Errors/IncorrectFileError";
import PowerFilter from "./Service/PowerFilter";
import PowerDate from "./Service/PowerDate";

const holidaysJSON = `{
  "holiday": [
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2018-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2018-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2018-04-01"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2018-04-02"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2018-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2018-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2018-05-20"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2018-05-31"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2018-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2018-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2018-11-11"
     },
     {
        "HolidayName": "12 listopada po Święcie Niepodległości",
        "Date": "2018-11-12"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2018-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2018-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2019-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2019-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2019-04-21"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2019-04-22"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2019-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2019-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2019-06-09"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2019-06-20"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2019-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2019-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2019-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2019-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2019-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2020-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2020-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2020-04-12"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2020-04-13"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2020-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2020-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2020-05-31"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2020-06-11"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2020-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2020-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2020-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2020-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2020-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2021-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2021-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2021-04-04"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2021-04-05"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2021-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2021-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2021-05-23"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2021-06-03"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2021-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2021-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2021-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2021-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2021-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2022-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2022-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2022-04-17"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2022-04-18"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2022-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2022-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2022-06-05"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2022-06-16"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2022-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2022-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2022-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2022-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2022-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2023-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2023-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2023-04-09"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2023-04-10"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2023-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2023-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2023-05-28"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2023-06-08"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2023-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2023-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2023-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2023-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2023-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2024-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2024-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2024-03-31"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2024-04-01"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2024-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2024-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2024-05-19"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2024-05-30"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2024-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2024-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2024-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2024-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2024-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2025-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2025-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2025-04-20"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2025-04-21"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2025-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2025-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2025-06-08"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2025-06-19"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2025-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2025-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2025-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2025-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2025-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2026-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2026-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2026-04-05"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2026-04-06"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2026-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2026-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2026-05-24"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2026-06-04"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2026-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2026-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2026-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2026-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2026-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2027-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2027-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2027-03-28"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2027-03-29"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2027-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2027-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2027-05-16"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2027-05-27"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2027-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2027-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2027-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2027-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2027-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2028-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2028-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2028-04-16"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2028-04-17"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2028-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2028-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2028-06-04"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2028-06-15"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2028-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2028-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2028-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2028-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2028-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2029-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2029-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2029-04-01"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2029-04-02"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2029-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2029-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2029-05-20"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2029-05-31"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2029-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2029-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2029-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2029-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2029-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2030-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2030-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2030-04-21"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2030-04-22"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2030-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2030-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2030-06-09"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2030-06-20"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2030-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2030-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2030-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2030-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2030-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2031-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2031-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2031-04-13"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2031-04-14"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2031-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2031-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2031-06-01"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2031-06-12"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2031-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2031-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2031-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2031-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2031-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2032-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2032-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2032-03-28"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2032-03-29"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2032-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2032-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2032-05-16"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2032-05-27"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2032-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2032-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2032-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2032-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2032-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2033-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2033-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2033-04-17"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2033-04-18"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2033-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2033-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2033-06-05"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2033-06-16"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2033-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2033-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2033-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2033-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2033-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2034-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2034-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2034-04-09"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2034-04-10"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2034-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2034-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2034-05-28"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2034-06-08"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2034-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2034-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2034-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2034-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2034-12-26"
     },
     {
        "HolidayName": "Nowy Rok, Świętej Bożej Rodzicielki",
        "Date": "2035-01-01"
     },
     {
        "HolidayName": "Trzech Króli (Objawienie Pańskie)",
        "Date": "2035-01-06"
     },
     {
        "HolidayName": "Wielkanoc",
        "Date": "2035-03-25"
     },
     {
        "HolidayName": "Poniedziałek Wielkanocny",
        "Date": "2035-03-26"
     },
     {
        "HolidayName": "Święto Pracy",
        "Date": "2035-05-01"
     },
     {
        "HolidayName": "Święto Konstytucji 3 Maja",
        "Date": "2035-05-03"
     },
     {
        "HolidayName": "Zesłanie Ducha Świętego (Zielone Świątki)",
        "Date": "2035-05-13"
     },
     {
        "HolidayName": "Boże Ciało",
        "Date": "2035-05-24"
     },
     {
        "HolidayName": "Święto Wojska Polskiego, Wniebowzięcie Najświętszej Maryi Panny",
        "Date": "2035-08-15"
     },
     {
        "HolidayName": "Wszystkich Świętych",
        "Date": "2035-11-01"
     },
     {
        "HolidayName": "Święto Niepodległości",
        "Date": "2035-11-11"
     },
     {
        "HolidayName": "Boże Narodzenie (pierwszy dzień)",
        "Date": "2035-12-25"
     },
     {
        "HolidayName": "Boże Narodzenie (drugi dzień)",
        "Date": "2035-12-26"
     }
  ]
}
`;

const readFile = (file, handleFileContent) => {
    const reader = new FileReader();

    reader.onload = event => {
        event.target.result && handleFileContent(event.target.result);
    };

    file && reader.readAsText(file);
}

function isXmlFile(file) {


    if (/*!inputFileElement.files.length*/ !file) throw new Error("No files provided!");

    return "text/xml" === /*inputFileElement.files[0]*/file.type;

}

const combineProjectElements = (tasks, resources, assignments) => {
    tasks = tasks.map(task => {

        const taskResources = assignments
            .filter(assignment => assignment.taskId === task.id && assignment.resourceId >= 0)
            .map(assignment => {
                const assignedResource = {};
                assignedResource.resource = resources.find(resource => resource.id === assignment.resourceId);
                assignedResource.work = assignment.work;
                return assignedResource;

            });

        // task.resources = taskResources;
        task.assignments = taskResources;

        return task;
    });
    return tasks;
}

const setComplexName = (tasks, outlineNumber, name = [], level = 1) => {

    level++;

    const selectedTask = tasks.find(task => task.outlineNumber === outlineNumber);

    const subtasks = tasks.filter(subtask => subtask.outlineNumber.startsWith(selectedTask.outlineNumber) && subtask.outlineLevel === level)
        .map(subtask => {
            setComplexName(tasks, subtask.outlineNumber, [...name, selectedTask.name], level);
            return subtask;
        });

    selectedTask.isFinal = !subtasks.length;
    selectedTask.complexName = /*!subtasks.length ?*/ [...name, selectedTask.name] /*: null*/;


}

const parseWorkObject = (workCode) => {

    if (!workCode) throw new Error("No work code provided!");
    const work = {};

    work.hours = parseInt(workCode.split("PT")[1].split("H")[0]);
    work.minutes = parseInt(workCode.split("H")[1].split("M")[0]);
    work.seconds = parseInt(workCode.split("M")[1].split("S")[0]);

    return work;
}

class App extends React.Component {
    state = {
        file: null,
        tasks: [],
        filter: new Map(),
    };

    taskStatuses = {
        TO_DO: "to do",
        IN_PROGRESS: "in progress",
        DONE: "done"
    }

    handleFile = ev => {

        if (!ev.target.files) throw new TypeError("Incorrect element type!");
        if (!ev.target.files.length) return alert("No files attached");

        const file = ev.target.files[0];

        if (!isXmlFile(file)) return alert("Niewłaściwy format pliku! \n Wprowadź plik xml.");

        this.setState({file});
        readFile(file, this.handleProjctXml);
    };

    getTaskStatus = (percent) => {

        if (!percent) return this.taskStatuses.TO_DO;
        if (percent == 100) return this.taskStatuses.DONE;

        return this.taskStatuses.IN_PROGRESS;
    };

    handleProjctXml = xmlText => {
        const convert = require("xml-js");
        try {
            const msProjectJson = convert.xml2js(xmlText, {
                compact: true,
                spaces: 4
            });

            if (!PowerFileValidator.isMsProjectStructure(PowerFileValidator.PROJECT_OBJECT_TEMPLATE, msProjectJson)) throw new IncorrectFileError("It isn't MS Project file.Please select correct file.");

            let {
                Tasks: {Task: tasks},
                Resources: {Resource: resources},
                Assignments: {Assignment: assignments}
            } = msProjectJson.Project;

            tasks = Array.isArray(tasks) ? tasks : [tasks];

            tasks = tasks.filter(task => PowerFileValidator.isMsProjectStructure(PowerFileValidator.TASK_OBJECT_TEMPLATE, task) && task.UID._text !== "0")
                .map(task => ({
                    id: parseInt(task.UID._text),
                    name: task.Name._text,
                    start: PowerDate.getSimplifyDate(task.Start._text),
                    finish: PowerDate.getSimplifyDate(task.Finish._text),
                    status: this.getTaskStatus(parseInt(task.PercentComplete._text)),
                    outlineNumber: task.OutlineNumber._text,
                    outlineLevel: parseInt(task.OutlineLevel._text),
                    mainOutlineNo: parseInt(task.OutlineNumber._text.split(".")[0]),
                    percentComplete: parseInt(task.PercentComplete._text),
                    selected: false
                }));

            resources = Array.isArray(resources) ? resources : [resources];
            resources = resources
                .filter(resource => PowerFileValidator.isMsProjectStructure(PowerFileValidator.RESOURCE_OBJECT_TEMPLATE, resource))
                .map(resource => ({
                    id: parseInt(resource.UID._text),
                    name: resource.Name._text,
                    department: resource.Group ? resource.Group._text : ""
                }));

            assignments = assignments || [];
            assignments = Array.isArray(assignments) ? assignments : [assignments];
            assignments = assignments
                .filter(assignment => PowerFileValidator.isMsProjectStructure(PowerFileValidator.ASSIGNMENT_OBJECT_TEMPLATE, assignment))
                .map(assignment => ({
                    taskId: parseInt(assignment.TaskUID._text),
                    resourceId: parseInt(assignment.ResourceUID._text),
                    work: parseWorkObject(assignment.Work._text)
                }));

            tasks = combineProjectElements(tasks, resources, assignments);

            tasks.filter(task => task.outlineLevel === 1)
                .forEach(task => setComplexName(tasks, task.outlineNumber));

            this.setState(() => {
                return {
                    tasks,
                    resources
                };
            });
        } catch (error) {
            alert(error.message);
            alert(error.name);
            console.log(error.stack);
        }
    };

    handleFilter = ev => {

        const {name, value} = ev.target;

        this.setState(prevState => {
            const {filter} = prevState;
            filter.set(name, value);

            return {filter};
        })
    }

    clearFilter = ev => {

        const {name} = ev.target;

        if (name !== "all") {
            this.setState(prevState => {
                const {filter} = prevState;
                filter.set(name, "");

                return {filter};
            })
        } else {
            this.getDefaultFilters();
        }
    }

    componentWillMount(){
        let {holiday} = JSON.parse(holidaysJSON);
        this.setState({holidays: holiday});
    }

    downloadXmlFile = (filterdList) =>{

        const powerFilter = new PowerFilter();
        const {filter, tasks} = this.state;

        if(!tasks.length) return alert("No tasks loaded! \n\n Load tasks to download it.");

        const task = filterdList ? tasks.filter(task => task.complexName && powerFilter.setTask(task)
            .checkName(filter.get("name"))
            .checkTaskBeforeDate(filter.get("finish"))
            .checkTaskAfterDate(filter.get("start"))
            .checkDepartment(filter.get("department"))
            .checkTaskOwner(filter.get("person"))
            .checkStatus(filter.get("status"))
            .filterAll()) : this.state.tasks;

        const convert = require("xml-js");
        const options = {compact: true, ignoreComment: true, spaces: 4};
        const result = convert.js2xml({tasks:{task}}, options);

        const xmlFile = new Blob([result], {type:"text/xml"});

        if(window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(xmlFile, this.state.file.name);
        }else{
            const url = window.URL.createObjectURL(xmlFile);

            const a = document.createElement("a");
            a.href = url;
            a.download = this.state.file.name;
            a.click();
            setTimeout(() => window.URL.revokeObjectURL(url), 0);
        }
    }

    updateTask = changedTask => {

        this.setState(prevState => {

            const {tasks} = prevState;

            if (changedTask && changedTask.id) tasks.forEach(task => {
                if (task.id === changedTask.id) {
                    Object.assign(task, changedTask);
                    task.status = this.getTaskStatus(task.percentComplete);
                }
            });

            return {tasks};

        })
    }



    componentDidMount() {
        this.getDefaultFilters();
    }

    getDefaultFilters = () => {
        this.setState(prevState => {
            const {filter} = prevState;
            filter.set("name", "");
            filter.set("person", "");
            filter.set("start", "");
            filter.set("finish", "");
            filter.set("department", "");
            filter.set("status", "");

            return {filter};
        })
    }

    render() {

        const {filter, tasks} = this.state;

        return (
            <Router basename={process.env.PUBLIC_URL}>
                <>
                    <header>
                        <Header handleFile={this.handleFile} name={this.state.file ? this.state.file.name : null}
                                filePath={this.state.filePath}/>
                    </header>
                    <main>
                        <section className="mainSection">
                            <Route path={["/kanban","/gantt","/list"]} render={() => (
                            <Filters
                                setFilter={this.handleFilter}
                                resources={this.state.resources}
                                clearFilter={this.clearFilter}
                                filters={this.state.filter}
                                statusesList={this.taskStatuses}
                            />)}/>

                            <MainChart tasks={tasks}
                                       resources={this.state.resources}
                                       updateTask={this.updateTask}
                                       name={this.state.file ? this.state.file.name : null}
                                       downloadXmlFile={this.downloadXmlFile}
                                       holidays={this.state.holidays}
                                       filter={filter}
                            />
                        </section>
                        <ChartNav/>
                    </main>
                </>
            </Router>
        );
    }
}

export default App;
