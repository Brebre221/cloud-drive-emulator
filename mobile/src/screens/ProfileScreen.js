import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const user = useSelector(state => state.auth.user);
  const [stats] = useState({
    gamesPlayed: 42,
    totalPlaytime: 156,
    achievements: 18,
    cloudStorage: 2.3,
    favoriteSystem: 'SNES',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.username?.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gaming Statistics</Text>
        <View style={styles.statRow}>
          <Text style={styles.statName}>Games Played</Text>
          <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statName}>Total Playtime</Text>
          <Text style={styles.statValue}>{stats.totalPlaytime}h</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statName}>Achievements</Text>
          <Text style={styles.statValue}>{stats.achievements}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statName}>Favorite System</Text>
          <Text style={styles.statValue}>{stats.favoriteSystem}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cloud Storage</Text>
        <View style={styles.storageInfo}>
          <Text style={styles.storageLabel}>Used: {stats.cloudStorage}GB / 5GB</Text>
          <View style={styles.storageBar}>
            <View style={[styles.storageUsed, { width: `${(stats.cloudStorage / 5) * 100}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <Text style={styles.achievementText}>First Win</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>⏱️</Text>
            <Text style={styles.achievementText}>100h Player</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🎮</Text>
            <Text style={styles.achievementText}>All Systems</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>☁️</Text>
            <Text style={styles.achievementText}>Cloud Saver</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#999',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  statName: {
    color: '#ddd',
    fontSize: 14,
  },
  statValue: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '600',
  },
  storageInfo: {
    marginTop: 8,
  },
  storageLabel: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 8,
  },
  storageBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3a3a3a',
    overflow: 'hidden',
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#FF6B00',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievement: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  achievementText: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ProfileScreen;
