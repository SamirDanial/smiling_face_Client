import { gql } from '@apollo/client';

export const GET_INFORMATION = gql`
    query {
        getInformation {
    		braSize
            castingPref
            gender
            hairColor
            hairLenght
            height
            profession
            shoeSize
            waistSize
            weight
            picture {
                name,
                path
            }
        }
    }
`;