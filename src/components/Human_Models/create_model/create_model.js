import React, { useState, useEffect } from 'react'
import classes from "./create_model.module.css";
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_INFORMATION } from '../../_graphql/information';
import { CREATE_MODELS } from '../../_graphql/models';
import { useNavigate } from 'react-router-dom';



const Create_Model = () => {
    const navigate = useNavigate();
    const [modelInfo, setModelInfo] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        profession: "",
        shoeSize: "",
        hairColor: "",
        hairLength: "",
        braSize: "",
        waistSize: "",
        height: "",
        weight: "",
        castingPreference: ""
    });
    const [braSize, setBraSize] = useState([]);
    const [castingPref, setCastingPref] = useState([]);
    const [picture, setPicture] = useState([]);
    const [gender, setGender] = useState([]);
    const [hairColor, setHairColor] = useState([]);
    const [hairLength, setHairLength] = useState([]);
    const [height, setheight] = useState([]);
    const [profession, setProfession] = useState([]);
    const [shoeSize, setShoeSize] = useState([]);
    const [waistSize, setWaistSize] = useState([]);
    const [weight, setWeight] = useState([]);

    // const [selectedFile, setSelectedFile] = useState(null);
    // const [previewImage, setPreviewImage] = useState(null);

    // const onSelectPhoto = (e) => {
    //     setSelectedFile(e.target.files[0]);
    //     let f = e.target.files[0];
    //     setPreviewImage(URL.createObjectURL(f));
    // };

    const collectFormData = (e) => {
        setModelInfo({
            ...modelInfo,
            [e.target.name]: e.target.value
        })
    }

    const [getInformation] = useLazyQuery(GET_INFORMATION)
    const [createModel] = useMutation(CREATE_MODELS, {
        variables: {
            firstName: modelInfo.firstName,
            lastName: modelInfo.lastName,
            picture: modelInfo.picture,
            gender: modelInfo.gender,
            dateOfBirth: modelInfo.dateOfBirth,
            profession: modelInfo.profession,
            shoeSize: parseInt(modelInfo.shoeSize),
            hairColor: modelInfo.hairColor,
            hairLength: parseInt(modelInfo.hairLength),
            braSize: parseInt(modelInfo.braSize),
            waistSize: parseInt(modelInfo.waistSize),
            height: parseInt(modelInfo.height),
            weight: parseInt(modelInfo.weight),
            castingPreference: modelInfo.castingPreference,
            picture: modelInfo.picture
        }
    })

    useEffect(() => {
        getInformation().then(res => {
            const information = res.data.getInformation;
            setBraSize(information.braSize);
            setCastingPref(information.castingPref);
            setGender(information.gender);
            setHairColor(information.hairColor);
            setHairLength(information.hairLenght);
            setheight(information.height);
            setProfession(information.profession);
            setShoeSize(information.shoeSize);
            setWaistSize(information.waistSize);
            setWeight(information.weight);
            setPicture(information.picture);
        }).catch(err => {
            console.log(err)
        })
    }, [getInformation])

    // useEffect(() => {
    //     console.log();
    // }, [])

    const submit = (e) => {
        e.preventDefault();
        // const formData = new FormData();

        // formData.append("image", selectedFile, selectedFile.name);

        // axios
        //     .put("http://localhost:3000/model-images", formData, {}).then(res => {
        //         setImagePath(res.data.filePath);
        createModel().then(res => {
            console.log(res);
            navigate('/', { replace: true });
        }).catch(err => {
            console.log(err);
        })
        // }
        // )
        // .catch(err => {
        //     console.log(err);
        // })
    }
    return (
        <>
            <div>
                <h2>Model Registration form</h2>
                <form onSubmit={submit}>
                    <section className={classes.left}>
                        <div className={classes['input-container']}>
                            <label htmlFor="firstName">Name</label>
                            <input type="text" required placeholder='Please Enter Your Firstname' name="firstName" value={modelInfo.firstName} onChange={(e) => collectFormData(e)} />
                        </div>
                        <div className={classes['input-container']}>
                            <label htmlFor="lastName" required>Last Name</label>
                            <input type="text" required placeholder='Please Enter Your Lastname' name="lastName" value={modelInfo.lastName} onChange={(e) => collectFormData(e)} />
                        </div>
                        <div className={classes['input-container']}>
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" value={modelInfo.gender} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Gender
                                </option>
                                {
                                    gender.map((g, index) => (
                                        <option value={g} key={index}>
                                            {g}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={classes['input-container']}>
                            <label htmlFor="dateOfBirth">Date Of Bright</label>
                            <input type="date" name="dateOfBirth" value={modelInfo.dateOfBirth} onChange={(e) => collectFormData(e)} />
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="profession">Profession</label>
                            <select name="profession" value={modelInfo.profession} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Choose Profession
                                </option>
                                {
                                    profession.map((prof, index) => (
                                        <option key={index} value={prof}>
                                            {prof}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="castingPreference">Casting Preference </label>
                            <select name="castingPreference" value={modelInfo.castingPreference} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Casting Preference
                                </option>
                                {
                                    castingPref.map((casting, index) => (
                                        <option key={index} value={casting}>
                                            {casting}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="shoeSize">Shoe Size</label>
                            <select name="shoeSize" value={modelInfo.shoeSize} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Shoe Size
                                </option>
                                {
                                    shoeSize.map((shoe, index) => (
                                        <option key={index} value={shoe}>
                                            {shoe}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </section>
                    <section className={classes.right}>
                        <div className={classes['input-container']}>
                            <label htmlFor="hairColor">Hair Color</label>
                            <select name="hairColor" value={modelInfo.hairColor} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Hair Color
                                </option>
                                {
                                    hairColor.map((hair, index) => (
                                        <option key={index} value={hair}>
                                            {hair}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="hairLength">Hair Length</label>
                            <select name="hairLength" value={modelInfo.hairLength} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Hair Length
                                </option>
                                {
                                    hairLength.map((hair, index) => (
                                        <option key={index} value={hair}>
                                            {hair}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="braSize">Bra Size</label>
                            <select name="braSize" value={modelInfo.braSize} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Bra Size
                                </option>
                                {
                                    braSize.map((bra, index) => (
                                        <option key={index} value={bra}>
                                            {bra}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="waistSize">Waist Size</label>
                            <select name="waistSize" value={modelInfo.waistSize} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Waist Size
                                </option>
                                {
                                    waistSize.map((waist, index) => (
                                        <option key={index} value={waist}>
                                            {waist}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="height">Height</label>
                            <select name="height" value={modelInfo.height} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Height
                                </option>
                                {
                                    height.map((h, index) => (
                                        <option key={index} value={h}>
                                            {h}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="weight">Weight</label>
                            <select name="weight" value={modelInfo.weight} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Weight
                                </option>
                                {
                                    weight.map((w, index) => (
                                        <option key={index} value={w}>
                                            {w}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={classes['input-container']}>
                            <label htmlFor="picture">Picture</label>
                            <select name="picture" value={modelInfo.picture} onChange={(e) => collectFormData(e)}>
                                <option value="">
                                    Please Select Your Picture
                                </option>
                                {
                                    picture.map((pic, index) => (
                                        <option key={index} value={pic.path}>
                                            {pic.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        {modelInfo.picture && <div style={{ marginLeft: "20px", height: "300px", width: "300px", backgroundImage: `url(${modelInfo.picture})` }}></div>}

                        {/* <div className={classes['input-container']}>
                            <label htmlFor="picture">Picture</label>
                            <input type="file" name="picture" value={modelInfo.picture} onChange={(e) => { onSelectPhoto(e); collectFormData(e) }} />
                        </div> */}
                    </section>
                    <div className={classes['send-container']}>
                        <input type="submit" defaultValue="Send" />
                    </div>
                </form>
            </div>

        </>
    )
}

export default Create_Model