import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';

const ChatList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reactnative.dev/movies.json?page=${page}`);
        setMessages(prevMessages => [...prevMessages, ...response.data.movies]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [page]);

  const renderFooter = () => {
    return loading ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <View style={{ padding: 30 }}>
          <Text>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      inverted // This makes the FlatList display items inverted
      onEndReached={() => setPage(page => page + 1)}
      onEndReachedThreshold={0.1}
    />
  );
};

export default ChatList;
