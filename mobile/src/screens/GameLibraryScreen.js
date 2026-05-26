import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { gamesService } from '../services/api';
import { addRecent, addFavorite } from '../store';

const GameLibraryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const systems = ['NES', 'SNES', 'Genesis', 'N64', 'GameBoy', 'PS1', 'Arcade'];

  useEffect(() => {
    loadGames();
  }, [selectedSystem, searchQuery]);

  const loadGames = async () => {
    try {
      setIsLoading(true);
      const response = await gamesService.getGames(selectedSystem, searchQuery);
      setGames(response.data.games);
      setFilteredGames(response.data.games);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayGame = (game) => {
    dispatch(addRecent(game));
    navigation.navigate('GamePlayer', { game });
  };

  const handleFavorite = (game) => {
    dispatch(addFavorite(game));
  };

  const renderGameCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.gameCard}
      onPress={() => handlePlayGame(item)}
    >
      <View style={styles.gameContent}>
        <Text style={styles.gameTitle}>{item.title}</Text>
        <Text style={styles.gameSystem}>{item.system}</Text>
        <Text style={styles.gameYear}>{item.year || 'N/A'}</Text>
      </View>
      <View style={styles.gameActions}>
        <TouchableOpacity onPress={() => handleFavorite(item)}>
          <Text style={styles.favoriteButton}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlayGame(item)}>
          <Text style={styles.playButton}>▶️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search games..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={systems}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.systemButton,
              selectedSystem === item && styles.systemButtonActive,
            ]}
            onPress={() => setSelectedSystem(item === selectedSystem ? null : item)}
          >
            <Text style={styles.systemButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        style={styles.systemList}
      />

      <FlatList
        data={filteredGames}
        renderItem={renderGameCard}
        keyExtractor={item => item.id}
        style={styles.gamesList}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isLoading ? 'Loading games...' : 'No games found'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    fontSize: 14,
  },
  systemList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  systemButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  systemButtonActive: {
    backgroundColor: '#FF6B00',
  },
  systemButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gamesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gameCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameContent: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  gameSystem: {
    fontSize: 12,
    color: '#FF6B00',
    marginBottom: 2,
  },
  gameYear: {
    fontSize: 11,
    color: '#999',
  },
  gameActions: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteButton: {
    fontSize: 20,
  },
  playButton: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

export default GameLibraryScreen;
