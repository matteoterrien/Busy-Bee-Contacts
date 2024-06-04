import {
    Text,
    Box,
    Button,
    Image,
    Stack,
    HStack,
    ChakraProvider,
    Spacer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { IoMdContact } from 'react-icons/io'
import { TiStarFullOutline } from 'react-icons/ti'
import './styles.css'

const [tags, setTags] = useState([])

function HomeHeader() {
    function removeTags(tag) {
        if (tag === 'all') {
            setTags([])
        } else {
            const index = tags.findIndex(tag)
            const updated = tags.filter((tag, i) => {
                return i !== index
            })
            setTags(updated)
        }
    }

    function changeTags(tag) {
        if (tags.find(tag) !== -1) {
            setTags(...tags, tag)
        } else {
            removeTags(tag)
        }
    }

    return (
        <ChakraProvider resetCSS>
            <Box display="flex">
                {/* <GiBee size={200} color="#E4DFAF" /> */}
                <Image
                    src="https://us.123rf.com/450wm/kaissaart/kaissaart1807/kaissaart180700038/114801772-bee-flat-design-illustration-simple-vector-icon.jpg?ver=6"
                    height={200}
                    width={200}
                    color="#E4DFAF"
                />
                <Stack width="100%">
                    <Box display="flex">
                        <Text ml="2%" fontSize="7xl" fontFamily="Kokoro">
                            Busy Bee Contacts
                        </Text>
                    </Box>
                    <HStack display="flex" position="relative" maxWidth={6}>
                        <button
                            className="tagbut tag all"
                            onClick={removeTags('all')}
                        >
                            All
                        </button>{' '}
                        <span></span>
                        <button
                            className="friends tag tagbut"
                            onClick={changeTags('friends')}
                        >
                            Friends
                        </button>
                        <button
                            className="tagbut tag family"
                            onClick={changeTags('family')}
                        >
                            Family
                        </button>
                        <button
                            className="tagbut tag work"
                            onClick={changeTags('work')}
                        >
                            Work
                        </button>
                        <button
                            className="tagbut tag school"
                            onClick={changeTags('school')}
                        >
                            School
                        </button>
                        <button
                            className="tagbut tag personal"
                            onClick={changeTags('personal')}
                        >
                            Personal
                        </button>
                        <button
                            className="tagbut tag medical"
                            onClick={changeTags('medical')}
                        >
                            Medical
                        </button>
                    </HStack>
                    <Spacer />
                </Stack>
            </Box>
        </ChakraProvider>
    )
}

function FavoritesHeader() {
    return (
        <Box
            display="flex"
            borderRadius="lg"
            alignItems="center"
            bg="#E4DFAF"
            justifyContent="space-between"
        >
            <Text ml={5} fontSize="4xl" fontFamily="kokoro" as="b">
                Favorites
            </Text>
            <Box mr={5}>
                <TiStarFullOutline size={40} />
            </Box>
        </Box>
    )
}

function ShowAllContactsHeader() {
    const navigate = useNavigate()
    const [shouldNavigate, setShouldNavigate] = useState(false)

    useEffect(() => {
        if (shouldNavigate) {
            navigate('../createContact')
        }
    }, [shouldNavigate, navigate])

    return (
        <Box
            display="flex"
            borderRadius="lg"
            alignItems="center"
            justifyContent="space-between"
            bg="#E4DFAF"
            mt={3}
        >
            <Text ml={5} fontSize="4xl" fontFamily="kokoro" as="b">
                All
            </Text>
            <Button
                display="flex"
                height={35}
                bg="white"
                mr={2}
                mt={1}
                borderWidth={0}
                className="add but"
                onClick={() => setShouldNavigate(true)}
            >
                Add Contact
            </Button>
        </Box>
    )
}

function AllContactsBody(props) {
    const navigate = useNavigate()
    const rows = props.contactData.map((row, index) => {
        return (
            <div key={index}>
                <Button
                    display="flex"
                    width="100%"
                    borderRadius="lg"
                    bg="lightgray"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    mt={3}
                    overflow="hidden"
                    height="auto"
                    borderWidth={0}
                    onClick={() => {
                        navigate(`../contact/${row._id}`)
                    }}
                >
                    <IoMdContact size={50} />
                    <Box
                        width="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-start"
                        flexDirection="column"
                    >
                        <Box fontSize="xl" mb={1}>
                            {row.first_name} {row.last_name}
                        </Box>
                        <Box>
                            {row.phone_number} &bull; {row.email}
                        </Box>
                    </Box>
                </Button>
            </div>
        )
    })
    return <>{rows}</>
}

function HomePage(props) {
    return (
        <>
            <HomeHeader />
            <FavoritesHeader />
            <AllContactsBody contactData={props.favoriteContactData} />
            <ShowAllContactsHeader />
            <AllContactsBody contactData={props.contactData} />
        </>
    )
}

export default HomePage
