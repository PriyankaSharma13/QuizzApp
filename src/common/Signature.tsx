import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,

  Image,
  SafeAreaView,
} from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

const SignatureCapture = ({ onSave }: { onSave: (signature: string | null) => void }) => {
  const signatureRef = useRef<SignatureViewRef>(null);
  const [signature, setSignature] = useState<string | null>(null);



  const handleSignature = (sig: string) => {
    setSignature(sig);
    onSave(sig); 
  };

  const handleEnd = () => {
    if (signatureRef.current) {
      signatureRef.current.readSignature();
    }
  };





  return (
    <SafeAreaView>
      

      <View style={styles.signatureContainer}>
        {signature ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: signature }}
              style={styles.signaturePreview}
              resizeMode="contain"
            />
          </View>
        ) : (
          <SignatureScreen
            ref={signatureRef}
            onEnd={handleEnd}
            onOK={handleSignature}
            scrollable={false}
            descriptionText=""
            clearText="Clear"
            confirmText="Save"
            backgroundColor="white"
            penColor="black"
            dotSize={1}
            minWidth={1}
            maxWidth={3}
          />
        )}
      </View>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 
  signatureContainer: {
    height: 200,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  signaturePreview: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom:30
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  confirmButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SignatureCapture;




{/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleConfirm}
          disabled={!signature}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View> */}