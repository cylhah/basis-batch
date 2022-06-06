export function getRunEnv() {
    return import.meta.env.VITE_CCCRUNENV;
}

export function isDevEnv() {
    return getRunEnv() == "dev";
}

export function isDistEnv() {
    return getRunEnv() == "dist";
}

export function isReleaseEnv() {
    return getRunEnv() == "release";
}
