import { useParams, useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import {
    ChakraProvider,
    Box,
    Stack,
    HStack,
    Text,
    Button,
    Heading,
    Avatar,
    Icon,
    Textarea,
    IconButton,
    AvatarGroup,
} from '@chakra-ui/react'
import {
    CheckIcon,
    DeleteIcon,
    PhoneIcon,
    EmailIcon,
    CalendarIcon,
    AtSignIcon,
    CloseIcon,
    AddIcon,
} from '@chakra-ui/icons'
import {
    getCommonBoxProps,
    getCommonHStackProps,
    getCommonButtonProps,
    getCommonAvatarProps,
    getCommonStackProps,
    getCommonInnerBoxProps,
    getIconButtonProps,
} from './utils/ContactEditUtils' // Import utility functions

import { Select } from '@chakra-ui/react'
import * as FaIcons from 'react-icons/fa'

function Edit({ handleSubmit }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [newTags, setNewTags] = useState([])
    const [contact, setContact] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        birthday: '',
        pronouns: '',
        socials: '',
        notes: '',
        tags: [],
        favorite: false,
        icon: '',
        userID: '',
    })

    function updateContact(contact) {
        const promise = fetch(`http://localhost:8000/contacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
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
            .then((data) => setContact(data['contact_list']))
            .catch((error) => console.log(error))
    }, [id])

    function deleteContact() {
        handleSubmit(id)
        navigate('/homepage')
    }

    function handleChange(event) {
        const { name, value } = event.target
        setContact((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }))
    }

    function changeTags(tag) {
        setNewTags((prevTags) => {
            const updatedTags = prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
            setContact((prevPerson) => ({
                ...prevPerson,
                tags: updatedTags,
            }))
            return updatedTags
        })
    }

    const [selectedIcon, setSelectedIcon] = useState('')

    const previewIcon = (event) => {
        setSelectedIcon(event.target.value)
        saveIcon(event.target.value)
    }

    function saveIcon(selectedIcon) {
        setContact((prevContact) => ({
            ...prevContact,
            icon: selectedIcon,
        }))
    }

    return (
        <ChakraProvider resetCSS>
            <Box {...getCommonBoxProps()}>
                <Box>
                    <HStack {...getCommonHStackProps()}>
                        <Button
                            {...getCommonButtonProps({
                                leftIcon: <CloseIcon />,
                                colorScheme: 'gray',
                                backgroundColor: 'red.500',
                                className: 'butred',
                                onClick: () => navigate(-1),
                            })}
                        >
                            Cancel
                        </Button>
                        <Button
                            {...getCommonButtonProps({
                                rightIcon: <CheckIcon />,
                                colorScheme: 'gray',
                                backgroundColor: 'green.500',
                                className: 'butgreen',
                                onClick: () => {
                                    updateContact(contact)
                                    navigate(`../contact/${id}`)
                                },
                            })}
                        >
                            Done
                        </Button>
                    </HStack>
                </Box>
                <Stack {...getCommonStackProps()}>
                    <Box align="center">
                        <Icon as={FaIcons[selectedIcon]} boxSize="120px" />
                        <Select
                            placeholder="Select icon"
                            onChange={previewIcon}
                        >
                            {Object.keys(FaIcons).map((iconName) => {
                                return (
                                    <option key={iconName} value={iconName}>
                                        {iconName}
                                    </option>
                                )
                            })}
                        </Select>
                    </Box>
                    <Box width="80%">
                        <HStack>
                            <Textarea
                                placeholder={
                                    contact.first_name
                                        ? `${contact.first_name}`
                                        : 'First Name'
                                }
                                size="lg"
                                fontSize="4xl"
                                m={3}
                                name="first_name"
                                value={contact.first_name}
                                onChange={handleChange}
                            />
                            <Textarea
                                placeholder={
                                    contact.last_name
                                        ? `${contact.last_name}`
                                        : 'Last Name'
                                }
                                size="lg"
                                fontSize="4xl"
                                m={3}
                                name="last_name"
                                value={contact.last_name}
                                onChange={handleChange}
                            />
                        </HStack>

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
                </Stack>
                <Box
                    height={2}
                    backgroundColor="#C3C29C"
                    borderRadius={20}
                    display="block"
                    flexDirection="row"
                />
                <HStack
                    spacing={2}
                    alignItems="stretch"
                    justifyContent="flex-start"
                    display="flex"
                    flexDirection="row"
                >
                    <Box width="60%" p={3} height="fit-content">
                        <Stack spacing={2}>
                            {/*Box for Phone Number*/}
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <PhoneIcon />
                                    <Text width="65%" fontWeight="bold" p={2}>
                                        Phone Number
                                    </Text>
                                    <Textarea
                                        placeholder={
                                            contact.phone_number
                                                ? contact.phone_number
                                                : 'XXX-XXXX'
                                        }
                                        resize="none"
                                        minH={1}
                                        name="phone_number"
                                        value={contact.phone_number}
                                        onChange={handleChange}
                                    />
                                </Stack>

                                <Stack
                                    spacing={2}
                                    justifyContent="flex-end"
                                    mt={2}
                                    height={7}
                                >
                                    <IconButton {...getIconButtonProps()} />
                                </Stack>
                            </Box>

                            {/*Box for Email*/}
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <EmailIcon />
                                    <Text width="65%" fontWeight="bold" p={2}>
                                        Email
                                    </Text>
                                    <Textarea
                                        placeholder={
                                            contact.email
                                                ? contact.email
                                                : 'XXX-XXXX'
                                        }
                                        resize="none"
                                        minH={1}
                                        name="email"
                                        value={contact.email}
                                        onChange={handleChange}
                                    />
                                </Stack>
                                <Stack
                                    spacing={2}
                                    justifyContent="flex-end"
                                    mt={2}
                                    height={7}
                                >
                                    <IconButton {...getIconButtonProps()} />
                                </Stack>
                            </Box>

                            {/*Box for Birthday*/}
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    isInline
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <CalendarIcon />
                                    <Text width="65%" fontWeight="bold" p={2}>
                                        Birthday
                                    </Text>
                                    <Textarea
                                        placeholder={
                                            contact.birthday
                                                ? contact.birthday
                                                : 'XX/XX/XXXX'
                                        }
                                        resize="none"
                                        minH={1}
                                        name="birthday"
                                        value={contact.birthday}
                                        onChange={handleChange}
                                    />
                                </Stack>
                                <Stack
                                    spacing={2}
                                    justifyContent="flex-end"
                                    mt={2}
                                    height={7}
                                >
                                    <IconButton {...getIconButtonProps()} />
                                </Stack>
                            </Box>

                            {/*Box for Address*/}
                            <Box {...getCommonInnerBoxProps()}>
                                <Stack
                                    spacing={2}
                                    flexDirection="row"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <AtSignIcon />
                                    <Text width="65%" fontWeight="bold" p={2}>
                                        Address
                                    </Text>
                                    <Textarea
                                        placeholder={
                                            contact.address
                                                ? contact.address
                                                : 'XXX-XXXX'
                                        }
                                        resize="none"
                                        minH={1}
                                        name="address"
                                        value={contact.address}
                                        onChange={handleChange}
                                    />
                                </Stack>
                                <Stack
                                    spacing={2}
                                    justifyContent="flex-end"
                                    mt={2}
                                    height={7}
                                >
                                    <IconButton {...getIconButtonProps()} />
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>

                    {/*Right side*/}
                    <Stack
                        width="50%"
                        p={3}
                        height="fit-content"
                        overflow="hidden"
                        display="inline"
                    >
                        <HStack padding={5} paddingBottom={0} paddingTop={0}>
                            <button
                                className="friends tag tagbut"
                                onClick={() => changeTags('friends')}
                            >
                                Friends
                            </button>
                            <button
                                className="tagbut tag family"
                                onClick={() => changeTags('family')}
                            >
                                Family
                            </button>
                            <button
                                className="tagbut tag work"
                                onClick={() => changeTags('work')}
                            >
                                Work
                            </button>
                        </HStack>
                        <span className="tagsep"></span>
                        <HStack padding={5} paddingBottom={0} paddingTop={3}>
                            <button
                                className="tagbut tag school"
                                onClick={() => changeTags('school')}
                            >
                                School
                            </button>
                            <button
                                className="tagbut tag personal"
                                onClick={() => changeTags('personal')}
                            >
                                Personal
                            </button>
                            <button
                                className="tagbut tag medical"
                                onClick={() => changeTags('medical')}
                            >
                                Medical
                            </button>
                        </HStack>

                        <Box
                            {...getCommonInnerBoxProps({ p: 6, m: 2 })}
                            height="fit-content"
                        >
                            <Heading textAlign="left" as="h6" size="md">
                                Notes
                            </Heading>
                            <Box p={2} height="fit-content" overflowY="scroll">
                                <Textarea
                                    placeholder="Edit Note..."
                                    name="notes"
                                    value={contact.notes}
                                    onChange={handleChange}
                                    height="315"
                                />
                            </Box>
                        </Box>
                    </Stack>
                </HStack>

                <Button
                    {...getCommonButtonProps({
                        rightIcon: <DeleteIcon />,
                        backgroundColor: 'red.300',
                        borderRadius: 40,
                        width: '100%',
                        color: '#000000',
                        className: 'butred',
                        margin: 2,
                    })}
                    onClick={deleteContact}
                >
                    Delete Contact
                </Button>
            </Box>
        </ChakraProvider>
    )
}

export default Edit
