import { useState, useMemo } from "react";

export const useNigerianPhone = () => {
    const allPrefixes = useMemo(() => ({
        mtn: [
            "0803", "0703", "0903", "0806", "0706", "0813", "0814", "0816", "0810", "0906", "07025", "07026", "0704",
        ],
        glo: ["0805", "0705", "0905", "0807", "0815", "0905", "0811"],
        airtel: ["0802", "0902", "0701", "0808", "0708", "0812", "0901", "0907"],
        "9mobile": ["0809", "0909", "0817", "0818", "0908"],
        ntel: ["0804"],
        smile: ["0702"],
        multilinks: ["0709", "07027"],
        visafone: ["07025", "07026", "0704"],
        starcomms: ["07028", "07029", "0819"],
        zoom: ["0707"],
    }), []);

    const allAreaCodes = useMemo(() => ({
        Lagos: "01",
        Ibadan: "02",
        Abuja: "09",
        "Ado-Ekiti": "30",
        Ilorin: "31",
        "New Bussa": "33",
        Akure: "34",
        Oshogbo: "35",
        "Ile-Ife": "36",
        "Ijebu-Ode": "37",
        Oyo: "38",
        Abeokuta: "39",
        Wukari: "41",
        Enugu: "42",
        Abakaliki: "43",
        Makurdi: "44",
        Ogoja: "45",
        Onitsha: "46",
        Lafia: "47",
        Awka: "48",
        Ikare: "50",
        Owo: "51",
        "Benin City": "52",
        Warri: "53",
        Sapele: "54",
        Agbor: "55",
        Asaba: "56",
        Auchi: "57",
        Lokoja: "58",
        Okitipupa: "59",
        Sokoto: "60",
        Kafanchan: "61",
        Kaduna: "62",
        Gusau: "63",
        Kano: "64",
        Katsina: "65",
        Minna: "66",
        Kontagora: "67",
        "Birnin-Kebbi": "68",
        Zaria: "69",
        Pankshin: "73",
        Azare: "71",
        Gombe: "72",
        Jos: "73",
        Yola: "75",
        Maiduguri: "76",
        Bauchi: "77",
        Hadejia: "78",
        Jalingo: "79",
        "Aba, Nigeria": "82",
        Owerri: "83",
        "Port Harcourt": "84",
        Uyo: "85",
        Ahoada: "86",
        Calabar: "87",
        Umuahia: "88",
        Yenagoa: "89",
        Ubiaja: "55",
        Kwara: "31",
        Igarra: "57",
        Ughelli: "53",
        Uromi: "57",
    }), []);

    const [line, setLine] = useState<string>("");
    const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
    const [isValidLandLine, setIsValidLandLine] = useState<boolean>(false);

    const prefixes = useMemo(() => {
        const result: string[] = [];
        Object.values(allPrefixes).forEach((values) => result.push(...values));
        return result;
    }, [allPrefixes]);

    const areaCodes = useMemo(() => Object.values(allAreaCodes), [allAreaCodes]);

    const validatePhone = () => {
        let tempLine = line.replace(/\D/g, "");
        let valid = false;

        if (tempLine.startsWith("234")) {
            if (tempLine.length === 13) {
                tempLine = tempLine.replace("234", "0");
                valid =
                    prefixes.includes(tempLine.substring(0, 5)) ||
                    prefixes.includes(tempLine.substring(0, 4));
            } else if (tempLine.length === 11) {
                const stripped = tempLine.substring(3);
                valid =
                    areaCodes.includes(tempLine.substring(0, 2)) && stripped.length === 7;
                setIsValidLandLine(valid);
            }
        } else if (tempLine.startsWith("0")) {
            if (tempLine.length === 11) {
                valid =
                    prefixes.includes(tempLine.substring(0, 5)) ||
                    prefixes.includes(tempLine.substring(0, 4));
            } else if (tempLine.length === 8) {
                valid =
                    areaCodes.includes(tempLine.substring(1, 3)) && tempLine.length === 8;
                setIsValidLandLine(valid);
            }
        } else if (tempLine.length === 10) {
            if (
                prefixes.includes(tempLine.substring(0, 4)) ||
                prefixes.includes(tempLine.substring(0, 3))
            ) {
                tempLine = `0${tempLine}`;
                valid = true;
            }
        }

        setIsValidPhone(valid);
        return valid;
    };

    const getNetwork = (): string => {
        const formatted = line.replace(/^234/, "0");
        for (const [network, values] of Object.entries(allPrefixes)) {
            if (values.some((prefix) => formatted.startsWith(prefix))) {
                return network;
            }
        }
        return "unknown";
    };

    const formattedLine = (): string => {
        return line.startsWith("234") ? line.replace("234", "0") : line;
    };

    const updateLine = (input: string) => {
        setLine(input);
        setIsValidPhone(false);
        setIsValidLandLine(false);
    };

    return {
        line,
        isValidPhone,
        isValidLandLine,
        validatePhone,
        formattedLine,
        getNetwork,
        updateLine,
    };
};
