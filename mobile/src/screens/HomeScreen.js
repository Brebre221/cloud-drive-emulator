import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { gamesService } from '../services/api';
import { addRecent } from '../store';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const recentGames = useSelector(state => state.games.recent);
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    loadFeaturedGames();
  }, []);

  const loadFeaturedGames = async () => {
    try {
      const response = await gamesService.getFeatured();
      setFeaturedGames(response.data.games);
    } catch (error) {
      console.error('Error loading featured games:', error);
    }
  };

  const handlePlayGame = (game) => {
    dispatch(addRecent(game));
    navigation.navigate('GamePlayer', { game });
  };

  const renderGameCard = ({ item }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => handlePlayGame(item)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSystem}>{item.system}</Text>
      </View>
      <Text style={styles.playIcon}>▶️</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user?.username}!</Text>
        <Text style={styles.subText}>Ready to play?</Text>
      </View>

      {recentGames.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <FlatList
            data={recentGames.slice(0, 3)}
            renderItem={renderGameCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Games</Text>
        <FlatList
          data={featuredGames.slice(0, 5)}
          renderItem={renderGameCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.statsSection}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{recentGames.length}</Text>
          <Text style={styles.statLabel}>Games Played</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{user?.playtime || 0}h</Text>
          <Text style={styles.statLabel}>Play Time</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Systems</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('LibraryStack')}
      >
        <Text style={styles.browseButtonText}>Browse All Games →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#2a2a2a',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 12,
  },
  gameCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSystem: {
    color: '#FF6B00',
    fontSize: 12,
  },
  playIcon: {
    fontSize: 16,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  stat: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  browseButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
  },
  browseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HomeScreen;
