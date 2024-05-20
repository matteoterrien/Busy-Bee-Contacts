import React, { useState, useEffect } from 'react';
import { 
  Stack, 
  Flex, 
  Image, 
  Heading, 
  Icon, 
  Text, 
  useColorModeValue 
} from '@chakra-ui/react';

/* put under profile.name
          <Icon viewBox="0 0 200 200" color={profile.iconColor1} p={2}>
            <path
              fill="currentColor"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          <Icon viewBox="0 0 200 200" color={profile.iconColor2} p={2}>
            <path
              fill="currentColor"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon> */

function ProfileCard({ userId }) {
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    avatarUrl: '',
    iconColor1: 'red.500',
    iconColor2: 'yellow.500',
    phone: '(xxx)',
    email: 'hi',
    note: 'hiii',
  });
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5173/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfile({
        name: data.name,
        avatarUrl: data.avatarUrl,
        iconColor1: data.iconColor1,
        iconColor2: data.iconColor2,
        phone: data.phone,
        email: data.email,
        note: data.note,
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: '100%', md: '100%' }}
      height={{ sm: '150px' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      padding={5}
    >
      <Flex flex={0.20} bg="none">
        <Image
          borderRadius="full"
          objectFit="cover"
          src={profile.avatarUrl || 'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
        />
      </Flex>
      <Stack
        flex={1.7}
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        mt={8}
      >
        <Heading fontSize="30px" fontFamily="body" mb={0}>
          {profile.name}
        </Heading>
        <Text fontWeight={600} color="gray.500" fontSize="20px" mt={0} mb={0}>
          {profile.phone} • {profile.email}
        </Text>
        <Text color={useColorModeValue('gray.700', 'gray.400')} mt={0}>
          {profile.note}
        </Text>
        <Stack align="center" justify="center" direction="row" mt={6}>
          {/* Additional content can go here */}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProfileCard;
