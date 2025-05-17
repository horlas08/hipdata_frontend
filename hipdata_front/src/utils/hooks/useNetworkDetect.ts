import { useState, useMemo } from "react";

export const useNetworkDetect = () => {
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const networks = useMemo(() => ({
        "9mobile": ["0809", "0909", "0817", "0818", "0908"],
        mtn: ["0806", "0803", "0816", "0813", "0810", "0814", "0903", "0906", "0916", "0703", "0706", "0707", "0704", "0913"],
        glo: ["0805", "0705", "0905", "0807", "0815", "0915", "0811"],
        airtel: ["0802", "0902", "0701", "0808", "0708", "0812", "0904", "0907", "0901", "0911", "0912"],
        starcomms: ["07028", "07029", "0819"],
        visafone: ["07025", "07026", "0704"],
        multilinks: ["07027", "0709"],
        smile: ["0702"],
    }), []);

    const validatePhone = (): boolean => {
        if (!phone) {
            setError("Invalid entry, enter a telephone number");
            return false;
        }
        setError(null);
        return true;
    };

    const getPhonePrefix = (length = 4): string => {
        return phone.substr(0, length);
    };

    const getNetworkName = (): string | null => {
        if (!validatePhone()) return null;

        const primaryPrefix = getPhonePrefix();
        const secondaryPrefix = getPhonePrefix(5);

        if (networks.mtn.includes(primaryPrefix)) return "MTN";
        if (networks.glo.includes(primaryPrefix)) return "Glo";
        if (networks["9mobile"].includes(primaryPrefix)) return "9mobile";
        if (networks.airtel.includes(primaryPrefix)) return "Airtel";
        if (
            networks.starcomms.includes(primaryPrefix) ||
            networks.starcomms.includes(secondaryPrefix)
        )
            return "Starcomms";
        if (
            networks.visafone.includes(primaryPrefix) ||
            networks.visafone.includes(secondaryPrefix)
        )
            return "Visafone";
        if (
            networks.multilinks.includes(primaryPrefix) ||
            networks.multilinks.includes(secondaryPrefix)
        )
            return "Multilinks";
        if (networks.smile.includes(primaryPrefix)) return "Smile";

        return null;
    };
    const getNetworkId = (): string | null => {
        if (!validatePhone()) return null;

        const primaryPrefix = getPhonePrefix();
        const secondaryPrefix = getPhonePrefix(5);

        if (networks.mtn.includes(primaryPrefix)) return "1";
        if (networks.glo.includes(primaryPrefix)) return "2";
        if (networks["9mobile"].includes(primaryPrefix)) return "4";
        if (networks.airtel.includes(primaryPrefix)) return "3";
        if (
            networks.starcomms.includes(primaryPrefix) ||
            networks.starcomms.includes(secondaryPrefix)
        )
            return "Starcomms";
        if (
            networks.visafone.includes(primaryPrefix) ||
            networks.visafone.includes(secondaryPrefix)
        )
            return "Visafone";
        if (
            networks.multilinks.includes(primaryPrefix) ||
            networks.multilinks.includes(secondaryPrefix)
        )
            return "Multilinks";
        if (networks.smile.includes(primaryPrefix)) return "Smile";

        return null;
    };

    return {
        phone,
        error,
        setPhone,
        getNetworkName,
        getNetworkId,
        validatePhone,
    };
};
