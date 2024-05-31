const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");

const PRIVATE_KEY =
    "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

// this is only an example or an illustration to make the application seems working as the real case
const retrivePrivateKey = (publicKey) => {
    let privateKey;
    switch (publicKey) {
        case "02155492843046080da047eb2f2acefe7343f4c45a16d9f429bbd4478260645664":
            privateKey =
                "5226b87c2c6977306be0af896c2d63f36e25b7bc00af6d9caf62874c131c7eab";
            break;
        case "02daa77629c9ac20e0086634b144050c2cb90c4e9b2309e5ef6d0d3dce22332468":
            privateKey =
                "e6d6e5eb93c0ee8ce503c2a0a7b4c5dbc94201e8f9d7bb2166f8bf4562e8ea68";
            break;
        case "02efeff53ef8cb69ac65d1df3a111ec8538d063835693aac2445e42b105c45451b":
            privateKey =
                "53defa7b4a87310d4051c68f7eb313109ff62daa3039fe287be67a55791f7514";
            break;
        default:
            throw new Error("Private Key not Found!");
    }
    // console.log("Retrieved Private Key: ", privateKey);
    return privateKey;
};

const generateRandomPrivateKey = (test) => {
    const randomPrivateKey = toHex(secp256k1.utils.randomPrivateKey(test));
    console.log("Private Key: ", randomPrivateKey);
    return randomPrivateKey;
};

const getPublicKey = (privateKey) => {
    const publicKey = toHex(secp256k1.getPublicKey(privateKey));
    console.log("Public Key: ", publicKey);
    return publicKey;
};
async function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

const verifySignature = async (signature, msgHash, publicKey) => {
    try {
        const verify = secp256k1.verify(signature, msgHash, publicKey);
        return verify
    } catch (error) {
        throw new Error("Invalid Signature");
    }
};

// const test = async (test) => {
//     try {
//         console.log(test, ">>> input");
//         const hash = await hashMessage(test);
//         const sign = secp256k1.sign(hash, PRIVATE_KEY, { lowS: true });
//         console.log(sign);
//     } catch (error) {
//         console.log(error);
//     }
// };

const checkSignature = async (senderPrivateKey, hashedMessage) => {
    try {
        const sign = secp256k1.sign(hashedMessage, senderPrivateKey, {
            lowS: true,
        });
        return sign;
    } catch (error) {
        console.log(error);
    }
};

// getPublicKey(generateRandomPrivateKey());

// retrivePrivateKey(
//     "02155492843046080da047eb2f2acefe7343f4c45a16d9f429bbd4478260645664"
// );

// checkSignature(
//     "e6d6e5eb93c0ee8ce503c2a0a7b4c5dbc94201e8f9d7bb2166f8bf4562e8ea68",
//     "e6d6e5eb93c0ee8ce503c2a0a7b4c5dbc94201e8f9d7bb2166f8bf4562e8ea68",
//     "5226b87c2c6977306be0af896c2d63f36e25b7bc00af6d9caf62874c131c7eab",
//     6
// );

module.exports = {
    checkSignature,
    hashMessage,
    getPublicKey,
    retrivePrivateKey,
    verifySignature,
};
