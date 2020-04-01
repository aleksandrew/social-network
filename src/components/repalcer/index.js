export default function (str) {
    if (!/http/i.test(str)) {
        return str.replace(str, `http://${str}`);
    }

    return str;
}
