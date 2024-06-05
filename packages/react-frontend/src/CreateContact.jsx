import { useNavigate } from 'react-router-dom'
import React, { useState, useRef } from 'react'
import {
    ChakraProvider,
    Box,
    Stack,
    Text,
    Button,
    Heading,
    Avatar,
    HStack,
    Textarea,
    IconButton,
    AvatarGroup,
    useTagStyles,
} from '@chakra-ui/react'
import {
    CheckIcon,
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
    getAvatarGroupProps,
} from './utils/CreateContactUtils'

function CreateContact({ handleSubmit }) {
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
    })

    function submitForm() {
        handleSubmit(contact)
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

    const fileInputRef = useRef(null)

    const avatarClick = () => {
        fileInputRef.current.click()
    }

    const [file, setFile] = useState()
    function uploadIcon(e) {
        console.log(e.target.files)
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <ChakraProvider resetCSS>
            <Box {...getCommonBoxProps()}>
                <Box>
                    <Stack {...getCommonHStackProps({ isInline: true })}>
                        <Button
                            {...getCommonButtonProps({
                                leftIcon: <CloseIcon />,
                                colorScheme: 'gray',
                                backgroundColor: 'red.500',
                                className: 'butred',
                                onClick: () => navigate('/'),
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
                            })}
                            onClick={submitForm}
                        >
                            Done
                        </Button>
                    </Stack>
                </Box>
                <Stack {...getCommonStackProps()}>
                    <Box border="3px solid #000" borderRadius={100}>
                        <Avatar
                            border="5px solid #d3d3d3"
                            {...getCommonAvatarProps({ src: file })}
                            onClick={avatarClick}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            type="file"
                            onChange={uploadIcon}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
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
                >
                    <AvatarGroup spacing={-3} max={3} size="md" />
                </Box>
                <Stack
                    spacing={2}
                    alignItems="stretch"
                    justifyContent="flex-start"
                    isInline
                    display="flex"
                    flexDirection="row"
                >
                    <Box
                        width="60%"
                        p={3}
                        overflowX="hidden"
                        height="fit-content"
                    >
                        <Stack spacing={2}>
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
                </Stack>
            </Box>
        </ChakraProvider>
    )
}

export default CreateContact
