import { gql } from '@apollo/client';

export const GET_FILTERED_MODELS = gql`
query getFilterModel($textSearch: String, $flag: String, $hairColor: String, $profession: String, $PageNumber: Int, $PageSize: Int){
  getFilterModel(textSearch: $textSearch, flag: $flag, hairColor: $hairColor, profession: $profession, PageNumber: $PageNumber, PageSize: $PageSize) {
    models {
      _id
        firstName
        lastName
        picture
        gender
        dateOfBirth
        profession
        shoeSize
        hairColor
        hairLength
        braSize
        waistSize
        height
        weight
        castingPreference
    },
    modelsCount
  }
}
`;

export const GET_MODELS = gql`
    query getModels($PageNumber: Int, $PageSize: Int){
        getModels(PageNumber: $PageNumber, PageSize: $PageSize) {
          models {
            _id
              firstName
              lastName
              picture
              gender
              dateOfBirth
              profession
              shoeSize
              hairColor
              hairLength
              braSize
              waistSize
              height
              weight
              castingPreference
          },
          modelsCount
        }
      }
`;

export const CREATE_MODELS = gql`
mutation createModel (
    $firstName: String,
    $lastName: String,
    $picture: String,
    $gender: String,
    $dateOfBirth: String,
    $profession: String,
    $shoeSize: Int,
    $hairColor: String,
    $hairLength: Int,
    $braSize: Int,
    $waistSize: Int,
    $height: Int,
    $weight: Int,
    $castingPreference: String

) {
    createModel(
      userInput: {
        firstName: $firstName,
        lastName: $lastName,
        picture: $picture,
        gender: $gender,
        dateOfBirth: $dateOfBirth,
        profession: $profession,
        shoeSize: $shoeSize,
        hairColor: $hairColor,
        hairLength: $hairLength,
        braSize: $braSize,
        waistSize: $waistSize,
        height: $height,
        weight: $weight,
        castingPreference: $castingPreference
      }
    ) {
        _id,
        firstName,
        lastName,
        picture,
        gender,
        dateOfBirth,
        profession,
        shoeSize,
        hairColor,
        hairLength,
        braSize,
        waistSize,
        height,
        weight,
        castingPreference
    }
  }
`;