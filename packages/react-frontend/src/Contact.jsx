import {
    useParams,
    useNavigate,
    UNSAFE_DataRouterStateContext,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
    ChakraProvider,
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    Button,
    AvatarGroup,
    Avatar,
    Icon,
} from '@chakra-ui/react'
import {
    ArrowBackIcon,
    EditIcon,
    StarIcon,
    ExternalLinkIcon,
    PhoneIcon,
    EmailIcon,
    CalendarIcon,
    AtSignIcon,
} from '@chakra-ui/icons'
import {
    getCommonBoxProps,
    getCommonButtonProps,
    getCommonAvatarProps,
    getCommonStackProps,
    getCommonInnerBoxProps,
} from './utils/ContactUtils' // Import utility functions

import * as FaIcons from 'react-icons/fa'

function Contact({ handleSubmit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [contact, setContact] = useState(null)
    const [favorited, setFavorited] = useState(null)

    function updateContact(contact) {
        const promise = fetch(`http://localhost:8000/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                    // console.log('updated')
                } else {
                    console.log('ERROR: Returned Status ', res.status)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        return promise
    }

    useEffect(() => {
        fetch(`http://localhost:8000/contacts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                {
                    setContact(data['contact_list'])
                }
                {
                    setFavorited(data['contact_list'].favorite)
                }
            })
            .catch((error) => console.log(error))
    }, [id])

    function handleFavoriteChange() {
        const updatedContact = {
            ...contact,
            favorite: !contact.favorite,
        }
        updateContact(updatedContact)
            .then((updated) => {
                setContact(updated)
                setFavorited(!favorited)
                handleSubmit()
            })
            .catch((error) => console.error('Error updating contact:', error))
    }

    if (!contact) return <div>Loading...</div>

    return (
        <ChakraProvider resetCSS>
            <Box {...getCommonBoxProps()}>
                <Button
                    {...getCommonButtonProps({
                        size: 'xs',
                        leftIcon: <ArrowBackIcon />,
                        className: 'but',
                        onClick: () => navigate('/homepage'),
                    })}
                >
                    Back
                </Button>
                <Stack {...getCommonStackProps()}>
                    <Icon
                        margin={3}
                        as={FaIcons[contact.icon]}
                        boxSize="140px"
                    />
                    <Box width="80%">
                        <Heading textAlign="left" as="h1" size="xl">
                            {contact.first_name} {contact.last_name}
                        </Heading>
                        <Text fontStyle="italic">{contact.pronouns}</Text>
                        <HStack spacing={2} alignItems="center">
                            {contact.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className={`tag ${tag} center-div`}
                                >
                                    {tag}
                                </div>
                            ))}
                        </HStack>
                    </Box>

                    <Button
                        {...getCommonButtonProps({
                            size: 'md',
                            rightIcon: <EditIcon />,
                            backgroundColor: '#C3C29C',
                            className: 'but',
                            onClick: () => {
                                navigate(`../edit/${contact._id}`)
                            },
                        })}
                    >
                        Edit
                    </Button>
                </Stack>
                <Box
                    height={2}
                    borderRadius={20}
                    display="block"
                    flexDirection="row"
                    className="border"
                />
                <HStack
                    spacing={2}
                    alignItems="stretch"
                    justifyContent="flex-start"
                    display="flex"
                    flexDirection="row"
                >
                    <Box width="60%" p={5} height="fit-content" m={1}>
                        <Stack spacing={2}>
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <PhoneIcon />
                                    <Text width="60%" fontWeight="bold" p={2}>
                                        Phone Number
                                    </Text>
                                    <Text width="60%" textAlign="center" p={2}>
                                        {contact.phone_number}
                                    </Text>
                                </Stack>
                            </Box>
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <EmailIcon />
                                    <Text width="60%" fontWeight="bold" p={2}>
                                        Email
                                    </Text>
                                    <Text width="60%" textAlign="center" p={2}>
                                        {contact.email}
                                    </Text>
                                </Stack>
                            </Box>
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <CalendarIcon />
                                    <Text width="60%" fontWeight="bold" p={2}>
                                        Birthday
                                    </Text>
                                    <Text width="60%" textAlign="center" p={2}>
                                        {contact.birthday}
                                    </Text>
                                </Stack>
                            </Box>
                            <Box {...getCommonInnerBoxProps()}>
                                <HStack
                                    spacing={2}
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <AtSignIcon />
                                    <Text width="60%" fontWeight="bold" p={2}>
                                        Address
                                    </Text>
                                    <Text width="60%" textAlign="center" p={2}>
                                        {contact.address}
                                    </Text>
                                </HStack>
                            </Box>
                        </Stack>
                    </Box>
                    <Box width="40%" p={3} mt={2}>
                        <Box
                            {...getCommonInnerBoxProps({
                                backgroundColor: '#E4DFAF',
                                pb: 6,
                                m: 0,
                            })}
                        >
                            <Heading textAlign="left" as="h6" size="md">
                                Notes
                            </Heading>
                            <Box p={2} height="250px" overflow="auto">
                                <Text textAlign="left" lineHeight={1.5}>
                                    {contact.notes}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </HStack>

                <Button
                    {...getCommonButtonProps({
                        size: 'md',
                        rightIcon: <StarIcon />,
                        backgroundColor: '#C3C29C',
                        className: 'but',
                        width: '100%',
                        margin: 2,
                    })}
                    onClick={handleFavoriteChange}
                >
                    {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </Box>
        </ChakraProvider>
    )
}

export default Contact
