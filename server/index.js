const express = require("express");
const app = express();
const { toHex } = require("ethereum-cryptography/utils");
const cors = require("cors");
const {
    retrivePrivateKey,
    checkSignature,
    hashMessage,
    verifySignature,
} = require("./helpers/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "5226b87c2c6977306be0af896c2d63f36e25b7bc00af6d9caf62874c131c7eab": 100,
    "e6d6e5eb93c0ee8ce503c2a0a7b4c5dbc94201e8f9d7bb2166f8bf4562e8ea68": 50,
    "53defa7b4a87310d4051c68f7eb313109ff62daa3039fe287be67a55791f7514": 75,
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const privateKey = retrivePrivateKey(address);
    const balance = balances[privateKey] || 0;
    res.send({ balance });
});

app.post("/send", async (req, res) => {
    try {
        const { sender, recipient, amount } = req.body;
        const hashedMessage = await hashMessage(
            `${sender} sends ${amount} to ${recipient}`
        );
        let senderPrivateKey = retrivePrivateKey(sender);
        let recipientPrivateKey = retrivePrivateKey(recipient);

        setInitialBalance(senderPrivateKey);
        setInitialBalance(recipientPrivateKey);

        const check = await checkSignature(senderPrivateKey, hashedMessage);

        if (!check)
            res.status(400).send({ message: "Failed to generate signature" });

        const verify = await verifySignature(check, hashedMessage, sender);

        if (!verify) res.status(400).send({ message: "Invalid Signature" });

        if (balances[senderPrivateKey] < amount) {
            res.status(400).send({ message: "Not enough funds!" });
        } else {
            balances[senderPrivateKey] -= amount;
            balances[recipientPrivateKey] += amount;
            res.send({ balance: balances[senderPrivateKey] });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
