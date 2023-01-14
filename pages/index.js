// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//         address: 'Some address 5, 1235 Praga',
//         description: "This is a FIRST meetup!",
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: "https://images.unsplash.com/photo-1606126210582-3a17753188b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//         address: 'Some address 7, 0987 Berlin',
//         description: "This is the SECOND meetup!",
//     }
// ];

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);

    // useEffect(() => {
    //     // send a http request and fetch data
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);

    return (
        <Fragment>
            <Head>
                <title>Meetups App</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>

    );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://datcu31:Sitemongodb.31@cluster0.v5lg8z1.mongodb.net/meetsup?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),

            }))
        },
        revalidate: 10
    };
};

export default HomePage;