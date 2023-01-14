import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const { titlem, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://datcu31:Sitemongodb.31@cluster0.v5lg8z1.mongodb.net/meetsup?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!'});
    };
};

export default handler;