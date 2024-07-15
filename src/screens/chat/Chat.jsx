import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
} from 'react-native-gifted-chat';
import {COLORS, SIZES} from '../../../constants';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Heading} from '../../components';
import {context} from '../../../constants/initChat';
import {useToastMessage} from '../../hook/showToast';
import {chat} from '../../helpers/handleChatApis';

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [messagesData, setMessagesData] = useState(context);
  const {showToast} = useToastMessage();

  const getFirstMessage = async () => {
    try {
      setTyping(true);
      const response = await chat(messagesData);
      setMessages([
        {
          _id: response.id,
          text: response.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
            avatar: require('../../../assets/images/chatbot.png'),
          },
        },
      ]);
      setMessagesData([
        ...messagesData,
        {role: 'assistant', content: response.choices[0].message.content},
      ]);
    } catch (error) {
      showToast(`${error}`, 'danger');
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    getFirstMessage();
  }, []);

  const getResponse = async context => {
    try {
      setTyping(true);
      const response = await chat(context);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: response.id,
          text: response.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
            avatar: require('../../../assets/images/chatbot.png'),
          },
        }),
      );
      setMessagesData([
        ...messagesData,
        {role: 'assistant', content: response.choices[0].message.content},
      ]);
    } catch (error) {
      showToast(`${error}`, 'danger');
    } finally {
      setTyping(false);
    }
  };

  const onSend = messages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    getResponse([...messagesData, {role: 'user', content: messages[0].text}]);
    setMessagesData([
      ...messagesData,
      {role: 'user', content: messages[0].text},
    ]);
  };
  
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
          },
          left: {
            backgroundColor: COLORS.green2,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
            fontFamily: 'OpenSans-Medium',
            fontSize: SIZES.large - 2,
          },
          left: {
            color: COLORS.black,
            fontFamily: 'OpenSans-Medium',
            fontSize: SIZES.large - 2,
          },
        }}
        onLongPress={() => {}}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'transparent',
          paddingHorizontal: 6,
          borderTopWidth: 0,
        }}
      />
    );
  };

  const renderComposer = props => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: COLORS.black,
          backgroundColor: COLORS.white,
          borderRadius: 50,
          borderColor: COLORS.gray2,
          borderWidth: 1,
          paddingHorizontal: 12,
          marginLeft: 0,
          marginRight: 0,
        }}
        composerHeight={50}
        placeholder="Bạn cần giúp gì ?"
      />
    );
  };

  const renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IonIcons
          name="send"
          size={32}
          color={COLORS.primary}
          style={{paddingHorizontal: SIZES.small}}
        />
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Heading navigation={navigation} text="Chat Hỗ Trợ" />
        <MaterialCommunityIcons
          name="chat"
          size={38}
          color={COLORS.primary}
          style={{top: -2}}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        messagesContainerStyle={{paddingBottom: SIZES.xLarge}}
        shouldUpdateMessage={() => {
          return true;
        }}
        isTyping={typing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
    paddingBottom: SIZES.small,
  },
  heading: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.small,
    borderBottomWidth: 1,
    borderColor: COLORS.gray2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Chat;
