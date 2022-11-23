import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'

interface IUserIdPage {
    id: string
}

const UserIdPage : NextPage<IUserIdPage> = (props) => {
  return (
    <h1>
        {props.id}
    </h1>
  )
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const {params} = context;
    const userId = params?.uid;
    return {
        props: {
            id: 'userid-' + userId
        }
    }
}

export default UserIdPage