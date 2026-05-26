import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { profileService } from '../services/api';
import { logout } from '../store';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [emulationMode, setEmulationMode] = useState('hybrid');
  const [autoSave, setAutoSave] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [resolution, setResolution] = useState('720p');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleResetSettings = () => {
    setEmulationMode('hybrid');
    setAutoSave(true);
    setCloudSync(true);
    setResolution('720p');
  };

  const ToggleButton = ({ label, value, onChange }) => (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={() => onChange(!value)}
    >
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </View>
    </TouchableOpacity>
  );

  const SelectButton = ({ label, value, options, onChange }) => (
    <View style={styles.selectButton}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              value === option && styles.optionButtonActive,
            ]}
            onPress={() => onChange(option)}
          >
            <Text
              style={[
                styles.optionText,
                value === option && styles.optionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emulation Settings</Text>

        <SelectButton
          label="Emulation Mode"
          value={emulationMode}
          options={['Local', 'Cloud', 'Hybrid']}
          onChange={setEmulationMode}
        />

        <SelectButton
          label="Resolution"
          value={resolution}
          options={['480p', '720p', '1080p']}
          onChange={setResolution}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>

        <ToggleButton
          label="Auto-Save Games"
          value={autoSave}
          onChange={setAutoSave}
        />

        <ToggleButton
          label="Cloud Sync"
          value={cloudSync}
          onChange={setCloudSync}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controller Settings</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>🎮 Configure Gamepad</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>📱 Virtual Controller Layout</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>

        <View style={styles.storageInfo}>
          <Text style={styles.storageLabel}>Cloud Storage Used</Text>
          <View style={styles.storageBar}>
            <View style={[styles.storageUsed, { width: '45%' }]} />
          </View>
          <Text style={styles.storageText}>2.3 GB / 5 GB</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>👤 Profile</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>🔐 Change Password</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>📧 Notification Preferences</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>App Version: 1.0.0</Text>
          <Text style={styles.infoText}>Backend: Connected ✓</Text>
          <Text style={styles.infoText}>Supported Systems: 7</Text>
        </View>

        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>📋 Terms & Privacy</Text>
          <Text style={styles.settingButtonArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetSettings}
        >
          <Text style={styles.resetButtonText}>Reset to Defaults</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3a3a3a',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#FF6B00',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  selectButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  optionButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  optionButtonActive: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  optionText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  settingButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  settingButtonArrow: {
    color: '#999',
    fontSize: 14,
  },
  storageInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
  },
  storageLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  storageBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3a3a3a',
    overflow: 'hidden',
    marginBottom: 8,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#FF6B00',
  },
  storageText: {
    color: '#999',
    fontSize: 12,
  },
  infoBox: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  infoText: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 6,
  },
  resetButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  resetButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 12,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SettingsScreen;
