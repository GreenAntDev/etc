export const sleep = async (time, fn) => {
    await new Promise(fn => setTimeout(fn, time));
}
