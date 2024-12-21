import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-number-input';

const {height, width} = Dimensions.get('screen');

export default function CreateAccount() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [otherGender, setOtherGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);  // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State for confirm password visibility
    const [isFocused, setIsFocused] = useState(false);
    const phoneInput = React.useRef(null);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(formatDate(currentDate));
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        if (!name || !dob || !gender || !email || !phone || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill out all required fields.');
            return false;
        }
        if (gender === 'Other' && !otherGender) {
            Alert.alert('Error', 'Please specify your gender.');
            return false;
        }
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return false;
        }
        if (!checked) {
            Alert.alert('Error', 'You must agree to the terms and conditions.');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            alert('Account Created');
        }
    };

    return (
        <View style={{backgroundColor:'blue'}}>

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.title}>Cambeo</Text>
            </View>
            <View style={styles.formSection}>
                <Text style={styles.header}>Create Account</Text>
                <Text style={styles.description}>
                    To get started, create an account with us. It's a quick and straightforward process that will only take a few minutes.
                </Text>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Date Of Birth</Text>
                <View style={styles.dobContainer}>
                    <TextInput
                        style={[styles.inputWithIcon, styles.input]}
                        placeholder="DD/MM/YYYY"
                        value={dob}
                        onFocus={() => setShowDatePicker(true)}
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconContainer}>
                        <Image style={styles.calendar} source={require("../assets/il_570xN.4209287024_rlml.jpg")}/>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob ? new Date(dob.split('/').reverse().join('-')) : new Date()}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>
                <Text style={styles.label}>Gender</Text>
                <View style={[styles.pickerContainer]}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>
                {gender === 'Other' && (
                    <TextInput
                        style={styles.input}
                        placeholder="Please specify"
                        value={otherGender}
                        onChangeText={setOtherGender}
                    />
                )}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Phone No.</Text>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phone}
                    defaultCode="US"
                    layout="first"
                    onChangeFormattedText={setPhone}
                    containerStyle={styles.phoneInputContainer}
                    textContainerStyle={styles.phoneTextContainer}
                />
                

                <View style={styles.inputContainer}>
                    <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}  // Toggle visibility based on the state
                    />
                    {password.length > 1 && (
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)} 
                            style={styles.iconContainer}
                        >
                            <Image 
                                source={showPassword ? require("../assets/eyeopen.png") : require("../assets/eyeoff.png")} 
                                style={styles.passwordIcon}
                            />
                        </TouchableOpacity>
                    )}
                    </View>

                        <View>
                        <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}  // Toggle visibility based on the state
                    />
                    {confirmPassword.length > 1 && (
                        <TouchableOpacity 
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
                            style={styles.iconContainer}
                        >
                            <Image 
                                source={showConfirmPassword ? require("../assets/eyeopen.png") : require("../assets/eyeoff.png")} 
                                style={styles.passwordIcon}
                            />
                        </TouchableOpacity>
                    )}
                        </View>
                </View>
                
                
                
                <View style={styles.container}>
      {/* Other form fields */}

      <View style={styles.checkboxContainer}>
        {/* Checkbox */}
        <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
          <View style={[styles.checkboxInner, isChecked && styles.checkboxChecked]}>
            {isChecked && (
              <Image
                style={styles.tickImage}
                source={require('../assets/blue_tick.png')}  // Add your tick image here
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Text with links */}
        <Text style={styles.checkboxText}>
          I agree to the{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://www.example.com/terms')}>
            Terms and Conditions
          </Text>{' '}
          and the{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://www.example.com/privacy')}>
            privacy policy
          </Text>.
        </Text>
      </View>

      {/* Other form fields */}
    </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <View style={styles.socialMediaContainer}>
                    <TouchableOpacity style={styles.socialMediaButton}>
                        <Image source={require('../assets/apple1.png')} style={styles.socialMediaIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialMediaButton}>
                        <Image source={require('../assets/facebook.png')} style={styles.socialMediaIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialMediaButton}>
                        <Image source={require('../assets/googles.png')} style={styles.socialMediaIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>
                    Already have an account?{" "}
                    <Text style={styles.link}>Log In</Text>
                </Text>
            </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 420,
        height: 1281,
        marginTop: 58,
        borderTopLeftRadius: 100, // Adjust to make the radius larger
        borderTopRightRadius: 100, // Adjust to make the radius larger
        paddingTop: 32,
        paddingRight: 20,
        paddingBottom: 32,
        paddingLeft: 20,
        overflow: 'hidden', // Ensure content does not overflow the border radius
        backgroundColor: '#fff', // Set a background color to visualize the shape
    },
    topSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
    fontSize: 40,
    fontWeight: '800',
    fontFamily: 'K2D-Bold',
    color: '#EB4869',
    textAlign: 'center',
    lineHeight: 60,
  },
    formSection: {
        padding: 20,
        marginTop: -10,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        height: 50, 
        marginBottom:15
        // Consistent height for all input fields
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    passwordIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        top: 30
    },
    button: {
        backgroundColor: '#EB4869',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        bottom: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
        bottom: 40,
        position: 'relative',
      },
      checkbox: {
        marginRight: 10,
      },
      checkboxInner: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxText: {
        fontSize: 16,
      },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    footerText: {
        textAlign: "center",
        marginVertical: 10,
        marginTop:10,
        
    },
    calendar: {
        height: 25,
        width: 25,
    },
    phoneInputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,  // Consistent margin with other inputs
        width: '100%',
        height: 50,  // Same height as other input fields
    },
    phoneTextContainer: {
        paddingVertical: 1,
        paddingHorizontal: 15,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        position: 'relative',
        zIndex: 10,
        height: 50,  // Same height for picker as input fields
    },
    picker: {
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
    },
    dobContainer: {
        position: 'relative',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 50,  // Ensure consistent height
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
        bottom: 30
    },
    socialMediaButton: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    socialMediaIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    input1: {
        borderWidth: 2,
        borderColor: '#ccc',
        width: 20,
        height: 1,
        // padding: 1,
        borderRadius: 5,
       // marginBottom: 10,
       
    },
    tickImage: {
        width: 12,
        height: 12, // Size of the tick mark
      },
});
