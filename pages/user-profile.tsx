import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'

interface IUserProfilePage {
    username: string;
}

const UserProfilePage: NextPage<IUserProfilePage> = (props) => {
    return (
        <h1>{props.username}</h1>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req, res } = context;

    return {
        props: {
            username: 'Max',
        }
    }
}

export default UserProfilePage