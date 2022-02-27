import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_MODELS, GET_FILTERED_MODELS } from '../../_graphql/models';
import { GET_INFORMATION } from '../../_graphql/information';
import ModalCard from './model_card/model_card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const Model_List = () => {
    const [hairsColor, setHairsColor] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [hairColor, setHairColor] = useState("");
    const [profession, setProfession] = useState("");
    const [filterText, setFilterText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredPageNumber, setFilteredPageNumber] = useState(1);
    const [pageSize] = useState(5);
    const [modelsCount, setModelsCount] = useState();
    const [pages, setPages] = useState([]);
    const [models, setModels] = useState([]);
    const [searching, setSearching] = useState(false);

    const [getModels] = useLazyQuery(GET_MODELS, {
        variables: {
            PageNumber: pageNumber,
            PageSize: pageSize
        }
    })

    const [getFilterModels] = useLazyQuery(GET_FILTERED_MODELS, {
        variables: {
            textSearch: searchText,
            flag: filterText,
            hairColor: hairColor,
            profession: profession,
            PageNumber: filteredPageNumber,
            PageSize: pageSize
        }
    })

    const [getInformation] = useLazyQuery(GET_INFORMATION)

    useEffect(() => {
        getInformation().then(res => {
            const information = res.data.getInformation;
            setHairsColor(information.hairColor);
            setProfessions(information.profession);
        }).catch(err => {
            console.log(err)
        })
    }, [getInformation])

    const doSearch = () => {
        getFilterModels().then(res => {
            setModels(res.data.getFilterModel.models);
            setModelsCount(res.data.getFilterModel.modelsCount);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (searching) {
            doSearch();
        }
    }, [filteredPageNumber])

    useEffect(() => {
        getModels().then(res => {
            setModels(res.data.getModels.models);
            setModelsCount(res.data.getModels.modelsCount);
        }).catch(err => {
            console.log(err);
        })
    }, [pageNumber, getModels])

    const goToNewPage = (e) => {
        let targetNumber = e.target;
        const number = targetNumber.getAttribute("name");
        if (filterText !== "" || profession !== "" || hairColor !== "") {
            setFilteredPageNumber(parseInt(number));
            // doSearch();
        } else {
            setPageNumber(parseInt(number));
        }
    };

    useEffect(() => {
        setPages([]);
        if (modelsCount > pageSize) {
            let pagesToCreate = Math.ceil(modelsCount / pageSize);
            for (let i = 0; i < pagesToCreate; i++) {
                setPages((preValues) => [...preValues, <h1>Hi</h1>]);
            }
        }
    }, [modelsCount, pageSize]);


    return (
        <>
            <Box padding={5}>
                <div className='filters'>
                    <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Text To Search</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filterText}
                                label="Search Filed"
                                onChange={(e) => { setFilterText(e.target.value); setProfession(""); setHairColor(""); }}
                            >
                                <MenuItem value="firstName">First Name</MenuItem>
                                <MenuItem value="lastName">Last Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField placeholder='Type First/Last Name' value={searchText} onChange={(e) => setSearchText(e.target.value)} />


                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Hair Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={hairColor}
                                label="Hair Color"
                                onChange={(e) => { setHairColor(e.target.value); setFilterText(""); setSearchText(""); setProfession("") }}
                            >
                                {
                                    hairsColor.map((hair, index) => (
                                        <MenuItem key={index} value={hair}>{hair}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label2">Profession</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select2"
                                value={profession}
                                label="Profession"
                                onChange={(e) => { setProfession(e.target.value); setHairColor(""); setFilterText(""); setSearchText(""); }}
                            >
                                {
                                    professions.map((prof, index) => (
                                        <MenuItem key={index} value={prof}>{prof}</MenuItem>

                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Button color="primary" onClick={() => { doSearch(); setSearching(true); setFilteredPageNumber(1) }}>Search</Button>
                    <Button color="secondary" onClick={() => { setProfession(""); setHairColor(""); setFilterText(""); setSearchText(""); setPageNumber(1) }}>Reset</Button>
                </div>
                <Grid container spacing={5}>
                    {
                        models.map((model, index) => (
                            <Grid item key={index}> <ModalCard model={model} /></Grid>
                        ))
                    }
                </Grid>
                {modelsCount > pageSize && <div className="page-btn">
                    {pages.map((page, index) => {
                        return (
                            <span key={index} name={index + 1} onClick={goToNewPage}>
                                {index + 1}
                            </span>
                        );
                    })}
                </div>}
            </Box>
        </>
    )
}

export default Model_List